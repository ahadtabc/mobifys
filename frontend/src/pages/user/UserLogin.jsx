import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleFacebookSSO = () => {
    window.location.href = 'http://localhost:3001/api/user/auth/facebook';
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <div className="user-auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your autonomous robot fleet, orders, and telemetry portal.</p>
        </div>

        <div className="sso-buttons-group">
          <button type="button" onClick={handleGoogleSSO} className="btn-sso">
            <strong>G</strong> Continue with Google
          </button>
          <button type="button" onClick={handleFacebookSSO} className="btn-sso">
            <strong>f</strong> Continue with Facebook
          </button>
        </div>

        <div className="auth-divider">OR SIGN IN WITH EMAIL</div>

        <form onSubmit={handleSubmit} className="user-auth-form">
          <div className="field-block">
            <label>EMAIL ADDRESS</label>
            <div className="field-input-box">
              <Mail className="field-icon-left" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
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
                placeholder="Enter your password"
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
            {loading ? 'Signing in...' : 'Sign In to Portal'}
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