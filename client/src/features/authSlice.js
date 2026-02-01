/* ----------------------------------------------------------------------------------------------
authSlice.js
Global State Management for authentication 
------------------------------------------------------------------------------------------------- */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    disableUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// export actions (auto generated)
export const { setUser, disableUser } = authSlice.actions;

// expore the reducer to configure store
export default authSlice.reducer;
