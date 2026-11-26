const OTP_TITLES = {
  signup: 'Verify Your Mobifys Account',
  forgot_password: 'Reset Your Mobifys Password',
  email_change: 'Confirm Your New Email Address',
  current_email_verify: 'Verify Your Current Mobifys Email',
  admin_reset: 'Mobifys Admin Password Recovery Code',
};

export const buildOtpEmail = (otp, purpose) => {
  const subject = OTP_TITLES[purpose] || 'Your Mobifys Verification Code';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
      <h2 style="color: #111; margin-bottom: 8px;">mobifys.</h2>
      <p style="color: #555; font-size: 14px;">${subject}</p>
      <div style="background: #FFF3ED; border: 1px solid #FF5722; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
        <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #FF5722;">${otp}</span>
      </div>
      <p style="color: #777; font-size: 12px;">This code expires in 2 minutes. Do not share this code with anyone.</p>
    </div>
  `;

  return { subject, html };
};
