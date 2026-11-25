import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { setAdmin } from './redux/slices/authSlice';

import AdminLogin from './pages/admin/AdminLogin';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import AdminLayout from './components/admin/AdminLayout';
import CustomersList from './pages/admin/CustomersList';
import CustomerDetails from './pages/admin/CustomerDetails';

function ProtectedAdminRoute({ children }) {
  const { admin } = useSelector((state) => state.auth);
  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get('/admin/auth/me')
      .then((res) => dispatch(setAdmin(res.data.admin)))
      .catch(() => {});
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
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
          <Route index element={<Navigate to="customers" replace />} />
          <Route path="dashboard" element={<div>Dashboard Overview</div>} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="*" element={<div>Module coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}