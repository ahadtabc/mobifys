import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance, { API_BASE_URL } from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import { emailRules, toastFirstFormError } from '../../utils/formValidation';
import './UserLogin.css';

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'sso_failed') {
      toast.error('Google sign-in failed or your account is blocked.');
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const onSubmit = async (values) => {
    const cleanEmail = values.email.trim();
    try {
      const { data } = await axiosInstance.post('/user/auth/login', {
        email: cleanEmail,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      dispatch(setUser(data.user));
      toast.success(data.message);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        toast.error(err.response.data.message);
        navigate('/verify-otp', { state: { email: cleanEmail } });
      } else {
        toast.error(err.response?.data?.message || 'Sign in failed');
      }
    }
  };

  const handleGoogleSSO = () => {
    window.location.href = `${API_BASE_URL}/user/auth/google`;
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <div className="user-auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your account.</p>
        </div>

        <div className="sso-buttons-group">
          <button type="button" onClick={handleGoogleSSO} className="btn-sso">
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
            Continue with Google
          </button>
        </div>

        <div className="auth-divider">OR SIGN IN</div>

        <form
          onSubmit={handleSubmit(onSubmit, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="field-block">
            <label htmlFor="login-email">EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="login-email"
                type="email"
                placeholder="Your email address"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules())}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <div className="field-block">
            <label htmlFor="login-password">PASSWORD</label>
            <div className={`field-input-box ${errors.password ? 'has-error' : ''}`}>
              <Lock className="field-icon-left" size={16} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                aria-invalid={Boolean(errors.password)}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="eye-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="field-error-text">{errors.password.message}</p>}
          </div>

          <div className="remember-forgot-row">
            <label className="remember-label">
              <input type="checkbox" {...register('rememberMe')} />
              <span>Remember Me</span>
            </label>
            <Link to="/forgot-password" className="orange-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch-footer">
          New to mobifys?{' '}
          <Link to="/signup" className="orange-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
