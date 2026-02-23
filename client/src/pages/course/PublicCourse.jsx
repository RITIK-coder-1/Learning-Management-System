/* ----------------------------------------------------------------------------------------------
PublicCourse.jsx
The page for displaying a course publicly 
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "@/api/index.api";

function PublicCourse() {
  const { courseId } = useParams();
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;
  console.log(course);
  

  return (
    <div>
      <div>
        <img src={course?.thumbnail || null} className="h-12 w-12" />
        <h1>{course?.title}</h1>
        <p>{course?.description}</p>
      </div>
    </div>
  );
}

export default PublicCourse;
