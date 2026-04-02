/* ----------------------------------------------------------------------------------------------
apiSlice.js
This file is the single source of truth for all the network calls of my application using Redux Toolkit Query
------------------------------------------------------------------------------------------------- */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

// Initialize the API using the "Reauth" wrapper
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  transformErrorResponse: (response) => {
    return response.status === 404
      ? "Resource Not Found"
      : response.data?.message || "An unexpected error occurred";
  },

  tagTypes: ["User", "Course", "Category", "Stats"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
