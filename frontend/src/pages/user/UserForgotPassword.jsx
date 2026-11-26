import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Mail, Lock, KeyRound, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
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
import './UserForgotPassword.css';

export default function UserForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + Set New Password
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const emailForm = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const resetForm = useForm({
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const dispatchResetCode = async (targetEmail) => {
    const cleanEmail = targetEmail.trim();
    const { data } = await axiosInstance.post('/user/auth/forgot-password', {
      email: cleanEmail,
    });
    toast.success(data.message);
    setVerifiedEmail(cleanEmail);
    setTimer(120);
    setStep(2);
  };

  const onSendCode = async ({ email }) => {
    try {
      await dispatchResetCode(email);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    }
  };

  const handleResendCode = async () => {
    try {
      setResending(true);
      await dispatchResetCode(verifiedEmail);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    } finally {
      setResending(false);
    }
  };

  const onResetSubmit = async ({ otp, newPassword, confirmPassword }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/reset-password', {
        email: verifiedEmail,
        otp,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        {step === 1 ? (
          <form
            onSubmit={emailForm.handleSubmit(onSendCode, toastFirstFormError)}
            className="user-auth-form"
            noValidate
          >
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <KeyRound size={24} />
              </div>
              <h1>Forgot Password?</h1>
              <p>
                Enter your registered email address below. We will dispatch a 6-digit verification
                security code.
              </p>
            </div>

            <div className="field-block">
              <label htmlFor="user-forgot-email">REGISTERED EMAIL ADDRESS</label>
              <div
                className={`field-input-box ${emailForm.formState.errors.email ? 'has-error' : ''}`}
              >
                <Mail className="field-icon-left" size={16} />
                <input
                  id="user-forgot-email"
                  type="email"
                  maxLength={EMAIL_MAX_LENGTH}
                  placeholder="e.g. yourname@domain.com"
                  aria-invalid={Boolean(emailForm.formState.errors.email)}
                  {...emailForm.register('email', emailRules('Registered email address is required'))}
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="field-error-text">{emailForm.formState.errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={emailForm.formState.isSubmitting}
              className="btn-user-submit"
            >
              {emailForm.formState.isSubmitting ? 'Sending...' : 'Send Verification Code'}
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-footer">
              <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
                <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Cancel and return to
                Sign in
              </Link>
            </div>
          </form>
        ) : (
          <form
            onSubmit={resetForm.handleSubmit(onResetSubmit, toastFirstFormError)}
            className="user-auth-form"
            noValidate
          >
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <Lock size={24} />
              </div>
              <h1>Set New Password</h1>
              <p>
                Enter the 6-digit code sent to <strong>{verifiedEmail}</strong> and choose a new
                password.
              </p>
            </div>

            <div className="field-block">
              <label>6-DIGIT VERIFICATION CODE</label>
              <Controller
                name="otp"
                control={resetForm.control}
                rules={otpRules()}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={resetForm.formState.isSubmitting}
                  />
                )}
              />
              {resetForm.formState.errors.otp && (
                <p className="field-error-text" style={{ textAlign: 'center' }}>
                  {resetForm.formState.errors.otp.message}
                </p>
              )}
              <div className="otp-resend-line" style={{ marginTop: '8px' }}>
                {timer > 0 ? (
                  <span>
                    Resend code in {Math.floor(timer / 60)}:
                    {String(timer % 60).padStart(2, '0')}
                  </span>
                ) : (
                  <button type="button" onClick={handleResendCode} disabled={resending}>
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>
            </div>

            <div className="field-block">
              <label htmlFor="user-reset-password">NEW PASSWORD</label>
              <div
                className={`field-input-box ${
                  resetForm.formState.errors.newPassword ? 'has-error' : ''
                }`}
              >
                <Lock className="field-icon-left" size={16} />
                <input
                  id="user-reset-password"
                  type={showNewPassword ? 'text' : 'password'}
                  maxLength={PASSWORD_MAX_LENGTH}
                  placeholder="Minimum 8 characters"
                  aria-invalid={Boolean(resetForm.formState.errors.newPassword)}
                  {...resetForm.register('newPassword', {
                    ...minLengthPasswordRules('New password is required'),
                    onChange: () => {
                      if (resetForm.getValues('confirmPassword')) {
                        void resetForm.trigger('confirmPassword');
                      }
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="eye-btn"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {resetForm.formState.errors.newPassword && (
                <p className="field-error-text">{resetForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className="field-block">
              <label htmlFor="user-reset-confirm">CONFIRM NEW PASSWORD</label>
              <div
                className={`field-input-box ${
                  resetForm.formState.errors.confirmPassword ? 'has-error' : ''
                }`}
              >
                <Lock className="field-icon-left" size={16} />
                <input
                  id="user-reset-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  maxLength={PASSWORD_MAX_LENGTH}
                  placeholder="Re-enter new password"
                  aria-invalid={Boolean(resetForm.formState.errors.confirmPassword)}
                  {...resetForm.register(
                    'confirmPassword',
                    confirmPasswordRules(
                      () => resetForm.getValues('newPassword'),
                      'Please confirm your new password'
                    )
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="eye-btn"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {resetForm.formState.errors.confirmPassword && (
                <p className="field-error-text">
                  {resetForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={resetForm.formState.isSubmitting}
              className="btn-user-submit"
            >
              {resetForm.formState.isSubmitting ? 'Updating...' : 'Update Password & Continue'}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
