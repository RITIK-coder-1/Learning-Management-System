/* ---------------------------------------------------------------------------------------
Course.model.js
This file builds the course schema for defining the course data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Database Error: The price can't be negative!"],
      default: 0,
    },
    thumbnail: {
      type: String, // cloudinary link
      required: true,
    },
    userRatings: Number,
    tags: {
      type: [String], // array of strings
      required: true, // for searching efficiency
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      required: true,
    },

    // SEPERATED DOCUMENTS (I've seperated the documents to keep them light individually)
    sections: [
      // The chapters of the course.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSection",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseReview",
      },
    ],

    // USER REFERENCES
    owner: {
      // Who created the course
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolledBy: [
      // Who bought the course
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

const Course = new mongoose.model("Course", courseSchema);

export default Course;
