/* ---------------------------------------------------------------------------------------
index.model.js
This is a centralized exporting file for every single model
------------------------------------------------------------------------------------------ */

// Course models
import Course from "./course/Course.model.js";
import CourseSection from "./course/CourseSection.model.js";
import CourseVideo from "./course/CourseVideo.model.js";

// User models
import User from "./user/User.model.js";
import CourseProgress from "./user/CourseProgress.model.js";
import CourseReview from "./user/CourseReview.model.js";

// Auth Model
import OTP from "./auth/OTP.model.js";

export {
  Course,
  CourseSection,
  CourseVideo,
  User,
  CourseProgress,
  CourseReview,
  OTP,
};
