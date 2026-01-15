/* ----------------------------------------------------------------------------------------------
index.features.js
Centralized file to export all the redux slices 
------------------------------------------------------------------------------------------------- */

import authReducer from "../features/authSlice.js";
import userReducer from "../features/userSlice.js";
import courseReducer from "../features/courseSlice.js";

export { authReducer, userReducer, courseReducer };
