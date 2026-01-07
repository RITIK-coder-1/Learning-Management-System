/* ---------------------------------------------------------------------------------------
admin.routes.js
This file handles all the admin related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  createCategory,
  getAllUsers,
  showAllCategories,
  updateCategory,
} from "../controllers/admin.controllers.js";
import { verifyJwt } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Show all categories
- Create a category
- Get all users 
------------------------------------------------------------------------------------------ */

router
  .route("/categories")
  .get(verifyJwt, showAllCategories)
  .patch(verifyJwt, updateCategory);
router.route("/categories/create").post(verifyJwt, createCategory);
router.route("/users").get(verifyJwt, getAllUsers);

export { router as adminRouter };
