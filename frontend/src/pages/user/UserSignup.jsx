import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './UserSignup.css';

export default function UserSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const hasMinLen = form.password.length >= 8;
  const hasUpperLower = /[a-z]/.test(form.password) && /[A-Z]/.test(form.password);
  const hasNumSymbol = /[0-9!@#$%^&*]/.test(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      return toast.error('Please fill all required fields');
    }
    if (!agreed) {
      return toast.error('Please agree to the Terms of Service & Privacy Policy');
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/signup', form);
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
          <p>
            Explore the future of autonomous robotics with Mobifys.
          </p>
        </div>

        <div className="sso-buttons-group">
          <button
            type="button"
            onClick={() => (window.location.href = 'http://localhost:3001/api/user/auth/google')}
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

        <form onSubmit={handleSubmit} className="user-auth-form">
          <div className="field-block">
            <label>FULL NAME</label>
            <div className="field-input-box">
              <User className="field-icon-left" size={16} />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="field-block">
            <label>EMAIL ADDRESS</label>
            <div className="field-input-box">
              <Mail className="field-icon-left" size={16} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email address"
              />
            </div>
          </div>

          <div className="field-block">
            <label>MOBILE NUMBER</label>
            <div className="field-input-box">
              <Phone className="field-icon-left" size={16} />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="9012345678"
              />
            </div>
          </div>

          <div className="field-block">
            <label>PASSWORD</label>
            <div className="field-input-box">
              <Lock className="field-icon-left" size={16} />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••••••"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="eye-btn">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="password-rules-row">
              <span className={hasMinLen ? 'met' : ''}>• Min 8 characters</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumSymbol ? 'met' : ''}>• Number / symbol</span>
            </div>
          </div>

          <div className="field-block">
            <label>RE-ENTER PASSWORD</label>
            <div className="field-input-box">
              <Lock className="field-icon-left" size={16} />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <label className="terms-check-row">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to mobifys <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>{' '}
             
            </span>
          </label>

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