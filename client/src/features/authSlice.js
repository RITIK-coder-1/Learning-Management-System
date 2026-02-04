/* ----------------------------------------------------------------------------------------------
authSlice.js
Global State Management for authentication 
------------------------------------------------------------------------------------------------- */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
    },
    disableUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// export actions (auto generated)
export const { setUser, disableUser } = authSlice.actions;

// expore the reducer to configure store
export default authSlice.reducer;
