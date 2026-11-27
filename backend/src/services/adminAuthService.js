import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { syncProfileImage } from './s3Service.js';
import { revokeAllUserTokens } from './tokenService.js';
import {
  normalizeEmail,
  validateFullName,
  validateIndianPhone,
} from '../validators/authValidator.js';

const ADMIN_ROLES = ['admin'];

export const authenticateAdmin = async ({ email, password }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  });

  if (!admin || !admin.passwordHash) {
    throw new ApiError(401, 'Invalid admin credentials');
  }

  if (admin.status === 'blocked') {
    throw new ApiError(403, 'This admin account is disabled');
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid admin credentials');
  }

  return admin;
};

export const sendAdminForgotPasswordOtp = async ({ email }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  })
    .select('_id email')
    .lean();

  if (!admin) {
    throw new ApiError(404, 'Administrator account not found');
  }

  const { expiresAt } = await createAndSendOtp({
    identifier: admin.email,
    purpose: 'admin_reset',
    userId: admin._id,
  });

  return { email: admin.email, expiresAt };
};

export const verifyAdminResetOtp = async ({ email, otp }) => {
  await verifyOtpCode({
    identifier: normalizeEmail(email),
    otp: otp.trim(),
    purpose: 'admin_reset',
  });
};

export const resetAdminAccountPassword = async ({ email, newPassword }) => {
  const admin = await User.findOne({
    email: normalizeEmail(email),
    role: { $in: ADMIN_ROLES },
  });

  if (!admin) {
    throw new ApiError(404, 'Administrator not found');
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.mustChangePassword = false;
  admin.passwordChangedAt = new Date();
  await admin.save();
  await revokeAllUserTokens(admin._id, 'admin');

  return admin.email;
};

export const updateAdminAccountPassword = async ({ adminId, currentPassword, newPassword }) => {
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, 'Administrator not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Current admin password is incorrect');
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.mustChangePassword = false;
  admin.passwordChangedAt = new Date();
  await admin.save();
  await revokeAllUserTokens(admin._id, 'admin');

  return admin;
};

export const updateAdminAccountProfile = async ({
  adminId,
  name,
  phone,
  file,
  removeProfileImage,
}) => {
  const admin = await User.findById(adminId);
  if (!admin || !ADMIN_ROLES.includes(admin.role)) {
    throw new ApiError(404, 'Administrator not found');
  }

  admin.name = validateFullName(name);
  if (phone !== undefined) {
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    admin.phone = trimmedPhone ? validateIndianPhone(trimmedPhone) : '';
  }

  admin.profileImage = await syncProfileImage({
    currentImageUrl: admin.profileImage,
    file,
    removeImage: removeProfileImage === 'true' || removeProfileImage === true,
    folder: 'profiles',
  });

  await admin.save();
  return admin;
};
