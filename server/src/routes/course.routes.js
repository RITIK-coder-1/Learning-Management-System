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
  showAllCategories,
} from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- Get all the courses 
- Get a particular course, or enroll into it
- Show all categories
------------------------------------------------------------------------------------------ */

router.route("/").get(getAllCourses); // get all the courses
router
  .route("/:courseId")
  .get(getCourse) // get a particular course
  .post(verifyJwt, enrollCourse); // enroll into a course
router.route("/categories").get(showAllCategories); // get all the categories

export { router as courseRouter };
