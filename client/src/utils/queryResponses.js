/* ----------------------------------------------------------------------------------------------
queryResponses.js
This function provides the specific transformed responses for Redux Toolkit Query success and errors
------------------------------------------------------------------------------------------------- */

function queryResponses() {
  // success response
  const transformResponse = (response) => {
    return {
      data: response?.data,
      message: response?.message,
    };
  };

  // error response
  const transformErrorResponse = (response) => {
    return (
      {
        message: response?.data?.message,
      } || { message: "An error occurred" }
    );
  };

  return { transformResponse, transformErrorResponse };
}

export const { transformErrorResponse, transformResponse } = queryResponses();
