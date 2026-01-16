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
  endpoints: (builder) => ({
    /* ----------------------------------------------------------------------------------------------
    API calls to register the user    
    ------------------------------------------------------------------------------------------------- */
    registerOTP: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "/register/otp",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export { apiSlice };
export const { useRegisterOTPMutation, useRegisterMutation } = apiSlice;
