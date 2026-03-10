/* ----------------------------------------------------------------------------------------------
useAverageProgress.js
The hook for getting the average progress of the user across all the courses 
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery } from "@/api/index.api";
import { useGetAverageCourseProgressQuery } from "@/api/users/userApi";

function useAverageProgress() {
  // the user
  const { data } = useGetUserQuery();
  const user = data?.data;

  const enrolledCourseIds = user?.enrolledCourses?.map((course) => course?._id);

  useGetAverageCourseProgressQuery(enrolledCourseIds)
}

export default useAverageProgress;
