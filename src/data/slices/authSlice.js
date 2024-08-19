import { createSlice } from '@reduxjs/toolkit';
import accountService from '../services/accountService';
import authService from '../services/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
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
  },
});

export default authSlice;
