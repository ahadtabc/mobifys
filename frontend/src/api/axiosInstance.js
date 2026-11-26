import axios from 'axios';

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

const AUTH_SKIP_PATHS = [
  '/login',
  '/signup',
  '/refresh',
  '/logout',
  '/forgot-password',
  '/reset-password',
  '/verify-',
];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';

    if (
      status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      AUTH_SKIP_PATHS.some((path) => url.includes(path))
    ) {
      return Promise.reject(error);
    }

    const scope = url.startsWith('/admin') ? 'admin' : 'user';
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
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
