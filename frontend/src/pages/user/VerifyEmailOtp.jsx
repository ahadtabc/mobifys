import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MailCheck, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import './VerifyEmailOtp.css';

export default function VerifyEmailOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }
    if (verified || timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [email, timer, verified, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/user/auth/verify-signup-otp', {
        email,
        otp,
      });
      dispatch(setUser(data.user));
      toast.success(data.message);
      setVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axiosInstance.post('/user/auth/resend-otp', {
        email,
        purpose: 'signup',
      });
      toast.success(data.message);
      setTimer(120);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        {!verified ? (
          <form onSubmit={handleVerify} className="user-auth-form">
            <div className="user-auth-header">
              <div className="auth-badge-square">
                <MailCheck size={24} />
              </div>
              <h1>Verify Your Email</h1>
              <p>
                We have sent a 6-digit verification code to <strong>{email}</strong>. Enter the code
                below to proceed.
              </p>
            </div>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="otp-six-input"
            />

            <div className="otp-resend-line">
              Didn't receive the code?{' '}
              {timer > 0 ? (
                <span style={{ color: '#ff5722', fontWeight: 600 }}>
                  Resend in {String(Math.floor(timer / 60)).padStart(2, '0')}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              ) : (
                <button type="button" onClick={handleResend}>
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="btn-user-submit"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
              <ArrowRight size={16} />
            </button>

            <div className="auth-switch-footer">
              <Link to="/signup" className="orange-link" style={{ color: '#6b7280' }}>
                <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Back to registration
              </Link>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="verified-ring-icon">
              <ShieldCheck size={30} />
            </div>
            <div className="user-auth-header">
              <h1>Welcome to mobifys! Account Created</h1>
              <p>
                Your mobifys robotics account has been verified and activated. You're all set to
                explore premier robotics and manage your profile.
              </p>
            </div>
            <Link to="/" className="btn-user-submit">
              Explore Mobifys <ArrowRight size={16} />
            </Link>
            <div className="auth-switch-footer">
              <Link to="/profile" className="orange-link">
                Go to My Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}