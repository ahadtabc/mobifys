import axios from 'axios';
import { store } from '../redux/store';
import { logoutUserState } from '../redux/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.code === 'USER_ACCOUNT_BLOCKED') {
      store.dispatch(logoutUserState());
      if (!window.location.pathname.startsWith('/admin')) {
        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;