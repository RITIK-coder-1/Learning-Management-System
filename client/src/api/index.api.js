/* ----------------------------------------------------------------------------------------------
index.api.js
Exporting every single API call 
------------------------------------------------------------------------------------------------- */

import {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginOtpMutation,
  useLogoutMutation,
  useNewTokenMutation,
} from "./auth/authApi.js";

import {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useDeleteUserAccountMutation,
  useDeleteUserProfilePicMutation,
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
  useUpdateUserPasswordMutation,
} from "./users/userApi.js";

import {
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
} from "./courses/courseApi.js";

import {
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
} from "./users/instructorApi.js";

import {
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
} from "./users/adminApi.js";

export {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginOtpMutation,
  useLogoutMutation,
  useNewTokenMutation,
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useDeleteUserAccountMutation,
  useDeleteUserProfilePicMutation,
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
  useUpdateUserPasswordMutation,
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
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
};
