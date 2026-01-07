/* ---------------------------------------------------------------------------------------
deleteCourse.js
This utility function is used to delete a course that involes multi-step procedures
------------------------------------------------------------------------------------------ */

import { Course, User } from "../../models/index.model.js";
import { ApiError, deleteFromCloudinary } from "../index.utils.js";

const deleteCourse = async (courseId) => {
  // Getting the course
  const course = await Course.findById(courseId);
  if (!course) {
    console.error("COURSE DELETE ERROR: course not found!");
  }

  // Removing the course from the users' enrolled courses list
  await User.updateMany(
    { enrolledCourses: courseId },
    { $pull: { enrolledCourses: courseId } }
  ).catch(() => {
    console.error(
      "COURSE DELETE ERROR: There was a problem while removing the course from the users' lists"
    );
  });

  // Removing the course from the category lists
  await CourseCategory.findByIdAndUpdate(course.category, {
    $pull: { courses: courseId },
  }).catch(() => {
    console.error(
      "COURSE DELETE ERROR: There was a problem while removing the course from the category's list"
    );
  });

  // Removing the course from the instructor's list
  await User.findByIdAndUpdate(course.owner, {
    $pull: { createdCourses: courseId },
  }).catch(() => {
    console.error(
      "COURSE DELETE ERROR: There was a problem while removing the course from the instructor's list"
    );
  });

  // Deleting the thumbnail from cloudinary
  if (course.thumbnail) {
    await deleteFromCloudinary(course.thumbnail).catch(() => {
      console.error(
        "COURSE DELETE NON-CRITICAL ERROR: There was a problem while removing the course thumbnail"
      );
    });
  }

  // TO-DO: DELETE THE SUBSECTIONS AND VIDEO FILES

  await Course.findByIdAndDelete(courseId).catch(() => {
    console.error(
      "COURSE DELETE ERROR: There was a problem while deleting the course"
    );
  });
};

export default deleteCourse;
