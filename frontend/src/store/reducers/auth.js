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
      state.publicKey = null;
      state.accessLevel = null;
      state.loginMethod =   null;
      state.jwt = null;
      state.username = null;
      state.largeProfilePicURL =  null;
      state.isVerified = null;
      state.isHidden =  null;
      state.isReserved =  null;
      state.description = null;

    },
    setProfile(state, action) {
      state.username = action.payload.Username;
      state.largeProfilePicURL = action.payload.ExtraData.LargeProfilePicURL;
      state.nftProfilePicUrl = action.payload.ExtraData.NFTProfilePicUrl;
      state.isVerified = action.payload.IsVerified;
      state.isHidden = action.payload.IsHidden;
      state.isReserved = action.payload.IsReserved;
      state.description = action.payload.Description;
      state.blogSlugMap = action.payload.ExtraData.BlogSlugMap;
      state.circleIt = action.payload.ExtraData.CircleIt;
      state.DAOPublicKeysPurchased = action.payload.ExtraData.DAOPublicKeysPurchased
      state.FeaturedImageURL = action.payload.ExtraData.FeaturedImageURL
      state.NFTProfilePicturePostHashHex = action.payload.ExtraData.NFTProfilePicturePostHashHex
      state.PinnedPostHashHex = action.payload.ExtraData.PinnedPostHashHex
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
