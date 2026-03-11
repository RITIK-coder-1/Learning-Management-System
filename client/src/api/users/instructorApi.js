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
      query: ({ courseDetails, courseId }) => ({
        url: `/instructor/${courseId}`,
        method: "PATCH",
        body: courseDetails,
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
      query: ({ updatedData, courseId, sectionId, videoId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A VIDEO
    deleteVideo: builder.mutation({
      query: ({ courseId, sectionId, videoId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // PUBLISH A COURSE
    publishCourse: builder.mutation({
      query: ({ status, courseId }) => ({
        url: `instructor/${courseId}/publish`,
        method: "PATCH",
        body: { status },
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // GET TOTAL STUDENTS ACROSS ALL THE CREATED COURSES
    getTotalStudents: builder.query({
      async queryFn(_, _queryApi, _extraOptions, baseQuery) {
        try {
          const createdCourses = await baseQuery("/instructor/courses");

          // Check if any request failed
          const errors = createdCourses?.filter((res) => res?.error);
          if (errors?.length > 0) return { error: errors[0].error };

          // the number of students enrolled of each course
          const numberOfStudents = createdCourses?.map(
            (course) => course?.enrolledBy?.length
          );

          // the total number of students
          const totalStudents = numberOfStudents?.reduce(
            (acc, val) => acc + val,
            0
          );

          return {
            data: { totalStudents },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Course"],
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
  usePublishCourseMutation,
  useGetTotalStudentsMutation,
} = instructorApi;
