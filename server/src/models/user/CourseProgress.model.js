/* ---------------------------------------------------------------------------------------
CourseProgress.model.js
This file builds the schema for tracking the course progress for each user. Each completed video of a particular course will be added to this document. 
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseProgressSchema = new mongoose.Schema({
  // which course is being tracked
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  // who is watching the course
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // number of completed videos
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseVideo",
    },
  ],
});

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const CourseProgress = new mongoose.model(
  "CourseProgress",
  courseProgressSchema
);

export default CourseProgress;
