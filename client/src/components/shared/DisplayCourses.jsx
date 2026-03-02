/* ----------------------------------------------------------------------------------------------
DisplayCourses.jsx
The component for displaying all the courses 
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import { CourseCard } from "../index.components";
import filterCourses from "@/utils/filterCourses";
import { useGetAllTheCoursesQuery } from "@/api/index.api";

function DisplayCourses({ heading, label, path }) {
  const user = useSelector((state) => state.auth.user);

  // the specific courses data to show on the page
  const { data } = useGetAllTheCoursesQuery();
  const courses = filterCourses(data);

  return (
    <>
      <h1 className="text-white text-4xl md:text-6xl">{heading}</h1>
      {courses?.length === 0 ? (
        // Special label for no courses
        <span className="text-foreground italic mt-5 md:text-lg">{label}</span>
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
                path={path.replace(":courseId", `${course.courseId}`)} // replace with the course id 
                accountType={user?.accountType}
                instructor={`${course.instructorFirstName} ${course.instructorLastName}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default DisplayCourses;
