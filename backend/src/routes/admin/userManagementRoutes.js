import express from 'express';
import {
  getAllUsers,
  getUserById,
  toggleBlockUser,
} from '../../controllers/admin/userManagementController.js';
import { protectAdmin, adminOnly } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin, adminOnly);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id/toggle-block', toggleBlockUser);

export default router;