/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { useGetAllCoursesInstructorQuery } from "../../api/index.api";
import { Navlink } from "../../components/index.components";

function CreatedCourses() {
  const { data } = useGetAllCoursesInstructorQuery();

  const courses = data?.data?.map((course) => {
    return {
      arrayId: crypto.randomUUID(),
      courseId: course._id,
      title: course?.title,
      desc: course?.description,
      createdAt: course?.createdAt,
    };
  });

  return (
    <>
      <div className="flex flex-col p-2 gap-3">
        {courses?.map((course) => {
          return (
            <Navlink
              key={course.arrayId}
              to={`/app/created-courses/${course.courseId}`}
            >
              <div className="border">{course.title}</div>
            </Navlink>
          );
        })}
      </div>
      <Navlink to="/app/created-courses/create">
        <button>Create</button>
      </Navlink>
    </>
  );
}

export default CreatedCourses;
