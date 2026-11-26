import User from '../models/User.js';
import {
  clearAuthCookies,
  getScopeConfig,
  isTokenIssuedBeforePasswordChange,
  revokeAllUserTokens,
  verifyAccessToken,
} from '../services/tokenService.js';

const extractAccessToken = (req, cookieName) => {
  if (req.cookies?.[cookieName]) {
    return req.cookies[cookieName];
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
};

const createProtectMiddleware = (scope) => async (req, res, next) => {
  try {
    const cfg = getScopeConfig(scope);
    const token = extractAccessToken(req, cfg.accessCookieName);

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
    }

    const decoded = verifyAccessToken(token, scope);
    const user = await User.findById(decoded.userId).select('-passwordHash').lean();

    if (!user || !cfg.allowedRoles.includes(user.role)) {
      return res.status(401).json({ success: false, message: 'User account not found' });
    }

    if (user.isBlocked) {
      await revokeAllUserTokens(user._id, scope);
      clearAuthCookies(res, scope);
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Contact Mobifys support.',
      });
    }

    if (isTokenIssuedBeforePasswordChange(user, decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'Password recently changed, please log in again',
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired, please log in again' });
  }
};

export const protectUser = createProtectMiddleware('user');
export const protectAdmin = createProtectMiddleware('admin');
export const protect = protectUser;

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};
