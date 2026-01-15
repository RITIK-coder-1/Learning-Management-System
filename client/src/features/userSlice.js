/* ----------------------------------------------------------------------------------------------
userSlice.js
Global State Management for user related data 
------------------------------------------------------------------------------------------------- */

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

// export actions (auto generated)
export const {} = userSlice.actions;

// expore the reducer to configure store
export default userSlice.reducer;
