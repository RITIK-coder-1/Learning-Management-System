/* ----------------------------------------------------------------------------------------------
filterCourse.js
The utility to filter the course fields for display 
------------------------------------------------------------------------------------------------- */

function filterCourses(courseArray) {
  const courses = courseArray?.map((course) => {
    return {
      arrayId: crypto.randomUUID(),
      courseId: course._id,
      title: course?.title,
      desc: course?.description,
      img: course?.thumbnail,
      price: course?.price,
      instructorFirstName: course?.owner?.firstName,
      instructorLastName: course?.owner?.lastName,
    };
  });

  return courses;
}

export default filterCourses;
