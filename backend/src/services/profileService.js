import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Address from '../models/Address.js';
import Otp from '../models/Otp.js';
import ApiError from '../utils/ApiError.js';
import { syncProfileImage } from './s3Service.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { revokeAllUserTokens } from './tokenService.js';
import { normalizeEmail, validateEmailAddress } from '../validators/authValidator.js';

const CURRENT_EMAIL_WINDOW_MS = 15 * 60 * 1000;

// Profile read & update
export const fetchUserProfile = async (userId) => {
  const [user, addresses] = await Promise.all([
    User.findById(userId).select('-passwordHash').lean(),
    Address.find({ userId, status: 'active' })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean(),
  ]);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return { user, addresses };
};

export const updateProfileDetails = async ({ userId, name, phone, file, removeProfileImage }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (name && name.trim()) {
    user.name = name.trim();
  }
  if (phone !== undefined) {
    user.phone = phone.trim();
  }

  user.profileImage = await syncProfileImage({
    currentImageUrl: user.profileImage,
    file,
    removeImage: removeProfileImage === 'true' || removeProfileImage === true,
    folder: 'profiles',
  });

  await user.save();
  return user;
};

// Two-step email change (current email OTP -> new email OTP)
const assertCurrentEmailVerified = async (userId, currentEmail) => {
  const verifiedRecord = await Otp.findOne({
    userId,
    email: currentEmail,
    purpose: 'current_email_verify',
    verifiedAt: { $ne: null },
    expiresAt: { $gt: new Date() },
  })
    .select('_id')
    .lean();

  if (!verifiedRecord) {
    throw new ApiError(403, 'Please verify your current registered email with OTP first');
  }
};

export const requestCurrentEmailVerification = async ({ userId, currentEmail, enteredEmail }) => {
  const cleanEnteredEmail = normalizeEmail(enteredEmail);
  if (cleanEnteredEmail !== currentEmail) {
    throw new ApiError(400, 'Entered email does not match your current registered email');
  }

  await Otp.deleteMany({ userId, purpose: 'current_email_verify' });

  const { expiresAt } = await createAndSendOtp({
    email: currentEmail,
    purpose: 'current_email_verify',
    userId,
  });

  return { email: currentEmail, expiresAt };
};

export const confirmCurrentEmailVerification = async ({ userId, currentEmail, enteredEmail, otp }) => {
  const cleanEnteredEmail = normalizeEmail(enteredEmail);
  if (cleanEnteredEmail !== currentEmail) {
    throw new ApiError(400, 'Entered email does not match your current registered email');
  }

  const record = await verifyOtpCode({
    email: currentEmail,
    otp: otp.trim(),
    purpose: 'current_email_verify',
  });

  // Keep this verified authorization alive long enough to complete Step 2
  record.expiresAt = new Date(Date.now() + CURRENT_EMAIL_WINDOW_MS);
  await record.save();

  return { email: currentEmail, verifiedUntil: record.expiresAt };
};

export const requestUserEmailChange = async ({ userId, currentEmail, newEmail }) => {
  await assertCurrentEmailVerified(userId, currentEmail);

  const cleanNewEmail = validateEmailAddress(newEmail);
  if (cleanNewEmail === currentEmail) {
    throw new ApiError(400, 'Please enter a different email address');
  }

  const emailTaken = await User.findOne({ email: cleanNewEmail }).select('_id').lean();
  if (emailTaken) {
    throw new ApiError(409, 'This email is already in use');
  }

  const { expiresAt } = await createAndSendOtp({
    email: cleanNewEmail,
    purpose: 'email_change',
    userId,
  });

  return { email: cleanNewEmail, expiresAt };
};

export const confirmUserEmailChange = async ({ userId, currentEmail, newEmail, otp }) => {
  await assertCurrentEmailVerified(userId, currentEmail);

  const cleanNewEmail = normalizeEmail(newEmail);
  await verifyOtpCode({ email: cleanNewEmail, otp: otp.trim(), purpose: 'email_change' });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { email: cleanNewEmail } },
    { new: true }
  ).select('-passwordHash');

  await Otp.deleteMany({ userId, purpose: 'current_email_verify' });

  return user;
};

// Password change
export const changeAccountPassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.passwordHash) {
    if (!currentPassword) {
      throw new ApiError(400, 'Current password is required');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new ApiError(401, 'Current password is incorrect');
    }
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordChangedAt = new Date();
  await user.save();
  await revokeAllUserTokens(user._id, 'user');

  return user;
};
