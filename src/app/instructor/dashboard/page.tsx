"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import InstructorLineChart from "@/components/chart/instructorChart/instructorLineChart";
import InstructorPieChart from "@/components/chart/instructorChart/instructorPieChart";
import CourseStatsTable from "@/components/course/CourseStatsTable";
import CoursesInProgress from "@/components/course/CoursesInProgress";
import RangeSelector from "@/components/chart/instructorChart/rangeSelector";
import StatCards from "@/components/ui/StatCards";
import InstructorLayout from "@/app/instructor/instructorlayout";

export default function InstructorDashboard() {
  const [selectedRange, setSelectedRange] = useState<"7d" | "14d" | "30d" | "90d">("7d");
  const [selectedMetric, setSelectedMetricState] = useState<
    "Followers" | "Likes" | "Views" | "Watch Time"
  >("Followers");

  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#FAF7F3]">
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <input
              placeholder="Search for courses"
              className="w-1/2 px-4 py-2 border rounded-full focus:outline-none"
            />
            <Bell className="w-5 h-5" />
          </div>

          {/* --- Timespan Buttons --- */}
          <RangeSelector
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />

          {/* Stats Cards (clickable) */}
          <StatCards
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetricState}
          />

          {/* Line Chart Section */}
          <InstructorLineChart
            selectedMetric={selectedMetric}
            selectedRange={selectedRange}
          />

          {/* Bottom Section (Courses in Progress + Pie Chart side by side) */}
          <div className="grid grid-cols-3 gap-6">
            {/* Courses in Progress */}
            <CoursesInProgress />

            {/* Earning Pie Chart */}
            <InstructorPieChart />
          </div>

          {/* Course Stats Table */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 mt-4">
            <CourseStatsTable />
          </div>
        </main>
      </div>
    </InstructorLayout>
  );
}
