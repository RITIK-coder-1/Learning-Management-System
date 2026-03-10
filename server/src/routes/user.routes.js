/* ---------------------------------------------------------------------------------------
user.routes.js
This file handles all the user related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  getUser,
  updateUserDetails,
  updatePassword,
  createUpdateEmailOtp,
  updateEmail,
  deleteProfilePic,
  deleteUserAccount,
  lastCourseVisited,
  getEnrollCourses,
  completeCourseVideo,
  getCourseProgress,
} from "../controllers/user.controllers.js";

const router = Router();

router.use(verifyJwt); // important verification

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Get the user's profile, update and delete it.
- Get an OTP for email update and update the email by validating the OTP 
- Delete the user profile picture
- Update the user's password
- Get Enrolled Courses 
- Add course as last visited
- Complete a course video 
- Get the course progress 
------------------------------------------------------------------------------------------ */

// USER PROFILE OPERATIONS
router
  .route("/profile")
  .get(getUser) // getting a user's details
  .patch(upload.single("profilePic"), updateUserDetails) // updating a user's details
  .delete(deleteUserAccount); // deleting the user
router
  .route("/profile/email")
  .post(createUpdateEmailOtp) // validate data and generate an OTP
  .patch(updateEmail); // validate OTP and update the email
router.route("/profile/pic").delete(deleteProfilePic); // deleting a user's profile pic (only for students)
router.route("/password").patch(updatePassword); // updating the password of a user
router.route("/enrolled-courses").get(getEnrollCourses); // get enroll courses
router.route("/enrolled-courses/last-visited").patch(lastCourseVisited); // add course as last visited
router
  .route("/enrolled-courses/:courseId/videos/:videoId")
  .patch(verifyJwt, completeCourseVideo); // complete the video
router
  .route("/enrolled-courses/:courseId/progress")
  .get(verifyJwt, getCourseProgress); // get the course progress

export { router as userRouter };
