import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.publicKey = action.payload.publicKey;
      state.accessLevel = action.payload.accessLevel;
      state.loginMethod = action.payload.loginMethod;
      state.jwt = action.payload.jwt;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
