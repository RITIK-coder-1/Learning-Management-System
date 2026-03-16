/* ----------------------------------------------------------------------------------------------
DisplayCourses.jsx
The component for displaying all the courses 
------------------------------------------------------------------------------------------------- */

import { CourseCard, ProgressBar, SearchBar, SpinnerCustom } from "../index.components";
import filterCourses from "@/utils/filterCourses";
import { useEffect, useState } from "react";

function DisplayCourses({
  heading,
  label,
  path,
  displayInstructorName,
  courseData,
  isProgress,
  isLoading,
}) {
  // the courses data to display on the page for simplicity
  const [coursesDisplayData, setCoursesDisplayData] = useState([]);

  // whenever the value of the actual course data changes, display the filtered data according to it
  useEffect(() => {
    if (courseData) {
      const filteredCourses = filterCourses(courseData);
      setCoursesDisplayData(filteredCourses);
    }
  }, [courseData]);

  // the search input
  const [search, setSearch] = useState("");

  // the method to set the search value
  const setSearchValue = (e) => {
    setSearch(e.target.value);
  };

  // the method to trigger the search
  const triggerSearch = () => {
    let results = courseData;
    // only if the search value is not empty
    if (search) {
      const searchTerm = search.toLowerCase().trim();

      results = courseData?.filter(
        (course) =>
          // either the title matches or one of the tags
          course?.title?.toLowerCase().trim().includes(searchTerm) ||
          course?.tags?.some((tag) =>
            tag?.toLowerCase().trim().includes(searchTerm)
          )
      );
    }

    const filteredCourses = filterCourses(results);
    setCoursesDisplayData(filteredCourses);
  };

  return (
    <section className="w-full flex flex-col justify-center items-center gap-6">
      <h1 className="text-white text-6xl text-center">{heading}</h1>
      {isLoading ? (
        <SpinnerCustom className="size-6"/>
      ) : courseData?.length === 0 ? (
        // Special label for no courses
        <span className="text-foreground italic mt-5 md:text-lg">{label}</span>
      ) : (
        <div className="w-[85%] flex flex-col gap-6 justify-center items-center sm:w-full">
          {/* the search bar */}
          <SearchBar
            value={search}
            onChange={setSearchValue}
            onClick={triggerSearch}
          />

          {/* The courses  */}
          <div className="w-full flex flex-col-reverse p-2 gap-5 justify-center items-center flex-wrap sm:flex-row-reverse">
            {coursesDisplayData?.length > 0 ? (
              coursesDisplayData?.map((course) => {
                return (
                  <div
                    className="w-full flex flex-col gap-5 justify-center items-center sm:w-64"
                    key={course.courseId}
                  >
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
                    {/* display the progress bar whenever allowed */}
                    {isProgress && <ProgressBar courseId={course.courseId} />}
                  </div>
                );
              })
            ) : (
              // if no course matches the string
              <span className="text-foreground mt-5 md:text-lg">
                No Courses Found.
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default DisplayCourses;
