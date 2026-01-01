/* ---------------------------------------------------------------------------------------
courseSection.model.js
This file builds the schema for the course lessons
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // the actual video lessons
    courseVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseVideo",
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

const CourseSection = new mongoose.model("CourseSection", courseSectionSchema);

export default CourseSection;
