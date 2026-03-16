/* ----------------------------------------------------------------------------------------------
EnrolledCourses.jsx
The page for displaying all the enrolled courses of a user 
------------------------------------------------------------------------------------------------- */

import { useGetEnrolledCoursesQuery } from "@/api/index.api";
import { DisplayCourses } from "@/components/index.components";

function EnrolledCourses() {
  const { data, isLoading } = useGetEnrolledCoursesQuery();
  const courses = data?.data;

  return (
    <DisplayCourses
      heading="Enrolled Courses"
      label="You don't have any enrolled courses yet."
      path={`/app/courses/:courseId`}
      courseData={courses}
      isProgress={true}
      isLoading={isLoading}
    />
  );
}

export default EnrolledCourses;
