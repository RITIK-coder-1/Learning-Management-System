/* ----------------------------------------------------------------------------------------------
AdminDashboard.jsx
------------------------------------------------------------------------------------------------- */

import React, { useState } from "react";
import { Users, BookOpen, IndianRupee, Trash2, Plus } from "lucide-react";
import { useGetSystemStatsQuery } from "@/api/index.api";
import { SpinnerCustom } from "@/components/index.components";

const AdminDashboard = () => {
  // the activity tab
  const [activeTab, setActiveTab] = useState("users");

  // the system stats
  const { data, isLoading: isStatsLoading } = useGetSystemStatsQuery();
  const stats = data?.data;

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

  const mockUsers = [
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aarav@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      id: 2,
      name: "Sneha Gupta",
      email: "sneha@example.com",
      role: "Student",
      status: "Active",
    },
  ];

  const mockCategories = [
    { id: 1, name: "Web Development", courseCount: 8 },
    { id: 2, name: "Data Science", courseCount: 4 },
  ];

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
              <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition">
                <Plus size={16} /> Add Category
              </button>
            )}
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-800">
                <th className="pb-4 font-medium">NAME / TITLE</th>
                <th className="pb-4 font-medium">DETAILS</th>
                <th className="pb-4 font-medium">STATUS</th>
                <th className="pb-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {activeTab === "users" &&
                mockUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="text-sm group hover:bg-[#1e293b] transition-colors"
                  >
                    <td className="py-4">
                      <div className="font-medium text-gray-200">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="py-4 text-gray-400">{user.role}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-gray-500 hover:text-red-400 transition-colors p-2">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
