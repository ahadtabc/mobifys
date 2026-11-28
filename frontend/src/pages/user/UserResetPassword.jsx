import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import {
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  minLengthPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const otpVerified = Boolean(location.state?.otpVerified);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!email || !otpVerified) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, otpVerified, navigate]);

  const onResetSubmit = async ({ newPassword, confirmPassword }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  if (!email || !otpVerified) {
    return null;
  }

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onResetSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <Lock size={24} />
            </div>
            <h1>Set New Password</h1>
            <p>
              OTP verified for <strong>{email}</strong>. Create a new password for your account.
            </p>
          </div>

          <div className="field-block">
            <label htmlFor="user-reset-password">NEW PASSWORD</label>
            <div className={`field-input-box ${errors.newPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="user-reset-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
                aria-invalid={Boolean(errors.newPassword)}
                {...register('newPassword', {
                  ...minLengthPasswordRules('New password is required'),
                  onChange: () => {
                    if (getValues('confirmPassword')) {
                      void trigger('confirmPassword');
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
            {errors.newPassword && <p className="field-error-text">{errors.newPassword.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="user-reset-confirm">CONFIRM NEW PASSWORD</label>
            <div className={`field-input-box ${errors.confirmPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="user-reset-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register(
                  'confirmPassword',
                  confirmPasswordRules(
                    () => getValues('newPassword'),
                    'Please confirm your new password'
                  )
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="eye-btn"
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Updating...' : 'Update Password & Continue'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
