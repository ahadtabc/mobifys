import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js';
import { createAndSendOtp, verifyOtpCode } from '../../services/otpService.js';

export const signupUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser && existingUser.status === 'active') {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
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

    res.status(200).json({
      success: true,
      message: `Verification OTP sent to ${cleanEmail}`,
      email: cleanEmail,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const verifySignupOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    await verifyOtpCode({ identifier: cleanEmail, otp: otp.trim(), purpose: 'signup' });

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.status = 'active';
    await user.save();

    generateToken(res, user._id, user.role, false);

    res.status(200).json({
      success: true,
      message: 'Account verified successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        walletBalance: user.walletBalance,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resendUserOtp = async (req, res, next) => {
  try {
    const { email, purpose } = req.body;
    if (!email || !purpose) {
      return res.status(400).json({ success: false, message: 'Email and OTP purpose are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail, role: 'user' });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    const { expiresAt } = await createAndSendOtp({
      identifier: cleanEmail,
      purpose,
      userId: user._id,
    });

    res.status(200).json({
      success: true,
      message: 'A new 6-digit OTP has been sent to your email',
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim(), role: 'user' });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked by Admin. Contact support.',
      });
    }

    if (user.status === 'unverified') {
      return res.status(403).json({
        success: false,
        needsVerification: true,
        message: 'Please verify your email via OTP before signing in.',
      });
    }

    if (!user.passwordHash) {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google Sign-In. Please continue with Google.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    generateToken(res, user._id, user.role, Boolean(rememberMe));

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        walletBalance: user.walletBalance,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail, role: 'user' });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    const { expiresAt } = await createAndSendOtp({
      identifier: cleanEmail,
      purpose: 'forgot_password',
      userId: user._id,
    });

    res.status(200).json({
      success: true,
      message: `Password reset OTP sent to ${cleanEmail}`,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const resetUserPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();
    await verifyOtpCode({ identifier: cleanEmail, otp: otp.trim(), purpose: 'forgot_password' });

    const user = await User.findOne({ email: cleanEmail, role: 'user' });
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now sign in.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie('mobifys_token');
  res.status(200).json({ success: true, message: 'Signed out successfully' });
};