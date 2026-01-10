/* ---------------------------------------------------------------------------------------
course.controllers.js
All the controllers for courses including public and instructor specific
------------------------------------------------------------------------------------------ */

import {
  ApiError,
  ApiResponse,
  asyncHandler,
  deleteFromCloudinary,
  uploadOnCloudinary,
  deleteCourse,
} from "../utils/index.utils.js";
import {
  Course,
  CourseSection,
  User,
  CourseVideo,
  CourseCategory,
} from "../models/index.model.js";

/* ---------------------------------------------------------------------------------------
CREATE COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const createCourseFunction = async (req, res) => {
  // getting the course data
  const { title, description, price, tags, status, category, sections } =
    req.body;
  const thumbnailLocalPath = req.file?.thumbnail;

  // parsing the strings data as I'm uploading a multiform from the frontend
  if (typeof sections === "string") sections = JSON.parse(sections);
  if (typeof tags === "string") tags = JSON.parse(tags);

  // validating important data

  const isEmpty = [title, description, status, category].some(
    (ele) => ele?.trim() === ""
  );

  if (isEmpty) {
    console.error("CREATE COURSE ERROR: empty field");
    throw new ApiError(400, "Please fill the required fields!");
  }

  // limit description
  if (description.length > 1000) {
    console.error("CREATE COURSE ERROR: exceeding description");
    throw new ApiError(400, "Description can't be more than 1000 characters!");
  }

  // price can't be negative
  if (price < 0) {
    console.error("CREATE COURSE ERROR: negative price");
    throw new ApiError(400, "Invalid price!");
  }

  // one tag is needed
  if (tags.length === 0) {
    console.error("CREATE COURSE ERROR: no tags");
    throw new ApiError(400, "Please Add At Least One Tag!");
  }

  // one section is needed
  if (sections.length === 0) {
    console.error("CREATE COURSE ERROR: no section");
    throw new ApiError(
      400,
      "Please Add At Least One Section To Create A Course!"
    );
  }

  // created sections should have a title
  sections.forEach(async (ele) => {
    if (!ele?.title?.trim()) {
      console.error("CREATE COURSE ERROR: empty section title");
      throw new ApiError(400, "Please Add The Section Title!");
    }
  });

  // uploading the thumbnail
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath).url;

  if (!thumbnail) {
    console.error("CREATE COURSE ERROR: thumbnail failed");
    throw new ApiError(
      400,
      "There was a problem while adding the thumbnail. Please try again!"
    );
  }

  // create the course
  const course = await Course.create({
    title,
    description,
    price,
    tags,
    status,
    category,
    thumbnail,
    owner: req.user._id,
    sections: [],
  });

  if (!course) {
    console.error("CREATE COURSE ERROR: course creation failed");
    throw new ApiError(
      500,
      "There was a problem while creating the course. Please try again!!"
    );
  }

  // create the course section
  const sectionPromises = sections.map(async (sectionData) => {
    const newSection = await CourseSection.create({
      // because .map() is synchronous, I had to await here for each database call
      title: sectionData.title,
      course: course._id,
    });
    return newSection._id;
  });

  // wait for all sections to be created
  const sectionIds = await Promise.all(sectionPromises); // as .map() returned an array of pending promises, I had to resolve them all

  // update Course with these new Section IDs
  course.sections = sectionIds;
  await course.save();

  await Promise.all([
    // add to Instructor's List
    User.findByIdAndUpdate(req.user._id, {
      $addToSet: { createdCourses: course._id },
    }),
    // add to Category's List
    CourseCategory.findByIdAndUpdate(category, {
      $addToSet: { courses: course._id },
    }),
  ]);

  console.log("Course has been created!");

  return res
    .status(201)
    .json(new ApiResponse(201, "The course has been successfully created!"));
};

/* ---------------------------------------------------------------------------------------
GET COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const getCourseFunction = async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    console.error("GET COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid Course ID!");
  }

  // Getting the course along with the nested sub-documents
  const course = await Course.findById(courseId)
    .populate({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .exec();

  if (!course) {
    console.error("GET COURSE ERROR: invalid course");
    throw new ApiError(400, "The course doesn't exist!");
  }

  console.log("Course successfully fetched!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, "The course has been successfully fetched!", course)
    );
};

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER (for instructor only)
------------------------------------------------------------------------------------------ */

