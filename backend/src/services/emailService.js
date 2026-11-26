import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { buildOtpEmail } from '../templates/emailTemplates.js';

let cachedTransporter = null;

const getTransporter = () => {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.email.user,
        pass: env.email.pass,
      },
    });
  }
  return cachedTransporter;
};

export const sendOtpEmail = async (toEmail, otp, purpose) => {
  const { subject, html } = buildOtpEmail(otp, purpose);

  // Local dev fallback if Gmail credentials are not configured
  if (!env.email.user || !env.email.pass || env.email.user === 'your_email@gmail.com') {
    console.log(`\n========================================`);
    console.log(`[DEV OTP] To: ${toEmail} | Purpose: ${purpose}`);
    console.log(`[DEV OTP] 6-Digit Code: ${otp}`);
    console.log(`========================================\n`);
    return;
  }

  await getTransporter().sendMail({
    from: `"Mobifys" <${env.email.user}>`,
    to: toEmail,
    subject,
    html,
  });
};
