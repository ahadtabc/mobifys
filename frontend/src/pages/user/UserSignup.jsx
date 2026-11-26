import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance, { API_BASE_URL } from '../../api/axiosInstance';
import './UserSignup.css';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;

const NAME_REGEX = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function extractIndianDigits(rawValue) {
  const digitsOnly = rawValue.replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2, 12);
  }
  if (digitsOnly.length > 10 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1, 11);
  }
  return digitsOnly.slice(0, 10);
}

function validateSignupForm(form, agreed) {
  const errors = {};
  const cleanName = form.name.trim().replace(/\s+/g, ' ');
  const cleanEmail = form.email.trim().toLowerCase();
  const cleanPhone = form.phone.trim();

  if (!cleanName) {
    errors.name = 'Full name is required';
  } else if (cleanName.length < NAME_MIN_LENGTH) {
    errors.name = `Full name must be at least ${NAME_MIN_LENGTH} characters`;
  } else if (cleanName.length > NAME_MAX_LENGTH) {
    errors.name = `Full name must not exceed ${NAME_MAX_LENGTH} characters`;
  } else if (!NAME_REGEX.test(cleanName)) {
    errors.name = 'Use letters only (spaces, dots, hyphens, or apostrophes allowed)';
  }

  if (!cleanEmail) {
    errors.email = 'Email address is required';
  } else if (cleanEmail.length > 100 || !EMAIL_REGEX.test(cleanEmail)) {
    errors.email = 'Enter a valid email address';
  }

  if (!cleanPhone) {
    errors.phone = 'Indian mobile number is required';
  } else if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number (starts with 6–9)';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (/\s/.test(form.password)) {
    errors.password = 'Password cannot contain spaces';
  } else if (form.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  } else if (form.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`;
  } else if (!/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password)) {
    errors.password = 'Include both uppercase and lowercase letters';
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = 'Include at least one number';
  } else if (!/[^A-Za-z0-9\s]/.test(form.password)) {
    errors.password = 'Include at least one special character';
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please re-enter your password';
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!agreed) {
    errors.agreed = 'Please agree to the Terms of Service & Privacy Policy';
  }

  return errors;
}

export default function UserSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const hasMinMaxLen =
    form.password.length >= PASSWORD_MIN_LENGTH && form.password.length <= PASSWORD_MAX_LENGTH;
  const hasUpperLower = /[a-z]/.test(form.password) && /[A-Z]/.test(form.password);
  const hasNumber = /[0-9]/.test(form.password);
  const hasSymbol = /[^A-Za-z0-9\s]/.test(form.password);

  const validationErrors = validateSignupForm(form, agreed);
  const showFieldError = (field) => (touched[field] || submitted) && validationErrors[field];

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const firstError = Object.values(validationErrors)[0];
    if (firstError) {
      return toast.error(firstError);
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/signup', {
        name: form.name.trim().replace(/\s+/g, ' '),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      toast.success(data.message);
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
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
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.37-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="auth-divider">OR REGISTER</div>

        <form onSubmit={handleSubmit} className="user-auth-form" noValidate>
          <div className="field-block">
            <div className="field-label-meta">
              <label htmlFor="signup-name">FULL NAME</label>
              <span className="field-char-count">
                {form.name.length}/{NAME_MAX_LENGTH}
              </span>
            </div>
            <div className={`field-input-box ${showFieldError('name') ? 'has-error' : ''}`}>
              <User className="field-icon-left" size={16} />
              <input
                id="signup-name"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={() => handleBlur('name')}
                placeholder="Your full name (2–50 letters)"
                aria-invalid={Boolean(showFieldError('name'))}
              />
            </div>
            {showFieldError('name') && <p className="field-error-text">{validationErrors.name}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-email">EMAIL ADDRESS</label>
            <div className={`field-input-box ${showFieldError('email') ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="signup-email"
                type="email"
                maxLength={100}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onBlur={() => handleBlur('email')}
                placeholder="Your email address"
                aria-invalid={Boolean(showFieldError('email'))}
              />
            </div>
            {showFieldError('email') && <p className="field-error-text">{validationErrors.email}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-phone">MOBILE NUMBER (INDIA)</label>
            <div className={`field-input-box phone-input-box ${showFieldError('phone') ? 'has-error' : ''}`}>
              <Phone className="field-icon-left" size={16} />
              <span className="phone-country-code">+91</span>
              <input
                id="signup-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: extractIndianDigits(e.target.value) })
                }
                onBlur={() => handleBlur('phone')}
                placeholder="9876543210"
                aria-invalid={Boolean(showFieldError('phone'))}
              />
            </div>
            {showFieldError('phone') && <p className="field-error-text">{validationErrors.phone}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="signup-password">PASSWORD</label>
            <div className={`field-input-box ${showFieldError('password') ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onBlur={() => handleBlur('password')}
                placeholder="••••••••••••"
                aria-invalid={Boolean(showFieldError('password'))}
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
            {showFieldError('password') && (
              <p className="field-error-text">{validationErrors.password}</p>
            )}
          </div>

          <div className="field-block">
            <label htmlFor="signup-confirm-password">RE-ENTER PASSWORD</label>
            <div
              className={`field-input-box ${showFieldError('confirmPassword') ? 'has-error' : ''}`}
            >
              <Lock className="field-icon-left" size={16} />
              <input
                id="signup-confirm-password"
                type={showConfirmPass ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder="••••••••••••"
                aria-invalid={Boolean(showFieldError('confirmPassword'))}
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
            {showFieldError('confirmPassword') && (
              <p className="field-error-text">{validationErrors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="terms-check-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to mobifys <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>
              </span>
            </label>
            {showFieldError('agreed') && (
              <p className="field-error-text">{validationErrors.agreed}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn-user-submit">
            {loading ? 'Creating Account...' : 'Create Account'}
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
