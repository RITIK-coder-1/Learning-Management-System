/* ----------------------------------------------------------------------------------------------
DisplayCourses.jsx
The component for displaying all the courses 
------------------------------------------------------------------------------------------------- */

import { CourseCard, ProgressBar } from "../index.components";
import filterCourses from "@/utils/filterCourses";

function DisplayCourses({
  heading,
  label,
  path,
  displayInstructorName,
  courseData,
  isProgress,
}) {
  // the specific courses data to show on the page
  const courses = filterCourses(courseData);

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
              <div className="flex flex-col gap-5">
                <CourseCard
                  image={course.img}
                  title={course.title}
                  description={course.desc}
                  price={course.price}
                  key={course.courseId}
                  path={path.replace(":courseId", `${course.courseId}`)} // replace with the course id
                  displayInstructorName={displayInstructorName}
                  instructor={`${course.instructorFirstName} ${course.instructorLastName}`}
                />
                {isProgress && <ProgressBar courseId={course.courseId} />}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default DisplayCourses;
