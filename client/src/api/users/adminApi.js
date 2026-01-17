/* ----------------------------------------------------------------------------------------------
adminApi.js
This file does all the admin API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // SHOW ALL CATEGORIES
    getAllCategories: builder.query({
      query: () => "/admin/categories",
      providesTags: ["Category"],
    }),

    // CREATE CATEGORY
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/admin/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation({
      query: ({ categoryData, categoryId }) => ({
        url: `/admin/categories/${categoryId}`,
        method: "PATCH",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // DELETE CATEGORY
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // GET ALL USERS
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),

    // GET SPECIFIC USER
    getUserAdmin: builder.query({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: ["User"],
    }),

    // DELETE USER
    deleteUserAdmin: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // GET ALL COURSES
    getAllCoursesAdmin: builder.query({
      query: () => "/admin/courses",
      providesTags: ["Course"],
    }),

    // GET SPECIFIC COURSE
    getCourseAdmin: builder.query({
      query: (courseId) => `/admin/courses/${courseId}`,
      providesTags: ["Course"],
    }),

    // DELETE COURSE
    deleteCourseAdmin: builder.mutation({
      query: (courseId) => ({
        url: `/admin/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // SYSTEM STATS
    getSystemStats: builder.query({
      query: () => "/admin/stats",
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllUsersQuery,
  useGetUserAdminQuery,
  useDeleteUserAdminMutation,
  useGetAllCoursesAdminQuery,
  useGetCourseAdminQuery,
  useDeleteCourseAdminMutation,
  useGetSystemStatsQuery,
} = adminApi;
