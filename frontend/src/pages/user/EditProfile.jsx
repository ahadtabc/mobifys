import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Upload,
  Save,
  Mail,
  Lock,
  Trash2,
  Home,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import OtpInput from '../../components/OtpInput';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  confirmPasswordRules,
  emailRules,
  getPasswordChecks,
  nameRules,
  normalizeText,
  optionalProfilePhoneRules,
  strongPasswordRules,
  toastFirstFormError,
} from '../../utils/formValidation';
import './EditProfile.css';

export default function EditProfile() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [pendingProfileValues, setPendingProfileValues] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Email Change with 2-Step OTP (1: Current Email OTP, 2: New Email OTP)
  const [currentEmailOtpSent, setCurrentEmailOtpSent] = useState(false);
  const [currentEmailOtp, setCurrentEmailOtp] = useState('');
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);

  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Change Password UI toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileForm = useForm({
    defaultValues: {
      name: '',
      phone: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const currentEmailForm = useForm({
    defaultValues: {
      currentEmail: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const newEmailForm = useForm({
    defaultValues: {
      newEmail: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const watchedProfileName = useWatch({
    control: profileForm.control,
    name: 'name',
    defaultValue: '',
  });
  const watchedNewPassword = useWatch({
    control: passwordForm.control,
    name: 'newPassword',
    defaultValue: '',
  });
  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } =
    getPasswordChecks(watchedNewPassword);

  const { reset: resetProfileForm } = profileForm;

  useEffect(() => {
    axiosInstance
      .get('/user/profile')
      .then(({ data }) => {
        resetProfileForm({
          name: data.user.name || '',
          phone: data.user.phone || '',
        });
        setCurrentEmail(data.user.email || '');
        setPreviewUrl(data.user.profileImage || '');
      })
      .catch(() => toast.error('Failed to load profile data'));
  }, [resetProfileForm]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    setRemoveProfileImage(true);
  };

  // Save Name, Phone & S3 Profile Photo
  const onProfileSubmit = (values) => {
    setPendingProfileValues(values);
    setShowSaveProfileModal(true);
  };

  const confirmSaveProfile = async () => {
    const values = pendingProfileValues || profileForm.getValues();
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('name', normalizeText(values.name));
      formData.append('phone', values.phone.trim());
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      if (removeProfileImage) {
        formData.append('removeProfileImage', 'true');
      }

      const { data } = await axiosInstance.put('/user/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setUser(data.user));
      toast.success(data.message);
      setShowSaveProfileModal(false);
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Step 1a: Send OTP to Current Registered Email
  const onSendCurrentEmailOtp = async ({ currentEmail: enteredCurrentEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/request-current-email-otp', {
        currentEmail: enteredCurrentEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 1b: Verify Current Email OTP -> Unlock New Email Step
  const handleVerifyCurrentEmail = async () => {
    if (currentEmailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your current email');
    }
    const enteredCurrentEmail = currentEmailForm.getValues('currentEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/verify-current-email', {
        currentEmail: enteredCurrentEmail,
        otp: currentEmailOtp,
      });
      toast.success(data.message);
      setCurrentEmailVerified(true);
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Current email verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2a: Request OTP for New Email
  const onSendEmailOtp = async ({ newEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/request-email-change', {
        newEmail: newEmail.trim().toLowerCase(),
      });
      toast.success(data.message);
      setEmailOtp('');
      setEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2b: Verify New Email OTP & Update Email
  const handleVerifyEmailChange = async () => {
    if (emailOtp.trim().length !== 6) {
      return toast.error('Enter the 6-digit OTP sent to your new email');
    }
    const enteredNewEmail = newEmailForm.getValues('newEmail').trim().toLowerCase();
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/verify-email-change', {
        newEmail: enteredNewEmail,
        otp: emailOtp,
      });
      toast.success(data.message);
      if (data.user) {
        dispatch(setUser(data.user));
      }
      setCurrentEmail(data.email);
      currentEmailForm.reset({ currentEmail: '' });
      newEmailForm.reset({ newEmail: '' });
      setCurrentEmailOtp('');
      setCurrentEmailOtpSent(false);
      setCurrentEmailVerified(false);
      setEmailOtp('');
      setEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleRestartEmailChange = () => {
    currentEmailForm.reset({ currentEmail: '' });
    newEmailForm.reset({ newEmail: '' });
    setCurrentEmailOtp('');
    setCurrentEmailOtpSent(false);
    setCurrentEmailVerified(false);
    setEmailOtp('');
    setEmailOtpSent(false);
  };

  // Change Password
  const onChangePassword = async (values) => {
    try {
      const { data } = await axiosInstance.put('/user/profile/change-password', values);
      toast.success(data.message);
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="edit-profile-container">
      <nav className="edit-profile-breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">
              <Home size={14} />
              Home
            </Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="edit-profile-breadcrumb-separator" aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <span aria-current="page">Edit Profile</span>
          </li>
        </ol>
      </nav>

      <div className="profile-page-title">
        <h1>Edit Profile</h1>
        <p>Update your profile image, contact details, verified email, and account password.</p>
      </div>

      {/* Form 1: Avatar + Personal Details */}
      <form
        onSubmit={profileForm.handleSubmit(onProfileSubmit, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div>
          <h2>Avatar & Personal Information</h2>
          <p className="edit-section-sub">
            Upload a JPG, PNG, or GIF image for your profile.
          </p>
        </div>

        <div className="avatar-upload-row">
          <div className="avatar-preview-wrap">
            {previewUrl ? (
              <img src={previewUrl} alt="Avatar preview" className="avatar-preview-lg" />
            ) : (
              <div className="avatar-preview-lg">
                {watchedProfileName?.slice(0, 2).toUpperCase() || 'U'}
              </div>
            )}
            {previewUrl && (
              <button
                type="button"
                className="btn-remove-photo"
                onClick={() => setShowRemoveImageModal(true)}
                disabled={savingProfile}
                aria-label="Remove profile photo"
                title="Remove profile photo"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          <div>
            <div className="avatar-action-buttons">
              <label className="btn-upload-photo">
                <Upload size={14} /> Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>
              Maximum file size: 2MB
            </p>
          </div>
        </div>

        <div className="two-col-fields">
          <div
            className={`edit-field-group ${profileForm.formState.errors.name ? 'has-error' : ''}`}
          >
            <label htmlFor="profile-name">Full Name *</label>
            <input
              id="profile-name"
              type="text"
              maxLength={NAME_MAX_LENGTH}
              className="edit-input"
              aria-invalid={Boolean(profileForm.formState.errors.name)}
              {...profileForm.register('name', nameRules('Name cannot be empty'))}
            />
            {profileForm.formState.errors.name && (
              <p className="field-error-text">{profileForm.formState.errors.name.message}</p>
            )}
          </div>

          <div
            className={`edit-field-group ${profileForm.formState.errors.phone ? 'has-error' : ''}`}
          >
            <label htmlFor="profile-phone">Phone Number</label>
            <input
              id="profile-phone"
              type="tel"
              placeholder="+91 98470 12345"
              className="edit-input"
              aria-invalid={Boolean(profileForm.formState.errors.phone)}
              {...profileForm.register('phone', optionalProfilePhoneRules())}
            />
            {profileForm.formState.errors.phone && (
              <p className="field-error-text">{profileForm.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="edit-bottom-bar" style={{ justifyContent: 'flex-end' }}>
          <button type="submit" disabled={savingProfile} className="btn-orange-action">
            <Save size={14} /> {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Section 2: Two-Step Email Edit with OTP Verification */}
      <div className="edit-section-card">
        <div>
          <h2>Email Address Verification</h2>
          <p className="edit-section-sub">
            Current verified email: <strong>{currentEmail}</strong>
          </p>
        </div>

        <div className="email-change-box">
          {!currentEmailVerified ? (
            <form
              onSubmit={currentEmailForm.handleSubmit(onSendCurrentEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="email-step-header">
                <span className="email-step-badge">Step 1 of 2</span>
                <label htmlFor="current-email-verify" className="email-step-title">
                  <Mail size={13} />
                  Verify Your Current Registered Email
                </label>
              </div>
              <div className="inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="currentEmail"
                  control={currentEmailForm.control}
                  rules={emailRules('Enter your current registered email address')}
                  render={({ field }) => (
                    <input
                      id="current-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (currentEmailOtpSent) {
                          setCurrentEmailOtpSent(false);
                          setCurrentEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter your current registered email"
                      className="edit-input"
                      disabled={emailLoading}
                      aria-invalid={Boolean(currentEmailForm.formState.errors.currentEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="btn-secondary-outline"
                >
                  {emailLoading && !currentEmailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {currentEmailForm.formState.errors.currentEmail && (
                <p className="field-error-text">
                  {currentEmailForm.formState.errors.currentEmail.message}
                </p>
              )}

              {currentEmailOtpSent && (
                <div className="email-otp-verify-row" style={{ marginTop: '10px' }}>
                  <OtpInput
                    value={currentEmailOtp}
                    onChange={setCurrentEmailOtp}
                    disabled={emailLoading}
                    label="Current email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCurrentEmail}
                    disabled={emailLoading || currentEmailOtp.length !== 6}
                    className="btn-orange-action"
                  >
                    {emailLoading ? 'Verifying...' : 'Verify Current Email'}
                  </button>
                </div>
              )}
            </form>
          ) : (
            <form
              onSubmit={newEmailForm.handleSubmit(onSendEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="email-verified-banner">
                <span className="email-verified-status">
                  <CheckCircle2 size={15} />
                  Current email verified ({currentEmail})
                </span>
                <button
                  type="button"
                  onClick={handleRestartEmailChange}
                  disabled={emailLoading}
                  className="email-restart-btn"
                >
                  Reset
                </button>
              </div>

              <div className="email-step-header" style={{ marginTop: '12px' }}>
                <span className="email-step-badge">Step 2 of 2</span>
                <label htmlFor="new-email-verify" className="email-step-title">
                  <Mail size={13} />
                  Enter & Verify Your New Email Address
                </label>
              </div>

              <div className="inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="newEmail"
                  control={newEmailForm.control}
                  rules={emailRules('Enter the new email address')}
                  render={({ field }) => (
                    <input
                      id="new-email-verify"
                      type="email"
                      maxLength={EMAIL_MAX_LENGTH}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (emailOtpSent) {
                          setEmailOtpSent(false);
                          setEmailOtp('');
                        }
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      placeholder="Enter new email address"
                      className="edit-input"
                      disabled={emailLoading}
                      aria-invalid={Boolean(newEmailForm.formState.errors.newEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="btn-secondary-outline"
                >
                  {emailLoading && !emailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {newEmailForm.formState.errors.newEmail && (
                <p className="field-error-text">
                  {newEmailForm.formState.errors.newEmail.message}
                </p>
              )}

              {emailOtpSent && (
                <div className="email-otp-verify-row" style={{ marginTop: '10px' }}>
                  <OtpInput
                    value={emailOtp}
                    onChange={setEmailOtp}
                    disabled={emailLoading}
                    label="New email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailChange}
                    disabled={emailLoading || emailOtp.length !== 6}
                    className="btn-orange-action"
                  >
                    {emailLoading ? 'Updating...' : 'Verify & Update Email'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Section 3: Change Password */}
      <form
        onSubmit={passwordForm.handleSubmit(onChangePassword, toastFirstFormError)}
        className="edit-section-card"
        noValidate
      >
        <div>
          <h2>Security & Master Authentication</h2>
          <p className="edit-section-sub">Update your password to keep your account protected.</p>
        </div>

        <div
          className={`edit-field-group ${
            passwordForm.formState.errors.currentPassword ? 'has-error' : ''
          }`}
        >
          <label htmlFor="edit-current-password">Current Password</label>
          <div className="edit-password-input-wrap">
            <input
              id="edit-current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              className="edit-input edit-password-input"
              aria-invalid={Boolean(passwordForm.formState.errors.currentPassword)}
              {...passwordForm.register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              className="edit-password-toggle"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
              aria-pressed={showCurrentPassword}
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordForm.formState.errors.currentPassword && (
            <p className="field-error-text">
              {passwordForm.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="two-col-fields">
          <div
            className={`edit-field-group ${
              passwordForm.formState.errors.newPassword ? 'has-error' : ''
            }`}
          >
            <label htmlFor="edit-new-password">New Password</label>
            <div className="edit-password-input-wrap">
              <input
                id="edit-new-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
                className="edit-input edit-password-input"
                aria-invalid={Boolean(passwordForm.formState.errors.newPassword)}
                {...passwordForm.register('newPassword', {
                  ...strongPasswordRules('New password is required'),
                  onChange: () => {
                    if (passwordForm.getValues('confirmPassword')) {
                      void passwordForm.trigger('confirmPassword');
                    }
                  },
                })}
              />
              <button
                type="button"
                className="edit-password-toggle"
                onClick={() => setShowNewPassword((visible) => !visible)}
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                aria-pressed={showNewPassword}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="edit-password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {passwordForm.formState.errors.newPassword && (
              <p className="field-error-text">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div
            className={`edit-field-group ${
              passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
            }`}
          >
            <label htmlFor="edit-confirm-password">Confirm New Password</label>
            <div className="edit-password-input-wrap">
              <input
                id="edit-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
                className="edit-input edit-password-input"
                aria-invalid={Boolean(passwordForm.formState.errors.confirmPassword)}
                {...passwordForm.register(
                  'confirmPassword',
                  confirmPasswordRules(
                    () => passwordForm.getValues('newPassword'),
                    'Please confirm your new password'
                  )
                )}
              />
              <button
                type="button"
                className="edit-password-toggle"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordForm.formState.errors.confirmPassword && (
              <p className="field-error-text">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="btn-orange-action"
          >
            <Lock size={14} />{' '}
            {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>

      {showRemoveImageModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowRemoveImageModal(false);
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-photo-title"
          >
            <div className="edit-profile-confirm-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="remove-photo-title">Remove photo?</h2>
            <p>Your profile photo will be removed when you save your changes.</p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowRemoveImageModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={() => {
                  handleRemoveImage();
                  setShowRemoveImageModal(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveProfileModal && (
        <div
          className="edit-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !savingProfile) {
              setShowSaveProfileModal(false);
            }
          }}
        >
          <div
            className="edit-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-profile-title"
            aria-describedby="save-profile-description"
          >
            <div className="edit-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="save-profile-title">Save changes?</h2>
            <p id="save-profile-description">Save your updated profile information?</p>
            <div className="edit-profile-confirm-actions">
              <button
                type="button"
                className="edit-profile-confirm-cancel"
                onClick={() => setShowSaveProfileModal(false)}
                disabled={savingProfile}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-profile-confirm-submit"
                onClick={confirmSaveProfile}
                disabled={savingProfile}
              >
                {savingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
