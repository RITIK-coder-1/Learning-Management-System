/* ----------------------------------------------------------------------------------------------
cloudinary.js
This utility stores the server files in the cloudinary cloud and deletes them from the local machine. I've also written the script to delete the file from cloudinary in case it's needed. 
------------------------------------------------------------------------------------------------- */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ----------------------------------------------------------------------------------------------
Function to delete the file from the local server
------------------------------------------------------------------------------------------------- */

const deleteLocalFile = async (filepath) => {
  if (!filepath) return; // If the file doesn't exist

  try {
    await fs.unlink(filepath, (err) => {
      if (err) {
        console.error(
          "UTILITY FILE DELETION ERROR: Could not delete local file:",
          err.message
        );
      } else {
        // delete the file
        console.log(`Local file deleted successfully: ${filepath}`);
      }
    });
  } catch (error) {
    // ENOENT (Error No Entry) means the file was already gone.
    if (error.code !== "ENOENT") {
      console.warn(
        `UTILITY FILE DELETION ERROR: Could not delete local file (Permission/Locking Error): ${filepath}`,
        error.message
      );
    }
  }
};

/* ----------------------------------------------------------------------------------------------
Function to upload the file on cloudinary 
------------------------------------------------------------------------------------------------- */

const uploadOnCloudinary = async (filepath) => {
  if (!filepath) return null; // If the filepath doesn't exist

  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto", // it uploads the file and provides the resource
    });

    console.log(
      "The file has been successfully uploaded and its URL: ",
      response.url
    );

    return response.url; // the url will be stored inside the database
  } catch (error) {
    console.error(
      "CLOUDINARY ERROR: There was an error while uploading the file on Cloudinary:",
      error.message
    );
    return null;
  } finally {
    // File cleanup should happen regardless of success/failure
    await deleteLocalFile(filepath);
  }
};

export default uploadOnCloudinary;
