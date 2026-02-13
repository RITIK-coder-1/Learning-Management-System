/* ----------------------------------------------------------------------------------------------
UpdateCourse.jsx
The page to update a course 
------------------------------------------------------------------------------------------------- */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {} from "../../api/index.api";

function UpdateCourse() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const course = useSelector((state) => state.course.course);

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    price: "",
    status: "",
    category: "",
  });

  console.log(course);

  useEffect(() => {
    setCourseDetails({
      title: course?.title,
      description: course?.description,
      price: course?.price,
      status: course?.status,
      category: course?.category,
    });
  }, [course]);

  console.log(courseDetails);

  /* ---------------------------------------------------------------------------------------
  The course data and file setting methods
  ------------------------------------------------------------------------------------------ */

  /* ---------------------------------------------------------------------------------------
  The API call to update the course
  ------------------------------------------------------------------------------------------ */
  const updateCourse = async (e) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return <form onSubmit={updateCourse} className="flex flex-col gap-2"></form>;
}

export default UpdateCourse;
