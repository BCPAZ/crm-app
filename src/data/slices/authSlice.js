import { createSlice } from '@reduxjs/toolkit';
import accountService from '@/data/services/accountService';
import authService from '@/data/services/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    forgotPasswordStatus : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.access_token;
    });

    builder.addMatcher(accountService.endpoints.currentAccount.matchRejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    });

    builder.addMatcher(accountService.endpoints.currentAccount.matchFulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addMatcher(accountService.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null
    });
    // builder.addMatcher(authService.endpoints.forgotPassword.matchPending, (state) => {
    //   state.forgotPasswordStatus = 'loading'; 
    // });
    // builder.addMatcher(authService.endpoints.forgotPassword.matchFulfilled, (state) => {
    //   state.forgotPasswordStatus = 'success'; 
    // });
    // builder.addMatcher(authService.endpoints.forgotPassword.matchRejected, (state) => {
    //   state.forgotPasswordStatus = 'error';
    // });
  },
});

export default authSlice;
