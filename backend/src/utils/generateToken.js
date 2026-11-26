import jwt from 'jsonwebtoken';

export const USER_AUTH_COOKIE = 'mobifys_user_token';
export const ADMIN_AUTH_COOKIE = 'mobifys_admin_token';
export const LEGACY_AUTH_COOKIE = 'mobifys_token';

const generateToken = (res, userId, role, keepSignedIn = false) => {
  const maxAgeDays = keepSignedIn ? 30 : 1;
  const cookieName = role === 'user' ? USER_AUTH_COOKIE : ADMIN_AUTH_COOKIE;

  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: `${maxAgeDays}d`,
  });

  res.clearCookie(LEGACY_AUTH_COOKIE);
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: maxAgeDays * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;