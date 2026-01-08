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
  systemStats,
  updateCategory,
} from "../controllers/admin.controllers.js";
import { verifyJwt, isAdmin } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Show all categories or update them or delete them 
- Create a category
- Get all users 
- Get a particular user or delete a user
- Get all courses 
- Get a particular course or delete a course
- System stats
------------------------------------------------------------------------------------------ */

router
  .route("/categories")
  .get(verifyJwt, isAdmin, showAllCategories)
  .patch(verifyJwt, isAdmin, updateCategory)
  .delete(verifyJwt, isAdmin, deleteCategory);
router.route("/categories/create").post(verifyJwt, isAdmin, createCategory);
router.route("/users").get(verifyJwt, isAdmin, getAllUsers);
router
  .route("/users/:userId")
  .get(verifyJwt, isAdmin, getUserAdmin)
  .delete(verifyJwt, isAdmin, deleteUserAccountAdmin);
router.route("/courses").get(verifyJwt, isAdmin, getAllCoursesAdmin);
router
  .route("/courses/:courseId")
  .get(verifyJwt, isAdmin, getCourseAdmin)
  .delete(verifyJwt, isAdmin, deleteCourseAdmin);
router.route("/dashboard").get(verifyJwt, isAdmin, systemStats);

export { router as adminRouter };
