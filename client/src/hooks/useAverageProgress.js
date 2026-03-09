/* ----------------------------------------------------------------------------------------------
useAverageProgress.js
The hook for getting the average progress of the user across all the courses 
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery } from "@/api/index.api";
import useCourseCompletion from "./useCourseCompletion";

function useAverageProgress() {
  // the user
  const { data } = useGetUserQuery();
  const user = data?.data;

  // the array of each course progress of the user
  const eachCourseProgressArray = user?.enrolledCourses?.map((courseId) => {
    return useCourseCompletion(courseId);
  });

  // the average of all the course progresses
  let sum;
  for (let i = 0; i < eachCourseProgressArray?.length; i++) {
    const element = eachCourseProgressArray[i];
    sum = +element;
  }
  const average = sum / eachCourseProgressArray?.length;

  return average;
}

export default useAverageProgress;
