import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  User,
  MapPin,
  Wallet,
  ShieldCheck,
  Edit3,
  LogOut,
  ArrowRight,
  Gift,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { setUser } from '../../redux/slices/authSlice';
import copyTextToClipboard from '../../utils/copyTextToClipboard';
import './UserProfile.css';

export default function UserProfile() {
  const authUser = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(authUser || null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(!authUser);

  const dispatch = useDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    let active = true;

    axiosInstance
      .get('/user/profile')
      .then(({ data }) => {
        if (!active) return;
        setProfile(data.user);
        setAddresses(data.addresses);
        dispatch(setUser(data.user));
      })
      .catch((err) => {
        if (active) {
          toast.error(err.response?.data?.message || 'Failed to load profile');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading || !profile || !hash) return undefined;
    const frameId = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => cancelAnimationFrame(frameId);
  }, [hash, loading, profile]);

  const handleCopyReferralCode = async () => {
    try {
      await copyTextToClipboard(profile.referralCode);
      toast.success('Referral code copied');
    } catch {
      toast.error('Could not copy the referral code');
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
          <ShieldCheck size={14} /> Account Security
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
            {profile.createdAt && (
              <div className="profile-member-since">
                Member since{' '}
                {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>

        <div className="profile-hero-actions">
          <Link to="/profile/edit" className="btn-edit-profile">
            <Edit3 size={14} /> Edit Profile
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-user-logout-confirmation'))}
            className="btn-user-signout"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="profile-cards-grid">
        {/* Wallet & Referral Card */}
        <div className="profile-section-card" id="wallet-section">
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge">
                <Wallet size={18} />
              </div>
              <span className="card-pill-tag">
                ₹{(profile.walletBalance || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <h3>My Wallet</h3>
            <p>
              Available Balance:{' '}
              <strong>₹{(profile.walletBalance || 0).toLocaleString('en-IN')}.00</strong> • Instant
              checkout active for hardware orders.
            </p>
          </div>
          <div id="referral-section" className="profile-referral-line">
            <Gift size={14} color="#ff5722" />
            <span>Share referral code:</span>
            <strong>{profile.referralCode}</strong>
            {profile.referralCode && (
              <button
                type="button"
                className="profile-copy-referral"
                onClick={handleCopyReferralCode}
                aria-label={`Copy referral code ${profile.referralCode}`}
                title="Copy referral code"
              >
                <Copy size={14} />
                Copy
              </button>
            )}
          </div>
        </div>

        {/* Saved Delivery Locations Card */}
        <div className="profile-section-card">
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge">
                <MapPin size={18} />
              </div>
              <span className="card-pill-tag">{addresses.length} Saved</span>
            </div>
            <h3>Saved Locations</h3>
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
                    {[addr.address, addr.street, addr.city, addr.state].filter(Boolean).join(', ')} - {addr.pin}
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
          <div className="profile-card-content">
            <div className="card-top-row">
              <div className="card-icon-badge green">
                <ShieldCheck size={18} />
              </div>
              <span className="card-pill-tag green">ACTIVE</span>
            </div>
            <h3> Account Security</h3>
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