/* ----------------------------------------------------------------------------------------------
Course.jsx
The page for displaying a course
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import { useGetCourseQuery } from "../../api/index.api";
import { Navlink } from "../../components/index.components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourse } from "../../features/courseSlice";

function Course() {
  const { courseId } = useParams();
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourse(course));
  }, [course]);

  return (
    <div>
      <div>
        <h1>{course?.title}</h1>
        <p>{course?.description}</p>
      </div>
      <Navlink to={`/app/created-courses/${courseId}/update`}>
        <button>Update</button>
      </Navlink>
    </div>
  );
}

export default Course;
