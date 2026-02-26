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
  SelectInput,
} from "@/components/index.components";
import { NativeSelectOption } from "@/components/ui/native-select";
import { FieldDescription, FieldLabel } from "@/components/ui/field";

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
    placeholder,
    title,
  }) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <FieldLabel htmlFor={forField}>
          {label}
          <span className="text-destructive text-red-600"> *</span>
        </FieldLabel>
        <ul className="flex flex-col gap-3">
          {inputType.map((id) => {
            return (
              <li key={id} className="flex items-center justify-between gap-2">
                <FieldInput
                  name={forField}
                  onBlur={addNewValueToArray(id, arraySetterFunction)}
                  isLabel={false}
                  placeholder={placeholder}
                />
                {inputType.length > 1 && (
                  <CommonButton
                    label={"-"}
                    onClick={deleteInput(
                      id,
                      inputSetterFunction,
                      inputType,
                      arraySetterFunction,
                      arrayType
                    )}
                    className="w-10 p-1 bg-pink-950 hover:bg-pink-900"
                    title="remove"
                  />
                )}
              </li>
            );
          })}
        </ul>
        <CommonButton
          label="+"
          onClick={addNewInput(inputSetterFunction, inputType)}
          className="w-full bg-blue-950 hover:bg-blue-900"
          title={title}
        />
      </div>
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
        inputType="number"
        min={0}
      />

      {/* The tags */}
      <div className="w-full flex flex-col items-start justify-center gap-3">
        {tagsAndSectionsUI({
          forField: "tags",
          label: "Add Some Tags",
          placeholder: "New Tag",
          title: "Add Tag",
          inputType: numberOfTagsInputs,
          inputSetterFunction: setNumberOfTagsInputs,
          arrayType: courseTags,
          arraySetterFunction: setCourseTags,
        })}
        <FieldDescription className="text-xs">
          Tags can only be added once. They are immutable.
        </FieldDescription>
      </div>

      {/* The category */}
      <div className="flex flex-col w-full gap-2">
        <FieldLabel htmlFor="category">
          Choose Category
          <span className="text-destructive text-red-600"> *</span>
        </FieldLabel>
        <SelectInput name="category" onChange={setValue}>
          {categories?.map((category) => (
            <NativeSelectOption key={category._id} value={category.name}>
              {category.name}
            </NativeSelectOption>
          ))}
        </SelectInput>
      </div>

      {/* The sections */}
      {tagsAndSectionsUI({
        forField: "sections",
        label: "Add a Section",
        placeholder: "New Chapter",
        title: "Add Section",
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
      <CommonButton type="submit" label="Create Course" title="Create" />
    </Form>
  );
}

export default CreateCourse;
