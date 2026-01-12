/* ---------------------------------------------------------------------------------------
index.middleware.js
This is a centralized exporting file for every single middleware
------------------------------------------------------------------------------------------ */

import verifyJwt from "./token.middleware.js";
import upload from "./multer.middleware.js";
import { isAdmin, isInstructor } from "./owner.middleware.js";

export { verifyJwt, upload, isAdmin, isInstructor };
