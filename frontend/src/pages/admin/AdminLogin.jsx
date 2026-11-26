import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setAdmin } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import { EMAIL_MAX_LENGTH, emailRules, toastFirstFormError } from '../../utils/formValidation';
import './AdminLogin.css';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      keepSignedIn: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ email, password, keepSignedIn }) => {
    try {
      const { data } = await axiosInstance.post('/admin/auth/login', {
        email: email.trim(),
        password,
        keepSignedIn,
      });

      dispatch(setAdmin(data.admin));
      toast.success(data.message);
      navigate('/admin/users');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin sign in failed');
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
          <div className="admin-auth-heading">
            <h1>Sign In</h1>
            <p>Enter your credentials to access the console</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
            className="admin-auth-form"
            noValidate
          >
            <div className="form-group">
              <label htmlFor="admin-login-email">Email Address</label>
              <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
                <Mail className="input-icon-left" size={16} />
                <input
                  id="admin-login-email"
                  type="email"
                  maxLength={EMAIL_MAX_LENGTH}
                  placeholder="admin@mobifys.in"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email', emailRules('Work email address is required'))}
                />
              </div>
              {errors.email && <p className="field-error-text">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="admin-login-password">Password</label>
                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className={`input-wrapper ${errors.password ? 'has-error' : ''}`}>
                <Lock className="input-icon-left" size={16} />
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  aria-invalid={Boolean(errors.password)}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="field-error-text">{errors.password.message}</p>}
            </div>

            <label className="checkbox-row">
              <input type="checkbox" {...register('keepSignedIn')} />
              <span>Keep me signed in</span>
            </label>

            <button type="submit" disabled={isSubmitting} className="btn-primary-full">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <footer className="admin-auth-footer">
          <div>Privacy Policy • Terms of Service • Security</div>
          <div>© 2026 mobifys. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}
