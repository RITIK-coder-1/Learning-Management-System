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

router.use(verifyJwt, isInstructor); // important verifications

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:
- get all the courses or create a course 
- update or delete the course or add a section to this course 
- update a section or delete it or add a video to this section 
- update the video or delete it 
------------------------------------------------------------------------------------------ */

router
  .route("/courses")
  .get(getAllCoursesInstructor) // get all the courses
  .post(upload.single("thumbnail"), createCourse); // create a course
router
  .route("/:courseId")
  .patch(upload.single("thumbnail"), updateCourse) // update the course
  .delete(deleteCourseInstructor); // delete the course
router.route("/:courseId/sections").post(addSection); // add a section to this course
router
  .route("/:courseId/sections/:sectionId")
  .patch(updateSection) // update the section
  .delete(deleteSection); // delete the section
router
  .route("/:courseId/sections/:sectionId/videos")
  .post(upload.single("courseVideo"), addCourseVideo); // add a video to this section
router
  .route("/:courseId/sections/:sectionId/videos/:videoId")
  .patch(updateCourseVideo) // update the video subsection
  .delete(deleteCourseVideo); // delete the video subsection

export { router as instructorRouter };