const getAllInstructorCoursesFunction = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    console.error("GET ALL COURSES INSTRUCTOR ERROR: user id invalid");
    throw new ApiError(400, "Invalid User ID");
  }

  const courses = await Course.find({ owner: userId });

  if (!courses) {
    console.error("GET ALL COURSES INSTRUCTOR ERROR: courses not fetched");
    throw new ApiError(
      400,
      "The courses couldn't be fetched. Please try again!"
    );
  }

  console.log("Courses fetched for instructor!");

  return res
    .status(200)
    .json(new ApiResponse(200, "All the courses are fetched!", courses));
};

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER (for everyone)
------------------------------------------------------------------------------------------ */

const getAllCoursesFunction = async (_req, res) => {
  const courses = await Course.find({});

  if (!courses) {
    console.error("GET ALL COURSES ERROR: courses not fetched");
    throw new ApiError(
      400,
      "The courses couldn't be fetched. Please try again!"
    );
  }

  console.log("Courses fetched for everyone!");

  return res
    .status(200)
    .json(new ApiResponse(200, "All the courses are fetched!", courses));
};

/* ---------------------------------------------------------------------------------------
UPDATE COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const updateCourseFunction = async (req, res) => {
  const { title, description, price, status, category } = req.body;
  const thumbnailLocalPath = req.file?.thumbnail;
  const courseId = req.params?.courseId;

  // validating important data

  const isEmpty = [title, description, status, category].some(
    (ele) => ele?.trim() === ""
  );

  if (isEmpty) {
    console.error("UPDATE COURSE ERROR: empty field");
    throw new ApiError(400, "Please fill the required fields!");
  }

  // limit description
  if (description.length > 1000) {
    console.error("UPDATE COURSE ERROR: exceeding description");
    throw new ApiError(400, "Description can't be more than 1000 characters!");
  }

  // price can't be negative
  if (price < 0) {
    console.error("UPDATE COURSE ERROR: negative price");
    throw new ApiError(400, "Invalid price!");
  }

  // getting the course
  const course = await Course.findById(courseId);

  // checking if the values are not updated if no new thumbnail is uploaded
  if (!thumbnailLocalPath) {
    if (
      course.title === title &&
      course.description === description &&
      course.price === price &&
      course.status === status &&
      course.category === category
    ) {
      console.error("UPDATE COURSE ERROR: no updated values");
      throw new ApiError(400, "Please update at least one field!");
    }
  }

  // uploading the new thumbnail
  let thumbnail = "";
  if (thumbnailLocalPath) {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath).url;
    if (!thumbnail) {
      console.error("UPDATE COURSE ERROR: thumbnail didn't update");
      throw new ApiError(400, "The thumbnail couldn't be updated!");
    }

    // deleting the old thumbnail
    await deleteFromCloudinary(course.thumbnail).catch(() => {
      console.error(
        "UPDATE COURSE NON-CRITICAL ERROR: old thumbnail couldn't be deleted"
      );
    });

    course.thumbnail = thumbnail;
  }

  // Managing the category
  if (category !== course.category) {
    // Removing from OLD Category
    await CourseCategory.findByIdAndUpdate(course.category, {
      $pull: { courses: courseId },
    });

    // Adding to NEW Category
    const newCategory = await CourseCategory.findByIdAndUpdate(category, {
      $addToSet: { courses: courseId },
    });

    if (!newCategory) {
      console.error("UPDATE COURSE ERROR: new category doesn't exist!");
      throw new ApiError(400, "The new category does not exist");
    }
  }

  // updating the values
  course.title = title;
  course.description = description;
  course.price = price;
  course.status = status;
  course.category = category;

  const updatedCourse = await course.save({ validateBeforeSave: false });

  if (!updatedCourse) {
    console.error("UPDATE COURSE ERROR: problem updating!");
    throw new ApiError(
      500,
      "There was a problem while updating the details. Please try again!"
    );
  }

  console.log("The course has been updated!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The course has been updated!"));
};

/* ---------------------------------------------------------------------------------------
DELETE COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteCourseFunction = async (req, res) => {
  try {
    const courseId = req.params?.courseId;
    console.log("Course deleted by the instructor!");
    await deleteCourse(courseId);
  } catch (error) {
    console.error("DELETE COURSE ERROR INSTRUCTOR");
    throw new ApiError(500, "There was a problem while deleting the course!");
  }
};

/* ---------------------------------------------------------------------------------------
ADD COURSE VIDEO CONTROLLER
------------------------------------------------------------------------------------------ */

