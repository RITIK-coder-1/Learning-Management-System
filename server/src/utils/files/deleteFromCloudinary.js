/* ----------------------------------------------------------------------------------------------
deleteFromCloudinary.js
This utility deletes a specific file from cloudinary 
------------------------------------------------------------------------------------------------- */

import { v2 as cloudinary } from "cloudinary";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteFromCloudinary = async (fileUrl) => {
  if (!fileUrl) {
    console.error("CLOUDINARY ERROR: The file doesn't exist on cloudinary!");
  }

  try {
    // firstly, I have to extract the public id out of the file url
    const subStrings = fileUrl.split("/"); // an array of split url strings and the last string is the public id
    const lastString = subStrings.pop(); // the public id
    const publicId = lastString.split(".")[0]; // we need the public id without the extension

    const response = await cloudinary.uploader.destroy(publicId);
    console.log(
      "The file has been successfully deleted from cloudinary!: ",
      response
    );
  } catch (error) {
    console.error(
      "CLOUDINARY ERROR: There was an error while deleting the file from cloudinary: ",
      error
    );
    throw error; // stop the execution
  }
};

export default deleteFromCloudinary;
