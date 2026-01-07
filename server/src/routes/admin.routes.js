/* ---------------------------------------------------------------------------------------
admin.routes.js
This file handles all the admin related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  deleteCourseAdmin,
  deleteUserAccountAdmin,
  getAllCoursesAdmin,
  getAllUsers,
  getCourseAdmin,
  getUserAdmin,
  showAllCategories,
  updateCategory,
} from "../controllers/admin.controllers.js";
import { verifyJwt } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Show all categories or update them or delete them 
- Create a category
- Get all users 
- Get a particular user or delete a user
- Get all courses 
- Get a particular course or delete a course
------------------------------------------------------------------------------------------ */

router
  .route("/categories")
  .get(verifyJwt, showAllCategories)
  .patch(verifyJwt, updateCategory)
  .delete(verifyJwt, deleteCategory);
router.route("/categories/create").post(verifyJwt, createCategory);
router.route("/users").get(verifyJwt, getAllUsers);
router
  .route("/users/:userId")
  .get(verifyJwt, getUserAdmin)
  .delete(verifyJwt, deleteUserAccountAdmin);
router.route("/courses").get(verifyJwt, getAllCoursesAdmin);
router
  .route("/courses/:courseId")
  .get(verifyJwt, getCourseAdmin)
  .delete(verifyJwt, deleteCourseAdmin);

export { router as adminRouter };
