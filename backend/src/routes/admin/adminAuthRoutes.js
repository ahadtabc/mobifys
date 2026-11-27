import express from 'express';
import {
  adminLogin,
  adminForgotPassword,
  verifyAdminOtp,
  resetAdminPassword,
  updateAdminPassword,
  updateAdminProfile,
  requestAdminCurrentEmailOtp,
  verifyAdminCurrentEmail,
  requestAdminEmailChangeOtp,
  verifyAdminEmailChange,
  getAdminMe,
  refreshAdminToken,
  adminLogout,
} from '../../controllers/admin/adminAuthController.js';
import { protectAdmin, adminOnly } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/refresh', refreshAdminToken);
router.post('/forgot-password', adminForgotPassword);
router.post('/verify-otp', verifyAdminOtp);
router.post('/reset-password', resetAdminPassword);
router.put('/profile', protectAdmin, adminOnly, upload.single('profileImage'), updateAdminProfile);
router.post('/profile/request-current-email-otp', protectAdmin, adminOnly, requestAdminCurrentEmailOtp);
router.post('/profile/verify-current-email', protectAdmin, adminOnly, verifyAdminCurrentEmail);
router.post('/profile/request-email-change', protectAdmin, adminOnly, requestAdminEmailChangeOtp);
router.post('/profile/verify-email-change', protectAdmin, adminOnly, verifyAdminEmailChange);
router.put('/update-password', protectAdmin, adminOnly, updateAdminPassword);
router.get('/me', protectAdmin, adminOnly, getAdminMe);
router.post('/logout', adminLogout);

export default router;