const addCourseVideoFunction = async (req, res) => {
  const { title, description, sectionId } = req.body; // the frontend will send the section id
  const videoLocalPath = req.file?.courseVideo;

  if (!title.trim() || !description.trim()) {
    console.error("ADD COURSE VIDEO ERROR: empty fields");
    throw new ApiError(400, "All the fields are mandatory!");
  }

  if (description.length > 100) {
    console.error("ADD COURSE VIDEO ERROR: exceeding description");
    throw new ApiError(400, "Description can't exceed 100 characters!");
  }

  if (!videoLocalPath) {
    console.error("ADD COURSE VIDEO ERROR: no video");
    throw new ApiError(400, "Please upload a video!");
  }

  if (!sectionId.trim()) {
    console.error("ADD COURSE VIDEO ERROR: Invalid section id");
    throw new ApiError(400, "Invalid Section ID!");
  }

  const video = await uploadOnCloudinary(videoLocalPath);

  if (!video.url) {
    console.error("ADD COURSE VIDEO ERROR: failed");
    throw new ApiError(
      400,
      "The video couldn't be uploaded. Please try again!"
    );
  }

  const courseVideo = await CourseVideo.create({
    title,
    description,
    videoUrl: video.url,
    duration: video.duration,
    courseSection: sectionId,
  });

  if (!courseVideo) {
    console.error("ADD COURSE VIDEO ERROR: failed");
    throw new ApiError(
      400,
      "The video couldn't be uploaded. Please try again!"
    );
  }

  // adding the video to the section
  const section = await CourseSection.findByIdAndUpdate(
    sectionId,
    {
      $addToSet: { courseVideos: courseVideo._id },
    },
    {
      new: true,
    }
  );

  if (!section) {
    console.error("ADD COURSE VIDEO ERROR: section error");
    throw new ApiError(
      400,
      "There was a problem while adding the video to the section. Please try again!"
    );
  }

  console.log("Video uploaded and added to the section!");

  return res
    .status(201)
    .json(new ApiResponse(201, "The video has been uploaded!"));
};

/* ---------------------------------------------------------------------------------------
UPDATE COURSE VIDEO CONTROLLER
------------------------------------------------------------------------------------------ */

const updateCourseVideoFunction = async (req, res) => {
  const { title, description, videoId } = req.body;

  if (!videoId) {
    console.error("UPDATE VIDEO ERROR: Invalid video id");
    throw new ApiError(400, "Invalid Video ID!");
  }

  const video = await CourseVideo.findById(videoId);

  if (!title.trim() || !description.trim()) {
    console.error("UPDATE VIDEO ERROR: empty fields");
    throw new ApiError(400, "The title and the description can't be empty!");
  }

  if (video.title === title && video.description === description) {
    console.error("UPDATE VIDEO ERROR: no updated value");
    throw new ApiError(400, "Please update at least one field!");
  }

  if (description > 100) {
    console.error("UPDATE VIDEO ERROR: descp exceed");
    throw new ApiError(
      400,
      "The description can't be more than 100 characters!"
    );
  }

  video.title = title;
  video.description = description;

  const updatedVideo = await video.save({ validateBeforeSave: false });

  if (!updatedVideo) {
    console.error("UPDATE VIDEO ERROR: not updated");
    throw new ApiError(
      500,
      "There was a problem while updating the video. Please try again!"
    );
  }

  console.log("Video updated!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The video has been successfully updated!"));
};

