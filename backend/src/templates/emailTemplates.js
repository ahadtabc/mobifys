const OTP_TITLES = {
  signup: 'Verify Your Mobifys Account',
  forgot_password: 'Reset Your Mobifys Password',
  email_change: 'Confirm Your New Email Address',
  current_email_verify: 'Verify Your Current Mobifys Email',
  admin_reset: 'Mobifys Admin Password Recovery Code',
};

export const buildOtpEmail = (otp, purpose) => {
  const subject = OTP_TITLES[purpose] || 'Your Mobifys Verification Code';
  const otpDigits = String(otp ?? '')
    .trim()
    .slice(0, 6)
    .split('');

  const digitBoxesHtml = otpDigits
    .map(
      (digit) => `
          <td style="padding: 0 4px;">
            <div style="width: 42px; height: 48px; line-height: 48px; background: #FFF3ED; border: 1px solid #FF5722; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; color: #FF5722;">
              ${digit}
            </div>
          </td>`
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 12px;">
      <h2 style="color: #111; margin-bottom: 8px;">mobifys.</h2>
      <p style="color: #555; font-size: 14px;">${subject}</p>
      <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin: 20px auto; border-collapse: collapse;">
        <tr>${digitBoxesHtml}
        </tr>
      </table>
      <p style="color: #777; font-size: 12px;">This code expires in 2 minutes. Do not share this code with anyone.</p>
    </div>
  `;

  return { subject, html };
};
