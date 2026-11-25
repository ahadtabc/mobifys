import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  User,
  MapPin,
  Wallet,
  ShieldCheck,
  Edit3,
  LogOut,
  ArrowRight,
  Gift,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser, logoutUserState } from '../../redux/slices/authSlice';
import './UserProfile.css';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get('/user/profile');
        setProfile(data.user);
        setAddresses(data.addresses);
        dispatch(setUser(data.user));
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/auth/logout');
      dispatch(logoutUserState());
      toast.success('Signed out');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p style={{ fontSize: '13px', color: '#6b7280' }}>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) return null;

  const initials = profile.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-container">
      {/* Sub-navigation Tabs */}
      <div className="profile-subnav-tabs">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <User size={14} /> My Profile
        </NavLink>
        <NavLink
          to="/profile/addresses"
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <MapPin size={14} /> Addresses ({addresses.length})
        </NavLink>
        <NavLink
          to="/profile/edit"
          className={({ isActive }) =>
            isActive ? 'profile-tab-link active' : 'profile-tab-link'
          }
        >
          <ShieldCheck size={14} /> Edit Profile & Security
        </NavLink>
      </div>

      <div className="profile-page-title">
        <h1>My Profile</h1>
        <p>Manage your personal details, delivery locations, wallet, and account security.</p>
      </div>

      {/* User Identity Card */}
      <div className="profile-hero-card">
        <div className="profile-identity-left">
          {profile.profileImage ? (
            <img src={profile.profileImage} alt={profile.name} className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-circle">{initials}</div>
          )}

          <div>
            <div className="profile-name-line">
              <h2>{profile.name}</h2>
              <span className="verified-customer-pill">● Verified Customer</span>
            </div>
            <div className="profile-contact-meta">
              {profile.phone ? `${profile.phone} • ` : ''}
              {profile.email}
            </div>
            <div className="profile-member-since">
              Member since{' '}
              {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })}{' '}
              • Referral Code: <strong>{profile.referralCode}</strong>
            </div>
          </div>
        </div>

        <div className="profile-hero-actions">
          <Link to="/profile/edit" className="btn-edit-profile">
            <Edit3 size={14} /> Edit Profile
          </Link>
          <button type="button" onClick={handleLogout} className="btn-user-signout">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="profile-cards-grid">
        {/* Wallet & Referral Card */}
        <div className="profile-section-card">
          <div>
            <div className="card-top-row">
              <div className="card-icon-badge">
                <Wallet size={18} />
              </div>
              <span className="card-pill-tag">
                ₹{(profile.walletBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <h3>My Robotics Wallet</h3>
            <p>
              Available Balance:{' '}
              <strong>₹{(profile.walletBalance || 0).toLocaleString('en-IN')}.00</strong> • Instant
              checkout active for hardware orders.
            </p>
          </div>
          <div style={{ fontSize: '12px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Gift size={14} color="#ff5722" /> Share referral code:{' '}
            <strong>{profile.referralCode}</strong>
          </div>
        </div>

        {/* Saved Delivery Locations Card */}
        <div className="profile-section-card">
          <div>
            <div className="card-top-row">
              <div className="card-icon-badge">
                <MapPin size={18} />
              </div>
              <span className="card-pill-tag">{addresses.length} Saved</span>
            </div>
            <h3>Saved Delivery Locations</h3>
            {addresses.length === 0 ? (
              <p>No delivery addresses saved yet. Add one for faster checkout.</p>
            ) : (
              addresses.slice(0, 2).map((addr) => (
                <div key={addr._id} className="saved-address-preview">
                  <strong>
                    {addr.label}
                    {addr.isDefault && <span className="default-chip">Default</span>}
                  </strong>
                  <div style={{ color: '#6b7280', marginTop: '2px' }}>
                    {addr.address}, {addr.city} - {addr.pin}
                  </div>
                </div>
              ))
            )}
          </div>
          <Link to="/profile/addresses" className="card-orange-link">
            Manage Addresses <ArrowRight size={14} />
          </Link>
        </div>

        {/* Account Security Card */}
        <div className="profile-section-card">
          <div>
            <div className="card-top-row">
              <div className="card-icon-badge green">
                <ShieldCheck size={18} />
              </div>
              <span className="card-pill-tag green">ACTIVE</span>
            </div>
            <h3>Security & Credentials</h3>
            <p>
              Update your profile photo, verify a new email address with OTP, or change your
              account password anytime.
            </p>
          </div>
          <Link to="/profile/edit" className="card-orange-link">
            Change Password & Email <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}