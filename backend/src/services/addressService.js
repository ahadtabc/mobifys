import Address from '../models/Address.js';
import ApiError from '../utils/ApiError.js';

export const listUserAddresses = (userId) =>
  Address.find({ userId, status: 'active' })
    .sort({ isDefault: -1, createdAt: -1 })
    .lean();

export const createUserAddress = async ({
  userId,
  label,
  address,
  street,
  city,
  state,
  pin,
  phone,
  isDefault,
}) => {
  const existingCount = await Address.countDocuments({ userId, status: 'active' });
  const shouldBeDefault = existingCount === 0 ? true : Boolean(isDefault);

  if (shouldBeDefault) {
    await Address.updateMany(
      { userId, status: 'active', isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  return Address.create({
    userId,
    label: label || 'Home',
    address,
    street,
    city,
    state,
    pin,
    phone,
    isDefault: shouldBeDefault,
  });
};

export const updateUserAddress = async ({ userId, addressId, payload }) => {
  const { label, address, street, city, state, pin, phone, isDefault } = payload;
  const addr = await Address.findOne({ _id: addressId, userId, status: 'active' });

  if (!addr) {
    throw new ApiError(404, 'Address not found');
  }

  if (isDefault) {
    await Address.updateMany(
      { userId, status: 'active', isDefault: true },
      { $set: { isDefault: false } }
    );
    addr.isDefault = true;
  }

  if (label !== undefined) addr.label = label;
  if (address !== undefined) addr.address = address;
  if (street !== undefined) addr.street = street;
  if (city !== undefined) addr.city = city;
  if (state !== undefined) addr.state = state;
  if (pin !== undefined) addr.pin = pin;
  if (phone !== undefined) addr.phone = phone;

  await addr.save();
  return addr;
};

export const softDeleteUserAddress = async ({ userId, addressId }) => {
  const addr = await Address.findOne({ _id: addressId, userId, status: 'active' });

  if (!addr) {
    throw new ApiError(404, 'Address not found');
  }

  const wasDefault = addr.isDefault;
  addr.status = 'deleted';
  addr.isDefault = false;
  await addr.save();

  if (wasDefault) {
    await Address.findOneAndUpdate(
      { userId, status: 'active' },
      { $set: { isDefault: true } },
      { sort: { createdAt: -1 } }
    );
  }
};
