import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShoppingBag,
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  User,
  Menu,
  Mail,
  Clock,
} from 'lucide-react';
import './UserLayout.css';

export default function UserLayout() {
  const { user } = useSelector((state) => state.auth);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  return (
    <div className="store-shell">
      <header className="store-header">
        <div className="store-topbar">
          <Link to="/" className="store-brand">
            <div className="store-brand-badge">
              <ShoppingBag size={18} />
            </div>
            <span className="store-brand-name">mobifys.</span>
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

          <div className="store-deliver-box">
            <MapPin size={16} color="#ff5722" />
            <div>
              <div className="store-deliver-label">DELIVER TO</div>
              <div className="store-deliver-city">Malappuram 679338</div>
            </div>
          </div>

          <div className="store-header-actions">
            <Link to="/profile" className="header-icon-btn" title="Wishlist">
              <Heart size={20} />
              <span className="icon-count-badge">{user?.wishlist?.length || 0}</span>
            </Link>

            {user ? (
              <Link to="/profile" className="btn-account-pill">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="account-pill-avatar" />
                ) : (
                  <span className="account-pill-avatar">{initials}</span>
                )}
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="btn-account-pill">
                <User size={15} />
                <span>Login</span>
              </Link>
            )}

            <Link to="/" className="header-icon-btn">
              <div style={{ position: 'relative', display: 'flex' }}>
                <ShoppingCart size={20} />
                <span className="icon-count-badge">0</span>
              </div>
              <span>Cart</span>
            </Link>
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

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <div className="store-footer-grid">
          <div>
            <div className="store-brand">
              <div className="store-brand-badge">
                <ShoppingBag size={18} />
              </div>
              <span className="store-brand-name" style={{ color: '#ffffff' }}>
                mobifys.
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