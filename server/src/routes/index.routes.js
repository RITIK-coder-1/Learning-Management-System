/* ---------------------------------------------------------------------------------------
index.routes.js
A single exporting file for all the routes 
------------------------------------------------------------------------------------------ */

import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { courseRouter } from "./course.routes.js";
import { adminRouter } from "./admin.routes.js";
import { instructorRouter } from "./instructor.routes.js";


export { authRouter, userRouter, courseRouter, adminRouter, instructorRouter };
