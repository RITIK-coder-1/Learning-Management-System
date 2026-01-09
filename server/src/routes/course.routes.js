/* ---------------------------------------------------------------------------------------
course.routes.js
This file handles all the course related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  verifyJwt,
  isInstructor,
  upload,
} from "../middleware/index.middleware.js";
import {
  addCourseVideo,
  createCourse,
  getCourse,
  updateCourse,
  getAllCourses,
  deleteCourseInstructor,
} from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- create a course
- get a course
- add a video or update the course
------------------------------------------------------------------------------------------ */

router.route("/dashboard/courses").get(verifyJwt, isInstructor, getAllCourses);
router
  .route("/dashboard/courses/create")
  .post(verifyJwt, isInstructor, upload.single("thumbnail"), createCourse);
router
  .route("/dashboard/courses/:courseId")
  .get(verifyJwt, isInstructor, getCourse)
  .delete(verifyJwt, isInstructor, deleteCourseInstructor);
router
  .route("/dashboard/courses/:courseId/update")
  .post(verifyJwt, isInstructor, upload.single("courseVideo"), addCourseVideo)
  .patch(verifyJwt, isInstructor, updateCourse);

export { router as courseRouter };
