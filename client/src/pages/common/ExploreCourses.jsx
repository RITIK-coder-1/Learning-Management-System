/* ----------------------------------------------------------------------------------------------
ExploreCourses.jsx
The page for exploring various courses on the platform
------------------------------------------------------------------------------------------------- */

import { DisplayCourses } from "../../components/index.components";
import { useGetAllTheCoursesQuery } from "@/api/index.api";

function ExploreCourses() {
  const { data } = useGetAllTheCoursesQuery();
  const courses = data?.data
  
  return (
    <DisplayCourses
      heading="Courses"
      label="There is no course on the platform yet."
      path={`/app/courses/:courseId`}
      courseData={courses}
    />
  );
}

export default ExploreCourses;
