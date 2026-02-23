/* ----------------------------------------------------------------------------------------------
ExploreCourses.jsx
The page for exploring various courses on the platform
------------------------------------------------------------------------------------------------- */

import { useGetAllTheCoursesQuery } from "@/api/index.api";
import filterCourses from "@/utils/filterCourses";
import { CourseCard } from "../../components/index.components";

function ExploreCourses() {
  const { data } = useGetAllTheCoursesQuery(); // the course data

  console.log(data);
  

  // the specific courses data to show on the page
  const courses = filterCourses(data);

  return (
    <>
      <h1 className="text-white text-4xl md:text-6xl">Courses</h1>
      {courses?.length === 0 ? (
        // Special label for no courses
        <span className="text-foreground italic mt-5 md:text-lg">
          There is no course on the platform yet.
        </span>
      ) : (
        // the courses
        <div className="w-full flex flex-col-reverse p-2 gap-5 justify-center items-center sm:flex-row-reverse">
          {courses?.map((course) => {
            return (
              <CourseCard
                image={course.img}
                title={course.title}
                description={course.desc}
                price={course.price}
                key={course.arrayId}
                path={`/app/created-courses/${course.courseId}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ExploreCourses;
