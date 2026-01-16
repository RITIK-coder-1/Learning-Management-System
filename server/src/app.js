/* ---------------------------------------------------------------------------------------
app.js
This is the main backend application 
------------------------------------------------------------------------------------------ */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import { ApiError } from "./utils/index.utils.js";

const app = express(); // the express app
const jsonlimit = "16kb"; // setting the JSON limit for accepting data

/* ---------------------------------------------------------------------------------------
Setting the HTTP headers for security 
------------------------------------------------------------------------------------------ */

app.use(helmet());

/* ---------------------------------------------------------------------------------------
Setting the CORS origin for allowing the client to talk to my server
------------------------------------------------------------------------------------------ */

// all the allowed origins for my application
const allowedOrigins = [
  "http://localhost:5173", // My React App's current development server
  "http://localhost:3000", // The origin the server was previously allowing
  "http://127.0.0.1:5173", // A good practice for comprehensive localhost coverage
];

// the function to filter origins
const corsFunction = (origin, callback) => {
  // Allowing requests from no origins like mobile apps
  if (!origin) {
    return callback(null, true);
  }

  // If a specific origin isn't allowed, add this specific message to the error object
  if (allowedOrigins.indexOf(origin) === -1) {
    const message =
      "CORS ERROR: The CORS policy of this site doesn't allow requests from this specific origin.";
    return callback(new Error(message), false);
  }

  return callback(null, true);
};

// setting up the CORS policy
app.use(
  cors({
    origin: corsFunction,
    credentials: true,
  })
);

/* ---------------------------------------------------------------------------------------
Parsing the different datatypes to effectively add it to the request body
------------------------------------------------------------------------------------------ */

// JSON data
app.use(express.json({ limit: jsonlimit }));

// URLs and Form Data (for files)
app.use(
  express.urlencoded({
    limit: jsonlimit,
    extended: true, // parsing nested objects too
  })
);

// Cookies
app.use(cookieParser());

/* ---------------------------------------------------------------------------------------
Serving the static files (for temporary file uploads to the server)
------------------------------------------------------------------------------------------ */

// public is the folder that serves the static files.
// it takes the absolute path of the current working directory and joins it with the public folder
app.use("/static", express.static(path.join(path.resolve(), "public")));

/* ---------------------------------------------------------------------------------------
All the routes will go here
------------------------------------------------------------------------------------------ */

import {
  userRouter,
  adminRouter,
  courseRouter,
  authRouter,
} from "./routes/index.routes.js";

app.get("/api/v1", (_, res) => {
  res.send("The server is successfully running!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/instructor", courseRouter);
app.use("/api/v1/admin", adminRouter);

/* ---------------------------------------------------------------------------------------
Error Handling 
------------------------------------------------------------------------------------------ */

// Error handler for non-existant routes
app.use((req, _res, next) => {
  console.error("APP ERROR: invalid resource requested!");
  next(
    new ApiError(
      404,
      `The requested resource was not found at ${req.originalUrl}`
    )
  );
});

// Global Error Handler
app.use((error, _req, res, _next) => {
  // Check if the error coming in is a JWT error
  if (error.name === "TokenExpiredError") {
    error = new ApiError(403, "Token has expired");
  }
  if (error.name === "JsonWebTokenError") {
    error = new ApiError(401, "Token is invalid");
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "CRITICAL: Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined, // Full error object for debugging (only in development)
  });

  console.error("CRITICAL SYSTEM ERROR: ", error);
});

export default app;
