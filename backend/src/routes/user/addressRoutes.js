import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../../controllers/user/addressController.js';
import { protectUser } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protectUser);

router.get('/', getAddresses);
router.post('/', addAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;