/* ----------------------------------------------------------------------------------------------
authApi.js
This file does all the auth related API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE REGISTER OTP
    registerOtp: builder.mutation({
      query: (userData) => ({
        url: "/auth/register-otp",
        method: "POST",
        body: userData,
      }),
    }),
    // VALIDATE THE OTP AND REGISTER THE USER
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    // CREATE LOGIN OTP
    loginOtp: builder.mutation({
      query: (userData) => ({
        url: "/auth/login-otp",
        method: "POST",
        body: userData,
      }),
    }),
    // VALIDATE THE OTP AND LOGIN THE USER
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Users"],
    }),

    // ISSUE A NEW TOKEN
    newToken: builder.mutation({
      query: () => ({
        url: "/auth/token",
        method: "POST",
      }),
    }),

    // LOGOUT THE USER
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginOtpMutation,
  useLogoutMutation,
  useNewTokenMutation,
} = authApi;
