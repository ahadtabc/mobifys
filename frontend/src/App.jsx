import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { setAdmin, setUser } from './redux/slices/authSlice';

// User Components & Pages
import UserLayout from './components/user/UserLayout';
import HomePage from './pages/user/HomePage';
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';
import VerifyEmailOtp from './pages/user/VerifyEmailOtp';
import UserForgotPassword from './pages/user/UserForgotPassword';
import UserProfile from './pages/user/UserProfile';
import UserComingSoon from './pages/user/UserComingSoon';
import EditProfile from './pages/user/EditProfile';
import ManageAddresses from './pages/user/ManageAddresses';
import AddressFormPage from './pages/user/AddressFormPage';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import UsersList from './pages/admin/UsersList';
import UserDetails from './pages/admin/UserDetails';

function ProtectedUserRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
}

function ProtectedAdminRoute({ children }) {
  const { admin } = useSelector((state) => state.auth);
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function LegacyUserDetailsRedirect() {
  const { id } = useParams();
  return <Navigate to={`/admin/users/${id}`} replace />;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get('/user/auth/me')
      .then((res) => dispatch(setUser(res.data.user)))
      .catch(() => {});

    axiosInstance
      .get('/admin/auth/me')
      .then((res) => dispatch(setAdmin(res.data.admin)))
      .catch(() => {});
  }, [dispatch]);

  return (
    <BrowserRouter>
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
          <Route path="customers/:id" element={<LegacyUserDetailsRedirect />} />
          <Route path="*" element={<div>Module coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}