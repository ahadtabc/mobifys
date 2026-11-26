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
  verifyAdminResetOtp,
} from '../../services/adminAuthService.js';

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

export const getAdminMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.user,
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
