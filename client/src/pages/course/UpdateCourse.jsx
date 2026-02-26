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
import {
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  SelectInput,
  Image
} from "@/components/index.components";
import { NativeSelectOption } from "@/components/ui/native-select";
import { FieldLabel } from "@/components/ui/field";

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
    <Form onSubmit={updateCourse}>
      {/* The thumbnail  */}
      <Image src={courseDetails.thumbnail} alt="Course Thumbnail" className="w-40 h-40 md:w-40 md:h-40"/>
      <InputFile
        name="thumbnail"
        label="Update Thumbnail"
        onChange={updateThumbnail}
        accept="image/*"
        required={false}
      />

      {/* The title */}
      <FieldInput
        label="Title"
        value={courseDetails.title || ""}
        name="title"
        onChange={changeValue}
        required={false}
      />

      {/* The description */}
      <FieldInput
        label="Description"
        value={courseDetails.description || ""}
        name="description"
        onChange={changeValue}
        required={false}
      />

      {/* The price */}
      <FieldInput
        label="Price"
        inputType="number"
        min={0}
        value={courseDetails.price || 0}
        name="price"
        onChange={changeValue}
        required={false}
      />

      {/* The status */}
      <div className="flex flex-col w-full gap-2">
        <FieldLabel htmlFor="status">Set Status</FieldLabel>
        <SelectInput
          name="status"
          onChange={changeValue}
          value={courseDetails.status}
          required={false}
        >
          <NativeSelectOption value="Draft">Draft</NativeSelectOption>
          <NativeSelectOption value="Published">Published</NativeSelectOption>
        </SelectInput>
      </div>

      {/* The category */}
      <div className="flex flex-col w-full gap-2">
        <FieldLabel htmlFor="category">Change Category</FieldLabel>
        <SelectInput
          name="category"
          onChange={changeValue}
          value={courseDetails.category}
          required={false}
        >
          {categories?.map((category) => (
            <NativeSelectOption key={category._id} value={category.name}>
              {category.name}
            </NativeSelectOption>
          ))}
        </SelectInput>
      </div>

      <CommonButton label="Update" type="submit" />
    </Form>
  );
}

export default UpdateCourse;
