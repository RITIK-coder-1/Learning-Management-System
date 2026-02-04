/* ----------------------------------------------------------------------------------------------
userApi.js
This file does all the user API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses";

// the API calls
const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET THE USER PROFILE
    getUser: builder.query({
      query: () => "/users/profile",
      transformResponse,
      transformErrorResponse,
      providesTags: ["User"],
    }),

    // UPDATE USER DETAILS
    updateUserDetails: builder.mutation({
      query: (updatedData) => ({
        url: "/users/profile",
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    // DELETE USER ACCOUNT
    deleteUserAccount: builder.mutation({
      query: (credentials) => ({
        url: "/users/profile",
        method: "DELETE",
        body: credentials,
      }),
      invalidatesTags: ["User", "Stats"],
    }),

    // CREATE OTP TO UPDATE USER EMAIL
    updateUserEmailOtp: builder.mutation({
      query: (updatedData) => ({
        url: "/users/email",
        method: "POST",
        body: updatedData,
      }),
    }),
    // VALIDATE OTP AND UPDATE USER EMAIL
    updateUserEmail: builder.mutation({
      query: (updatedData) => ({
        url: "/users/email",
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    // DELETE USER PROFILE PIC
    deleteUserProfilePic: builder.mutation({
      query: () => ({
        url: "/users/profile/pic",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // UPDATE USER PASSWORD
    updateUserPassword: builder.mutation({
      query: (updatedData) => ({
        url: "/users/password",
        method: "PATCH",
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useDeleteUserAccountMutation,
  useDeleteUserProfilePicMutation,
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
  useUpdateUserPasswordMutation,
} = userApi;
