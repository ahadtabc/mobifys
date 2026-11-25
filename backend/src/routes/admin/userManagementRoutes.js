import express from 'express';
import {
  getAllUsers,
  getUserById,
  toggleBlockUser,
} from '../../controllers/admin/userManagementController.js';
import { protect, adminOnly } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/toggle-block', toggleBlockUser);

export default router;