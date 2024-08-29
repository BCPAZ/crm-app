import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    openMobileNav: (state) => {
      state.isOpen = true;
    },
    closeMobileNav: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openMobileNav, closeMobileNav } = siteSlice.actions;

export default siteSlice;
