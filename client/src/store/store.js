/* ----------------------------------------------------------------------------------------------
store.js
This file stores every single redux state 
------------------------------------------------------------------------------------------------- */

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/base/apiSlice.js";
import { authReducer } from "../features/index.features.js";
import userListener from "@/middleware/userLocalStorage.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .prepend(userListener.middleware),
});
