import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  requestEmailChangeOtp,
  verifyEmailChange,
  changeUserPassword,
} from '../../controllers/user/profileController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';
import upload from '../../middlewares/uploadMiddleware.js';

const router = express.Router();

router.use(protectUser);

router.get('/', getUserProfile);
router.put('/', upload.single('profileImage'), updateUserProfile);
router.post('/request-email-change', requestEmailChangeOtp);
router.post('/verify-email-change', verifyEmailChange);
router.put('/change-password', changeUserPassword);

export default router;