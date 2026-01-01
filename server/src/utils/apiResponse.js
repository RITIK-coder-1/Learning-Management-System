/* ---------------------------------------------------------------------------------------
apiResponse.js
This is a class to send specific API JSON objects on success 
------------------------------------------------------------------------------------------ */

class ApiResponse {
  constructor(statusCode, message = "success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; // TRUE // the status codes should be less than 400 to represent success
  }
}

export default ApiResponse;
