import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Upload, Save, Mail, Lock, ArrowLeft, Trash2, Home, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import './EditProfile.css';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);
  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);
  const [showSaveProfileModal, setShowSaveProfileModal] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Email Change with OTP
  const [newEmail, setNewEmail] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  // Change Password
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/user/profile')
      .then(({ data }) => {
        setName(data.user.name || '');
        setPhone(data.user.phone || '');
        setCurrentEmail(data.user.email || '');
        setPreviewUrl(data.user.profileImage || '');
      })
      .catch(() => toast.error('Failed to load profile data'));
  }, []);

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
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Name cannot be empty');
    setShowSaveProfileModal(true);
  };

  const confirmSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('phone', phone.trim());
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

  // Step 1: Request OTP for New Email
  const handleSendEmailOtp = async () => {
    if (!newEmail.trim()) return toast.error('Enter the new email address');
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/request-email-change', {
        newEmail,
      });
      toast.success(data.message);
      setEmailOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification OTP');
    } finally {
      setEmailLoading(false);
    }
  };

  // Step 2: Verify OTP & Update Email
  const handleVerifyEmailChange = async () => {
    if (!emailOtp.trim()) return toast.error('Enter the 6-digit OTP sent to your new email');
    try {
      setEmailLoading(true);
      const { data } = await axiosInstance.post('/user/profile/verify-email-change', {
        newEmail,
        otp: emailOtp,
      });
      toast.success(data.message);
      setCurrentEmail(data.email);
      setNewEmail('');
      setEmailOtp('');
      setEmailOtpSent(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setEmailLoading(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setPasswordLoading(true);
      const { data } = await axiosInstance.put('/user/profile/change-password', passwords);
      toast.success(data.message);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
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
      <form onSubmit={handleSaveProfile} className="edit-section-card">
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
              <div className="avatar-preview-lg">{name?.slice(0, 2).toUpperCase() || 'U'}</div>
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
          <div className="edit-field-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-input"
              required
            />
          </div>

          <div className="edit-field-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98470 12345"
              className="edit-input"
            />
          </div>
        </div>

        <div className="edit-bottom-bar">
          <Link to="/profile" className="btn-secondary-outline">
            <ArrowLeft size={13} style={{ verticalAlign: 'middle' }} /> Discard Changes
          </Link>
          <button type="submit" disabled={savingProfile} className="btn-orange-action">
            <Save size={14} /> {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>

      {/* Section 2: Email Edit with OTP Verification */}
      <div className="edit-section-card">
        <div>
          <h2>Email Address Verification</h2>
          <p className="edit-section-sub">
            Current verified email: <strong>{currentEmail}</strong>
          </p>
        </div>

        <div className="email-change-box">
          <label style={{ fontSize: '12px', fontWeight: 600 }}>
            <Mail size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Change Email Address (Requires OTP Verification)
          </label>
          <div className="inline-action-row">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="edit-input"
            />
            <button
              type="button"
              onClick={handleSendEmailOtp}
              disabled={emailLoading}
              className="btn-secondary-outline"
            >
              {emailLoading ? 'Sending...' : 'Send Verification OTP'}
            </button>
          </div>

          {emailOtpSent && (
            <div className="inline-action-row" style={{ marginTop: '6px' }}>
              <input
                type="text"
                maxLength={6}
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="edit-input"
              />
              <button
                type="button"
                onClick={handleVerifyEmailChange}
                disabled={emailLoading}
                className="btn-orange-action"
              >
                Verify & Update Email
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Change Password */}
      <form onSubmit={handleChangePassword} className="edit-section-card">
        <div>
          <h2>Security & Master Authentication</h2>
          <p className="edit-section-sub">Update your password to keep your account protected.</p>
        </div>

        <div className="edit-field-group">
          <label>Current Password</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            placeholder="Enter current password"
            className="edit-input"
          />
        </div>

        <div className="two-col-fields">
          <div className="edit-field-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              placeholder="Minimum 8 characters"
              className="edit-input"
            />
          </div>

          <div className="edit-field-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              placeholder="Re-enter new password"
              className="edit-input"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={passwordLoading} className="btn-orange-action">
            <Lock size={14} /> {passwordLoading ? 'Updating...' : 'Update Password'}
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
                <Save size={14} />
                {savingProfile ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}