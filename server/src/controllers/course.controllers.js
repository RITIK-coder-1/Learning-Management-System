/* ---------------------------------------------------------------------------------------
course.controllers.js
All the controllers for courses that are public 
------------------------------------------------------------------------------------------ */

import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.js";
import { Course, User, CourseCategory } from "../models/index.model.js";

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllCoursesFunction = async (_req, res) => {
  // only show the courses that are published by the instructors
  const courses = await Course.find({ status: "Published" })
    .select("-enrolledBy -status -__v")
    .populate({
      path: "owner",
      select: "-password -refreshTokenString -__v -enrolledCourses",
    });

  if (!courses) {
    console.error("GET ALL COURSES ERROR: courses not fetched");
    throw new ApiError(
      500,
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
    .select("-enrolledBy -status -__v")
    .populate({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .populate({
      path: "owner",
      select: "-password -refreshTokenString -__v -enrolledCourses",
    })
    .exec();

  if (!course) {
    console.error("GET COURSE ERROR: invalid course");
    throw new ApiError(404, "The course doesn't exist!");
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
    throw new ApiError(404, "The user doesn't exist!");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.error("ENROLL COURSE ERROR: no course");
    throw new ApiError(404, "The course doesn't exist!");
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
    throw new ApiError(500, "Enrollment failed. Please try again!");
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
SHOW ALL CATEGORIES CONTROLLER
------------------------------------------------------------------------------------------ */

const showAllCategoriesFunction = async (req, res) => {
  try {
    const categories = await CourseCategory.find({})
      .select("-__v")
      .populate("courses");

    console.log("Categories fetched!");

    return res
      .status(200)
      .json(
        new ApiResponse(200, "All Categories fetched successfully", categories)
      );
  } catch (error) {
    // in case of error, I want to send the message to the frontend. I'm handling it irrespective of asyncHandler
    console.error("SHOW CATEGORIES ERROR:", error);
    throw new ApiError(500, "Could not fetch categories. Please try again!");
  }
};

/* ---------------------------------------------------------------------------------------
GET ALL ENROLLED COURSES
------------------------------------------------------------------------------------------ */
const getEnrolledCoursesFunction = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    console.error("ENROLL COURSES ERROR: user id invalid");
    throw new ApiError(400, "Invalid User ID");
  }

  // the user
  const user = await User.findById(userId).populate("enrolledCourses");

  if (!user) {
    console.error("ENROLL COURSES ERROR: user not fetched");
    throw new ApiError(500, "The user doesn't exist!");
  }

  const enrolledCourses = user?.enrolledCourses;

  return res
    .status(200)
    .json(new ApiResponse(200, "Enrolled Courses Fetched!", enrolledCourses));
};

/* ---------------------------------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------------------------------------ */

const getCourse = asyncHandler(getCourseFunction);
const getAllCourses = asyncHandler(getAllCoursesFunction);
const enrollCourse = asyncHandler(enrollCourseFunction);
const showAllCategories = asyncHandler(showAllCategoriesFunction);
const getEnrollCourses = asyncHandler(getEnrolledCoursesFunction);

export {
  getCourse,
  getAllCourses,
  enrollCourse,
  showAllCategories,
  getEnrollCourses,
};
