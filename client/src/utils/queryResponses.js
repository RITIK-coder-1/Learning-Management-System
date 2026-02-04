/* ----------------------------------------------------------------------------------------------
queryResponses.js
This function provides the specific transformed responses for Redux Toolkit Query success and errors
------------------------------------------------------------------------------------------------- */

function queryResponses(response) {
  // success response
  const transformResponse = () => {
    return {
      data: response?.data,
      message: response?.message,
    };
  };

  // error response
  const transformErrorResponse = () => {
    return (
      {
        message: response?.data?.message,
      } || { message: "An error occurred" }
    );
  };

  return { transformResponse, transformErrorResponse };
}

export default queryResponses;
