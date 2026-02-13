/* ---------------------------------------------------------------------------------------
courseLocalStorage.js
The middleware to manipulate the course value in the local storage for redux toolkit  
------------------------------------------------------------------------------------------ */

import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setCourse } from "../features/courseSlice";

const courseListener = createListenerMiddleware();

// for saving the course to the local storage on logging in
courseListener.startListening({
  actionCreator: setCourse,
  effect: (action) => {
    localStorage.setItem("course", JSON.stringify(action.payload));
  },
});

export default courseListener;
