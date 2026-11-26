import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import mobifysLogo from '../../assets/mobifys-logo.png';
import OtpInput from '../../components/OtpInput';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  minLengthPasswordRules,
  otpRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './AdminForgotPassword.css';

export default function AdminForgotPassword() {
  const [step, setStep] = useState(1);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const otpForm = useForm({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const passwordForm = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedOtp = useWatch({ control: otpForm.control, name: 'otp', defaultValue: '' });

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const sendOtpRequest = async (targetEmail) => {
    const cleanEmail = targetEmail.trim();
    const { data } = await axiosInstance.post('/admin/auth/forgot-password', {
      email: cleanEmail,
    });
    toast.success(data.message);
    setVerifiedEmail(cleanEmail);
    setTimer(120);
    setStep(2);
  };

  const onSendOtp = async ({ email }) => {
    try {
      await sendOtpRequest(email);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      await sendOtpRequest(verifiedEmail);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setResending(false);
    }
  };

  const onVerifyOtp = async ({ otp }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/verify-otp', {
        email: verifiedEmail,
        otp,
      });
      toast.success(data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const onResetPassword = async ({ newPassword, confirmPassword }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/reset-password', {
        email: verifiedEmail,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      setStep(4);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="admin-auth-page">
      <header className="admin-auth-header">
        <div className="admin-brand-icon">
          <img src={mobifysLogo} alt="Mobifys" />
        </div>
        <span className="admin-brand-title">
          mobifys<span style={{ color: '#ff5521' }}>.</span>
        </span>
        <span className="admin-brand-subtitle">ADMIN CONSOLE</span>
      </header>

      <main className="admin-auth-main">
        <div className="admin-auth-card">
          {step === 1 && (
            <form
              onSubmit={emailForm.handleSubmit(onSendOtp, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Admin Password Recovery</h1>
                <p>
                  Enter your registered administrator email address to receive a one-time code
                  (OTP).
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="admin-forgot-email">WORK EMAIL ADDRESS</label>
                <div
                  className={`input-wrapper ${emailForm.formState.errors.email ? 'has-error' : ''}`}
                >
                  <Mail className="input-icon-left" size={16} />
                  <input
                    id="admin-forgot-email"
                    type="email"
                    maxLength={EMAIL_MAX_LENGTH}
                    placeholder="admin@mobifys.in"
                    aria-invalid={Boolean(emailForm.formState.errors.email)}
                    {...emailForm.register('email', emailRules('Work email address is required'))}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="field-error-text">{emailForm.formState.errors.email.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={emailForm.formState.isSubmitting}
                className="btn-primary-full"
              >
                {emailForm.formState.isSubmitting ? 'Sending...' : 'Send Verification Code'}
                <ArrowRight size={16} />
              </button>
              <Link to="/admin/login" className="back-login-link">
                <ArrowLeft size={14} /> Back to Admin Login
              </Link>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={otpForm.handleSubmit(onVerifyOtp, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Verify Admin OTP</h1>
                <p>
                  Enter the 6-digit code sent to <strong>{verifiedEmail}</strong>
                </p>
              </div>
              <div>
                <Controller
                  name="otp"
                  control={otpForm.control}
                  rules={otpRules()}
                  render={({ field }) => (
                    <OtpInput
                      value={field.value}
                      onChange={field.onChange}
                      disabled={otpForm.formState.isSubmitting}
                    />
                  )}
                />
                {otpForm.formState.errors.otp && (
                  <p className="field-error-text" style={{ textAlign: 'center' }}>
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <div className="otp-timer-row">
                {timer > 0 ? (
                  <span>
                    Resend OTP in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="resend-otp-btn"
                  >
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={otpForm.formState.isSubmitting || watchedOtp.length !== 6}
                className="btn-primary-full"
              >
                {otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify & Proceed'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 3 && (
            <form
              onSubmit={passwordForm.handleSubmit(onResetPassword, toastFirstFormError)}
              className="admin-auth-form"
              noValidate
            >
              <div className="admin-auth-heading">
                <h1>Set New Admin Password</h1>
                <p>Create a strong password (minimum 8 characters).</p>
              </div>
              <div className="form-group">
                <label htmlFor="admin-reset-password">NEW ADMIN PASSWORD</label>
                <div
                  className={`input-wrapper ${
                    passwordForm.formState.errors.newPassword ? 'has-error' : ''
                  }`}
                >
                  <Lock className="input-icon-left" size={16} />
                  <input
                    id="admin-reset-password"
                    type={showNewPassword ? 'text' : 'password'}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="Minimum 8 characters"
                    aria-invalid={Boolean(passwordForm.formState.errors.newPassword)}
                    {...passwordForm.register('newPassword', {
                      ...minLengthPasswordRules('New password is required'),
                      onChange: () => {
                        if (passwordForm.getValues('confirmPassword')) {
                          void passwordForm.trigger('confirmPassword');
                        }
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="password-toggle-btn"
                    aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordForm.formState.errors.newPassword && (
                  <p className="field-error-text">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="admin-reset-confirm">CONFIRM NEW PASSWORD</label>
                <div
                  className={`input-wrapper ${
                    passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
                  }`}
                >
                  <Lock className="input-icon-left" size={16} />
                  <input
                    id="admin-reset-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    maxLength={PASSWORD_MAX_LENGTH}
                    placeholder="Re-enter new password"
                    aria-invalid={Boolean(passwordForm.formState.errors.confirmPassword)}
                    {...passwordForm.register(
                      'confirmPassword',
                      confirmPasswordRules(
                        () => passwordForm.getValues('newPassword'),
                        'Please confirm your new password'
                      )
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="password-toggle-btn"
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="field-error-text">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="btn-primary-full"
              >
                {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Admin Password'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="success-step-box">
              <div className="success-badge-icon">
                <CheckCircle2 size={26} />
              </div>
              <div className="admin-auth-heading" style={{ marginBottom: 0 }}>
                <h1>Admin Password Updated!</h1>
                <p>
                  Your administrator password has been updated for <strong>{verifiedEmail}</strong>.
                </p>
              </div>
              <Link to="/admin/login" className="btn-primary-full">
                Go to Admin Login Portal <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
