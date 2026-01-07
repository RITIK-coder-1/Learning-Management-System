/* ---------------------------------------------------------------------------------------
admin.routes.js
This file handles all the admin related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  deleteUserAccountAdmin,
  getAllUsers,
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
- Delete a user 
------------------------------------------------------------------------------------------ */

router
  .route("/categories")
  .get(verifyJwt, showAllCategories)
  .patch(verifyJwt, updateCategory)
  .delete(verifyJwt, deleteCategory);
router.route("/categories/create").post(verifyJwt, createCategory);
router.route("/users").get(verifyJwt, getAllUsers);
router.route("/users/:userId").delete(verifyJwt, deleteUserAccountAdmin);

export { router as adminRouter };
