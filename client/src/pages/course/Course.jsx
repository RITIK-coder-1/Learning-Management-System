/* ----------------------------------------------------------------------------------------------
Course.jsx
The page for displaying a course
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../api/index.api";

function Course() {
  const { courseId } = useParams();
  const { data } = useGetCourseQuery({courseId});
  const course = data?.data;
  return (
    <div>
      <h1>{course?.title}</h1>
      <p>{course?.description}</p>
    </div>
  );
}

export default Course;
