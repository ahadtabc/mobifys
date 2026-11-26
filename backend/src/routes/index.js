import express from 'express';
import adminAuthRoutes from './admin/adminAuthRoutes.js';
import userManagementRoutes from './admin/userManagementRoutes.js';
import userAuthRoutes from './user/authRoutes.js';
import userProfileRoutes from './user/profileRoutes.js';
import userAddressRoutes from './user/addressRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Mobifys API is running' });
});

// Admin APIs
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/users', userManagementRoutes);

// User APIs
router.use('/user/auth', userAuthRoutes);
router.use('/user/profile', userProfileRoutes);
router.use('/user/addresses', userAddressRoutes);

export default router;
