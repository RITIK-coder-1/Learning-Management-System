/* ----------------------------------------------------------------------------------------------
useUserStatus.js
The hook to provide the current status of the user 
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { useGetUserQuery, useGetCourseQuery } from "@/api/index.api";

function useUserStatus(courseId) {
  // the user
  const { data: userData } = useGetUserQuery();
  const user = userData?.data;

  // the course
  let course = null;
  if (courseId) {
    // only if the courseID is provided
    const { data: courseData } = useGetCourseQuery({ courseId });
    course = courseData?.data;
  }

  /* ----------------------------------------------------------------------------------------------
  The user stats
  ------------------------------------------------------------------------------------------------- */

  // the authentication status of the user
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // for immediate access

  // the type of user
  const accountType = useSelector((state) => state.auth.user.accountType); // for immediate access

  // check if the user is the owner of the course
  const isOwner = user?._id === course?.owner?._id ? true : false;

  // check if the user is enrolled in the course or not
  const isEnrolled = user?.enrolledCourses?.some(
    (course) => course?._id === courseId
  );

  return {
    isAuthenticated,
    isOwner,
    isEnrolled,
    accountType,
  };
}

export default useUserStatus;
