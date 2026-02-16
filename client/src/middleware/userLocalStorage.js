/* ---------------------------------------------------------------------------------------
userLocalStorage.js
The middleware to manipulate the user value in the local storage for redux toolkit  
------------------------------------------------------------------------------------------ */

import { createListenerMiddleware } from "@reduxjs/toolkit";
import { disableUser, setUser } from "../features/authSlice";

const userListener = createListenerMiddleware();

// for saving the user to the local storage on logging in
userListener.startListening({
  actionCreator: setUser,
  effect: (action) => {
    localStorage.setItem("user", JSON.stringify(action.payload));
  },
});

// for removing the user (and the recent course) from the local storage on logging in
userListener.startListening({
  actionCreator: disableUser,
  effect: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("course");
  },
});

export default userListener;
