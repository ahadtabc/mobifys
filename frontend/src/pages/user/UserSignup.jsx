import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance, { API_BASE_URL } from '../../api/axiosInstance';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  extractIndianDigits,
  getPasswordChecks,
  indianPhoneRules,
  nameRules,
  normalizeText,
  strongPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './UserSignup.css';

export default function UserSignup() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreed: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedName = useWatch({ control, name: 'name', defaultValue: '' });
  const watchedPassword = useWatch({ control, name: 'password', defaultValue: '' });
  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } = getPasswordChecks(watchedPassword);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/signup', {
        name: normalizeText(values.name),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success(data.message);
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <div className="user-auth-header">
          <h1>Create Your Account</h1>
          <p>Explore the future of autonomous robotics with Mobifys.</p>
        </div>

        <div className="sso-buttons-group">
          <button
            type="button"
            onClick={() => (window.location.href = `${API_BASE_URL}/user/auth/google`)}
            className="btn-sso"
          >
            <svg className="sso-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.37-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="auth-divider">OR REGISTER</div>

        <form
          onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="field-block">
            <div className="field-label-meta">
              <label htmlFor="signup-name">FULL NAME</label>
              <span className="field-char-count">
                {watchedName.length}/{NAME_MAX_LENGTH}
              </span>
            </div>
            <div className={`field-input-box ${errors.name ? 'has-error' : ''}`}>
              <User className="field-icon-left" size={16} />
              <input
                id="signup-name"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                placeholder="Your full name (2–50 letters)"
                aria-invalid={Boolean(errors.name)}
                {...register('name', nameRules())}
              />
            </div>
            {errors.name && <p className="field-error-text">{errors.name.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-email">EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="signup-email"
                type="email"
                maxLength={EMAIL_MAX_LENGTH}
                placeholder="Your email address"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules())}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-phone">MOBILE NUMBER (INDIA)</label>
            <div className={`field-input-box phone-input-box ${errors.phone ? 'has-error' : ''}`}>
              <Phone className="field-icon-left" size={16} />
              <span className="phone-country-code">+91</span>
              <Controller
                name="phone"
                control={control}
                rules={indianPhoneRules()}
                render={({ field }) => (
                  <input
                    id="signup-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={field.value}
                    onChange={(e) => field.onChange(extractIndianDigits(e.target.value))}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    placeholder="9876543210"
                    aria-invalid={Boolean(errors.phone)}
                  />
                )}
              />
            </div>
            {errors.phone && <p className="field-error-text">{errors.phone.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-password">PASSWORD</label>
            <div className={`field-input-box ${errors.password ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.password)}
                {...register('password', {
                  ...strongPasswordRules(),
                  onChange: () => {
                    if (getValues('confirmPassword')) {
                      void trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="eye-btn"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {errors.password && <p className="field-error-text">{errors.password.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-confirm-password">RE-ENTER PASSWORD</label>
            <div className={`field-input-box ${errors.confirmPassword ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-confirm-password"
                type={showConfirmPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register(
                  'confirmPassword',
                  confirmPasswordRules(() => getValues('password'))
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass((prev) => !prev)}
                className="eye-btn"
                aria-label={showConfirmPass ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="terms-check-row">
              <input
                type="checkbox"
                {...register('agreed', {
                  validate: (value) =>
                    value || 'Please agree to the Terms of Service & Privacy Policy',
                })}
              />
              <span>
                I agree to mobifys <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>
              </span>
            </label>
            {errors.agreed && <p className="field-error-text">{errors.agreed.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-footer">
          Already have an account?{' '}
          <Link to="/login" className="orange-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
