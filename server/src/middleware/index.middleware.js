/* ---------------------------------------------------------------------------------------
index.middleware.js
This is a centralized exporting file for every single middleware
------------------------------------------------------------------------------------------ */

import verifyJwt from "./token.middleware";
import upload from "./multer.middleware";
import { isAdmin, isInstructor } from "./owner.middleware";

export { verifyJwt, upload, isAdmin, isInstructor };
