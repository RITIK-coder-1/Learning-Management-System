/* ---------------------------------------------------------------------------------------
admin.routes.js
This file handles all the admin related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import {
  createCategory,
  showAllCategories,
} from "../controllers/admin.controllers.js";
import { verifyJwt } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Show all categories
- Create a category
------------------------------------------------------------------------------------------ */

router.route("/categories").get(verifyJwt, showAllCategories);
router.route("/categories/create").post(verifyJwt, createCategory);

export { router as adminRouter };
