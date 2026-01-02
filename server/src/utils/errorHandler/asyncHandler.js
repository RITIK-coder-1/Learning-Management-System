/* ---------------------------------------------------------------------------------------
asyncHandler.js
This is a special middleware to encapsulate efficient error handling for each asynchronous function
------------------------------------------------------------------------------------------ */

function asyncHandler(func) {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error); // passing the error to the global error handler
    }
  };
}

export default asyncHandler;
