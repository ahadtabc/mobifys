import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';
import User from '../models/User.js';
import { env } from '../config/env.js';

const TOKEN_ISSUER = 'mobifys';

// Scope configuration (separate cookies & secrets for user vs admin)
const SCOPE_CONFIG = {
  user: {
    getSecrets: () => ({
      accessSecret: env.jwt.userAccessSecret,
      refreshSecret: env.jwt.userRefreshSecret,
    }),
    accessCookieName: 'mobifys_user_access_token',
    refreshCookieName: 'mobifys_user_refresh_token',
    refreshCookiePath: '/api/user/auth',
    audience: 'mobifys-user',
    allowedRoles: ['user'],
  },
  admin: {
    getSecrets: () => ({
      accessSecret: env.jwt.adminAccessSecret,
      refreshSecret: env.jwt.adminRefreshSecret,
    }),
    accessCookieName: 'mobifys_admin_access_token',
    refreshCookieName: 'mobifys_admin_refresh_token',
    refreshCookiePath: '/api/admin/auth',
    audience: 'mobifys-admin',
    allowedRoles: ['admin'],
  },
};

const UNIT_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

export const getScopeForRole = (role) => (role === 'admin' ? 'admin' : 'user');

export const getScopeConfig = (scope) => {
  const cfg = SCOPE_CONFIG[scope];
  if (!cfg) {
    throw new Error(`Invalid auth scope: ${scope}`);
  }

  const { accessSecret, refreshSecret } = cfg.getSecrets();
  if (!accessSecret || !refreshSecret) {
    throw new Error(`Missing JWT secrets for scope: ${scope}`);
  }

  return { ...cfg, accessSecret, refreshSecret };
};

export const parseDurationToMs = (value, fallbackMs) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value * 1000;
  }
  if (typeof value !== 'string') return fallbackMs;

  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed) * 1000;
  }

  const match = trimmed.match(/^(\d+)([smhd])$/i);
  if (!match) return fallbackMs;

  return Number(match[1]) * UNIT_MS[match[2].toLowerCase()];
};

export const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

export const isTokenIssuedBeforePasswordChange = (user, tokenIatSeconds) => {
  if (!user?.passwordChangedAt || !tokenIatSeconds) return false;
  const passwordChangedSec = Math.floor(new Date(user.passwordChangedAt).getTime() / 1000);
  return passwordChangedSec > tokenIatSeconds;
};

const getBaseCookieOptions = () => ({
  httpOnly: true,
  secure: env.isProd,
  sameSite: 'lax',
});

export const clearAuthCookies = (res, scope) => {
  const cfg = SCOPE_CONFIG[scope];
  if (!cfg) return;

  const base = getBaseCookieOptions();
  res.clearCookie(cfg.accessCookieName, { ...base, path: '/' });
  res.clearCookie(cfg.refreshCookieName, { ...base, path: cfg.refreshCookiePath });
};

// JWT verification helpers
const verifyScopedJwt = (token, scope, expectedType) => {
  const cfg = getScopeConfig(scope);
  const secret = expectedType === 'refresh' ? cfg.refreshSecret : cfg.accessSecret;

  const decoded = jwt.verify(token, secret, {
    algorithms: ['HS256'],
    issuer: TOKEN_ISSUER,
    audience: cfg.audience,
  });

  if (
    decoded.type !== expectedType ||
    decoded.scope !== scope ||
    !cfg.allowedRoles.includes(decoded.role)
  ) {
    throw new Error(`Invalid ${expectedType} token claims`);
  }

  return decoded;
};

export const verifyAccessToken = (token, scope) => verifyScopedJwt(token, scope, 'access');
export const verifyRefreshToken = (token, scope) => verifyScopedJwt(token, scope, 'refresh');

/**
 * Issue a short-lived JWT access token and a persistent, hashed refresh token
 * stored in MongoDB, setting both as HttpOnly cookies scoped to user or admin.
 */
