/* ----------------------------------------------------------------------------------------------
useGetInstructorData.js
The hook to get the important data for an instructor 
------------------------------------------------------------------------------------------------- */
import { useGetUserQuery, useGetTotalStudentsQuery } from "@/api/index.api";

function useGetInstructorData() {
  const { data: userData } = useGetUserQuery();
  const user = userData?.data;

  // the created courses
  const createdCourses = user?.createdCourses;

  // the total number of students enrolled
  const { data: studentData } = useGetTotalStudentsQuery();
  const totalNumberOfStudents = studentData?.data?.totalStudents;

  return {
    createdCourses,
    totalNumberOfStudents,
  };
}

export default useGetInstructorData;
