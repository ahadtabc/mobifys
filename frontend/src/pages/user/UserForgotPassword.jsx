import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { EMAIL_MAX_LENGTH, emailRules, toastFirstFormError } from '../../utils/formValidation';
import './UserForgotPassword.css';

export default function UserForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: location.state?.email || '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSendCode = async ({ email }) => {
    try {
      const cleanEmail = email.trim();
      const { data } = await axiosInstance.post('/user/auth/forgot-password', {
        email: cleanEmail,
      });
      toast.success(data.message);
      navigate('/forgot-password/verify-otp', {
        state: { email: data.email || cleanEmail },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reset code');
    }
  };

  return (
    <div className="user-auth-wrapper">
      <div className="user-auth-card">
        <form
          onSubmit={handleSubmit(onSendCode, toastFirstFormError)}
          className="user-auth-form"
          noValidate
        >
          <div className="user-auth-header">
            <div className="auth-badge-square">
              <KeyRound size={24} />
            </div>
            <h1>Forgot Password?</h1>
            <p>
              Enter your registered email address below. We will dispatch a 6-digit verification
              security code.
            </p>
          </div>

          <div className="field-block">
            <label htmlFor="user-forgot-email">REGISTERED EMAIL ADDRESS</label>
            <div className={`field-input-box ${errors.email ? 'has-error' : ''}`}>
              <Mail className="field-icon-left" size={16} />
              <input
                id="user-forgot-email"
                type="email"
                maxLength={EMAIL_MAX_LENGTH}
                placeholder="e.g. yourname@domain.com"
                aria-invalid={Boolean(errors.email)}
                {...register('email', emailRules('Registered email address is required'))}
              />
            </div>
            {errors.email && <p className="field-error-text">{errors.email.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-user-submit">
            {isSubmitting ? 'Sending...' : 'Send Verification Code'}
            <ArrowRight size={16} />
          </button>

          <div className="auth-switch-footer">
            <Link to="/login" className="orange-link" style={{ color: '#6b7280' }}>
              <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Cancel and return to Sign
              in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
