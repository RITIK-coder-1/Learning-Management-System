/* ----------------------------------------------------------------------------------------------
UpdateCourse.jsx
The page to update a course 
------------------------------------------------------------------------------------------------- */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateCourseMutation,
  useGetAllCategoriesQuery,
} from "../../api/index.api";
import { setCourse } from "../../features/courseSlice";
import getFormData from "../../utils/getFormData";

function UpdateCourse() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const course = useSelector((state) => state.course.course);
  const [update] = useUpdateCourseMutation();
  const { data } = useGetAllCategoriesQuery();
  const categories = data?.data; // the course categories created by the admin
  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    price: "",
    status: "",
    category: "",
    thumbnail: "",
  });
  const [newThumbnail, setNewThumbnail] = useState(null);

  useEffect(() => {
    setCourseDetails({
      title: course?.title,
      description: course?.description,
      price: course?.price,
      status: course?.status,
      category: course?.category,
      thumbnail: course?.thumbnail,
    });
  }, [course]);

  /* ---------------------------------------------------------------------------------------
  The course data setting methods
  ------------------------------------------------------------------------------------------ */

  // text value
  const changeValue = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  // the file
  const updateThumbnail = (e) => {
    setNewThumbnail(e.target.files[0]); // set the value of the profile pic as the file object
    setCourseDetails({ ...courseDetails, thumbnail: e.target.files[0] });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the course
  ------------------------------------------------------------------------------------------ */
  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      const courseId = course._id;
      // upload the simple object if the thumbnail isn't updated
      if (!newThumbnail) {
        const { data } = await update({ courseDetails, courseId }).unwrap();
        dispatch(setCourse(data));
      } else {
        // else upload a form data
        const formData = getFormData(courseDetails);

        const { data } = await update({
          courseDetails: formData,
          courseId,
        }).unwrap();

        dispatch(setCourse(data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={updateCourse} className="flex flex-col gap-2">
      <img src={course?.thumbnail || null} className="h-12 w-12" />
      <label htmlFor="thumbnail">Update Thumbnail: </label>
      <input
        type="file"
        id="thumbnail"
        name="thumbnail"
        className="outline"
        onChange={updateThumbnail}
      />
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        value={courseDetails.title || ""}
        id="title"
        name="title"
        className="outline"
        onChange={changeValue}
        required
      />
      <label htmlFor="description">Description: </label>
      <input
        type="text"
        value={courseDetails.description || ""}
        id="description"
        name="description"
        className="outline"
        onChange={changeValue}
        required
      />
      <label htmlFor="price">Price: </label>
      <input
        type="number"
        value={courseDetails.price || 0}
        id="price"
        name="price"
        className="outline"
        onChange={changeValue}
        min={0}
        required
      />
      <label htmlFor="status">Status: </label>
      <select
        name="status"
        id="status"
        className="outline"
        onChange={changeValue}
        value={courseDetails.status}
      >
        <option value="Draft">Draft</option>
        <option value="Published">Publish</option>
      </select>
      <label htmlFor="category">Category: </label>
      <select
        name="category"
        id="category"
        className="outline"
        onChange={changeValue}
        value={courseDetails.category}
      >
        {categories?.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateCourse;
