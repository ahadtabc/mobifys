import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Otp from '../models/Otp.js';
import { sendOtpEmail } from './emailService.js';

export const createAndSendOtp = async ({ identifier, purpose, userId = null }) => {
  await Otp.deleteMany({ identifier, purpose, verifiedAt: null });

  const plainOtp = crypto.randomInt(100000, 999999).toString();
  const otpHash = await bcrypt.hash(plainOtp, 10);
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  await Otp.create({
    userId,
    identifier,
    otpHash,
    purpose,
    expiresAt,
  });

  await sendOtpEmail(identifier, plainOtp, purpose);
  return { expiresAt };
};

export const verifyOtpCode = async ({ identifier, otp, purpose }) => {
  const record = await Otp.findOne({ identifier, purpose, verifiedAt: null }).sort({
    createdAt: -1,
  });

  if (!record) {
    throw new Error('OTP not found or already used. Please request a new code.');
  }

  if (record.expiresAt < new Date()) {
    throw new Error('OTP has expired. Please click Resend OTP.');
  }

  if (record.attempts >= 5) {
    throw new Error('Too many failed attempts. Please request a new OTP.');
  }

  const isMatch = await bcrypt.compare(otp, record.otpHash);
  if (!isMatch) {
    record.attempts += 1;
    await record.save();
    throw new Error('Invalid OTP code. Please try again.');
  }

  record.verifiedAt = new Date();
  await record.save();

  return record;
};