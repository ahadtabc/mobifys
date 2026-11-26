import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  admin: null,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logoutAdminState: (state) => {
      state.admin = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUserState: (state) => {
      state.user = null;
    },
    setAuthInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const {
  setAdmin,
  logoutAdminState,
  setUser,
  logoutUserState,
  setAuthInitialized,
} = authSlice.actions;
export default authSlice.reducer;
