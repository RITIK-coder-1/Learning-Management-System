/* ----------------------------------------------------------------------------------------------
InstructorCourse.jsx
The page for displaying a course for instructors
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import {
  useDeleteCourseInstructorMutation,
  useDeleteSectionMutation,
  useGetCourseInstructorQuery,
  useUpdateSectionMutation,
} from "../../api/index.api";
import {
  Navlink,
  CommonButton,
  InputFile,
  FieldInput,
} from "../../components/index.components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourse } from "../../features/courseSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

function Course() {
  /* ----------------------------------------------------------------------------------------------
    The data
  ------------------------------------------------------------------------------------------------- */

  const { courseId } = useParams();
  const { data } = useGetCourseInstructorQuery({ courseId });
  const course = data?.data;
  const sections = course?.sections;

  const dispatch = useDispatch();
  const [deleteCourse] = useDeleteCourseInstructorMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  // set the course as soon as it loads
  useEffect(() => {
    if (course) {
      dispatch(setCourse(course));
    }
  }, [course]);

  /* ----------------------------------------------------------------------------------------------
    The states
  ------------------------------------------------------------------------------------------------- */

  const [sectionData, setSectionData] = useState([]);
  const [videoInputs, setVideoInputs] = useState([]);

  useEffect(() => {
    setSectionData(sections);
  }, [sections]);

  /* ----------------------------------------------------------------------------------------------
    The methods
  ------------------------------------------------------------------------------------------------- */

  // add a new video input
  const addNewVideoInput = () => {
    setVideoInputs([...videoInputs, crypto.randomUUID()]);
  };

  // remove a video input
  const removeVideoInput = (id) => {
    return (e) => {
      e.stopPropagation();
      setVideoInputs(videoInputs.filter((input) => input !== id));
    };
  };

  // update the section data
  const updateSectionData = (id) => {
    return (e) => {
      sectionData.map((section) => {
        if (section?._id === id) {
          const newData = { ...section, title: e.target.value }; // change the existing value with the input value
          const filteredArray = sectionData.filter(
            (section) => section._id !== id // create a new array removing the exisiting section
          );
          setSectionData([...filteredArray, newData]); // return another array with the new array merged with the new section data
        }
      });
    };
  };

  // update section API call
  const updateSectionCall = (id) => {
    return () => {
      sectionData.forEach(async (section) => {
        if (section._id === id) {
          try {
            // call the API only for the targetted section
            await updateSection({
              updatedData: section,
              sectionId: id,
              courseId,
            }).unwrap();
          } catch (error) {
            console.error(error);
          }
        }
      });
    };
  };

  // delete a section
  const deleteSectionCall = (id) => {
    return async (e) => {
      e.stopPropagation();
      try {
        await deleteSection({ courseId, sectionId: id }).unwrap;
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3 p-5 sm:flex-row sm:items-start">
      <div className="w-full rounded-sm overflow-hidden shadow-md shadow-black sm:w-136">
        {/* Thumbnail */}
        <img
          src={course?.thumbnail || null}
          className="h-64 w-full object-cover"
        />

        <div className="w-full h-auto p-5 flex flex-col gap-3">
          {/* Price */}
          <span
            className={`text-3xl font-black ${
              course?.price === 0 ? "text-green-500" : "text-white"
            }`}
          >
            {course?.price === 0 ? "Free" : `₹ ${course?.price}`}
          </span>
        </div>
      </div>

      <div className="w-full h-auto p-5 sm:pt-0 flex flex-col gap-2">
        {/* Title */}
        <h1 className="text-yellow-500 font-black text-3xl">{course?.title}</h1>
        {/* Description */}
        <p className="text-white/70 text-xs">{course?.description}</p>
        {/* The lessons */}
        <div className="w-full border mt-5 border-white/10 p-5 flex flex-col justify-center items-center gap-3 ">
          <span className="text-foreground text-2xl">Course Structure</span>

          {/* The accordion */}
          <Accordion type="multiple" className="w-full">
            {sections?.map((section) => (
              <AccordionItem
                key={section._id}
                value={section.title}
                className="border border-white/5"
              >
                {/* The chapter name */}
                <AccordionTrigger asChild>
                  <div className="w-full border-b rounded-none px-2 bg-white/3 border-white/5 text-md flex justify-center items-center">
                    {/* The mutable title */}
                    <input
                      type="text"
                      defaultValue={section.title}
                      className="border w-full outline-0 p-1 border-white/10 focus:border-white/30"
                      onChange={updateSectionData(section._id)}
                    />
                    {/* The delete button  */}
                    <CommonButton
                      className="bg-red-900 hover:bg-red-950 w-10 h-8 font-bold cursor-pointer rounded-md"
                      title="Delete Section"
                      onClick={deleteSectionCall(section._id)}
                      label="-"
                    />
                    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>

                {/* The videos */}
                <AccordionContent asChild>
                  <div className="w-full p-2 flex flex-col gap-2 justify-between items-center">
                    {/* The content  */}
                    demo content
                    {/* The add new video input */}
                    {videoInputs.map((videoInput) => {
                      return (
                        <span
                          className="w-full flex flex-col justify-center items-center gap-2"
                          key={videoInput}
                        >
                          <InputFile />
                          <CommonButton
                            className="bg-red-900 hover:bg-red-950 w-full h-8 font-bold cursor-pointer rounded-md"
                            title="Delete Section"
                            onClick={removeVideoInput(videoInput)}
                            label="-"
                          />
                        </span>
                      );
                    })}
                  </div>
                </AccordionContent>
                {/* The update button */}
                <CommonButton
                  label="Update"
                  onClick={updateSectionCall(section._id)}
                  className="bg-blue-500 w-full hover:bg-blue-900 sm:w-88"
                  title="update chapter"
                />
                {/* Add new video */}
                <CommonButton
                  label="Add A Video"
                  onClick={addNewVideoInput}
                  className="bg-blue-500 w-full hover:bg-blue-900 sm:w-88"
                  title="add video"
                />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-3 sm:flex-row">
          <Navlink to={`/app/created-courses/${courseId}/update`}>
            <CommonButton label="Update Course" title="update course" />
          </Navlink>
          <CommonButton
            label="Delete Course"
            className="bg-red-900 hover:bg-red-950"
            title="delete"
          />
        </div>
      </div>
    </div>
  );
}

export default Course;
