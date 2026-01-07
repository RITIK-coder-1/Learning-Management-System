/* ---------------------------------------------------------------------------------------
admin.controllers.js
All the controllers specific to admin only
------------------------------------------------------------------------------------------ */

import {
  ApiError,
  ApiResponse,
  asyncHandler,
  deleteCourse,
} from "../utils/index.utils.js";
import { Course, CourseCategory, User } from "../models/index.model.js";

/* ---------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
                                CATEGORY MANAGEMENT
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
CREATE CATEGORY CONTROLLER
------------------------------------------------------------------------------------------ */

const createCategoryFunction = async (req, res) => {
  // getting all the data
  const { name, description } = req.body;

  const isEmpty = [name, description].some((ele) => ele.trim() === "");

  if (isEmpty) {
    console.error("CREATE CATEGORY ERROR: empty fields!");
    throw new ApiError(400, "Both the fields are required!");
  }

  // checking if this category already exists
  const existingCategory = await CourseCategory.findOne({
    name: { $regex: name, $options: "i" }, // queries for all the categories (turned in smallcase)
  });

  if (existingCategory) {
    console.error("CREATE CATEGORY ERROR: category exists!");
    throw new ApiError(400, "Category already exists!");
  }

  const category = await CourseCategory.create({
    name: name,
    description: description,
  });

  if (!category) {
    console.error("CREATE CATEGORY ERROR: category creation failed!");
    throw new ApiError(
      500,
      "There was a problem while creating the category. Please try again!"
    );
  }

  console.log("Category successfully created!");

  return res
    .status(201)
    .json(new ApiResponse(201, "The category has been successfully created!"));
};

/* ---------------------------------------------------------------------------------------
SHOW ALL CATEGORIES CONTROLLER
------------------------------------------------------------------------------------------ */

