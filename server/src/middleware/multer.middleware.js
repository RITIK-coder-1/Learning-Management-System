/* ----------------------------------------------------------------------------------------------
multer.middleware.js
This middleware handles a file uploaded by the client and stores it in the server temporarily
------------------------------------------------------------------------------------------------- */

import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const tempDirectory = path.join(path.resolve(), "public", "temp"); // creating an absolute path for the temp directory to store static files

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, tempDirectory); // the destination where the files should be stored
  },
  filename: (req, file, callback) => {
    // Generate a new unique ID for this file
    const uniqueId = uuid();

    // Get the original file extension
    const fileExtension = path.extname(file.originalname);

    // Send the unique ID CONCATENATED with the extension
    callback(null, uniqueId + fileExtension); // each file gets a unique name
  },
});

const upload = multer({
  storage: storage, // initialized multer and sets the storage strategy
});

export default upload;
