import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ADMIN_AUTH_COOKIE, USER_AUTH_COOKIE } from '../utils/generateToken.js';

const createProtect = (cookieName, isAllowedRole, blockedCode, blockedMessage) => async (
  req,
  res,
  next
) => {
  const token = req.cookies?.[cookieName];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found' });
    }

    if (!isAllowedRole(user)) {
      res.clearCookie(cookieName);
      return res.status(403).json({ success: false, message: 'Not authorized for this account' });
    }

    if (user.isBlocked) {
      res.clearCookie(cookieName);
      return res.status(403).json({
        success: false,
        code: blockedCode,
        message: blockedMessage,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expired, please log in again' });
  }
};

export const protectUser = createProtect(
  USER_AUTH_COOKIE,
  (user) => user.role === 'user',
  'USER_ACCOUNT_BLOCKED',
  'Your account has been blocked. Contact Mobifys support.'
);

export const protectAdmin = createProtect(
  ADMIN_AUTH_COOKIE,
  (user) => user.role === 'admin' || user.role === 'super_admin',
  'ADMIN_ACCOUNT_BLOCKED',
  'This admin account has been disabled.'
);

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};