import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { createAndSendOtp, verifyOtpCode } from './otpService.js';
import { revokeAllUserTokens } from './tokenService.js';
import { normalizeEmail } from '../validators/authValidator.js';

export const signupUserAccount = async ({ name, email, phone, password }) => {
  const cleanEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: cleanEmail });

  if (existingUser && existingUser.status === 'active') {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let user;

  if (existingUser && existingUser.status === 'unverified') {
    existingUser.name = name.trim();
    existingUser.phone = phone?.trim() || '';
    existingUser.passwordHash = passwordHash;
    user = await existingUser.save();
  } else {
    user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone?.trim() || '',
      passwordHash,
      role: 'user',
      status: 'unverified',
    });
  }

  const { expiresAt } = await createAndSendOtp({
    identifier: cleanEmail,
    purpose: 'signup',
    userId: user._id,
  });

  return { email: cleanEmail, expiresAt };
};

export const verifyUserSignupOtp = async ({ email, otp }) => {
  const cleanEmail = normalizeEmail(email);
  await verifyOtpCode({ identifier: cleanEmail, otp: otp.trim(), purpose: 'signup' });

  const user = await User.findOne({ email: cleanEmail });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.status = 'active';
  await user.save();
  return user;
};

export const resendUserOtpCode = async ({ email, purpose }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' }).select('_id').lean();
  if (!user) {
    throw new ApiError(404, 'Account not found');
  }

  const { expiresAt } = await createAndSendOtp({
    identifier: cleanEmail,
    purpose,
    userId: user._id,
  });

  return { expiresAt };
};

export const authenticateUser = async ({ email, password }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (user.isBlocked) {
    throw new ApiError(403, 'Your account has been blocked by Admin. Contact support.');
  }

  if (user.status === 'unverified') {
    throw new ApiError(403, 'Please verify your email via OTP before signing in.', {
      needsVerification: true,
    });
  }

  if (!user.passwordHash) {
    throw new ApiError(400, 'This account uses Google Sign-In. Please continue with Google.');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return user;
};

export const sendUserForgotPasswordOtp = async ({ email }) => {
  const cleanEmail = normalizeEmail(email);
  const user = await User.findOne({ email: cleanEmail, role: 'user' }).select('_id').lean();
  if (!user) {
    throw new ApiError(404, 'No account found with this email');
  }

  const { expiresAt } = await createAndSendOtp({
    identifier: cleanEmail,
    purpose: 'forgot_password',
    userId: user._id,
  });

  return { email: cleanEmail, expiresAt };
};

export const resetUserPasswordWithOtp = async ({ email, otp, newPassword }) => {
  const cleanEmail = normalizeEmail(email);
  await verifyOtpCode({ identifier: cleanEmail, otp: otp.trim(), purpose: 'forgot_password' });

  const user = await User.findOne({ email: cleanEmail, role: 'user' });
  if (!user) {
    throw new ApiError(404, 'No account found with this email');
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordChangedAt = new Date();
  await user.save();
  await revokeAllUserTokens(user._id, 'user');
};
