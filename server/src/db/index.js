/* ----------------------------------------------
db/index.js
This file sets up the connection between the database and the express server, relying solely on environment variables for configuration.
------------------------------------------------- */

import mongoose from "mongoose";

/* ----------------------------------------------
The function to connect to the database
------------------------------------------------- */

async function connectDB() {
  try {
    // connecting to the database
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);

    // the log message
    console.log("Database connected successfully!");
  } catch (error) {
    // I'm printing the entire error object for proper stack trace
    console.error(
      "CRITICAL ERROR: There was a problem while connecting to the database: ",
      error
    );

    // Exit the process as the application cannot run without the database
    process.exit(1);
  }
}

export default connectDB;
