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
      state.username = action.payload.Username;
      state.profilePic = action.payload.ProfilePic;
      state.isVerified = action.payload.IsVerified;
      state.isHidden = action.payload.IsHidden;
      state.isReserved = action.payload.IsReserved;
      state.description = action.payload.Description;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
