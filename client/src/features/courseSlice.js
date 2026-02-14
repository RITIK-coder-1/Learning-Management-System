/* ----------------------------------------------------------------------------------------------
courseSlice.js
Global State Management for course related data 
------------------------------------------------------------------------------------------------- */

import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: JSON.parse(localStorage.getItem("course")) || null,
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});

// export actions (auto generated)
export const { setCourse } = courseSlice.actions;

// expore the reducer to configure store
export default courseSlice.reducer;
