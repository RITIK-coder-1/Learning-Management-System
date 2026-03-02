/* ----------------------------------------------------------------------------------------------
EnrolledCourses.jsx
The page for displaying all the enrolled courses of a user 
------------------------------------------------------------------------------------------------- */

import { DisplayCourses } from "@/components/index.components";

function EnrolledCourses() {
  return (
    <DisplayCourses
      heading="Enrolled Courses"
      label="You don't have any enrolled courses yet."
      path={`/app/enrolled-courses/:courseId`}
    />
  );
}

export default EnrolledCourses;
