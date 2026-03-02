/* ----------------------------------------------------------------------------------------------
EnrollmentStats.jsx
The enrollment stats of a course
------------------------------------------------------------------------------------------------- */

import React, { useState, useEffect } from "react";

const EnrollmentStats = () => {
  const [stats, setStats] = useState({ total: 0, rate: 0, growth: 0 });

  useEffect(() => {
    // Mock Data
    setStats({
      total: Math.floor(Math.random() * 500) + 50, // 50 to 550
      rate: Math.floor(Math.random() * 40) + 60, // 60% to 100%
      growth: Math.floor(Math.random() * 20) + 5, // 5% to 25%
    });
  }, []);

  return (
    <div className="bg-[#1a1c2e] border border-gray-800 rounded-lg p-5 mb-6 flex gap-8 items-center">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
          Enrolled Students
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {stats.total}
          </h2>
          <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
            +{stats.growth}%
          </span>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-700"></div>

      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
          Completion Rate
        </p>
        <h2 className="text-xl font-semibold text-gray-200">{stats.rate}%</h2>
      </div>
    </div>
  );
};

export default EnrollmentStats;
