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
};
