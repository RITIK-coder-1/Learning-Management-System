/* ----------------------------------------------------------------------------------------------
AdminDashboard.jsx
------------------------------------------------------------------------------------------------- */

import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  IndianRupee,
  Trash2,
  Plus,
  RefreshCw,
} from "lucide-react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteCourseAdminMutation,
  useDeleteUserAdminMutation,
  useGetAllCategoriesQuery,
  useGetAllCoursesAdminQuery,
  useGetAllUsersQuery,
  useGetSystemStatsQuery,
  useUpdateCategoryMutation,
} from "@/api/index.api";
import {
  AddDialogueBox,
  DeleteDialogueBox,
  FieldInput,
  SpinnerCustom,
} from "@/components/index.components";

const AdminDashboard = () => {
  /* ----------------------------------------------------------------------------------------------
  The tabs
  ------------------------------------------------------------------------------------------------- */
  // the activity tab
  const [activeTab, setActiveTab] = useState("users");

  // add categories tab
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("");

  /* ----------------------------------------------------------------------------------------------
  The states
  ------------------------------------------------------------------------------------------------- */
  const [category, setCategory] = useState({ name: "", description: "" });

  const [currentCategories, setCurrentCategories] = useState([]);

  const [createCategory, { isLoading: isCreateCategoryLoading }] =
    useCreateCategoryMutation();

  const [updateCategory, {}] = useUpdateCategoryMutation();

  const [deleteUser, {}] = useDeleteUserAdminMutation();

  const [deleteCourse, {}] = useDeleteCourseAdminMutation();

  const [deleteCategory, {}] = useDeleteCategoryMutation();

  /* ----------------------------------------------------------------------------------------------
  The data
  ------------------------------------------------------------------------------------------------- */

  // the system stats
  const { data: statsData, isLoading: isStatsLoading } =
    useGetSystemStatsQuery();
  const stats = statsData?.data;

  // the users
  const { data: usersData, isLoading: isUserLoading } = useGetAllUsersQuery();
  const users = usersData?.data;

  // the courses
  const { data: coursesData, isLoading: isCourseLoading } =
    useGetAllCoursesAdminQuery();
  const courses = coursesData?.data;

  // the categories
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery();
  const categories = categoryData?.data;

  // set the current categories state
  useEffect(() => {
    setCurrentCategories(categories);
  }, [categories]);

  // Data to display
  const statsToDisplay = [
    {
      label: "Total Users",
      value: isStatsLoading ? <SpinnerCustom /> : stats?.userCount,
      icon: <Users size={20} />,
      color: "text-blue-400",
    },
    {
      label: "Total Courses",
      value: isStatsLoading ? <SpinnerCustom /> : stats?.courseCount,
      icon: <BookOpen size={20} />,
      color: "text-purple-400",
    },
    {
      label: "Platform Revenue",
      value: isStatsLoading ? <SpinnerCustom /> : `₹${stats?.totalRevenue}`,
      icon: <IndianRupee size={20} />,
      color: "text-green-400",
    },
  ];

  /* ----------------------------------------------------------------------------------------------
  The methods
  ------------------------------------------------------------------------------------------------- */

  // to set the new category
  const addCategory = (e) =>
    setCategory({ ...category, [e.target.name]: e.target.value });

  // to set a category active to update
  const activateTheCategory = (categoryId) => () => {
    if (activeCategory === categoryId) {
      setActiveCategory("");
    } else {
      setActiveCategory(categoryId);
    }
  };

  // to update a category value
  const updateCategoryValue = (id) => (e) => {
    try {
      currentCategories.forEach(async (category) => {
        if (category?._id === id) {
          const newCategory = { ...category, name: e.target.value };

          // first remove the category
          setCurrentCategories((categories) =>
            categories?.filter((category) => category?._id !== id)
          );

          // then, add the updated category
          setCurrentCategories((categories) => [...categories, newCategory]);

          // simulatneously update the category in the database
          await updateCategory({
            categoryData: newCategory,
            categoryId: id,
          }).unwrap();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // the API call to add a category
  const createCategoryApiCall = async (e) => {
    e.preventDefault();
    try {
      await createCategory(category).unwrap();
      setCategoryOpen(false);
      setCategory({ name: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete the user
  const deleteUserApiCall = (userId) => {
    return async (e) => {
      e.preventDefault();
      try {
        await deleteUser(userId).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // Delete the course
  const deleteCourseApiCall = (courseId) => {
    return async (e) => {
      e.preventDefault();
      try {
        await deleteCourse(courseId).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // Delete the Category
  const deleteCategoryApiCall = (categoryId) => {
    return async (e) => {
      e.preventDefault();
      try {
        await deleteCategory(categoryId).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
  };

  // update a category
  const updateCategoryApiCall = (categoryId) => {
    return (e) => {
      e.preventDefault();
      try {
        currentCategories?.forEach(async (category) => {
          if (category?._id === categoryId) {
            await updateCategory({
              categoryData: category,
              categoryId,
            }).unwrap();
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 font-sans mb-5">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Control Center</h1>
        <p className="text-gray-400">
          Manage your ecosystem and platform integrity.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statsToDisplay.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 p-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Management Section */}
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800">
          {["users", "courses", "categories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Table */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">
              {activeTab} Management
            </h2>
            {activeTab === "categories" && (
              <AddDialogueBox
                label={<Plus size={16} />}
                title={"Category"}
                onSubmit={createCategoryApiCall}
                open={categoryOpen}
                setOpen={setCategoryOpen}
                isLoading={isCreateCategoryLoading}
              >
                <FieldInput
                  label="Name"
                  name="name"
                  placeholder="Software Engineering"
                  onChange={addCategory}
                  value={category.name}
                />
                <FieldInput
                  label="Description"
                  name="description"
                  placeholder="Description"
                  onChange={addCategory}
                  value={category.description}
                />
              </AddDialogueBox>
            )}
          </div>

          {/* The users table  */}
          {activeTab === "users" && (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-800">
                  <th className="pb-4 font-medium">NAME</th>
                  <th className="pb-4 font-medium">DETAILS</th>
                  <th className="pb-4 font-medium">STATUS</th>
                  <th className="pb-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              {isUserLoading ? (
                <div className="w-full p-5 flex justify-start items-center">
                  <SpinnerCustom />
                </div>
              ) : (
                <tbody className="divide-y divide-gray-800">
                  {users?.map((user) => (
                    <tr
                      key={user?._id}
                      className="text-sm group hover:bg-[#1e293b] transition-colors"
                    >
                      <td className="py-4">
                        <div className="font-medium text-gray-200">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email}
                        </div>
                      </td>
                      <td className="py-4 text-gray-400">
                        {user?.accountType}
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-800">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-4 text-right flex justify-end text-red-400 hover:text-red-600">
                        <DeleteDialogueBox
                          label={<Trash2 size={18} />}
                          triggerClass="border-none flex justify-center bg-transparent w-10 sm:w-10 md:w-10 hover:bg-transparent "
                          description={
                            user?.accountType === "Instructor"
                              ? "All their courses and videos will be deleted"
                              : ""
                          }
                          onClick={deleteUserApiCall(user?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}

          {/* The courses table */}
          {activeTab === "courses" && (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-800">
                  <th className="pb-4 font-medium">TITLE</th>
                  <th className="pb-4 font-medium">INSTRUCTOR</th>
                  <th className="pb-4 font-medium">STUDENTS</th>
                  <th className="pb-4 font-medium">PRICE</th>
                  <th className="pb-4 font-medium">REVENUE</th>
                  <th className="pb-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              {isCourseLoading ? (
                <div className="w-full p-5 flex justify-start items-center">
                  <SpinnerCustom />
                </div>
              ) : (
                <tbody className="divide-y divide-gray-800">
                  {courses?.map((course) => (
                    <tr
                      key={course?._id}
                      className="text-sm group hover:bg-[#1e293b] transition-colors"
                    >
                      <td className="py-4">
                        <div className="font-medium text-gray-200">
                          {course?.title}
                        </div>
                      </td>
                      <td className="py-4 text-gray-400">
                        {course?.owner?.firstName} {course?.owner?.lastName}
                      </td>
                      <td className="py-4 text-gray-400">
                        {course?.enrolledBy?.length}
                      </td>
                      <td className="py-4 text-gray-400">{course?.price}</td>

                      <td className="py-4">{course?.revenue}</td>
                      <td className="py-4 text-right flex justify-end text-red-400 hover:text-red-600">
                        <DeleteDialogueBox
                          label={<Trash2 size={18} />}
                          triggerClass="border-none flex justify-center bg-transparent w-10 sm:w-10 md:w-10 hover:bg-transparent "
                          description="All the videos and related information will be deleted"
                          onClick={deleteCourseApiCall(course?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}

          {/* The categories table */}
          {activeTab === "categories" && (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm border-b border-gray-800">
                  <th className="pb-4 font-medium">TITLE</th>
                  <th className="pb-4 font-medium">COURSES</th>
                  <th className="pb-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              {isCategoryLoading ? (
                <div className="w-full p-5 flex justify-start items-center">
                  <SpinnerCustom />
                </div>
              ) : (
                <tbody className="divide-y divide-gray-800">
                  {currentCategories?.map((category) => (
                    <tr
                      key={category?._id}
                      className="text-sm group hover:bg-[#1e293b] transition-colors"
                    >
                      <td className="py-4">
                        <input
                          className={`font-medium text-gray-200 p-3 pl-0 rounded-sm  ${
                            activeCategory === category?._id
                              ? "outline focus:outline"
                              : " focus:outline-none"
                          }`}
                          type="text"
                          value={category?.name}
                          readOnly={
                            activeCategory === category?._id ? false : true
                          }
                          onChange={updateCategoryValue(category?._id)}
                        />
                      </td>

                      <td className="py-4 text-gray-400">
                        {category?.courses?.length}
                      </td>

                      <td className="py-4 text-right flex justify-end items-center ">
                        <DeleteDialogueBox
                          label={<Trash2 size={18} />}
                          triggerClass="border-none flex justify-center bg-transparent w-10 sm:w-10 md:w-10 hover:bg-transparent text-red-400 hover:text-red-600"
                          description="Categories with active courses can't be deleted."
                          onClick={deleteCategoryApiCall(category?._id)}
                        />
                        <RefreshCw
                          size={18}
                          className="cursor-pointer hover:text-blue-500"
                          title="Update"
                          onClick={activateTheCategory(category?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
