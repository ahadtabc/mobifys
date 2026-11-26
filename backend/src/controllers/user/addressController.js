import asyncHandler from '../../utils/asyncHandler.js';
import { validateObjectId } from '../../validators/authValidator.js';
import { validateAddressPayload } from '../../validators/addressValidator.js';
import {
  createUserAddress,
  listUserAddresses,
  softDeleteUserAddress,
  updateUserAddress,
} from '../../services/addressService.js';

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await listUserAddresses(req.user._id);
  res.status(200).json({ success: true, addresses });
});

export const addAddress = asyncHandler(async (req, res) => {
  const validated = validateAddressPayload(req.body, { partial: false });

  const newAddress = await createUserAddress({
    userId: req.user._id,
    ...validated,
  });

  res.status(201).json({
    success: true,
    message: 'Address added successfully',
    address: newAddress,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Address');
  const validated = validateAddressPayload(req.body, { partial: true });

  const addr = await updateUserAddress({
    userId: req.user._id,
    addressId: req.params.id,
    payload: validated,
  });

  res.status(200).json({
    success: true,
    message: 'Address updated successfully',
    address: addr,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id, 'Address');
  await softDeleteUserAddress({
    userId: req.user._id,
    addressId: req.params.id,
  });

  res.status(200).json({
    success: true,
    message: 'Address deleted successfully',
  });
});
