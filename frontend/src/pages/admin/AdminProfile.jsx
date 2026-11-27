import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setAdmin } from '../../redux/slices/authSlice';
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
import './AdminProfile.css';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function getInitials(name = '') {
  return (
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD'
  );
}

export default function AdminProfile() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [currentEmail, setCurrentEmail] = useState(admin?.email || '');
  const [previewUrl, setPreviewUrl] = useState(admin?.profileImage || '');
  const [imageFile, setImageFile] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [pendingProfileValues, setPendingProfileValues] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Two-Step Email Change with OTP (1: Current Email OTP, 2: New Email OTP)
  const [currentEmailOtpSent, setCurrentEmailOtpSent] = useState(false);
  const [currentEmailOtp, setCurrentEmailOtp] = useState('');
  const [currentEmailVerified, setCurrentEmailVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Password toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const objectUrlRef = useRef('');
  const fileInputRef = useRef(null);

  const profileForm = useForm({
    defaultValues: {
      name: admin?.name || '',
      phone: admin?.phone || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const currentEmailForm = useForm({
    defaultValues: { currentEmail: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const newEmailForm = useForm({
    defaultValues: { newEmail: '' },
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

  const { reset: resetProfileForm } = profileForm;

  const revokePreviewObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = '';
    }
  };

  useEffect(() => {
    let active = true;
    axiosInstance
      .get('/admin/auth/me')
      .then(({ data }) => {
        if (!active || !data?.admin) return;
        dispatch(setAdmin(data.admin));
        resetProfileForm({
          name: data.admin.name || '',
          phone: data.admin.phone || '',
        });
        setCurrentEmail(data.admin.email || '');
        setPreviewUrl(data.admin.profileImage || '');
        setImageFile(null);
        setRemoveProfileImage(false);
      })
      .catch(() => {
        toast.error('Failed to load admin profile');
      });

    return () => {
      active = false;
      revokePreviewObjectUrl();
    };
  }, [dispatch, resetProfileForm]);

  useEffect(() => {
    if (!showRemoveImageModal && !showSaveProfileModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || savingProfile) return;
      if (showSaveProfileModal) {
        setShowSaveProfileModal(false);
      } else if (showRemoveImageModal) {
        setShowRemoveImageModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showRemoveImageModal, showSaveProfileModal, savingProfile]);

  const watchedName = useWatch({
    control: profileForm.control,
    name: 'name',
    defaultValue: admin?.name || '',
  });
  const watchedNewPassword = useWatch({
    control: passwordForm.control,
    name: 'newPassword',
    defaultValue: '',
  });

  const { hasMinMaxLen, hasUpperLower, hasNumber, hasSymbol } =
    getPasswordChecks(watchedNewPassword);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files (JPG, PNG, WebP) are allowed');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Maximum image file size is 2MB');
      event.target.value = '';
      return;
    }

    revokePreviewObjectUrl();
    const nextObjectUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextObjectUrl;
    setImageFile(file);
    setPreviewUrl(nextObjectUrl);
    setRemoveProfileImage(false);
  };

  const handleRemoveImage = () => {
    revokePreviewObjectUrl();
    setImageFile(null);
    setPreviewUrl('');
    setRemoveProfileImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSaveProfileSubmit = (values) => {
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

      const { data } = await axiosInstance.put('/admin/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      revokePreviewObjectUrl();
      setImageFile(null);
      setRemoveProfileImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreviewUrl(data.admin.profileImage || '');

      dispatch(setAdmin(data.admin));
      resetProfileForm({
        name: data.admin.name || '',
        phone: data.admin.phone || '',
      });
      toast.success(data.message);
      setShowSaveProfileModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update admin profile');
    } finally {
      setSavingProfile(false);
    }
  };

  // Step 1a: Send OTP to Current Registered Email
  const onSendCurrentEmailOtp = async ({ currentEmail: enteredCurrentEmail }) => {
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/admin/auth/profile/request-current-email-otp', {
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
      const { data } = await axiosInstance.post('/admin/auth/profile/verify-current-email', {
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
      const { data } = await axiosInstance.post('/admin/auth/profile/request-email-change', {
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
      const { data } = await axiosInstance.post('/admin/auth/profile/verify-email-change', {
        newEmail: enteredNewEmail,
        otp: emailOtp,
      });
      toast.success(data.message);
      if (data.admin) {
        dispatch(setAdmin(data.admin));
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

  const onUpdatePassword = async (values) => {
    try {
      const { data } = await axiosInstance.put('/admin/auth/update-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success(data.message);
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your profile image, contact details, verified email, and password.</p>
      </div>

      {/* Section 1: Avatar & Personal Information */}
      <form
        onSubmit={profileForm.handleSubmit(onSaveProfileSubmit, toastFirstFormError)}
        className="admin-profile-card"
        noValidate
      >
        <div>
          <h2>Avatar & Personal Information</h2>
          <p className="admin-card-sub">
            Update your profile image and administrator contact details.
          </p>
        </div>

        <div className="admin-identity-box">
          <div className="admin-avatar-preview-wrap">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={watchedName || 'Admin'}
                className="admin-identity-avatar"
              />
            ) : (
              <div className="admin-identity-avatar">
                {getInitials(watchedName || admin?.name)}
              </div>
            )}
            {previewUrl && (
              <button
                type="button"
                className="admin-btn-remove-photo"
                onClick={() => setShowRemoveImageModal(true)}
                disabled={savingProfile}
                aria-label="Remove profile photo"
                title="Remove profile photo"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>

          <div className="admin-identity-info">
            <div className="admin-identity-name">{watchedName || admin?.name || 'Admin User'}</div>
            <div className="admin-identity-email">{currentEmail}</div>
            <div className="admin-avatar-upload-actions">
              <label className="admin-btn-upload-photo">
                <Upload size={13} /> Upload New Photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              <span className="admin-avatar-size-hint">JPG, PNG, or WebP • Max 2MB</span>
            </div>
          </div>
        </div>

        <div className="admin-two-col-fields">
          <div className="admin-profile-field">
            <label htmlFor="admin-profile-name">Full Name *</label>
            <div
              className={`admin-field-input ${
                profileForm.formState.errors.name ? 'has-error' : ''
              }`}
            >
              <User className="admin-field-icon" size={15} />
              <input
                id="admin-profile-name"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                placeholder="Administrator name"
                aria-invalid={Boolean(profileForm.formState.errors.name)}
                {...profileForm.register('name', nameRules('Name is required'))}
              />
            </div>
            {profileForm.formState.errors.name && (
              <p className="admin-field-error">{profileForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className="admin-profile-field">
            <label htmlFor="admin-profile-phone">Phone Number</label>
            <div
              className={`admin-field-input ${
                profileForm.formState.errors.phone ? 'has-error' : ''
              }`}
            >
              <Phone className="admin-field-icon" size={15} />
              <input
                id="admin-profile-phone"
                type="tel"
                placeholder="+91 98470 12345"
                aria-invalid={Boolean(profileForm.formState.errors.phone)}
                {...profileForm.register('phone', optionalProfilePhoneRules())}
              />
            </div>
            {profileForm.formState.errors.phone && (
              <p className="admin-field-error">{profileForm.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="admin-card-actions">
          <button type="submit" disabled={savingProfile} className="btn-admin-save-profile">
            <Save size={15} />
            {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Section 2: Two-Step Email Verification */}
      <div className="admin-profile-card">
        <div>
          <h2>Email Address Verification</h2>
          <p className="admin-card-sub">
            Current verified email: <strong>{currentEmail}</strong>
          </p>
        </div>

        <div className="admin-email-change-box">
          {!currentEmailVerified ? (
            <form
              onSubmit={currentEmailForm.handleSubmit(onSendCurrentEmailOtp, toastFirstFormError)}
              noValidate
            >
              <div className="admin-email-step-header">
                <span className="admin-email-step-badge">Step 1 of 2</span>
                <label htmlFor="admin-current-email-verify" className="admin-email-step-title">
                  <Mail size={13} />
                  Verify Your Current Registered Email
                </label>
              </div>
              <div className="admin-inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="currentEmail"
                  control={currentEmailForm.control}
                  rules={emailRules('Enter your current registered email address')}
                  render={({ field }) => (
                    <input
                      id="admin-current-email-verify"
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
                      className={`admin-email-input ${
                        currentEmailForm.formState.errors.currentEmail ? 'has-error' : ''
                      }`}
                      disabled={emailLoading}
                      aria-invalid={Boolean(currentEmailForm.formState.errors.currentEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="admin-btn-secondary-outline"
                >
                  {emailLoading && !currentEmailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {currentEmailForm.formState.errors.currentEmail && (
                <p className="admin-field-error">
                  {currentEmailForm.formState.errors.currentEmail.message}
                </p>
              )}

              {currentEmailOtpSent && (
                <div className="admin-email-otp-verify-row" style={{ marginTop: '12px' }}>
                  <OtpInput
                    value={currentEmailOtp}
                    onChange={setCurrentEmailOtp}
                    disabled={emailLoading}
                    label="Current admin email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCurrentEmail}
                    disabled={emailLoading || currentEmailOtp.length !== 6}
                    className="admin-btn-orange-action"
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
              <div className="admin-email-verified-banner">
                <span className="admin-email-verified-status">
                  <CheckCircle2 size={15} />
                  Current email verified ({currentEmail})
                </span>
                <button
                  type="button"
                  onClick={handleRestartEmailChange}
                  disabled={emailLoading}
                  className="admin-email-restart-btn"
                >
                  Reset
                </button>
              </div>

              <div className="admin-email-step-header" style={{ marginTop: '12px' }}>
                <span className="admin-email-step-badge">Step 2 of 2</span>
                <label htmlFor="admin-new-email-verify" className="admin-email-step-title">
                  <Mail size={13} />
                  Enter & Verify Your New Email Address
                </label>
              </div>

              <div className="admin-inline-action-row" style={{ marginTop: '10px' }}>
                <Controller
                  name="newEmail"
                  control={newEmailForm.control}
                  rules={emailRules('Enter the new email address')}
                  render={({ field }) => (
                    <input
                      id="admin-new-email-verify"
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
                      className={`admin-email-input ${
                        newEmailForm.formState.errors.newEmail ? 'has-error' : ''
                      }`}
                      disabled={emailLoading}
                      aria-invalid={Boolean(newEmailForm.formState.errors.newEmail)}
                    />
                  )}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="admin-btn-secondary-outline"
                >
                  {emailLoading && !emailOtpSent ? 'Sending...' : 'Send Verification OTP'}
                </button>
              </div>
              {newEmailForm.formState.errors.newEmail && (
                <p className="admin-field-error">
                  {newEmailForm.formState.errors.newEmail.message}
                </p>
              )}

              {emailOtpSent && (
                <div className="admin-email-otp-verify-row" style={{ marginTop: '12px' }}>
                  <OtpInput
                    value={emailOtp}
                    onChange={setEmailOtp}
                    disabled={emailLoading}
                    label="New admin email 6-digit OTP"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmailChange}
                    disabled={emailLoading || emailOtp.length !== 6}
                    className="admin-btn-orange-action"
                  >
                    {emailLoading ? 'Updating...' : 'Verify & Update Email'}
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Section 3: Security & Password */}
      <form
        onSubmit={passwordForm.handleSubmit(onUpdatePassword, toastFirstFormError)}
        className="admin-profile-card"
        noValidate
      >
        <div>
          <h2>Security & Password</h2>
          <p className="admin-card-sub">
            Update your administrator password to keep the console protected.
          </p>
        </div>

        <div className="admin-profile-field">
          <label htmlFor="admin-current-password">Current Password</label>
          <div
            className={`admin-field-input ${
              passwordForm.formState.errors.currentPassword ? 'has-error' : ''
            }`}
          >
            <Lock className="admin-field-icon" size={15} />
            <input
              id="admin-current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              aria-invalid={Boolean(passwordForm.formState.errors.currentPassword)}
              {...passwordForm.register('currentPassword', {
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              className="admin-eye-btn"
              aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
            >
              {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {passwordForm.formState.errors.currentPassword && (
            <p className="admin-field-error">
              {passwordForm.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="admin-two-col-fields">
          <div className="admin-profile-field">
            <label htmlFor="admin-new-password">New Password</label>
            <div
              className={`admin-field-input ${
                passwordForm.formState.errors.newPassword ? 'has-error' : ''
              }`}
            >
              <Lock className="admin-field-icon" size={15} />
              <input
                id="admin-new-password"
                type={showNewPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Minimum 8 characters"
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
                onClick={() => setShowNewPassword((visible) => !visible)}
                className="admin-eye-btn"
                aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              >
                {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div className="admin-password-rules-row">
              <span className={hasMinMaxLen ? 'met' : ''}>• 8–64 chars</span>
              <span className={hasUpperLower ? 'met' : ''}>• Upper & lower</span>
              <span className={hasNumber ? 'met' : ''}>• Number</span>
              <span className={hasSymbol ? 'met' : ''}>• Special char</span>
            </div>
            {passwordForm.formState.errors.newPassword && (
              <p className="admin-field-error">
                {passwordForm.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="admin-profile-field">
            <label htmlFor="admin-confirm-password">Confirm New Password</label>
            <div
              className={`admin-field-input ${
                passwordForm.formState.errors.confirmPassword ? 'has-error' : ''
              }`}
            >
              <Lock className="admin-field-icon" size={15} />
              <input
                id="admin-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                maxLength={PASSWORD_MAX_LENGTH}
                placeholder="Re-enter new password"
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
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                className="admin-eye-btn"
                aria-label={
                  showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {passwordForm.formState.errors.confirmPassword && (
              <p className="admin-field-error">
                {passwordForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="admin-card-actions">
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="btn-admin-update-password"
          >
            <Lock size={15} />
            {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>

      {showRemoveImageModal && (
        <div
          className="admin-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowRemoveImageModal(false);
          }}
        >
          <div
            className="admin-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-remove-photo-title"
          >
            <div className="admin-profile-confirm-icon">
              <Trash2 size={23} />
            </div>
            <h2 id="admin-remove-photo-title">Remove photo?</h2>
            <p>Your profile photo will be removed when you save your changes.</p>
            <div className="admin-profile-confirm-actions">
              <button
                type="button"
                className="admin-profile-confirm-cancel"
                onClick={() => setShowRemoveImageModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-profile-confirm-submit"
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
          className="admin-profile-confirm-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !savingProfile) {
              setShowSaveProfileModal(false);
            }
          }}
        >
          <div
            className="admin-profile-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-save-profile-title"
            aria-describedby="admin-save-profile-description"
          >
            <div className="admin-profile-confirm-icon">
              <Save size={23} />
            </div>
            <h2 id="admin-save-profile-title">Save changes?</h2>
            <p id="admin-save-profile-description">
              Save your updated administrator profile information?
            </p>
            <div className="admin-profile-confirm-actions">
              <button
                type="button"
                className="admin-profile-confirm-cancel"
                onClick={() => setShowSaveProfileModal(false)}
                disabled={savingProfile}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-profile-confirm-submit"
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
