/* ----------------------------------------------------------------------------------------------
UpdateCourse.jsx
The page to update a course 
------------------------------------------------------------------------------------------------- */

import { useState, useEffect } from "react";
import {
  useUpdateCourseMutation,
  useGetAllCategoriesQuery,
  useGetCourseInstructorQuery,
} from "../../api/index.api";
import getFormData from "../../utils/getFormData";
import {
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  SelectInput,
  Image,
  FieldTextarea,
  SpinnerCustom,
} from "@/components/index.components";
import { NativeSelectOption } from "@/components/ui/native-select";
import { FieldLabel } from "@/components/ui/field";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function UpdateCourse() {
  const { courseId } = useParams();
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const { data: courseData, isLoading: isCourseLoading } =
    useGetCourseInstructorQuery({ courseId });
  const course = courseData?.data;
  const [update, { isLoading: isUpdateLoading }] = useUpdateCourseMutation();
  const { data: categoryData } = useGetAllCategoriesQuery();
  const categories = categoryData?.data; // the course categories created by the admin

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    price: 0,
    status: "",
    category: "",
    thumbnail: "",
  });
  const [newThumbnail, setNewThumbnail] = useState(null);

  useEffect(() => {
    setCourseDetails({
      title: course?.title,
      description: course?.description,
      price: course?.price || 0,
      status: course?.status,
      category: course?.category,
      thumbnail: course?.thumbnail,
    });
  }, [course]);

  console.log(courseDetails.price);

  /* ---------------------------------------------------------------------------------------
  The course data setting methods
  ------------------------------------------------------------------------------------------ */

  // text value
  const changeValue = (e) => {
    setCourseDetails(
      e.target.name === "price" && e.target.value.trim() === ""
        ? { ...courseDetails, price: 0 } // default back to 0 for empty price
        : { ...courseDetails, [e.target.name]: e.target.value }
    );
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
        const { message } = await update({ courseDetails, courseId }).unwrap();
        toast.success(message, { position: "top-right" });
      } else {
        // else upload a form data
        const formData = getFormData(courseDetails);

        const { message } = await update({
          courseDetails: formData,
          courseId,
        }).unwrap();

        toast.success(message, { position: "top-right" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  return isCourseLoading ? (
    <SpinnerCustom className="size-7" />
  ) : (
    <Form onSubmit={updateCourse} className="mb-5">
      {/* The thumbnail  */}
      <Image src={course?.thumbnail} alt="Course Thumbnail" />{" "}
      {/* Setting the thumbnail from the course directly instead of the courseDetails state so that it doesn't get removed temporarily once the user selects a different image to upload */}
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
      <FieldTextarea
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
      <CommonButton
        label={isUpdateLoading ? <SpinnerCustom /> : "Update"}
        type="submit"
      />
    </Form>
  );
}

export default UpdateCourse;
