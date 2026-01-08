/* ----------------------------------------------------------------------------------------------
owner.middleware.js
This middleware makes sure that only authorized users can check specific routes
------------------------------------------------------------------------------------------------- */

import { ApiError, asyncHandler } from "../utils/index.utils.js";

// Middleware to verify the instructor
const isInstructorFunction = async (req, _, next) => {
  const user = req.user;

  if (!user) {
    console.error("INSTRUCTOR VERIFICATION ERROR: user");
    throw new ApiError(400, "Invalid User!");
  }

  const checkValidity = user.accountType;

  if (checkValidity !== "Instructor") {
    console.error("INSTRUCTOR VERIFICATION ERROR: not an instructor!");
    throw new ApiError(403, "You're not authorized to access this!");
  }

  console.log("Instructor Verified!");

  next();
};

// Middleware to verify the admin
const isAdminFunction = async (req, _, next) => {
  const user = req.user;

  if (!user) {
    console.error("Admin VERIFICATION ERROR: user");
    throw new ApiError(400, "Invalid User!");
  }

  const checkValidity = user.accountType;

  if (checkValidity !== "Admin") {
    console.error("Admin VERIFICATION ERROR: not an admin!");
    throw new ApiError(403, "You're not authorized to access this!");
  }

  console.log("Admin Verified!");

  next();
};

const isInstructor = asyncHandler(isInstructorFunction);
const isAdmin = asyncHandler(isAdminFunction);

export { isInstructor, isAdmin };
