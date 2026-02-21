/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { useGetAllCoursesInstructorQuery } from "../../api/index.api";
import { Navlink, CommonButton } from "../../components/index.components";

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
      {courses?.length === 0 ? (
        <span className="text-foreground italic mt-5 md:text-lg">
          You don't have any created courses yet.
        </span>
      ) : (
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
      )}
      <div className="h-90 z-10 w-full fixed flex justify-end items-end pr-2 lg:h-100 lg:pr-5">
        <Navlink to="/app/created-courses/create">
          <CommonButton
            label="+"
            className="rounded-full w-12 h-12 text-lg md:w-18 md:h-18 md:text-3xl"
            title="Create Course"
          />
        </Navlink>
      </div>
    </>
  );
}

export default CreatedCourses;
