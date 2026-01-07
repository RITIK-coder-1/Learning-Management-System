/* ---------------------------------------------------------------------------------------
admin.controllers.js
All the controllers specific to admin only
------------------------------------------------------------------------------------------ */

import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.js";
import { CourseCategory, User } from "../models/index.model.js";

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

const updateCategoryFunction = async (req, res) => {};

/* ---------------------------------------------------------------------------------------
DELETE CATEGORY CONTROLLER
------------------------------------------------------------------------------------------ */

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

export { createCategory, showAllCategories, updateCategory, getAllUsers };
