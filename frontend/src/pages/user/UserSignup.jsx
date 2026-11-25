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
            Create your mobifys account to explore next-gen humanoid, autonomous companion, and
            cleaning robots.
          </p>
        </div>

        <div className="sso-buttons-group">
          <button
            type="button"
            onClick={() => (window.location.href = 'http://localhost:3001/api/user/auth/google')}
            className="btn-sso"
          >
            <strong>G</strong> Sign up with Google
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = 'http://localhost:3001/api/user/auth/facebook')}
            className="btn-sso"
          >
            <strong>f</strong> Sign up with Facebook
          </button>
        </div>

        <div className="auth-divider">OR REGISTER WITH CREDENTIALS</div>

        <form onSubmit={handleSubmit} className="user-auth-form">
          <div className="field-block">
            <label>FULL NAME</label>
            <div className="field-input-box">
              <User className="field-icon-left" size={16} />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Abdul Ahad"
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
                placeholder="alex@company.com"
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
                placeholder="+91 98765 43210"
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
              & Autonomous Fleet Safety Guidelines.
            </span>
          </label>

          <button type="submit" disabled={loading} className="btn-user-submit">
            {loading ? 'Creating Account...' : 'Create Mobifys Account'}
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