import axios from 'axios';
import toast from 'react-hot-toast';
import { store } from '../redux/store';
import { logoutAdminState, logoutUserState } from '../redux/slices/authSlice';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const refreshLocks = {
  user: null,
  admin: null,
};

const blockedToastTimestamps = {
  user: 0,
  admin: 0,
};

const AUTH_SKIP_PATHS = [
  '/login',
  '/signup',
  '/refresh',
  '/logout',
  '/forgot-password',
  '/reset-password',
  '/verify-',
];

const isBlockedResponse = (error) =>
  error?.response?.status === 403 &&
  error?.response?.data?.code === 'ACCOUNT_BLOCKED';

const forceLogoutBlockedScope = (scope, message) => {
  const authState = store.getState().auth;
  const wasLoggedIn =
    scope === 'admin' ? Boolean(authState.admin) : Boolean(authState.user);

  if (scope === 'admin') {
    store.dispatch(logoutAdminState());
  } else {
    store.dispatch(logoutUserState());
  }

  const now = Date.now();
  if (wasLoggedIn && now - blockedToastTimestamps[scope] > 2000) {
    blockedToastTimestamps[scope] = now;
    toast.error(message || 'Your account has been blocked. Contact Mobifys support.');
  }

  window.dispatchEvent(
    new CustomEvent('account-blocked-logout', {
      detail: { scope, message },
    })
  );
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';
    const scope = url.startsWith('/admin') ? 'admin' : 'user';
    const isAuthSkipPath = AUTH_SKIP_PATHS.some((path) => url.includes(path));

    if (isBlockedResponse(error) && !isAuthSkipPath) {
      error.isBlockedLogout = true;
      forceLogoutBlockedScope(scope, error.response?.data?.message);
      return Promise.reject(error);
    }

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthSkipPath
    ) {
      return Promise.reject(error);
    }

    const refreshEndpoint =
      scope === 'admin' ? '/admin/auth/refresh' : '/user/auth/refresh';

    originalRequest._retry = true;

    try {
      if (!refreshLocks[scope]) {
        refreshLocks[scope] = axiosInstance
          .post(refreshEndpoint)
          .finally(() => {
            refreshLocks[scope] = null;
          });
      }

      await refreshLocks[scope];
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (isBlockedResponse(refreshError)) {
        refreshError.isBlockedLogout = true;
        forceLogoutBlockedScope(scope, refreshError.response?.data?.message);
      } else if (scope === 'admin') {
        store.dispatch(logoutAdminState());
      } else {
        store.dispatch(logoutUserState());
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
