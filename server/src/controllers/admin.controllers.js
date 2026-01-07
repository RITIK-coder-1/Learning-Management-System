/* ---------------------------------------------------------------------------------------
admin.controllers.js
All the controllers specific to admin only
------------------------------------------------------------------------------------------ */

import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.js";
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

  return res
    .status(200)
    .json(new ApiResponse(200, "Category successfully updated"));
};

/* ---------------------------------------------------------------------------------------
DELETE CATEGORY CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteCategoryFunction = async (req, res) => {
  const { categoryId } = req.body; // the frontend will send the categoryId for query purposes. I'll be updating the categories on the display page itself so I won't have the id access in the parameters

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

  return res
    .status(200)
    .json(new ApiResponse(200, "The category has been successfully deleted!"));
};

/* ---------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
                                USER AND COURSE MANAGEMENT
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
SHOW ALL USERS CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllUsersFunction = async (req, res) => {
  // For a real production app with thousands of users, I would implement the cursor-based pagination here using .limit() and .skip(). Since this is a demo, I am fetching all users for simplicity.

  const users = await User.find({}).select("-password -refreshTokenString");

  return res
    .status(200)
    .json(new ApiResponse(200, "All users fetched successfully", users));
};

/* ---------------------------------------------------------------------------------------
DELETE A USER CONTROLLER
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
DELETE A COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

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

export {
  createCategory,
  showAllCategories,
  updateCategory,
  getAllUsers,
  deleteCategory,
};
