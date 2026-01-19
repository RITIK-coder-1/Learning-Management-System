/* ----------------------------------------------------------------------------------------------
store.js
This file stores every single redux state 
------------------------------------------------------------------------------------------------- */

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/base/apiSlice.js";
import {
  authReducer,
  userReducer,
  courseReducer,
} from "../features/index.features.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
