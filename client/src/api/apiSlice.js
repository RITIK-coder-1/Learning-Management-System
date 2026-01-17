/* ----------------------------------------------------------------------------------------------
apiSlice.js
This file is the single source of truth for all the network calls of my application using Redux Toolkit Query
------------------------------------------------------------------------------------------------- */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  credentials: "include",
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

    // to create OTP for registering
    registerOtp: builder.mutation({
      query: (userData) => ({
        url: "/auth/register-otp",
        method: "POST",
        body: userData,
      }),
    }),

    // to validate the OTP and register the user
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    /* ----------------------------------------------------------------------------------------------
    API call to get the current user    
    ------------------------------------------------------------------------------------------------- */
    getUser: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"]
    }),
  }),
});

export { apiSlice };
export const { useRegisterOtpMutation, useRegisterMutation, useGetUserQuery } = apiSlice;
