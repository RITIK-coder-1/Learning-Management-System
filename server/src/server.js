/* ---------------------------------------------------------------------------------------
server.js
This is the entry point of our server
------------------------------------------------------------------------------------------ */

import app from "./app.js";
import "dotenv/config.js";
import connectDB from "./db/index.js";

/* ---------------------------------------------------------------------------------------
All the variables of the file
------------------------------------------------------------------------------------------ */

const port = process.env.PORT || 3000; // the port number for the server to listen to

/* ---------------------------------------------------------------------------------------
Connecting to the database and listening as the server
------------------------------------------------------------------------------------------ */

try {
  await connectDB();
  app.listen(port, () => {
    console.log(
      `The server is successfully listening at http://localhost:${port}/api/v1 !!`
    );
  });
} catch (error) {
  console.error(
    "CRITICAL ERROR: There was a problem while connecting to the server!",
    error
  );
}
