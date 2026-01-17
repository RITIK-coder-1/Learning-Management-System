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
  }),
});

export const {
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
} = courseApi;
