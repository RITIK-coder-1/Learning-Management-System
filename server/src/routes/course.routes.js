/* ---------------------------------------------------------------------------------------
course.routes.js
This file handles all the course related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { verifyJwt, isInstructor } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

------------------------------------------------------------------------------------------ */

export { router as courseRouter };
