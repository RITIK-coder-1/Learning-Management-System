/* ---------------------------------------------------------------------------------------
admin.routes.js
This file handles all the admin related routes
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { createCategory } from "../controllers/admin.controllers.js";
import { verifyJwt } from "../middleware/index.middleware.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create category
------------------------------------------------------------------------------------------ */

router.route("/categories/create").post(verifyJwt, createCategory);

export { router as adminRouter };
