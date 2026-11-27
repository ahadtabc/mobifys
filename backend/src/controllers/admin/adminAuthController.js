import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeAdmin } from '../../utils/serializers.js';
import { requireFields, validatePasswordPair } from '../../validators/authValidator.js';
import issueAuthTokens, {
  revokeSessionToken,
  rotateRefreshToken,
} from '../../services/tokenService.js';
import {
  authenticateAdmin,
  resetAdminAccountPassword,
  sendAdminForgotPasswordOtp,
  updateAdminAccountPassword,
  updateAdminAccountProfile,
  verifyAdminResetOtp,
} from '../../services/adminAuthService.js';
import {
  confirmCurrentEmailVerification,
  confirmUserEmailChange,
  requestCurrentEmailVerification,
  requestUserEmailChange,
} from '../../services/profileService.js';

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password, keepSignedIn } = req.body;
  requireFields([email, password], 'Email and password are required');

  const admin = await authenticateAdmin({ email, password });
  await issueAuthTokens({ req, res, user: admin, keepSignedIn: Boolean(keepSignedIn) });

  res.status(200).json({
    success: true,
    message: 'Signed in to Admin Console',
    mustChangePassword: admin.mustChangePassword,
    admin: sanitizeAdmin(admin),
  });
});

export const adminForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  requireFields([email], 'Work email address is required');

  const { email: adminEmail, expiresAt } = await sendAdminForgotPasswordOtp({ email });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${adminEmail}`,
    expiresAt,
  });
});

export const verifyAdminOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and 6-digit OTP are required');

  await verifyAdminResetOtp({ email, otp });

  res.status(200).json({
    success: true,
    message: 'Admin OTP verified. You may now set a new password.',
  });
});

export const resetAdminPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  requireFields([email, newPassword, confirmPassword], 'All fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const account = await resetAdminAccountPassword({ email, newPassword });

  res.status(200).json({
    success: true,
    message: 'Admin password updated successfully',
    account,
  });
});

export const updateAdminPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  requireFields([currentPassword, newPassword, confirmPassword], 'All password fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  const admin = await updateAdminAccountPassword({
    adminId: req.user._id,
    currentPassword,
    newPassword,
  });
  await issueAuthTokens({ req, res, user: admin, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Admin password updated successfully',
  });
});

export const updateAdminProfile = asyncHandler(async (req, res) => {
  const { name, phone, removeProfileImage } = req.body;
  const admin = await updateAdminAccountProfile({
    adminId: req.user._id,
    name,
    phone,
    file: req.file,
    removeProfileImage,
  });

  res.status(200).json({
    success: true,
    message: 'Admin profile updated successfully',
    admin: sanitizeAdmin(admin),
  });
});

export const requestAdminCurrentEmailOtp = asyncHandler(async (req, res) => {
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

export const verifyAdminCurrentEmail = asyncHandler(async (req, res) => {
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

export const requestAdminEmailChangeOtp = asyncHandler(async (req, res) => {
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

export const verifyAdminEmailChange = asyncHandler(async (req, res) => {
  const { newEmail, otp } = req.body;
  requireFields([newEmail, otp], 'New email and OTP are required');

  const admin = await confirmUserEmailChange({
    userId: req.user._id,
    currentEmail: req.user.email,
    newEmail,
    otp,
  });

  res.status(200).json({
    success: true,
    message: 'Email address updated and verified!',
    email: admin.email,
    admin: sanitizeAdmin(admin),
  });
});

export const getAdminMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: sanitizeAdmin(req.user),
  });
});

export const refreshAdminToken = asyncHandler(async (req, res) => {
  const result = await rotateRefreshToken({ req, res, scope: 'admin' });
  if (!result.ok) {
    return res.status(result.status).json({ success: false, message: result.message });
  }

  res.status(200).json({
    success: true,
    message: 'Admin session refreshed',
    admin: sanitizeAdmin(result.user),
  });
});

export const adminLogout = asyncHandler(async (req, res) => {
  await revokeSessionToken(req, res, 'admin');
  res.status(200).json({ success: true, message: 'Logged out from Admin Console' });
});