/* ---------------------------------------------------------------------------------------
DELETE COURSE VIDEO CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteCourseVideoFunction = async (req, res) => {
  const { videoId, sectionId } = req.body;
  if (!videoId || !sectionId) {
    console.error("DELETE VIDEO ERROR: invalid video id or section id");
    throw new ApiError(400, "Invalid Video or Section ID");
  }
  const video = await CourseVideo.findById(videoId);
  if (!video) {
    console.error("DELETE VIDEO ERROR: no video");
    throw new ApiError(400, "The video doesn't exist!");
  }

  const videoDelete = CourseVideo.deleteOne({ _id: videoId });
  const sectionDelete = CourseSection.findByIdAndUpdate(sectionId, {
    $pull: { courseVideos: videoId },
  });
  const cloudDelete = deleteFromCloudinary(video.videoUrl, "video");

  await Promise.all([videoDelete, sectionDelete, cloudDelete]).catch(() => {
    console.error("DELETE VIDEO ERROR");
    throw new ApiError(400, "The video couldn't be deleted. Please try again!");
  });

  console.log("Video deleted!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The video has been deleted!"));
};

/* ---------------------------------------------------------------------------------------
ADD COURSE SECTION CONTROLLER
------------------------------------------------------------------------------------------ */

const addSectionFunction = async (req, res) => {
  const { title } = req.body;
  const courseId = req.params?.courseId;

  if (!courseId) {
    console.error("ADD SECTION ERROR: invalid course id");
    throw new ApiError(400, "Invalid Course ID!");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.error("ADD SECTION ERROR: no course");
    throw new ApiError(404, "Course not found");
  }

  if (!title.trim()) {
    console.error("ADD SECTION ERROR: empty title");
    throw new ApiError(400, "The title can't be empty!");
  }

  // creating the section
  const section = await CourseSection.create({
    title,
    course: courseId,
    courseVideos: [],
  });

  if (!section) {
    console.error("ADD SECTION ERROR: problem creating");
    throw new ApiError(
      500,
      "There was a problem while adding the section. Please try again!"
    );
  }

  // adding the section to the course
  const updateCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $push: { sections: section._id },
    },
    {
      new: true,
    }
  );

  if (!updateCourse) {
    console.error("ADD SECTION ERROR: section isn't added to course");
    throw new ApiError(
      500,
      "There was a problem while adding the section. Please try again!"
    );
  }

  console.log("Section added!");

  return res
    .status(201)
    .json(new ApiResponse(201, "Successfully added the section!"));
};

/* ---------------------------------------------------------------------------------------
DELETE COURSE SECTION CONTROLLER
------------------------------------------------------------------------------------------ */

const deleteSectionFunction = async (req, res) => {
  const { sectionId } = req.body;
  const { courseId } = req.params;

  if (!courseId) {
    console.error("DELETE SECTION ERROR: invalid Course id");
    throw new ApiError(400, "Invalid Course ID");
  }

  if (!sectionId) {
    console.error("DELETE SECTION ERROR: invalid section id");
    throw new ApiError(400, "Invalid Section ID");
  }

  const section = await CourseSection.findById(sectionId).populate(
    "courseVideos"
  );

  if (!section) {
    console.error("DELETE SECTION ERROR: no section");
    throw new ApiError(400, "The section doesn't exist");
  }

  // deleting all the videos of the section
  const videosCloudDelete = section.courseVideos.map((video) =>
    deleteFromCloudinary(video.videoUrl, "video")
  );
  const videosDelete = section.courseVideos.map((video) =>
    CourseVideo.deleteOne({ _id: video._id })
  );
  const sectionDelete = CourseSection.deleteOne({ _id: sectionId });
  const courseSectionRemove = Course.findByIdAndUpdate(courseId, {
    $pull: { sections: sectionId },
  });

  await Promise.all([
    ...videosCloudDelete,
    ...videosDelete,
    sectionDelete,
    courseSectionRemove,
  ]).catch(() => {
    console.error("DELETE SECTION ERROR: didn't delete");
    throw new ApiError(
      400,
      "The section couldn't be deleted. Please try again!"
    );
  });

  console.log("The section deleted!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The section and its videos deleted!"));
};

