import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Award,
  ShoppingCart,
  RotateCcw,
  Users,
  Ticket,
  Gift,
  BarChart3,
  LogOut,
  LayoutGrid,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { logoutAdminState } from '../../redux/slices/authSlice';
import mobifysLogo from '../../assets/mobifys-logo.png';
import './AdminLayout.css';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: FolderTree },
  { name: 'Brands', path: '/admin/brands', icon: Award },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Returns', path: '/admin/returns', icon: RotateCcw },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Coupons & Deals', path: '/admin/coupons', icon: Ticket },
  { name: 'Referrals', path: '/admin/referrals', icon: Gift },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
];

export default function AdminLayout() {
  const { admin } = useSelector((state) => state.auth);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPage =
    pathname === '/admin/profile'
      ? 'Admin Profile'
      : navItems.find(
          (item) => pathname === item.path || pathname.startsWith(`${item.path}/`)
        )?.name || 'Dashboard';

  const adminName = admin?.name || 'Admin User';
  const adminInitials = adminName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    if (!isLogoutModalOpen && !isMobileNavOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isLogoutModalOpen && !isLoggingOut) {
          setIsLogoutModalOpen(false);
        } else if (isMobileNavOpen) {
          setIsMobileNavOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLogoutModalOpen, isLoggingOut, isMobileNavOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axiosInstance.post('/admin/auth/logout');
      dispatch(logoutAdminState());
      setIsLogoutModalOpen(false);
      toast.success('Logged out');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="admin-shell">
      {isMobileNavOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isMobileNavOpen ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="admin-brand-icon">
            <img src={mobifysLogo} alt="Mobifys" />
          </div>
          <div className="sidebar-brand-copy">
            <div className="sidebar-brand-name">
              mobifys<span style={{ color: '#ff5521' }}>.</span>
            </div>
            <div className="sidebar-brand-tag">ADMIN CONSOLE</div>
          </div>
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link active' : 'sidebar-link'
                }
              >
                <Icon size={17} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-mobile-menu-btn"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>

          <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
            <NavLink to="/admin/dashboard" className="topbar-console-link">
              <LayoutGrid size={14} />
              <span>Console</span>
            </NavLink>
            <ChevronRight size={16} aria-hidden="true" />
            <span className="topbar-current-page" aria-current="page">
              {currentPage}
            </span>
          </nav>

          <div className="topbar-actions">
            <Link
              to="/admin/profile"
              className={`admin-profile-pill ${pathname === '/admin/profile' ? 'is-active' : ''}`}
              title="Open Admin Profile"
            >
              {admin?.profileImage ? (
                <img src={admin.profileImage} alt="" className="admin-avatar-circle" />
              ) : (
                <span className="admin-avatar-circle">{adminInitials}</span>
              )}
              <span className="admin-profile-copy">
                <span className="admin-profile-name">{adminName}</span>
                <span className="admin-role-badge">ADMIN</span>
              </span>
            </Link>

            <span className="admin-topbar-divider" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="btn-admin-logout"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {/* Logout confirmation modal */}
      {isLogoutModalOpen && (
        <div
          className="admin-logout-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isLoggingOut) {
              setIsLogoutModalOpen(false);
            }
          }}
        >
          <div
            className="admin-logout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-logout-title"
            aria-describedby="admin-logout-description"
          >
            <div className="admin-logout-icon">
              <LogOut size={23} />
            </div>
            <h2 id="admin-logout-title">Sign out?</h2>
            <p id="admin-logout-description">
              Are you sure you want to sign out of the Admin Console?
            </p>
            <div className="admin-logout-actions">
              <button
                type="button"
                className="admin-logout-cancel"
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-logout-confirm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}