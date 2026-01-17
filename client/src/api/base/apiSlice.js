/* ----------------------------------------------------------------------------------------------
apiSlice.js
This file is the single source of truth for all the network calls of my application using Redux Toolkit Query
------------------------------------------------------------------------------------------------- */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  transformErrorResponse: (response) => {
    // Return just the string message, or a standard object
    return response.status === 404
      ? "Resource Not Found"
      : response.data.message;
  },
  tagTypes: ["User", "Course", "Category"], // Global Tags
  endpoints: (builder) => ({}),
});

export default apiSlice;
