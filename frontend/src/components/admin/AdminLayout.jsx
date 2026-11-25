import { NavLink, Outlet, useNavigate } from 'react-router-dom';
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
  ShoppingBag,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { logoutAdminState } from '../../redux/slices/authSlice';
import './AdminLayout.css';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: FolderTree },
  { name: 'Brands', path: '/admin/brands', icon: Award },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Returns', path: '/admin/returns', icon: RotateCcw },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Coupons & Deals', path: '/admin/coupons', icon: Ticket },
  { name: 'Referrals', path: '/admin/referrals', icon: Gift },
  { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
];

export default function AdminLayout() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/admin/auth/logout');
      dispatch(logoutAdminState());
      toast.success('Logged out');
      navigate('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="admin-brand-icon">
            <ShoppingBag size={18} />
          </div>
          <div>
            <div className="sidebar-brand-name">mobifys.</div>
            <div className="sidebar-brand-tag">ADMIN CONSOLE</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
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
          <div className="topbar-breadcrumb">
            Console › <span>Admin Portal</span>
          </div>

          <div className="topbar-actions">
            <div className="admin-profile-pill">
              <div className="admin-avatar-circle">AD</div>
              <div>
                <div className="admin-profile-name">{admin?.name || 'Admin User'}</div>
                <span className="admin-role-badge">SUPER ADMIN</span>
              </div>
            </div>

            <button onClick={handleLogout} className="btn-admin-logout">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}