/* ----------------------------------------------------------------------------------------------
EnrolledCourses.jsx
The page for displaying all the enrolled courses of a user 
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery } from "@/api/index.api";
import { DisplayCourses } from "@/components/index.components";

function EnrolledCourses() {
  const {data} = useGetUserQuery()
  const user = data?.data
  console.log(user);
  
  const enrolledCourses = user?.enrolledCourses
  
  return (
    <DisplayCourses
      heading="Enrolled Courses"
      label="You don't have any enrolled courses yet."
      path={`/app/enrolled-courses/:courseId`}
      courseData={enrolledCourses}
    />
  );
}

export default EnrolledCourses;
