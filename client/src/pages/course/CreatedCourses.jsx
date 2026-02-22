/* ----------------------------------------------------------------------------------------------
CreatedCourses.jsx
The page for displaying all the created courses of an instructor
------------------------------------------------------------------------------------------------- */

import { useGetAllCoursesInstructorQuery } from "../../api/index.api";
import {
  Navlink,
  CommonButton,
  CourseCard,
} from "../../components/index.components";

function CreatedCourses() {
  const { data } = useGetAllCoursesInstructorQuery(); // the course data

  // the specific courses data to show on the page
  const courses = data?.data?.map((course) => {
    return {
      arrayId: crypto.randomUUID(),
      courseId: course._id,
      title: course?.title,
      desc: course?.description,
      img: course?.thumbnail,
      price: course?.price
    };
  });

  return (
    <>
      <h1 className="text-white text-4xl md:text-6xl">Created Courses</h1>
      {courses?.length === 0 ? (
        // Special label for no created courses
        <span className="text-foreground italic mt-5 md:text-lg">
          You don't have any created courses yet.
        </span>
      ) : (
        // the courses
        <div className="w-full flex flex-col-reverse p-2 gap-5 justify-center items-center sm:flex-row-reverse">
          {courses?.map((course) => {
            return (
              <Navlink
                key={course.arrayId}
                to={`/app/created-courses/${course.courseId}`}
              >
                <CourseCard
                  image={course.img}
                  title={course.title}
                  description={course.desc}
                  price={course.price}
                />
              </Navlink>
            );
          })}
        </div>
      )}

      {/* The create button  */}
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
