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
  refreshUserToken,
  logoutUser,
} from '../../controllers/user/authController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';
import issueAuthTokens from '../../services/tokenService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { env } from '../../config/env.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/verify-signup-otp', verifySignupOtp);
router.post('/resend-otp', resendUserOtp);
router.post('/login', loginUser);
router.post('/refresh', refreshUserToken);
router.post('/forgot-password', forgotUserPassword);
router.post('/reset-password', resetUserPassword);
router.get('/me', protectUser, getUserMe);
router.post('/logout', logoutUser);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.clientUrl}/login?error=sso_failed`,
  }),
  asyncHandler(async (req, res) => {
    await issueAuthTokens({ req, res, user: req.user, keepSignedIn: true });
    res.redirect(`${env.clientUrl}/`);
  })
);

export default router;
