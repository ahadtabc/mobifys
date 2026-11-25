import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import Address from '../../models/Address.js';
import { uploadToS3, deleteFromS3 } from '../../services/s3Service.js';
import { createAndSendOtp, verifyOtpCode } from '../../services/otpService.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    const addresses = await Address.find({ userId: req.user._id, status: 'active' }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (name && name.trim()) {
      user.name = name.trim();
    }
    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (req.file) {
      const oldImageUrl = user.profileImage;
      const newImageUrl = await uploadToS3(req.file, 'profiles');
      user.profileImage = newImageUrl;

      if (oldImageUrl) {
        await deleteFromS3(oldImageUrl).catch(() => {});
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
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

export const requestEmailChangeOtp = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    if (!newEmail) {
      return res.status(400).json({ success: false, message: 'New email address is required' });
    }

    const cleanNewEmail = newEmail.toLowerCase().trim();
    if (cleanNewEmail === req.user.email) {
      return res.status(400).json({ success: false, message: 'Please enter a different email address' });
    }

    const emailTaken = await User.findOne({ email: cleanNewEmail });
    if (emailTaken) {
      return res.status(409).json({ success: false, message: 'This email is already in use' });
    }

    const { expiresAt } = await createAndSendOtp({
      identifier: cleanNewEmail,
      purpose: 'email_change',
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: `Verification OTP sent to ${cleanNewEmail}`,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailChange = async (req, res, next) => {
  try {
    const { newEmail, otp } = req.body;
    if (!newEmail || !otp) {
      return res.status(400).json({ success: false, message: 'New email and OTP are required' });
    }

    const cleanNewEmail = newEmail.toLowerCase().trim();
    await verifyOtpCode({ identifier: cleanNewEmail, otp: otp.trim(), purpose: 'email_change' });

    const user = await User.findById(req.user._id);
    user.email = cleanNewEmail;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email address updated and verified!',
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const changeUserPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'New password fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const user = await User.findById(req.user._id);

    if (user.passwordHash) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};