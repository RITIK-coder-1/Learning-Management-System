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
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // DELETE USER ACCOUNT
    deleteUserAccount: builder.mutation({
      query: (credentials) => ({
        url: "/users/profile",
        method: "DELETE",
        body: credentials,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User", "Stats"],
    }),

    // CREATE OTP TO UPDATE USER EMAIL
    updateUserEmailOtp: builder.mutation({
      query: (updatedData) => ({
        url: "/users/profile/email",
        method: "POST",
        body: updatedData,
      }),
      transformResponse,
      transformErrorResponse,
    }),
    // VALIDATE OTP AND UPDATE USER EMAIL
    updateUserEmail: builder.mutation({
      query: (updatedData) => ({
        url: "/users/profile/email",
        method: "PATCH",
        body: updatedData,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // DELETE USER PROFILE PIC
    deleteUserProfilePic: builder.mutation({
      query: () => ({
        url: "/users/profile/pic",
        method: "DELETE",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // UPDATE USER PASSWORD
    updateUserPassword: builder.mutation({
      query: (updatedData) => ({
        url: "/users/password",
        method: "PATCH",
        body: updatedData,
      }),
      transformResponse,
      transformErrorResponse,
    }),

    // GET ENROLLED COURSES
    getEnrolledCourses: builder.query({
      query: () => "/users/enrolled-courses",
      providesTags: ["Course"],
    }),

    // LAST COURSE VISITED
    lastCourseVisited: builder.mutation({
      query: ({ courseId }) => ({
        url: "/users/enrolled-courses/last-visited",
        method: "PATCH",
        body: { courseId },
      }),
      transformResponse,
      transformErrorResponse,
    }),

    // GET COURSE PROGRESS
    getCourseProgress: builder.query({
      query: ({ courseId }) => `/users/enrolled-courses/${courseId}/progress`,
      providesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    // GET AVERAGE PROGRESS ACROSS ALL THE COURSES
    getAverageCourseProgress: builder.query({
      // I'm passing the entire array of enrolledCourses here
      async queryFn(courseIds, _queryApi, _extraOptions, baseQuery) {
        try {
          // Execute all requests in parallel
          const results = await Promise.all(
            courseIds.map((id) => baseQuery(`/users/enrolled-courses/${id}/progress`))
          );

          // Check if any request failed
          const errors = results.filter((res) => res.error);
          if (errors.length > 0) return { error: errors[0].error };

          // Extract the numerical progress values
          const progressValues = results.map((res) => res.data?.data?.completedVideos);

          console.log(progressValues);
          

          
          // const total = progressValues.reduce((acc, val) => acc + val, 0);
          // const average =
          //   progressValues.length > 0 ? total / progressValues.length : 0;

          // return { data: { average, details: progressValues } };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Course"],
    }),

    // COMPLETE A VIDEO
    completeCourseVideo: builder.mutation({
      query: ({ courseId, videoId }) => ({
        url: `/users/enrolled-courses/${courseId}/videos/${videoId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Course"],
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
  useLastCourseVisitedMutation,
  useGetEnrolledCoursesQuery,
  useGetCourseProgressQuery,
  useCompleteCourseVideoMutation,
  useGetAverageCourseProgressQuery
} = userApi;
