import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { logoutUserState, setAdmin, setAuthInitialized, setUser } from './redux/slices/authSlice';

// Core User Shell & Entry Pages
import UserLayout from './components/user/UserLayout';
import HomePage from './pages/user/HomePage';
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';
import UserProfile from './pages/user/UserProfile';

// Lazy-loaded Secondary User Pages
const VerifyEmailOtp = lazy(() => import('./pages/user/VerifyEmailOtp'));
const UserForgotPassword = lazy(() => import('./pages/user/UserForgotPassword'));
const UserVerifyResetOtp = lazy(() => import('./pages/user/UserVerifyResetOtp'));
const UserResetPassword = lazy(() => import('./pages/user/UserResetPassword'));
const UserComingSoon = lazy(() => import('./pages/user/UserComingSoon'));
const EditProfile = lazy(() => import('./pages/user/EditProfile'));
const ManageAddresses = lazy(() => import('./pages/user/ManageAddresses'));
const AddressFormPage = lazy(() => import('./pages/user/AddressFormPage'));

// Lazy-loaded Admin Console Bundle
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminForgotPassword = lazy(() => import('./pages/admin/AdminForgotPassword'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const UsersList = lazy(() => import('./pages/admin/UsersList'));
const UserDetails = lazy(() => import('./pages/admin/UserDetails'));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        padding: '48px 24px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#6b7280',
      }}
    >
      Loading...
    </div>
  );
}

function ProtectedUserRoute({ children }) {
  const { user, initialized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [verifiedPathKey, setVerifiedPathKey] = useState(null);
  const currentPathKey = `${location.pathname}${location.search}`;
  const userId = user?._id;
  const isBlockedUser = Boolean(user && (user.isBlocked || user.status === 'blocked'));

  useEffect(() => {
    if (!initialized || !userId || isBlockedUser) return undefined;

    let active = true;
    axiosInstance
      .get('/user/auth/me')
      .then(({ data }) => {
        if (!active) return;
        if (data?.user?.isBlocked || data?.user?.status === 'blocked') {
          dispatch(logoutUserState());
          return;
        }
        dispatch(setUser(data.user));
        setVerifiedPathKey(currentPathKey);
      })
      .catch(() => {
        if (active) {
          setVerifiedPathKey(currentPathKey);
        }
      });

    return () => {
      active = false;
    };
  }, [initialized, userId, isBlockedUser, currentPathKey, dispatch]);

  if (!initialized) return <RouteFallback />;
  if (!user || isBlockedUser) return <Navigate to="/login" replace />;
  if (verifiedPathKey !== currentPathKey) return <RouteFallback />;
  return children;
}

function SessionMonitor() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const lastCheckRef = useRef(0);

  useEffect(() => {
    const handleForcedLogout = (event) => {
      const scope = event.detail?.scope;
      if (scope === 'admin') {
        if (!location.pathname.startsWith('/admin/login')) {
          navigate('/admin/login', { replace: true });
        }
      } else if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('account-blocked-logout', handleForcedLogout);
    return () => window.removeEventListener('account-blocked-logout', handleForcedLogout);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!user?._id) return undefined;

    const verifyActiveUser = () => {
      const now = Date.now();
      if (now - lastCheckRef.current < 3000) return;
      lastCheckRef.current = now;
      axiosInstance.get('/user/auth/me').catch(() => {});
    };

    window.addEventListener('focus', verifyActiveUser);
    return () => window.removeEventListener('focus', verifyActiveUser);
  }, [user?._id]);

  return null;
}

function ProtectedAdminRoute({ children }) {
  const { admin, initialized } = useSelector((state) => state.auth);
  if (!initialized) return <RouteFallback />;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      axiosInstance.get('/user/auth/me'),
      axiosInstance.get('/admin/auth/me'),
    ]).then(([userRes, adminRes]) => {
      if (!active) return;
      if (userRes.status === 'fulfilled') {
        dispatch(setUser(userRes.value.data.user));
      }
      if (adminRes.status === 'fulfilled') {
        dispatch(setAdmin(adminRes.value.data.admin));
      }
      dispatch(setAuthInitialized());
    });

    return () => {
      active = false;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <SessionMonitor />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* User Storefront Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="signup" element={<UserSignup />} />
            <Route path="verify-otp" element={<VerifyEmailOtp />} />
            <Route path="forgot-password" element={<UserForgotPassword />} />
            <Route path="forgot-password/verify-otp" element={<UserVerifyResetOtp />} />
            <Route path="reset-password" element={<UserResetPassword />} />

            {/* Protected User Profile & Address Routes */}
            <Route
              path="profile"
              element={
                <ProtectedUserRoute>
                  <UserProfile />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/orders"
              element={
                <ProtectedUserRoute>
                  <UserComingSoon title="My Orders" />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/wishlist"
              element={
                <ProtectedUserRoute>
                  <UserComingSoon title="My Wishlist" />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/edit"
              element={
                <ProtectedUserRoute>
                  <EditProfile />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses"
              element={
                <ProtectedUserRoute>
                  <ManageAddresses />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses/new"
              element={
                <ProtectedUserRoute>
                  <AddressFormPage />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="profile/addresses/edit/:id"
              element={
                <ProtectedUserRoute>
                  <AddressFormPage />
                </ProtectedUserRoute>
              }
            />
          </Route>

          {/* Admin Console Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="dashboard" element={<div>Dashboard Overview</div>} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="*" element={<div>Module coming soon</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
