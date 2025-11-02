"use client";

import {
  Home,
  BookOpen,
  Calendar,
  Star,
  MessageCircle,
  HelpCircle,
  User,
  Bell,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import InstructorLineChart from "@/components/chart/instructorChart/instructorLineChart";
import InstructorPieChart from "@/components/chart/instructorChart/instructorPieChart";
import CourseStatsTable from "@/components/course/CourseStatsTable";
import RangeSelector from "@/components/chart/instructorChart/rangeSelector";
import StatCards from "@/components/ui/StatCards";

export default function InstructorDashboard() {
  const [selectedRange, setSelectedRange] = useState<"7d" | "14d" | "30d" | "90d">("7d");
  const [selectedMetric, setSelectedMetricState] = useState<"Followers" | "Likes" | "Views" | "Watch Time">("Followers");


  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-4">
        <h1 className="text-2xl font-semibold mb-8">Ready to Teach?</h1>

        <nav className="space-y-4">
          {[
            { icon: Home, label: "Dashboard", href: "/instructor/dashboard" },
            { icon: BookOpen, label: "My Courses", href: "/instructor/mycourses" },
            { icon: Calendar, label: "My Schedule", href: "/instructor/schedule" },
            { icon: Star, label: "Review", href: "/instructor/review" },
            { icon: MessageCircle, label: "Messages", href: "/instructor/messages" },
            { icon: HelpCircle, label: "Q&A", href: "/instructor/qa" },
            { icon: User, label: "My Account", href: "/instructor/account" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${typeof window !== "undefined" &&
                  window.location.pathname === href
                  ? "bg-[#F0F4FF] text-[#4C6FFF] font-medium"
                  : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

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

        {/* Stats Cards ( clickable) */}
        <StatCards
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetricState}
        />



        {/* Line Chart Section */}
        <InstructorLineChart selectedMetric={selectedMetric} selectedRange={selectedRange} />
        {/* Bottom Section (Courses in Progress + Pie Chart side by side) */}
        <div className="grid grid-cols-3 gap-6">
          {/* Courses in Progress */}
          <div className="col-span-2 bg-white p-6 rounded-2xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">
                Courses In Progress (6)
              </h2>
              <button className="text-gray-500 text-sm hover:text-[#4C6FFF]">
                View All
              </button>
            </div>

            <ul className="space-y-3">
              {[
                {
                  title: "What is International Business?",
                  lessons: "11 lessons, 2hr 30min",
                  progress: 80,
                },
                {
                  title: "Microsoft Excel: Learn MS Excel 2019",
                  lessons: "7 lessons, 1hr 10min",
                  progress: 20,
                },
                {
                  title: "Make Website with WordPress",
                  lessons: "13 lessons, 2hr 13min",
                  progress: 50,
                },
              ].map((course, i) => (
                <li
                  key={i}
                  className="p-3 rounded-xl border hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-1">
                    <a
                      href="#"
                      className="text-[#1d4ed8] font-medium hover:underline"
                    >
                      {course.title}
                    </a>

                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-[#4C6FFF] rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {course.progress}%
                      </span>
                      <button className="bg-[#EEF2FF] p-2 rounded-full hover:bg-[#DDE4FF]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#4C6FFF]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 4l10 6-10 6V4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{course.lessons}</p>
                </li>
              ))}
            </ul>
          </div>


          {/* Earning Pie Chart */}
          <InstructorPieChart />
        </div>

        {/* Course Stats Table */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-4 mt-4">
          <CourseStatsTable />
        </div>

      </main>
    </div>
  );
}
