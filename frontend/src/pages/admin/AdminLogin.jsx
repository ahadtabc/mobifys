import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setAdmin } from '../../redux/slices/authSlice';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      return toast.error('Please enter your work email and password');
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/login', {
        email,
        password,
        keepSignedIn,
      });

      dispatch(setAdmin(data.admin));
      toast.success(data.message);
      navigate('/admin/customers');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Admin sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <header className="admin-auth-header">
        <div className="admin-brand-icon">
          <ShoppingBag size={18} />
        </div>
        <span className="admin-brand-title">mobifys.</span>
        <span className="admin-brand-subtitle">ADMIN CONSOLE</span>
      </header>

      <main className="admin-auth-main">
        <div className="admin-auth-card">
          <div className="admin-auth-heading">
            <h1>Admin Sign In</h1>
            <p>Enter your credentials to access the console</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-auth-form">
            <div className="form-group">
              <label>Work Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon-left" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mobifys.in"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label>Password</label>
                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon-left" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>

            <button type="submit" disabled={loading} className="btn-primary-full">
              {loading ? 'Signing in...' : 'Sign In to Admin Portal'}
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