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

router.use(verifyJwt, isAdmin); // important verifications 

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
  .get(showAllCategories) // get all the categories
  .post(createCategory); // create a new category
router
  .route("/categories/:categoryId")
  .patch(updateCategory) // update a category
  .delete(deleteCategory); // delete a category
router.route("/users").get(getAllUsers); // get all the users
router
  .route("/users/:userId")
  .get(getUserAdmin) // get a specific user
  .delete(deleteUserAccountAdmin); // delete a specific user
router.route("/courses").get(getAllCoursesAdmin); // get all the courses
router
  .route("/courses/:courseId")
  .get(getCourseAdmin) // get a particular course
  .delete(deleteCourseAdmin); // delete a course
router.route("/stats").get(systemStats); // system stats

export { router as adminRouter };
