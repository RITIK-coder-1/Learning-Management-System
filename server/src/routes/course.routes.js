/* ---------------------------------------------------------------------------------------
course.routes.js
This file handles all the course related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { verifyJwt, isInstructor } from "../middleware/index.middleware.js";
import { createCourse } from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- create a course
------------------------------------------------------------------------------------------ */

router
  .route("/dashboard/courses/create")
  .post(verifyJwt, isInstructor, createCourse);

export { router as courseRouter };