/* ---------------------------------------------------------------------------------------
UPDATE COURSE SECTION CONTROLLER
------------------------------------------------------------------------------------------ */

const updateSectionFunction = async (req, res) => {
  const { title, sectionId } = req.body;

  const section = await CourseVideo.findById(sectionId);

  if (!title.trim()) {
    console.error("UPDATE SECTION ERROR: empty title");
    throw new ApiError(400, "The title can't be empty!");
  }

  if (section.title === title) {
    console.error("UPDATE SECTION ERROR: no updated value");
    throw new ApiError(400, "Please submit the updated value!");
  }

  section.title = title;

  const updateSection = await section.save({ validateBeforeSave: false });

  if (!updateSection) {
    console.error("UPDATE SECTION ERROR: not updated");
    throw new ApiError(
      500,
      "There was a problem while updating the section. Please try again!"
    );
  }

  console.log("Section updated!");

  return res
    .status(200)
    .json(new ApiResponse(200, "The section has been successfully updated!"));
};

/* ---------------------------------------------------------------------------------------
ENROLL IN A COURSE CONTROLLER
This controller isn't specific to instructors only. Any user can enroll
------------------------------------------------------------------------------------------ */

const enrollCourseFunction = async (req, res) => {
  const userId = req.user?._id;
  const { courseId } = req.params;

  if (!userId || !courseId) {
    console.error("ENROLL COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid User or Course ID!");
  }

  const user = await User.findById(userId);

  if (!user) {
    console.error("ENROLL COURSE ERROR: no user");
    throw new ApiError(400, "The user doesn't exist!");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.error("ENROLL COURSE ERROR: no course");
    throw new ApiError(400, "The course doesn't exist!");
  }

  await Promise.all([
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } },
      { new: true }
    ),
    Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledBy: userId } },
      { new: true }
    ),
  ]).catch(() => {
    console.error("ENROLL COURSE ERROR: enrollment failed");
    throw new ApiError(400, "Enrollment failed. Please try again!");
  });

  console.log(`${userId} enrolled the course: ${courseId}`);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "The student has successfully enrolled in the course"
      )
    );
};

/* ---------------------------------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------------------------------------ */

const createCourse = asyncHandler(createCourseFunction);
const getCourse = asyncHandler(getCourseFunction);
const getAllCourses = asyncHandler(getAllCoursesFunction);
const getAllCoursesInstructor = asyncHandler(getAllInstructorCoursesFunction);
const updateCourse = asyncHandler(updateCourseFunction);
const deleteCourseInstructor = asyncHandler(deleteCourseFunction);
const addCourseVideo = asyncHandler(addCourseVideoFunction);
const updateCourseVideo = asyncHandler(updateCourseVideoFunction);
const deleteCourseVideo = asyncHandler(deleteCourseVideoFunction);
const addSection = asyncHandler(addSectionFunction);
const deleteSection = asyncHandler(deleteSectionFunction);
const updateSection = asyncHandler(updateSectionFunction);
const enrollCourse = asyncHandler(enrollCourseFunction);

export {
  createCourse,
  addCourseVideo,
  getCourse,
  updateCourse,
  getAllCourses,
  getAllCoursesInstructor,
  deleteCourseInstructor,
  updateCourseVideo,
  deleteCourseVideo,
  addSection,
  deleteSection,
  updateSection,
  enrollCourse,
};
