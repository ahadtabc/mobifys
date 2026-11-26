import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import './UserLogin.css';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'sso_failed') {
      toast.error('Google sign-in failed or your account is blocked.');
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      return toast.error('Please enter your email and password');
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/login', {
        email,
        password,
        rememberMe,
      });

      dispatch(setUser(data.user));
      toast.success(data.message);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        toast.error(err.response.data.message);
        navigate('/verify-otp', { state: { email: email.trim() } });
      } else {
        toast.error(err.response?.data?.message || 'Sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSSO = () => {
    window.location.href = 'http://localhost:3001/api/user/auth/google';
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
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.37-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="auth-divider">OR SIGN IN</div>

        <form onSubmit={handleSubmit} className="user-auth-form">
          <div className="field-block">
            <label>EMAIL ADDRESS</label>
            <div className="field-input-box">
              <Mail className="field-icon-left" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
            </div>
          </div>

          <div className="field-block">
            <label>PASSWORD</label>
            <div className="field-input-box">
              <Lock className="field-icon-left" size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-btn"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="remember-forgot-row">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <Link to="/forgot-password" className="orange-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="btn-user-submit">
            {loading ? 'Signing in...' : 'Sign In'}
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