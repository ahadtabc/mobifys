import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { setAdmin, setAuthInitialized, setUser } from './redux/slices/authSlice';

// Core User Shell & Entry Pages
import UserLayout from './components/user/UserLayout';
import HomePage from './pages/user/HomePage';
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';
import UserProfile from './pages/user/UserProfile';

// Lazy-loaded Secondary User Pages
const VerifyEmailOtp = lazy(() => import('./pages/user/VerifyEmailOtp'));
const UserForgotPassword = lazy(() => import('./pages/user/UserForgotPassword'));
const UserComingSoon = lazy(() => import('./pages/user/UserComingSoon'));
const EditProfile = lazy(() => import('./pages/user/EditProfile'));
const ManageAddresses = lazy(() => import('./pages/user/ManageAddresses'));
const AddressFormPage = lazy(() => import('./pages/user/AddressFormPage'));

// Lazy-loaded Admin Console Bundle
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminForgotPassword = lazy(() => import('./pages/admin/AdminForgotPassword'));
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
  if (!initialized) return <RouteFallback />;
  return user ? children : <Navigate to="/login" replace />;
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
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* User Storefront Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="signup" element={<UserSignup />} />
            <Route path="verify-otp" element={<VerifyEmailOtp />} />
            <Route path="forgot-password" element={<UserForgotPassword />} />

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
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="customers" element={<Navigate to="/admin/users" replace />} />
            <Route path="customers/:id" element={<UserDetails />} />
            <Route path="*" element={<div>Module coming soon</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
