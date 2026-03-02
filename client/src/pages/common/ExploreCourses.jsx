/* ----------------------------------------------------------------------------------------------
ExploreCourses.jsx
The page for exploring various courses on the platform
------------------------------------------------------------------------------------------------- */

import { DisplayCourses } from "../../components/index.components";

function ExploreCourses() {
  return (
    <DisplayCourses
      heading="Courses"
      label="There is no course on the platform yet."
      path={`/app/courses/:courseId`}
    />
  );
}

export default ExploreCourses;
