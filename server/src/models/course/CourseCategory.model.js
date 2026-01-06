/* ---------------------------------------------------------------------------------------
CourseCategory.model.js
This file builds the course category schema 
------------------------------------------------------------------------------------------ */
import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const CourseCategory = new mongoose.model(
  "CourseCategory",
  courseCategorySchema
);

export default CourseCategory;
