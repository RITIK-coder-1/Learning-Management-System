/* ----------------------------------------------------------------------------------------------
InstructorCourse.jsx
The page for displaying a course for instructors
------------------------------------------------------------------------------------------------- */

import { useParams } from "react-router-dom";
import {
  useAddNewVideoMutation,
  useDeleteCourseInstructorMutation,
  useDeleteSectionMutation,
  useGetCourseInstructorQuery,
  useUpdateSectionMutation,
} from "../../api/index.api";
import {
  Navlink,
  CommonButton,
  InputFile,
  DeleteDialogueBox,
  AddDialogueBox,
  FieldInput,
  Form,
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
import getFormData from "@/utils/getFormData";

function Course() {
  /* ----------------------------------------------------------------------------------------------
    The data
  ------------------------------------------------------------------------------------------------- */

  const { courseId } = useParams();
  const { data } = useGetCourseInstructorQuery({ courseId });
  const course = data?.data;
  const sections = course?.sections;

  console.log(sections);
  

  const dispatch = useDispatch();
  const [deleteCourse] = useDeleteCourseInstructorMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [addVideo] = useAddNewVideoMutation();

  // set the course as soon as it loads
  useEffect(() => {
    if (course) {
      dispatch(setCourse(course));
    }
  }, [course]);

  /* ----------------------------------------------------------------------------------------------
    The states
  ------------------------------------------------------------------------------------------------- */

  const [sectionData, setSectionData] = useState([]); // the sections
  useEffect(() => {
    setSectionData(sections);
  }, [sections]);

  const [videoData, setVideoData] = useState({
    // to add a new video
    title: "",
    description: "",
    courseVideo: null,
    sectionId: "",
  });

  /* ----------------------------------------------------------------------------------------------
    The methods to manipulate the states 
  ------------------------------------------------------------------------------------------------- */

  // update the section state data
  const updateSectionData = (id) => {
    return (e) => {
      e.stopPropagation();
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

  // set the new video data to be uploaded
  const setDataForVideoUpload = (id) => {
    return (e) => {
      setVideoData({
        ...videoData,
        [e.target.name]: e.target.value,
        sectionId: id,
      });
    };
  };

  // set the course video
  const setVideoFileForUpload = (e) => {
    setVideoData({ ...videoData, courseVideo: e.target?.files[0] });
  };

  /* ----------------------------------------------------------------------------------------------
    API Calls
  ------------------------------------------------------------------------------------------------- */

  // update section API call for server
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
        await deleteSection({ courseId, sectionId: id }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // upload a new video
  const uploadNewVideo = (id) => {
    return async (e) => {
      e.stopPropagation();
      try {
        const videoFormData = getFormData(videoData);
        await addVideo({
          videoData: videoFormData,
          courseId,
          sectionId: id,
        }).unwrap();
      } catch (error) {
        e.preventDefault(); // prevent the page from reloading only if there's an error

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

        <div className="w-full border mt-5 border-white/10 p-5 flex flex-col justify-center items-center gap-3 ">
          <span className="text-foreground text-2xl">Course Structure</span>

          {/* The accordion */}
          <Accordion type="multiple" className="w-full">
            {/* The lessons */}
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

                    {/* The trigger icon */}
                    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>

                <AccordionContent asChild>
                  {/* The videos */}
                  <div className="w-full p-2 flex flex-col gap-2 justify-between items-center">
                    demo content
                    <div className="w-full flex justify-center items-center gap-3">
                      {/* The update section button */}
                      <CommonButton
                        label="Update Section"
                        onClick={updateSectionCall(section._id)}
                        className="bg-transparent hover:bg-blue-950 border border-blue-900/90 w-26 p-0 font-normal text-xs sm:w-30 sm:text-sm"
                        title="update chapter"
                      />
                      {/* Add new video */}
                      <AddDialogueBox
                        label="Add Video"
                        onSubmit={uploadNewVideo(section._id)}
                      >
                        <FieldInput
                          label="Title"
                          placeholder="Title"
                          name="title"
                          onChange={setDataForVideoUpload(section._id)}
                        />
                        <FieldInput
                          label="Description"
                          placeholder="Description"
                          name="description"
                          onChange={setDataForVideoUpload(section._id)}
                        />
                        <InputFile
                          onChange={setVideoFileForUpload}
                          accept="video/*"
                        />
                      </AddDialogueBox>

                      {/* Delete the section */}
                      <DeleteDialogueBox
                        label="Delete Section"
                        description="The entire section including all the videos will be deleted."
                        onClick={deleteSectionCall(section._id)}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 sm:flex-row">
          {/* Update Course Details  */}
          <Navlink to={`/app/created-courses/${courseId}/update`}>
            <CommonButton label="Update Course" title="update course" />
          </Navlink>
          {/* Delete Course */}
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
