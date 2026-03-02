/* ----------------------------------------------------------------------------------------------
EnrolledCourses.jsx
The page for displaying all the enrolled courses of a user 
------------------------------------------------------------------------------------------------- */

import { useGetEnrolledCoursesQuery } from "@/api/courses/courseApi";
import { DisplayCourses } from "@/components/index.components";

function EnrolledCourses() {
  const { data } = useGetEnrolledCoursesQuery();
  const courses = data?.data;
  console.log(courses);
  

  return (
    <DisplayCourses
      heading="Enrolled Courses"
      label="You don't have any enrolled courses yet."
      path={`/app/enrolled-courses/:courseId`}
      courseData={courses}
    />
  );
}

export default EnrolledCourses;
