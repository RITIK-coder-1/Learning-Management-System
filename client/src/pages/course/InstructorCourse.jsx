/* ----------------------------------------------------------------------------------------------
InstructorCourse.jsx
The page for displaying a course for instructors
------------------------------------------------------------------------------------------------- */

import { Link, useParams } from "react-router-dom";
import {
  useAddNewSectionMutation,
  useAddNewVideoMutation,
  useDeleteCourseInstructorMutation,
  useDeleteSectionMutation,
  useDeleteVideoMutation,
  useGetCourseInstructorQuery,
  useUpdateSectionMutation,
  useUpdateVideoMutation,
} from "../../api/index.api";
import {
  Navlink,
  CommonButton,
  InputFile,
  DeleteDialogueBox,
  AddDialogueBox,
  FieldInput,
} from "../../components/index.components";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import getFormData from "@/utils/getFormData";
import { MdOutlineSystemUpdateAlt, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCourse } from "@/features/courseSlice";

function InstructorCourse() {
  /* ----------------------------------------------------------------------------------------------
    The data
  ------------------------------------------------------------------------------------------------- */

  const { courseId } = useParams();
  const { data } = useGetCourseInstructorQuery({ courseId });
  const course = data?.data;
  const [deleteCourse] = useDeleteCourseInstructorMutation();
  const [addSection] = useAddNewSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [addVideo] = useAddNewVideoMutation();
  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (course) {
      dispatch(setCourse(course));
    }
  }, [course]);

  /* ----------------------------------------------------------------------------------------------
    The states
  ------------------------------------------------------------------------------------------------- */

  const [sectionData, setSectionData] = useState([]); // the current sections

  useEffect(() => {
    setSectionData(course?.sections);
  }, [course]);

  const [newSectionData, setNewSectionData] = useState(""); // new section (title)

  const [videoData, setVideoData] = useState({
    // to add a new video
    title: "",
    courseVideo: null,
    sectionId: "",
  });

  const [updatedVideoData, setUpdatedVideoData] = useState({
    // to update a video
    title: "",
    videoId: "",
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

  // set the title of the new section
  const setSectionTitle = (e) => {
    setNewSectionData(e.target.value);
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

  // update the course video
  const setVideoDataForUpdate = (id) => {
    return (e) => {
      setUpdatedVideoData({
        ...updatedVideoData,
        title: e.target.value,
        videoId: id,
      });
    };
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

  // add a section
  const addSectionCall = async (e) => {
    e.preventDefault();
    try {
      await addSection({
        sectionData: { title: newSectionData },
        courseId,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // upload a new video
  const uploadNewVideo = (id) => {
    return async (e) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        const videoFormData = getFormData(videoData);
        await addVideo({
          videoData: videoFormData,
          courseId,
          sectionId: id,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // update a video
  const updateVideoApiCall = (sectionId) => {
    return async () => {
      try {
        await updateVideo({
          updatedData: updatedVideoData,
          courseId,
          sectionId,
          videoId: updatedVideoData.videoId,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // delete a video
  const deleteVideoApiCall = (sectionId, videoId) => {
    return async () => {
      try {
        await deleteVideo({
          courseId,
          sectionId,
          videoId: videoId,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // delete a course
  const deleteCourseCall = async () => {
    try {
      await deleteCourse({
        courseId,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3 p-5 md:flex-row sm:items-start">
      <div className="w-full rounded-sm overflow-hidden shadow-md shadow-black md:w-136 sm:ml-5 md:ml-0">
        {/* Thumbnail */}
        <img
          src={course?.thumbnail || null}
          className="h-64 w-full object-cover"
        />

        <div className="w-full h-auto p-5 flex justify-between items-center gap-3">
          {/* Price */}
          <span
            className={`text-3xl font-black ${
              course?.price === 0 ? "text-green-500" : "text-white"
            }`}
          >
            {course?.price === 0 ? "Free" : `₹ ${course?.price}`}
          </span>

          {/* Link to the course once published */}
          {course?.status === "Published" && (
            <Link
              to={`/app/courses/${courseId}`}
              className="text-blue-500 underline underline-offset-4 text-lg hover:text-purple-500"
              title="View Public Interface"
            >
              See Course?
            </Link>
          )}
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
            {sectionData?.map((section) => (
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
                  <div className="w-full p-3 flex flex-col gap-7 justify-between items-center">
                    <ol className="w-full list-decimal p-3 pl-7 flex flex-col justify-center items-start gap-2 text-lg">
                      {sectionData?.map((section) => {
                        return section?.courseVideos?.map((video) => {
                          return (
                            <li
                              key={video?._id}
                              className="w-full flex items-center justify-center gap-3"
                            >
                              <input
                                defaultValue={video?.title}
                                className="w-full border p-1 border-white/10"
                                onChange={setVideoDataForUpdate(video?._id)}
                              />
                              <span className="flex justify-center items-center w-auto h-full gap-3">
                                <MdOutlineSystemUpdateAlt
                                  className="text-blue-500 w-7 h-7 cursor-pointer"
                                  title="Update Title"
                                  onClick={updateVideoApiCall(section._id)}
                                />
                                <MdDelete
                                  className="text-red-900 w-7 h-7 cursor-pointer"
                                  title="Delete Video"
                                  onClick={deleteVideoApiCall(
                                    section._id,
                                    video._id
                                  )}
                                />
                              </span>
                            </li>
                          );
                        });
                      })}
                    </ol>
                  </div>
                </AccordionContent>
                <div className="w-full flex flex-col justify-center items-center gap-3 mt-5 px-3 sm:flex-row">
                  {/* The update section button */}
                  <CommonButton
                    label="Update Section"
                    onClick={updateSectionCall(section._id)}
                    className="bg-transparent hover:bg-blue-950 border border-blue-900/90 w-full p-0 font-normal  text-xs sm:w-24 md:text-sm md:w-30"
                    title="update chapter"
                  />
                  {/* Add new video */}
                  <AddDialogueBox
                    label="Add Video"
                    onSubmit={uploadNewVideo(section._id)}
                    title="Video"
                    titleClass="w-full text-xs sm:w-24 md:w-30 md:text-sm"
                  >
                    <FieldInput
                      label="Title"
                      placeholder="Title"
                      name="title"
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
              </AccordionItem>
            ))}
          </Accordion>

          {/* Add a new section */}
          <div className="w-full flex justify-center items-center mt-5">
            <AddDialogueBox
              label="Create New Section"
              onSubmit={addSectionCall}
              title="Section"
              titleClass="w-full border-2 text-sm sm:w-56 sm:text-md"
            >
              <FieldInput
                label="Title"
                placeholder="Title"
                value={newSectionData}
                onChange={setSectionTitle}
              />
            </AddDialogueBox>
          </div>
        </div>

        <div className="w-full flex flex-col mt-10 justify-center items-center gap-3 sm:flex-row">
          {/* Update Course Details  */}
          <Navlink to={`/app/created-courses/${courseId}/update`}>
            <CommonButton label="Update Course" title="update course" />
          </Navlink>
          {/* Delete Course */}
          <DeleteDialogueBox
            label="Delete Course"
            description="The entire course including all the videos, the student data will be deleted."
            onClick={deleteCourseCall}
            triggerClass="font-black text-lg w-50 p-5 shadow-2xl shadow-black bg-red-900 sm:p-5 sm:w-50 sm:text-lg border-0 hover:bg-red-950 md:w-50 md:text-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default InstructorCourse;
