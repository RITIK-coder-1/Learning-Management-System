/* ----------------------------------------------------------------------------------------------
CreateCourse.jsx
The page to update the user password 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import {
  useCreateCourseMutation,
  useGetAllCategoriesQuery,
} from "../../api/index.api";

function CreateCourse() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [create] = useCreateCourseMutation();
  const { data } = useGetAllCategoriesQuery();
  const categories = data?.data; // the course categories created by the admin

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */

  // the course data
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: 0,
    status: "Draft",
    category: "" // the default category value
  });

  // the course tags
  const [courseTags, setCourseTags] = useState([]);

  // the number of input count for adding more tags
  const [numberOfInputs, setNumberOfInputs] = useState([crypto.randomUUID()]); // storing unique ids for keys

  // the thumbnail
  const [thumbnail, setThumbnail] = useState("");

  /* ---------------------------------------------------------------------------------------
  The methods
  ------------------------------------------------------------------------------------------ */

  // setting the value of the course object
  const setValue = (e) =>
    setCourseData({ ...courseData, [e.target.name]: e.target.value });

  // to add a new input field to add a new tag
  const addNewInput = () => {
    setNumberOfInputs([...numberOfInputs, crypto.randomUUID()]);
  };

  // to remove any unwanted input field (or tag)
  const deleteInput = (id) => () =>
    setNumberOfInputs(numberOfInputs.filter((ele) => ele !== id));

  // to add a new value to the tags array
  const addNewTag = (e) => setCourseTags([...courseTags, e.target.value]);

  // to set the thumbnail
  const setThumbnailImage = (e) => setThumbnail(e.target.files[0]);

  /* ---------------------------------------------------------------------------------------
  The API call to create the course
  ------------------------------------------------------------------------------------------ */
  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // setting the text fields
      Object.keys(courseData).forEach((field) =>
        formData.append(field, courseData[field])
      );

      // setting the tags
      formData.append("tags", JSON.stringify(courseTags));

      // setting the thumbnail
      formData.append("thumbnail", thumbnail);

      await create(formData).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={createCourse} className="flex flex-col gap-2">
      <label htmlFor="title">The title of the course: </label>
      <input
        type="text"
        name="title"
        id="title"
        required
        onChange={setValue}
        className="outline"
      />
      <label htmlFor="description">The description: </label>
      <input
        type="text"
        name="description"
        id="description"
        required
        onChange={setValue}
        className="outline"
      />
      <label htmlFor="price">The price: </label>
      <input
        type="number"
        name="price"
        id="price"
        required
        onChange={setValue}
        className="outline"
        min={0}
        defaultValue={0}
      />
      <label htmlFor="tags">Add some tags: </label>
      <ul>
        {numberOfInputs.map((id) => {
          return (
            <li key={id}>
              <input
                type="text"
                required
                onChange={addNewTag}
                className="outline"
              />
              {numberOfInputs.length > 1 && (
                <button
                  type="button"
                  className="border"
                  onClick={deleteInput(id)}
                >
                  -
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <button className="border" onClick={addNewInput} type="button">
        +
      </button>
      <label htmlFor="status">Select the status: </label>
      <select name="status" id="status" className="outline" onChange={setValue}>
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>
      <label htmlFor="category">Category: </label>
      <select
        name="category"
        id="category"
        className="outline"
        onChange={setValue}
      >
        {categories?.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="thumbnail">Upload the thumbnail: </label>
      <input
        type="file"
        name="thumbnail"
        id="thumbnail"
        required
        onChange={setThumbnailImage}
        className="outline"
      />

      <button type="submit" className="border">
        Create
      </button>
    </form>
  );
}

export default CreateCourse;
