import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.mobifys_token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-passwordHash');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found' });
    }

    if (user.isBlocked) {
      res.clearCookie('mobifys_token');
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Contact Mobifys support.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expired, please log in again' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};