const showAllCategoriesFunction = async (req, res) => {
  try {
    const categories = await CourseCategory.find({}).select("-__v");

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
UPDATE CATEGORY CONTROLLER
------------------------------------------------------------------------------------------ */

const updateCategoryFunction = async (req, res) => {
  const { name, description, categoryId } = req.body; // the frontend will send the categoryId for query purposes. I'll be updating the categories on the display page itself so I won't have the id access in the parameters

  if (!name.trim() || !description.trim()) {
    console.error("UPDATE CATEGORY ERROR: Empty fields!");
    throw new ApiError(400, "Name and Description can't be empty!");
  }

  if (!categoryId.trim()) {
    console.error("UPDATE CATEGORY ERROR: invalid category id!");
    throw new ApiError(400, "Invalid Category ID!");
  }

  // checking if the entered values are distinct from the original values
  const category = await CourseCategory.findOne({ _id: categoryId });

  if (category.name === name && category.description === description) {
    console.error("UPDATE CATEGORY ERROR: non-updated values!");
    throw new ApiError(400, "Please enter updated values!");
  }

  // checking if this category already exists if it is updated
  if (category.name !== name) {
    const existingCategory = await CourseCategory.findOne({
      name: { $regex: name, $options: "i" }, // queries for all the categories (turned in smallcase)
      _id: { $ne: categoryId }, // excluding the current document
    });

    if (existingCategory) {
      console.error("UPDATE CATEGORY ERROR: category exists!");
      throw new ApiError(400, "Category already exists!");
    }
  }

  // updating the category
  category.name = name;
  category.description = description;

  const updatedCategory = await category.save({ validateBeforeSave: false });

  if (!updatedCategory) {
    console.error("UPDATE CATEGORY ERROR: problem updating!");
    throw new ApiError(
      400,
      "There was a problem while updating the category. Please try again!"
    );
  }

  console.log("Category updated!");

  return res
    .status(200)
    .json(new ApiResponse(200, "Category successfully updated"));
};

/* ---------------------------------------------------------------------------------------
DELETE CATEGORY CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteCategoryFunction = async (req, res) => {
  const { categoryId } = req.body; // the frontend will send the categoryId for query purposes. I'll be updating the categories on the display page itself so I won't have the id access in the parameters

  if (!categoryId) {
    console.error("CATEGORY DELETE ERROR: Invalid category ID!");
    throw new ApiError(400, "Invalid category ID!");
  }

  const category = await CourseCategory.findOne({ _id: categoryId });

  if (category?.courses.length > 0) {
    console.error("CATEGORY DELETE ERROR: category has active courses!");
    throw new ApiError(
      400,
      "This category has active courses. Please delete the courses before deleing the category!"
    );
  }

  try {
    await CourseCategory.deleteOne({ _id: categoryId });
  } catch (error) {
    console.error("CATEGORY DELETE ERROR: problem while deleting!");
    throw new ApiError(
      500,
      "There was a problem while deleting the category. Please try again!"
    );
  }

  console.log("Category deleted!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The category has been successfully deleted!"));
};

/* ---------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
                                USER MANAGEMENT
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
SHOW ALL USERS CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllUsersFunction = async (req, res) => {
  // For a real production app with thousands of users, I would implement the cursor-based pagination here. Since this is a demo, I am fetching all users for simplicity.

  try {
    const users = await User.find({
      _id: { $ne: req.user._id }, // not the admin themselves
    }).select("-password -refreshTokenString");

    console.log("All the users fetched!");

    return res
      .status(200)
      .json(new ApiResponse(200, "All users fetched successfully", users));
  } catch (error) {
    // irrespective of the asynchandler, I'm catching the error here because I want to send a clear response to the frontend
    console.error("GET ALL USERS ERROR");
    throw new ApiError(
      500,
      "There was a problem while getting the users. Please try again!"
    );
  }
};

/* ---------------------------------------------------------------------------------------
SHOW A PARTICULAR USER CONTROLLER
------------------------------------------------------------------------------------------ */

const getUserAdminFunction = async (req, res) => {
  const { userId } = req.body; // the frontend will provide the user id

  if (!userId) {
    console.error("GET USER ADMIN ERROR: Invalid user id");
    throw new ApiError(500, "Invalid User ID!");
  }

  const user = await User.findById(userId).select(
    "-password -refreshTokenString"
  );

  if (!user) {
    console.error(
      "GET USER ADMIN ERROR: there was a problem while getting the user"
    );
    throw new ApiError(500, "There was a problem while getting the user!");
  }

  console.log("User fetched for Admin");

  return res
    .status(200)
    .json(new ApiResponse(200, "User successfully fetched!", user));
};

/* ---------------------------------------------------------------------------------------
DELETE A USER CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteUserAccountAdminFunction = async (req, res) => {
  // getting the user's details
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    console.error("USER DELETE ADMIN ERROR: invalid user");
    throw new ApiError(400, "Invalid user!");
  }

  // if the user has any profile pic, delete it
  if (user.profilePic) {
    try {
      await deleteFromCloudinary(user.profilePic);
    } catch (error) {
      console.error(
        "USER DELETE ADMIN NON-CRITICAL ERROR: the profile pic couldn't be deleted"
      );
    }
  }

  // if it's a teacher, delete all their courses
  if (user.accountType === "Instructor") {
    try {
      user.createdCourses.forEach(async (id) => await deleteCourse(id));

      console.log("Course successfully deleted!");
    } catch (error) {
      console.error(
        "USER DELETE ADMIN ERROR: There was a problem while deleting the course."
      );
      throw new ApiError(
        500,
        "There was a problem while deleting the account. Please try again!"
      );
    }
  }

  // delete the user
  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    console.error("USER DELETE ADMIN ERROR: user couldn't be deleted");
    throw new ApiError(
      500,
      "There was a problem while deleting the user. Please try again!"
    );
  }

  console.log("User deleted!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The user has been successfully deleted"));
};

/* ---------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
                                COURSE MANAGEMENT
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllCoursesAdminFunction = async (req, res) => {
  try {
    const courses = await Course.find({});

    console.log("All the courses fetched!");

    return res
      .status(200)
      .json(new ApiResponse(200, "All courses fetched successfully", courses));
  } catch (error) {
    // irrespective of the asynchandler, I'm catching the error here because I want to send a clear response to the frontend
    console.error("GET ALL COURSES ERROR");
    throw new ApiError(
      500,
      "There was a problem while getting the courses. Please try again!"
    );
  }
};

/* ---------------------------------------------------------------------------------------
GET A PARTICULAR COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const getCourseAdminFunction = async (req, res) => {
  const { courseId } = req.body; // the frontend will provide the course id

  if (!courseId) {
    console.error("GET COURSE ADMIN ERROR: Invalid course id");
    throw new ApiError(500, "Invalid Course ID!");
  }

  const course = await User.findById(courseId);

  if (!course) {
    console.error(
      "GET COURSE ADMIN ERROR: there was a problem while getting the course"
    );
    throw new ApiError(500, "There was a problem while getting the course!");
  }

  console.log("Course fetched for Admin");

  return res
    .status(200)
    .json(new ApiResponse(200, "Course successfully fetched!", course));
};

/* ---------------------------------------------------------------------------------------
DELETE A COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteCourseAdminFunction = async (req, res) => {
  const courseId = req.params?.courseId;
  try {
    await deleteCourse(courseId);
    console.log("Course successfully deleted!");
    return res
      .status(200)
      .json(new ApiResponse(200, "Course successfully deleted!"));
  } catch (error) {
    console.error(
      "COURSE DELETE ADMIN ERROR: There was a problem while deleting the course."
    );
    throw new ApiError(
      500,
      "There was a problem while deleting the course. Please try again!"
    );
  }
};

/* ---------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
                                SYSTEM STATS (the count of everything)
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------ */

const createCategory = asyncHandler(createCategoryFunction);
const showAllCategories = asyncHandler(showAllCategoriesFunction);
const updateCategory = asyncHandler(updateCategoryFunction);
const getAllUsers = asyncHandler(getAllUsersFunction);
const deleteCategory = asyncHandler(deleteCategoryFunction);
const deleteUserAccountAdmin = asyncHandler(deleteUserAccountAdminFunction);
const getUserAdmin = asyncHandler(getUserAdminFunction);
const deleteCourseAdmin = asyncHandler(deleteCourseAdminFunction);
const getAllCoursesAdmin = asyncHandler(getAllCoursesAdminFunction);
const getCourseAdmin = asyncHandler(getCourseAdminFunction);

export {
  createCategory,
  showAllCategories,
  updateCategory,
  getAllUsers,
  deleteCategory,
  deleteUserAccountAdmin,
  getUserAdmin,
  deleteCourseAdmin,
  getAllCoursesAdmin,
  getCourseAdmin,
};
