import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import mobifysLogo from '../../assets/mobifys-logo.png';
import OtpInput from '../../components/OtpInput';
import './AdminForgotPassword.css';

export default function AdminForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step !== 2 || timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/forgot-password', { email });
      toast.success(data.message);
      setTimer(120);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/verify-otp', { email, otp });
      toast.success(data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });
      toast.success(data.message);
      setStep(4);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <header className="admin-auth-header">
        <div className="admin-brand-icon">
          <img src={mobifysLogo} alt="Mobifys" />
        </div>
        <span className="admin-brand-title">mobifys<span style={{ color: '#ff5521' }}>.</span></span>
        <span className="admin-brand-subtitle">ADMIN CONSOLE</span>
      </header>

      <main className="admin-auth-main">
        <div className="admin-auth-card">
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="admin-auth-form">
              <div className="admin-auth-heading">
                <h1>Admin Password Recovery</h1>
                <p>
                  Enter your registered administrator email address to receive a one-time code (OTP).
                </p>
              </div>
              <div className="form-group">
                <label>WORK EMAIL ADDRESS</label>
                <div className="input-wrapper">
                  <Mail className="input-icon-left" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mobifys.in"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary-full">
                {loading ? 'Sending...' : 'Send Verification Code'}
                <ArrowRight size={16} />
              </button>
              <Link to="/admin/login" className="back-login-link">
                <ArrowLeft size={14} /> Back to Admin Login
              </Link>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="admin-auth-form">
              <div className="admin-auth-heading">
                <h1>Verify Admin OTP</h1>
                <p>
                  Enter the 6-digit code sent to <strong>{email}</strong>
                </p>
              </div>
              <OtpInput value={otp} onChange={setOtp} disabled={loading} />
              <div className="otp-timer-row">
                {timer > 0 ? (
                  <span>
                    Resend OTP in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </span>
                ) : (
                  <button type="button" onClick={handleSendOtp} className="resend-otp-btn">
                    Resend OTP
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="btn-primary-full"
              >
                {loading ? 'Verifying...' : 'Verify & Proceed'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="admin-auth-form">
              <div className="admin-auth-heading">
                <h1>Set New Admin Password</h1>
                <p>Create a strong password (minimum 8 characters).</p>
              </div>
              <div className="form-group">
                <label>NEW ADMIN PASSWORD</label>
                <div className="input-wrapper">
                  <Lock className="input-icon-left" size={16} />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>CONFIRM NEW PASSWORD</label>
                <div className="input-wrapper">
                  <Lock className="input-icon-left" size={16} />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary-full">
                {loading ? 'Updating...' : 'Update Admin Password'}
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="success-step-box">
              <div className="success-badge-icon">
                <CheckCircle2 size={26} />
              </div>
              <div className="admin-auth-heading" style={{ marginBottom: 0 }}>
                <h1>Admin Password Updated!</h1>
                <p>
                  Your administrator password has been updated for <strong>{email}</strong>.
                </p>
              </div>
              <Link to="/admin/login" className="btn-primary-full">
                Go to Admin Login Portal <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}