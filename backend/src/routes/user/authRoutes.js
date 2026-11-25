import express from 'express';
import passport from 'passport';
import {
  signupUser,
  verifySignupOtp,
  resendUserOtp,
  loginUser,
  forgotUserPassword,
  resetUserPassword,
  getUserMe,
  logoutUser,
} from '../../controllers/user/authController.js';
import { protect } from '../../middlewares/authMiddleware.js';
import generateToken from '../../utils/generateToken.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);
router.post('/resend-otp', resendUserOtp);
router.post('/login', loginUser);
router.post('/forgot-password', forgotUserPassword);
router.post('/reset-password', resetUserPassword);
router.get('/me', protect, getUserMe);
router.post('/logout', logoutUser);

// Google SSO
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=sso_failed`,
  }),
  (req, res) => {
    generateToken(res, req.user._id, req.user.role, true);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/`);
  }
);

// Facebook SSO
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=sso_failed`,
  }),
  (req, res) => {
    generateToken(res, req.user._id, req.user.role, true);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/`);
  }
);

export default router;