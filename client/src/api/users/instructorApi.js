/* ----------------------------------------------------------------------------------------------
instructorApi.js
This file does all the instructor API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";
import {
  transformErrorResponse,
  transformResponse,
} from "../../utils/queryResponses";

const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL THE COURSES
    getAllCoursesInstructor: builder.query({
      query: () => "/instructor/courses",
      transformErrorResponse,
      transformResponse,
      providesTags: ["Course"],
    }),

    // CREATE A COURSE
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/instructor/courses",
        method: "POST",
        body: courseData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course", "Stats"],
    }),

    // GET A PARTICULAR COURSE
    getCourseInstructor: builder.query({
      query: ({ courseId }) => `/instructor/${courseId}`,
      transformErrorResponse,
      transformResponse,
      providesTags: ["Course"],
    }),

    // UPDATE A COURSE
    updateCourse: builder.mutation({
      query: ({ updatedData, courseId }) => ({
        url: `/instructor/${courseId}`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A COURSE
    deleteCourseInstructor: builder.mutation({
      query: ({ courseId }) => ({
        url: `/instructor/${courseId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course", "Stats"],
    }),

    // ADD A SECTION
    addNewSection: builder.mutation({
      query: ({ sectionData, courseId }) => ({
        url: `/instructor/${courseId}/sections`,
        method: "POST",
        body: sectionData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // UPDATE A SECTION
    updateSection: builder.mutation({
      query: ({ updatedData, courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A SECTION
    deleteSection: builder.mutation({
      query: ({ courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // ADD A NEW VIDEO
    addNewVideo: builder.mutation({
      query: ({ videoData, courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos`,
        method: "POST",
        body: videoData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // UPDATE A VIDEO
    updateVideo: builder.mutation({
      query: ({ updatedData, courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A VIDEO
    deleteVideo: builder.mutation({
      query: ({ courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetAllCoursesInstructorQuery,
  useGetCourseInstructorQuery,
  useUpdateCourseMutation,
  useUpdateSectionMutation,
  useUpdateVideoMutation,
  useAddNewSectionMutation,
  useAddNewVideoMutation,
  useDeleteCourseInstructorMutation,
  useDeleteSectionMutation,
  useDeleteVideoMutation,
  useCreateCourseMutation,
} = instructorApi;
