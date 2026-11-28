import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import OtpInput from '../../components/OtpInput';
import { otpRules, toastFirstFormError } from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserVerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  const watchedOtp = useWatch({ control, name: 'otp', defaultValue: '' });

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
      return;
    }
    if (timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [email, timer, navigate]);

  const handleResendCode = async () => {
    try {
      setResending(true);
      const { data } = await axiosInstance.post('/user/auth/resend-otp', {
        email,
        purpose: 'forgot_password',
      });
      toast.success(data.message);
      setTimer(120);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    } finally {
      setResending(false);
    }
  };

  const onVerifyOtp = async ({ otp }) => {
    try {
      const { data } = await axiosInstance.post('/user/auth/verify-otp', {
        email,
        otp,
      });
      toast.success(data.message);
      navigate('/reset-password', {
        state: { email: data.email || email, otpVerified: true },
        replace: true,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onVerifyOtp, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <ShieldCheck size={24} />
            </div>
            <h1>Verify OTP</h1>
            <p>
              Enter the 6-digit verification code sent to <strong>{email}</strong> to continue.
            </p>
          </div>

          <div className="field-block">
            <label>6-DIGIT VERIFICATION CODE</label>
            <Controller
              name="otp"
              control={control}
              rules={otpRules()}
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.otp && (
              <p className="field-error-text" style={{ textAlign: 'center' }}>
                {errors.otp.message}
              </p>
            )}
            <div className="otp-resend-line" style={{ marginTop: '8px' }}>
              {timer > 0 ? (
                <span>
                  Resend code in {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              ) : (
                <button type="button" onClick={handleResendCode} disabled={resending}>
                  {resending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || watchedOtp.length !== 6}
            className="btn-user-submit"
          >
            {isSubmitting ? 'Verifying...' : 'Verify & Proceed'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link
              to="/forgot-password"
              state={{ email }}
              className="orange-link"
              style={{ color: '#6b7280' }}
            >
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Change email address
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
