import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  sidebar: true,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    openMobileNav: (state) => {
      state.isOpen = true;
    },
    closeMobileNav: (state) => {
      state.isOpen = false;
    },
    openProjectSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    closeProjectSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

export const {
  openMobileNav,
  closeMobileNav,
  openProjectSidebar,
  closeProjectSidebar,
} = siteSlice.actions;

export default siteSlice;
