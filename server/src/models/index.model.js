/* ---------------------------------------------------------------------------------------
index.model.js
This is a centralized exporting file for every single model
------------------------------------------------------------------------------------------ */

// Course models
import Course from "./course/Course.model";
import CourseSection from "./course/CourseSection.model";
import CourseVideo from "./course/CourseVideo.model";

// User models
import User from "./user/User.model";
import CourseProgress from "./user/CourseProgress.model";
import CourseReview from "./user/CourseReview.model";

export {
  Course,
  CourseSection,
  CourseVideo,
  User,
  CourseProgress,
  CourseReview,
};