export const issueAuthTokens = async ({
  req,
  res,
  user,
  keepSignedIn = false,
  familyId = null,
}) => {
  const scope = getScopeForRole(user.role);
  const cfg = getScopeConfig(scope);

  const accessExpiresIn = env.jwt.accessExpiresIn;
  const refreshExpiresIn = keepSignedIn
    ? env.jwt.rememberRefreshExpiresIn
    : env.jwt.refreshExpiresIn;

  const accessMaxAgeMs = parseDurationToMs(accessExpiresIn, 15 * 60 * 1000);
  const refreshMaxAgeMs = parseDurationToMs(
    refreshExpiresIn,
    (keepSignedIn ? 30 : 7) * 24 * 60 * 60 * 1000
  );

  const tokenFamilyId = familyId || crypto.randomUUID();
  const userIdStr = user._id.toString();

  const accessToken = jwt.sign(
    {
      sub: userIdStr,
      userId: userIdStr,
      role: user.role,
      scope,
      type: 'access',
    },
    cfg.accessSecret,
    {
      algorithm: 'HS256',
      expiresIn: accessExpiresIn,
      issuer: TOKEN_ISSUER,
      audience: cfg.audience,
      jwtid: crypto.randomUUID(),
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: userIdStr,
      userId: userIdStr,
      role: user.role,
      scope,
      type: 'refresh',
      familyId: tokenFamilyId,
    },
    cfg.refreshSecret,
    {
      algorithm: 'HS256',
      expiresIn: refreshExpiresIn,
      issuer: TOKEN_ISSUER,
      audience: cfg.audience,
      jwtid: crypto.randomUUID(),
    }
  );

  const refreshTokenHash = hashToken(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    scope,
    tokenHash: refreshTokenHash,
    familyId: tokenFamilyId,
    keepSignedIn: Boolean(keepSignedIn),
    expiresAt: new Date(Date.now() + refreshMaxAgeMs),
    userAgent: req?.get?.('user-agent') || '',
    ip: req?.ip || '',
  });

  const baseCookie = getBaseCookieOptions();
  res.cookie(cfg.accessCookieName, accessToken, {
    ...baseCookie,
    path: '/',
    maxAge: accessMaxAgeMs,
  });

  res.cookie(cfg.refreshCookieName, refreshToken, {
    ...baseCookie,
    path: cfg.refreshCookiePath,
    maxAge: refreshMaxAgeMs,
  });

  return { accessToken, refreshToken, refreshTokenHash };
};

const revokeFamily = (familyId) =>
  RefreshToken.updateMany({ familyId, revokedAt: null }, { $set: { revokedAt: new Date() } });

export const revokeAllUserTokens = async (userId, scope = null) => {
  const filter = { userId, revokedAt: null };
  if (scope) {
    filter.scope = scope;
  }
  await RefreshToken.updateMany(filter, { $set: { revokedAt: new Date() } });
};

/**
 * Rotate a refresh token: verifies JWT signature, atomically revokes the old
 * DB token, detects token reuse across a family, and issues fresh cookies.
 */
export const rotateRefreshToken = async ({ req, res, scope }) => {
  const cfg = getScopeConfig(scope);
  const rawRefreshToken = req.cookies?.[cfg.refreshCookieName];

  if (!rawRefreshToken) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Refresh token missing' };
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(rawRefreshToken, scope);
  } catch {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Invalid or expired refresh token' };
  }

  const tokenHash = hashToken(rawRefreshToken);
  const existingRecord = await RefreshToken.findOne({ tokenHash }).lean();

  if (!existingRecord) {
    if (decoded.familyId) {
      await revokeFamily(decoded.familyId);
    }
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Session revoked, please log in again' };
  }

  if (existingRecord.revokedAt) {
    await revokeFamily(existingRecord.familyId);
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Session invalidated for security, please log in again' };
  }

  if (existingRecord.expiresAt <= new Date()) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Refresh token expired, please log in again' };
  }

  const revokedRecord = await RefreshToken.findOneAndUpdate(
    { _id: existingRecord._id, revokedAt: null },
    { $set: { revokedAt: new Date() } },
    { new: true }
  ).lean();

  if (!revokedRecord) {
    await revokeFamily(existingRecord.familyId);
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Session invalidated, please log in again' };
  }

  const user = await User.findById(existingRecord.userId).select('-passwordHash').lean();
  if (!user || !cfg.allowedRoles.includes(user.role)) {
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Account not found' };
  }

  if (user.isBlocked || user.status === 'blocked') {
    await revokeAllUserTokens(user._id, scope);
    clearAuthCookies(res, scope);
    return {
      ok: false,
      status: 403,
      message: 'Your account has been blocked. Contact Mobifys support.',
    };
  }

  if (isTokenIssuedBeforePasswordChange(user, decoded.iat)) {
    await revokeAllUserTokens(user._id, scope);
    clearAuthCookies(res, scope);
    return { ok: false, status: 401, message: 'Password was changed, please log in again' };
  }

  const { refreshTokenHash: newTokenHash } = await issueAuthTokens({
    req,
    res,
    user,
    keepSignedIn: existingRecord.keepSignedIn,
    familyId: existingRecord.familyId,
  });

  await RefreshToken.updateOne(
    { _id: existingRecord._id },
    { $set: { replacedByTokenHash: newTokenHash } }
  );

  return { ok: true, user };
};

export const revokeSessionToken = async (req, res, scope) => {
  const cfg = SCOPE_CONFIG[scope];
  const rawRefreshToken = cfg ? req.cookies?.[cfg.refreshCookieName] : null;

  if (rawRefreshToken) {
    await RefreshToken.updateOne(
      { tokenHash: hashToken(rawRefreshToken), revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );
  }

  clearAuthCookies(res, scope);
};

export default issueAuthTokens;
