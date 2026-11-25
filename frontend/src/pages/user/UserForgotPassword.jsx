import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import './UserForgotPassword.css';

export default function UserForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + Set New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/forgot-password', { email });
      toast.success(data.message);
      setTimer(120);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        {step === 1 ? (
          <form onSubmit={handleSendCode} className="user-auth-form">
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <KeyRound size={24} />
              </div>
              <h1>Forgot Password?</h1>
              <p>
                Enter your registered email address below. We will dispatch a 6-digit verification
                security code to authenticate your identity.
              </p>
            </div>

            <div className="field-block">
              <label>REGISTERED EMAIL ADDRESS</label>
              <div className="field-input-box">
                <Mail className="field-icon-left" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@domain.com"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-user-submit">
              {loading ? 'Sending...' : 'Send Verification Code'}
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-footer">
              <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
                <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Cancel and return to Sign
                in
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="user-auth-form">
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <Lock size={24} />
              </div>
              <h1>Set New Password</h1>
              <p>
                Enter the 6-digit code sent to <strong>{email}</strong> and choose a new password.
              </p>
            </div>

            <div className="field-block">
              <label>6-DIGIT VERIFICATION CODE</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="otp-six-input"
              />
              <div className="otp-resend-line" style={{ marginTop: '8px' }}>
                {timer > 0 ? (
                  <span>
                    Resend code in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </span>
                ) : (
                  <button type="button" onClick={handleSendCode}>
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            <div className="field-block">
              <label>NEW PASSWORD</label>
              <div className="field-input-box">
                <Lock className="field-icon-left" size={16} />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>

            <div className="field-block">
              <label>CONFIRM NEW PASSWORD</label>
              <div className="field-input-box">
                <Lock className="field-icon-left" size={16} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-user-submit">
              {loading ? 'Updating...' : 'Update Password & Continue'}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}