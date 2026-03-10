/* ----------------------------------------------------------------------------------------------
courseApi.js
This file does all the course related PUBLIC API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL THE COURSES
    getAllTheCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Course"],
    }),

    // GET A PARTICULAR COURSE
    getCourse: builder.query({
      query: ({ courseId }) => `/courses/${courseId}`,
      providesTags: ["Course"],
    }),

    // ENROLL INTO A COURSE
    enrollCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["Course", "User"],
    }),

    // SHOW ALL CATEGORIES
    getAllCategories: builder.query({
      query: () => "/courses/categories",
      providesTags: ["Category"],
    }),

    // GET ENROLLED COURSES
    getEnrolledCourses: builder.query({
      query: () => "/courses/enroll-courses",
      providesTags: ["Course"],
    }),

    // GET COURSE PROGRESS
    getCourseProgress: builder.query({
      query: ({ courseId }) => `/courses/${courseId}/progress`,
      providesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),

    // COMPLETE A VIDEO
    completeCourseVideo: builder.mutation({
      query: ({ courseId, videoId }) => ({
        url: `/courses/${courseId}/videos/${videoId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
  useGetAllCategoriesQuery,
  useGetEnrolledCoursesQuery,
  useGetCourseProgressQuery,
  useCompleteCourseVideoMutation,
} = courseApi;
