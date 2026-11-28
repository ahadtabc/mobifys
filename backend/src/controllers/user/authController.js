import asyncHandler from '../../utils/asyncHandler.js';
import { sanitizeUser } from '../../utils/serializers.js';
import {
  requireFields,
  validateEmailAddress,
  validateFullName,
  validateIndianPhone,
  validatePasswordPair,
  validateStrongPassword,
} from '../../validators/authValidator.js';
import issueAuthTokens, {
  revokeSessionToken,
  rotateRefreshToken,
} from '../../services/tokenService.js';
import {
  authenticateUser,
  resendUserOtpCode,
  resetUserPasswordWithOtp,
  sendUserForgotPasswordOtp,
  signupUserAccount,
  verifyUserForgotPasswordOtp,
  verifyUserSignupOtp,
} from '../../services/userAuthService.js';

export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  requireFields([name, email, phone, password, confirmPassword]);

  const cleanName = validateFullName(name);
  const cleanEmail = validateEmailAddress(email);
  const formattedPhone = validateIndianPhone(phone);
  validateStrongPassword(password, confirmPassword);

  const { email: registeredEmail, expiresAt } = await signupUserAccount({
    name: cleanName,
    email: cleanEmail,
    phone: formattedPhone,
    password,
  });

  res.status(200).json({
    success: true,
    message: `Verification OTP sent to ${registeredEmail}`,
    email: registeredEmail,
    expiresAt,
  });
});

export const verifySignupOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and OTP are required');

  const user = await verifyUserSignupOtp({ email, otp });
  await issueAuthTokens({ req, res, user, keepSignedIn: false });

  res.status(200).json({
    success: true,
    message: 'Account verified successfully!',
    user: sanitizeUser(user),
  });
});

export const resendUserOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;
  requireFields([email, purpose], 'Email and OTP purpose are required');

  const { expiresAt } = await resendUserOtpCode({ email, purpose });

  res.status(200).json({
    success: true,
    message: 'A new 6-digit OTP has been sent to your email',
    expiresAt,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;
  requireFields([email, password], 'Email and password are required');

  const user = await authenticateUser({ email, password });
  await issueAuthTokens({ req, res, user, keepSignedIn: Boolean(rememberMe) });

  res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    user: sanitizeUser(user),
  });
});

export const forgotUserPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  requireFields([email], 'Email address is required');

  const { email: cleanEmail, expiresAt } = await sendUserForgotPasswordOtp({ email });

  res.status(200).json({
    success: true,
    message: `Password reset OTP sent to ${cleanEmail}`,
    email: cleanEmail,
    expiresAt,
  });
});

export const verifyForgotPasswordOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  requireFields([email, otp], 'Email and 6-digit OTP are required');

  const { email: cleanEmail, verifiedUntil } = await verifyUserForgotPasswordOtp({ email, otp });

  res.status(200).json({
    success: true,
    message: 'OTP verified. You can now set a new password.',
    email: cleanEmail,
    verifiedUntil,
  });
});

export const resetUserPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  requireFields([email, newPassword, confirmPassword], 'All fields are required');
  validatePasswordPair(newPassword, confirmPassword);

  await resetUserPasswordWithOtp({ email, newPassword });

  res.status(200).json({
    success: true,
    message: 'Password reset successful! You can now sign in.',
  });
});

export const getUserMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const refreshUserToken = asyncHandler(async (req, res) => {
  const result = await rotateRefreshToken({ req, res, scope: 'user' });
  if (!result.ok) {
    return res.status(result.status).json({
      success: false,
      ...(result.code ? { code: result.code } : {}),
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Session refreshed',
    user: sanitizeUser(result.user),
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  await revokeSessionToken(req, res, 'user');
  res.status(200).json({ success: true, message: 'Signed out successfully' });
});
