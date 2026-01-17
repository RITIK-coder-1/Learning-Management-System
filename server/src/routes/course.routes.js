/* ---------------------------------------------------------------------------------------
course.routes.js
This file handles all the course related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { verifyJwt } from "../middleware/index.middleware.js";
import {
  getCourse,
  getAllCourses,
  enrollCourse,
} from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- Get all the courses 
- Get a particular course, or enroll into it
------------------------------------------------------------------------------------------ */

router.route("/").get(getAllCourses); // get all the courses
router
  .route("/:courseId")
  .get(getCourse) // get a particular course
  .post(verifyJwt, enrollCourse); // enroll into a course

export { router as courseRouter };
