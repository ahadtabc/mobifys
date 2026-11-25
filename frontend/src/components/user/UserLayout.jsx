import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Mail,
  Clock,
  ChevronDown,
  Package,
  Wallet,
  Gift,
  Headset,
  LogOut,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { logoutUserState } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import './UserLayout.css';

export default function UserLayout() {
  const { user } = useSelector((state) => state.auth);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const accountMenuRef = useRef(null);
  const accountMenuTriggerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  useEffect(() => {
    if (!user?._id) {
      setDefaultAddress(null);
      return undefined;
    }

    let active = true;
    const fetchDefaultAddress = async () => {
      try {
        const { data } = await axiosInstance.get('/user/addresses');
        if (active) {
          setDefaultAddress(data.addresses.find((address) => address.isDefault) || null);
        }
      } catch {
        if (active) {
          setDefaultAddress(null);
          toast.error('Could not load your delivery address');
        }
      }
    };

    fetchDefaultAddress();
    window.addEventListener('addresses-updated', fetchDefaultAddress);

    return () => {
      active = false;
      window.removeEventListener('addresses-updated', fetchDefaultAddress);
    };
  }, [user?._id]);

  useEffect(() => {
    if (!isAccountMenuOpen && !isLogoutModalOpen) return undefined;

    const handlePointerDown = (event) => {
      if (isAccountMenuOpen && !isLogoutModalOpen && !accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isLogoutModalOpen) {
          setIsLogoutModalOpen(false);
        } else {
          setIsAccountMenuOpen(false);
          accountMenuTriggerRef.current?.focus();
        }
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen, isLogoutModalOpen]);

  useEffect(() => {
    const openLogoutConfirmation = () => {
      setIsAccountMenuOpen(false);
      setIsLogoutModalOpen(true);
    };

    window.addEventListener('open-user-logout-confirmation', openLogoutConfirmation);
    return () => {
      window.removeEventListener('open-user-logout-confirmation', openLogoutConfirmation);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axiosInstance.post('/user/auth/logout');
      dispatch(logoutUserState());
      setIsAccountMenuOpen(false);
      setIsLogoutModalOpen(false);
      toast.success('Signed out');
      navigate('/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeAccountMenu = () => setIsAccountMenuOpen(false);

  const handleCopyReferralCode = async () => {
    if (!user?.referralCode) return;

    try {
      await navigator.clipboard.writeText(user.referralCode);
      toast.success('Referral code copied');
    } catch {
      toast.error('Could not copy the referral code');
    }
  };

  return (
    <div className="store-shell">
      <header className="store-header">
        <div className="store-topbar">
          <Link to="/" className="store-brand">
            <div className="store-brand-badge">
              <img src={mobifysLogo} alt="" />
            </div>
            <span className="store-brand-name">
              mobifys<span className="store-brand-dot">.</span>
            </span>
          </Link>

          <div className="store-search-bar">
            <input
              type="text"
              placeholder="Search humanoid, vacuum, pets, AI robots..."
            />
            <button type="button" className="store-search-btn">
              <Search size={15} />
            </button>
          </div>

          <div className="store-delivery-actions">
            <Link
              to={user ? '/profile/addresses' : '/login'}
              className="store-deliver-box"
              title={defaultAddress ? `${defaultAddress.address}, ${defaultAddress.city} ${defaultAddress.pin}` : 'Set delivery address'}
            >
              <MapPin size={16} color="#ff5722" />
              <div>
                <div className="store-deliver-label">DELIVER TO</div>
                <div className="store-deliver-city">
                  {defaultAddress
                    ? `${defaultAddress.city} · ${defaultAddress.pin}`
                    : user
                      ? 'Add delivery address'
                      : 'Set delivery location'}
                </div>
              </div>
            </Link>

            <span className="store-header-divider" aria-hidden="true" />

            <div className="store-header-actions">
              <Link to="/profile" className="header-icon-btn" title="Wishlist">
                <Heart size={20} />
                <span className="icon-count-badge">{user?.wishlist?.length || 0}</span>
              </Link>

              {user ? (
                <div className="account-menu-wrap" ref={accountMenuRef}>
                  <button
                    ref={accountMenuTriggerRef}
                    type="button"
                    className="btn-account-pill"
                    aria-expanded={isAccountMenuOpen}
                    aria-controls="account-menu-panel"
                    onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                  >
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="" className="account-pill-avatar" />
                    ) : (
                      <span className="account-pill-avatar">{initials}</span>
                    )}
                    <span className="account-pill-name">{user.name}</span>
                    <ChevronDown
                      className={`account-pill-chevron${isAccountMenuOpen ? ' is-open' : ''}`}
                      size={14}
                    />
                  </button>

                  {isAccountMenuOpen && (
                    <section
                      className="account-menu-panel"
                      id="account-menu-panel"
                      aria-label="Your Mobifys account"
                    >
                      <div className="account-menu-identity">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt=""
                            className="account-menu-avatar"
                          />
                        ) : (
                          <span className="account-menu-avatar">{initials}</span>
                        )}
                        <div className="account-menu-identity-copy">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>

                      <nav className="account-menu-links" aria-label="Account options">
                        <Link to="/profile" onClick={closeAccountMenu}>
                          <User size={19} />
                          <span>My Profile</span>
                        </Link>
                        <Link to="/profile/orders" onClick={closeAccountMenu}>
                          <Package size={19} />
                          <span>My Orders</span>
                        </Link>
                        <Link to="/profile/wishlist" onClick={closeAccountMenu}>
                          <Heart size={19} />
                          <span>My Wishlist</span>
                          {user.wishlist?.length > 0 && (
                            <span className="account-menu-badge">{user.wishlist.length}</span>
                          )}
                        </Link>
                        <Link to="/profile#wallet-section" onClick={closeAccountMenu}>
                          <Wallet size={19} />
                          <span>My Wallet</span>
                          <strong className="account-menu-value">
                            ₹{(user.walletBalance || 0).toLocaleString('en-IN')}.00
                          </strong>
                        </Link>
                        <div className="account-menu-referral-option">
                          <Link to="/profile#referral-section" onClick={closeAccountMenu}>
                            <Gift size={19} />
                            <span>Refer &amp; Earn</span>
                          </Link>
                          {user.referralCode && (
                            <button
                              type="button"
                              className="account-menu-copy-code"
                              onClick={handleCopyReferralCode}
                              aria-label={`Copy referral code ${user.referralCode}`}
                              title="Copy referral code"
                            >
                              <span>{user.referralCode}</span>
                              <Copy size={14} />
                            </button>
                          )}
                        </div>
                      
                        <a href="mailto:support@mobifys.in" onClick={closeAccountMenu}>
                          <Headset size={19} />
                          <span>Support</span>
                        </a>
                      </nav>

                      <div className="account-menu-footer">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-account-pill btn-account-login">
                  <User size={15} />
                  <span>Login</span>
                </Link>
              )}

              <Link to="/" className="header-icon-btn header-cart-btn">
                <div style={{ position: 'relative', display: 'flex' }}>
                  <ShoppingCart size={32} />
                  <span className="icon-count-badge">0</span>
                </div>
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>

        <nav className="store-subnav">
          <div className="store-subnav-inner">
            <div className="subnav-left">
              <span className="categories-pill">
                <Menu size={14} /> Categories ›
              </span>
              <Link to="/" className="subnav-link">Humanoids</Link>
              <Link to="/" className="subnav-link">Vacuums</Link>
              <Link to="/" className="subnav-link">Pets</Link>
              <Link to="/" className="subnav-link">Toys</Link>
            </div>
            <div className="subnav-right">
              <Link to="/" className="subnav-link">Contact</Link>
              <Link to="/" className="subnav-link">About Us</Link>
            </div>
          </div>
        </nav>
      </header>

      {isLogoutModalOpen && (
        <div
          className="account-logout-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) {
              setIsLogoutModalOpen(false);
            }
          }}
        >
          <div
            className="account-logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-logout-title"
            aria-describedby="account-logout-description"
          >
            <div className="account-logout-icon">
              <LogOut size={23} />
            </div>
            <h2 id="account-logout-title">Sign out?</h2>
            <p id="account-logout-description">Are you sure you want to sign out?</p>
            <div className="account-logout-actions">
              <button
                type="button"
                className="account-logout-cancel"
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="account-logout-confirm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut size={15} />
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <div className="store-footer-grid">
          <div>
            <div className="store-brand">
              <div className="store-brand-badge">
                <img src={mobifysLogo} alt="" />
              </div>
              <span className="store-brand-name" style={{ color: '#ffffff' }}>
                mobifys<span className="store-brand-dot">.</span>
              </span>
            </div>
            <p className="footer-tagline">
              Smart robots for a smarter future. India's premier robotics marketplace delivering
              engineering excellence.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">EXPLORE</h4>
            <ul className="footer-links-list">
              <li>Humanoid & Quadruped</li>
              <li>Cleaning Vacuums</li>
              <li>AI Desktop Pets</li>
              <li>Flash Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="footer-links-list">
              <li>
                <Mail size={14} color="#ff5722" /> support@mobifys.in
              </li>
              <li>
                <Clock size={14} color="#ff5722" /> Mon-Sat 9AM-8PM IST
              </li>
              <li>
                <MapPin size={14} color="#ff5722" /> Cochin, Kerala, India
              </li>
            </ul>
          </div>
        </div>

        <div className="store-footer-bottom">
          <div>© 2026 mobifys. All rights reserved.</div>
          <div>Privacy Policy • Terms</div>
          <div className="payment-badges">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">RUPAY</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}