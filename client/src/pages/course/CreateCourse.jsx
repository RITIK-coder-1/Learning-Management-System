/* ----------------------------------------------------------------------------------------------
CreateCourse.jsx
The page to create a course 
------------------------------------------------------------------------------------------------- */

import { useState, useEffect } from "react";
import {
  useCreateCourseMutation,
  useGetAllCategoriesQuery,
} from "../../api/index.api";
import getFormData from "../../utils/getFormData";
import {
  Form,
  FieldInput,
  CommonButton,
  InputFile,
} from "@/components/index.components";

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
    category: "",
  });

  // the course tags
  const [courseTags, setCourseTags] = useState([]);

  // the course sections
  const [courseSections, setCourseSections] = useState([]);

  // the number of input count for adding more tags
  const [numberOfTagsInputs, setNumberOfTagsInputs] = useState([
    crypto.randomUUID(),
  ]); // storing unique ids for keys

  // the number of input count for adding more sections
  const [numberOfSectionsInputs, setNumberOfSectionsInputs] = useState([
    crypto.randomUUID(),
  ]);

  // the thumbnail
  const [thumbnail, setThumbnail] = useState("");

  /* ---------------------------------------------------------------------------------------
  The course data and file setting methods
  ------------------------------------------------------------------------------------------ */

  // setting the value of the course object
  const setValue = (e) =>
    setCourseData({ ...courseData, [e.target.name]: e.target.value });

  // to set the thumbnail
  const setThumbnailImage = (e) => setThumbnail(e.target.files[0]);

  // as soon as the categories are fetched, set the default value of the category field to send to the server
  useEffect(() => {
    if (categories) {
      setCourseData({ ...courseData, category: categories[0]["name"] });
    }
  }, [categories]);

  /* ---------------------------------------------------------------------------------------
  Special methods for manipulating input fields and arrays for tags and sections 
  - Input type: the input element for inputting data
  - Array type: the tags or sections array for storing the values provided by the user
  ------------------------------------------------------------------------------------------ */

  // to add a new input field
  const addNewInput = (inputSetterFunction, inputType) => () =>
    inputSetterFunction([...inputType, crypto.randomUUID()]);

  // to remove any unwanted input field
  const deleteInput =
    (id, inputSetterFunction, inputType, arraySetterFunction, arrayType) =>
    () => {
      inputSetterFunction(inputType.filter((ele) => ele !== id));
      arraySetterFunction(arrayType.filter((ele) => ele.id !== id));
    };

  // to add a new value to the array (tags or sections)
  const addNewValueToArray = (id, arraySetterFunction) => (e) => {
    const newValue = e.target.value.trim();
    if (newValue.trim() !== "") {
      arraySetterFunction((prevArray) => {
        // Check if the ID already exists in the current state
        const exists = prevArray.some((ele) => ele.id === id);
        if (exists) {
          // If it exists, update just that specific object
          return prevArray.map((ele) =>
            ele.id === id ? { ...ele, value: newValue } : ele
          );
        } else {
          // If it doesn't exist, append the new object
          return [...prevArray, { id: id, value: newValue }];
        }
      });
    }
  };

  /* ---------------------------------------------------------------------------------------
  The common UI for displaying getting the tags and sections values 
  ------------------------------------------------------------------------------------------ */

  const tagsAndSectionsUI = ({
    forField,
    label,
    inputType,
    inputSetterFunction,
    arrayType,
    arraySetterFunction,
  }) => {
    return (
      <>
        <label htmlFor={forField}>{label}</label>
        <ul>
          {inputType.map((id) => {
            return (
              <li key={id}>
                <input
                  type="text"
                  required
                  onBlur={addNewValueToArray(id, arraySetterFunction)}
                  className="outline"
                />
                {inputType.length > 1 && (
                  <button
                    type="button"
                    className="border"
                    onClick={deleteInput(
                      id,
                      inputSetterFunction,
                      inputType,
                      arraySetterFunction,
                      arrayType
                    )}
                  >
                    -
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <button
          className="border"
          onClick={addNewInput(inputSetterFunction, inputType)}
          type="button"
        >
          +
        </button>
      </>
    );
  };

  /* ---------------------------------------------------------------------------------------
  The API call to create the course
  ------------------------------------------------------------------------------------------ */
  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const formData = getFormData(courseData);

      // setting the tags
      const tags = courseTags.map((ele) => ele.value);
      formData.append("tags", JSON.stringify(tags));

      // setting the sections
      const sections = courseSections.map((ele) => {
        return { title: ele.value };
      });
      formData.append("sections", JSON.stringify(sections));

      // setting the thumbnail
      formData.append("thumbnail", thumbnail);

      await create(formData).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={createCourse}>
      {/* The Title */}
      <FieldInput
        label="Title"
        name="title"
        onChange={setValue}
        placeholder="Title"
      />

      {/* The Description */}
      <FieldInput
        label="Add Description"
        name="description"
        onChange={setValue}
        placeholder="Description"
      />

      {/* The Price */}
      <FieldInput
        label="Set Price"
        name="price"
        onChange={setValue}
        placeholder="Description"
        defaultValue={0}
      />
      {tagsAndSectionsUI({
        forField: "tags",
        label: "Add Some Tags",
        inputType: numberOfTagsInputs,
        inputSetterFunction: setNumberOfTagsInputs,
        arrayType: courseTags,
        arraySetterFunction: setCourseTags,
      })}
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
      {tagsAndSectionsUI({
        forField: "sections",
        label: "Add a Section (Chapter Titles)",
        inputType: numberOfSectionsInputs,
        inputSetterFunction: setNumberOfSectionsInputs,
        arrayType: courseSections,
        arraySetterFunction: setCourseSections,
      })}

      {/* The thumbnail */}
      <InputFile
        name="thumbnail"
        onChange={setThumbnailImage}
        description="Upload A Thumbnail"
      />

      {/* Submit */}
      <CommonButton type="submit" label="Create Course" title="Create"/>
    </Form>
  );
}

export default CreateCourse;
