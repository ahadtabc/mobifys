import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeUser } from '../../utils/serializers.js';
import { requireFields, validatePasswordPair } from '../../validators/authValidator.js';
import issueAuthTokens from '../../services/tokenService.js';
import {
  changeAccountPassword,
  confirmCurrentEmailVerification,
  confirmUserEmailChange,
  fetchUserProfile,
  requestCurrentEmailVerification,
  requestUserEmailChange,
  updateProfileDetails,
} from '../../services/profileService.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const { user, addresses } = await fetchUserProfile(req.user._id);
  res.status(200).json({ success: true, user, addresses });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone, removeProfileImage } = req.body;
  const user = await updateProfileDetails({
    userId: req.user._id,
    name,
    phone,
    file: req.file,
    removeProfileImage,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: sanitizeUser(user),
  });
});

export const requestCurrentEmailOtp = asyncHandler(async (req, res) => {
  const { currentEmail } = req.body;
  requireFields([currentEmail], 'Current registered email address is required');

  const { email, expiresAt } = await requestCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyCurrentEmail = asyncHandler(async (req, res) => {
  const { currentEmail, otp } = req.body;
  requireFields([currentEmail, otp], 'Current email and 6-digit OTP are required');

  const { verifiedUntil } = await confirmCurrentEmailVerification({
    userId: req.user._id,
    currentEmail: req.user.email,
    enteredEmail: currentEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Current email verified! You can now enter your new email address.',
    verifiedUntil,
  });
});

export const requestEmailChangeOtp = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  requireFields([newEmail], 'New email address is required');

  const { email, expiresAt } = await requestUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${email}`,
    expiresAt,
  });
});

export const verifyEmailChange = asyncHandler(async (req, res) => {
  const { newEmail, otp } = req.body;
  requireFields([newEmail, otp], 'New email and OTP are required');

  const user = await confirmUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Email address updated and verified!',
    email: user.email,
    user: sanitizeUser(user),
  });
});

export const changeUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  requireFields([newPassword, confirmPassword], 'New password fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const user = await changeAccountPassword({
    userId: req.user._id,
    currentPassword,
    newPassword,
  });
  await issueAuthTokens({ req, res, user, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});
