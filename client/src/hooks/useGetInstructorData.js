/* ----------------------------------------------------------------------------------------------
useGetInstructorData.js
The hook to get the important data for an instructor 
------------------------------------------------------------------------------------------------- */
import { useGetUserQuery } from "@/api/index.api";

function useGetInstructorData() {
  const { data } = useGetUserQuery();
  const user = data?.data;

  // the created courses
  const createdCourses = user?.createdCourses;

  // the total number of students enrolled 
  

  return {
    createdCourses,
  };
}

export default useGetInstructorData;
