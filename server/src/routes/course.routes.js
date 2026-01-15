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
  enrollCourse,
  getAllCoursesInstructor,
} from "../controllers/course.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- get all the courses public 
- get a specific course public 
- enroll in a course 
- get all the courses instructor only
- create a course
- get a specific course for instructor 
- add a video, update the course, update a video, update a section, add a section, delete a video
------------------------------------------------------------------------------------------ */

// PUBLIC
router.route("/dashboard/courses").get(verifyJwt, getAllCourses);
router.route("/dashboard/courses/:courseId").get(verifyJwt, getCourse);
router.route("/dashboard/courses/:courseId").patch(verifyJwt, enrollCourse);

// INSTRUCTOR ONLY
router
  .route("/dashboard/my-courses")
  .get(verifyJwt, isInstructor, getAllCoursesInstructor);
router
  .route("/dashboard/my-courses/create")
  .post(verifyJwt, isInstructor, upload.single("thumbnail"), createCourse);
router
  .route("/dashboard/my-courses/:courseId")
  .get(verifyJwt, isInstructor, getCourse)
  .delete(verifyJwt, isInstructor, deleteCourseInstructor);
router
  .route("/dashboard/my-courses/:courseId/update")
  .patch(verifyJwt, isInstructor, upload.single("thumbnail"), updateCourse)
  .post(verifyJwt, isInstructor, upload.single("courseVideo"), addCourseVideo)
  .patch(verifyJwt, isInstructor, updateCourseVideo)
  .patch(verifyJwt, isInstructor, updateSection)
  .post(verifyJwt, isInstructor, addSection)
  .delete(verifyJwt, isInstructor, deleteCourseVideo)
  .delete(verifyJwt, isInstructor, deleteSection);

export { router as courseRouter };
