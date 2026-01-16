/* ---------------------------------------------------------------------------------------
instructor.routes.js
All the routes for instructors
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  upload,
  verifyJwt,
  isInstructor,
} from "../middleware/index.middleware.js";
import {
  addCourseVideo,
  createCourse,
  getCourse,
  deleteCourseInstructor,
  updateCourseVideo,
  updateSection,
  addSection,
  deleteCourseVideo,
  deleteSection,
  getAllCoursesInstructor,
  updateCourse,
} from "../controllers/instructor.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- get all the courses or create a course 
- get a specific course or update it or delete the course or add a section to this course 
- update a section or delete it or add a video to this section 
- update the video or delete it 
------------------------------------------------------------------------------------------ */

router
  .route("/courses")
  .get(verifyJwt, isInstructor, getAllCoursesInstructor) // get all the courses
  .post(verifyJwt, isInstructor, upload.single("thumbnail"), createCourse); // create a course
router
  .route("/:courseId")
  .get(verifyJwt, isInstructor, getCourse) // get a particular course
  .patch(verifyJwt, isInstructor, upload.single("thumbnail"), updateCourse) // update the course
  .delete(verifyJwt, isInstructor, deleteCourseInstructor); // delete the course
router.route("/:courseId/sections").post(verifyJwt, isInstructor, addSection); // add a section to this course
router
  .route("/:courseId/sections/:sectionId")
  .patch(verifyJwt, isInstructor, updateSection) // update the section
  .delete(verifyJwt, isInstructor, deleteSection); // delete the section
router
  .route("/:courseId/sections/:sectionId/videos")
  .post(verifyJwt, isInstructor, upload.single("courseVideo"), addCourseVideo); // add a video to this section
router
  .route("/:courseId/sections/:sectionId/videos/:videoId")
  .patch(verifyJwt, isInstructor, updateCourseVideo) // update the video subsection
  .delete(verifyJwt, isInstructor, deleteCourseVideo); // delete the video subsection

export { router as instructorRouter };
