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
  updateCourseVideo,
  updateSection,
  addSection,
  deleteCourseVideo,
  deleteSection,
} from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- get all the courses
- create a course
- get a specific course
- add a video, update the course, update a video, update a section, add a section, delete a video
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
  .patch(verifyJwt, isInstructor, upload.single("thumbnail"), updateCourse)
  .patch(verifyJwt, isInstructor, updateCourseVideo)
  .patch(verifyJwt, isInstructor, updateSection)
  .post(verifyJwt, isInstructor, addSection)
  .delete(verifyJwt, isInstructor, deleteCourseVideo)
  .delete(verifyJwt, isInstructor, deleteSection);

export { router as courseRouter };
