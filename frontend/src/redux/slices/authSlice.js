import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  admin: null,
  loading: false,
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
  },
});

export const { setAdmin, logoutAdminState, setUser, logoutUserState } = authSlice.actions;
export default authSlice.reducer;