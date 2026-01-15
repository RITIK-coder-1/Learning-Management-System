/* ----------------------------------------------------------------------------------------------
apiSlice.js
This file is the single source of truth for all the network calls of my application using Redux Toolkit Query
------------------------------------------------------------------------------------------------- */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
