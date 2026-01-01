/* ---------------------------------------------------------------------------------------
CourseReview.model.js
This file builds the schema for storing the user ratings and reviews for a particular course
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseReviewSchema = new mongoose.Schema({
  // which course
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    index: true,
  },

  // the rating
  userRating: {
    type: Number,
    required: true,
    min: 1, // no negative rating
    max: 10, // Strict 10-star scale
  },

  // the review
  userReview: {
    type: String,
    trim: true,
  },

  // which user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const CourseReview = new mongoose.model("CourseReview", courseReviewSchema);

export default CourseReview;
