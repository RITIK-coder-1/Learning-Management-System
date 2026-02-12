/* ----------------------------------------------------------------------------------------------
authSlice.js
Global State Management for authentication 
------------------------------------------------------------------------------------------------- */

import { createSlice } from "@reduxjs/toolkit";

const persistentUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!persistentUser,
    user: persistentUser || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    disableUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// export actions (auto generated)
export const { setUser, disableUser } = authSlice.actions;

// expore the reducer to configure store
export default authSlice.reducer;
