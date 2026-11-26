import express from 'express';
import {
  adminLogin,
  adminForgotPassword,
  verifyAdminOtp,
  resetAdminPassword,
  updateAdminPassword,
  getAdminMe,
  adminLogout,
} from '../../controllers/admin/adminAuthController.js';
import { protectAdmin, adminOnly } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/forgot-password', adminForgotPassword);
router.post('/verify-otp', verifyAdminOtp);
router.post('/reset-password', resetAdminPassword);
router.put('/update-password', protectAdmin, adminOnly, updateAdminPassword);
router.get('/me', protectAdmin, adminOnly, getAdminMe);
router.post('/logout', adminLogout);

export default router;