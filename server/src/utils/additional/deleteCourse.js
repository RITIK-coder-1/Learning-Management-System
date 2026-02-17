/* ---------------------------------------------------------------------------------------
deleteCourse.js
This utility function is used to delete a course that involes multi-step procedures
------------------------------------------------------------------------------------------ */

import {
  Course,
  CourseSection,
  CourseVideo,
  CourseCategory,
  User,
} from "../../models/index.model.js";
import { deleteFromCloudinary } from "../index.utils.js";
import ApiError from "../api/apiError.js";

const deleteCourse = async (courseId) => {
  // Getting the course
  const course = await Course.findById(courseId)
    .populate({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .exec();

  if (!course) {
    console.error("COURSE DELETE ERROR: course not found!");
  }

  // Deleting all the sections
  const sectionDelete = CourseSection.deleteMany({ course: courseId });

  // Deleting all the videos
  const videosDelete = course.sections.map((section) =>
    CourseVideo.deleteMany({ courseSection: section._id })
  );

  // Removing the course from the users' enrolled courses list
  const userCourseDelete = User.updateMany(
    { enrolledCourses: courseId },
    { $pull: { enrolledCourses: courseId } }
  );

  // Removing the course from the category lists
  const categoryCourseDelete = CourseCategory.updateOne(
    { name: course.category },
    {
      $pull: { courses: courseId },
    }
  );

  // Removing the course from the instructor's list
  const instructorCourseDelete = User.findByIdAndUpdate(course.owner, {
    $pull: { createdCourses: courseId },
  });

  const dbCleanUp = Promise.all([
    sectionDelete,
    userCourseDelete,
    categoryCourseDelete,
    instructorCourseDelete,
    ...videosDelete,
  ]);

  // CLOUDINARY DELETES

  // Deleting the thumbnail from cloudinary
  const thumbnailDelete = deleteFromCloudinary(course.thumbnail);

  // Deleting the videos from cloudinary
  // course object has sections array. Sections array has documents. Each sectionDocument has courseVideos array. The array has video documents
  const videosDeleteCloudinary = course.sections.map((sectionDocument) =>
    sectionDocument.courseVideos.map((video) => {
      deleteFromCloudinary(video.videoUrl);
    })
  );

  const cloudinaryCleanUp = Promise.all([
    thumbnailDelete,
    ...videosDeleteCloudinary,
  ]);

  try {
    await dbCleanUp.catch((err) => {
      console.error("COURSE DELETE ERROR: Children", err);

      throw new ApiError(
        500,
        "There was a problem while deleting the course. Please try again!"
      );
    });

    // Delete the Parent last
    await Course.findByIdAndDelete(courseId).catch((error) => {
      console.error("COURSE DELETE ERROR: Parent", error);

      throw new ApiError(
        500,
        "There was a problem while deleting the course. Please try again!"
      );
    });

    // Fire off Cloudinary deletes (we await them just to be clean)
    await cloudinaryCleanUp.catch((error) => {
      console.error("COURSE DELETE ERROR: cloudinary", error);
    });
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    throw new ApiError(500, "Failed to delete the course");
  }
};

export default deleteCourse;
