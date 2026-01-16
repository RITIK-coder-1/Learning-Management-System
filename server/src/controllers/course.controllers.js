/* ---------------------------------------------------------------------------------------
course.controllers.js
All the controllers for courses that are public 
------------------------------------------------------------------------------------------ */

import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.js";
import { Course, User } from "../models/index.model.js";

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllCoursesFunction = async (_req, res) => {
  const courses = await Course.find({});

  if (!courses) {
    console.error("GET ALL COURSES ERROR: courses not fetched");
    throw new ApiError(
      400,
      "The courses couldn't be fetched. Please try again!"
    );
  }

  console.log("Courses fetched for everyone!");

  return res
    .status(200)
    .json(new ApiResponse(200, "All the courses are fetched!", courses));
};

/* ---------------------------------------------------------------------------------------
GET COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const getCourseFunction = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    console.error("GET COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid Course ID!");
  }

  // Getting the course along with the nested sub-documents
  const course = await Course.findById(courseId)
    .populate({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .exec();

  if (!course) {
    console.error("GET COURSE ERROR: invalid course");
    throw new ApiError(400, "The course doesn't exist!");
  }

  console.log("Course successfully fetched!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, "The course has been successfully fetched!", course)
    );
};

/* ---------------------------------------------------------------------------------------
ENROLL IN A COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const enrollCourseFunction = async (req, res) => {
  const userId = req.user?._id;
  const { courseId } = req.params;

  if (!userId || !courseId) {
    console.error("ENROLL COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid User or Course ID!");
  }

  const user = await User.findById(userId);

  if (!user) {
    console.error("ENROLL COURSE ERROR: no user");
    throw new ApiError(400, "The user doesn't exist!");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.error("ENROLL COURSE ERROR: no course");
    throw new ApiError(400, "The course doesn't exist!");
  }

  await Promise.all([
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    ),
    Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledBy: userId } },
      { new: true }
    ),
  ]).catch(() => {
    console.error("ENROLL COURSE ERROR: enrollment failed");
    throw new ApiError(400, "Enrollment failed. Please try again!");
  });

  console.log(`${userId} enrolled the course: ${courseId}`);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "The student has successfully enrolled in the course"
      )
    );
};

/* ---------------------------------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------------------------------------ */

const getCourse = asyncHandler(getCourseFunction);
const getAllCourses = asyncHandler(getAllCoursesFunction);
const enrollCourse = asyncHandler(enrollCourseFunction);

export { getCourse, getAllCourses, enrollCourse };
