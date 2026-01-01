/* ---------------------------------------------------------------------------------------
courseVideo.model.js
This file builds the schema for the course videos. Each video is going to be embedded inside a particular section (lesson)
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    videoUrl: {
      type: String, // cloudinary link,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const CourseVideo = new mongoose.model("CourseVideo", courseVideoSchema);

export default CourseVideo;
