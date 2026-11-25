import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js';
import { createAndSendOtp, verifyOtpCode } from '../../services/otpService.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password, keepSignedIn } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await User.findOne({
      email: email.toLowerCase().trim(),
      role: { $in: ['admin', 'super_admin'] },
    });

    if (!admin || !admin.passwordHash) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    if (admin.isBlocked) {
      return res.status(403).json({ success: false, message: 'This admin account is disabled' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    generateToken(res, admin._id, admin.role, Boolean(keepSignedIn));

    res.status(200).json({
      success: true,
      message: 'Signed in to Admin Console',
      mustChangePassword: admin.mustChangePassword,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Work email address is required' });
    }

    const admin = await User.findOne({
      email: email.toLowerCase().trim(),
      role: { $in: ['admin', 'super_admin'] },
    });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Administrator account not found' });
    }

    const { expiresAt } = await createAndSendOtp({
      identifier: admin.email,
      purpose: 'admin_reset',
      userId: admin._id,
    });

    res.status(200).json({
      success: true,
      message: `Verification OTP sent to ${admin.email}`,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyAdminOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit OTP are required' });
    }

    await verifyOtpCode({
      identifier: email.toLowerCase().trim(),
      otp: otp.trim(),
      purpose: 'admin_reset',
    });

    res.status(200).json({
      success: true,
      message: 'Admin OTP verified. You may now set a new password.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetAdminPassword = async (req, res, next) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const admin = await User.findOne({
      email: email.toLowerCase().trim(),
      role: { $in: ['admin', 'super_admin'] },
    });

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Administrator not found' });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    admin.mustChangePassword = false;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin password updated successfully',
      account: admin.email,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All password fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    const admin = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current admin password is incorrect' });
    }

    admin.passwordHash = await bcrypt.hash(newPassword, 10);
    admin.mustChangePassword = false;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.user,
  });
};

export const adminLogout = (req, res) => {
  res.clearCookie('mobifys_token');
  res.status(200).json({ success: true, message: 'Logged out from Admin Console' });
};