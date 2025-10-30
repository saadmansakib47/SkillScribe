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
import InstructorLineChart from "@/components/chart/instructorChart/instructorLineChart";
import InstructorPieChart from "@/components/chart/instructorChart/instructorPieChart";

export default function InstructorDashboard() {
  const [activeRange, setActiveRange] = useState("7");
  const [selectedMetric, setSelectedMetric] = useState<
    "Followers" | "Likes" | "Views" | "Watch Time"
  >("Followers");

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-4">
        <h1 className="text-2xl font-semibold mb-8">Skillscribe</h1>

        <nav className="space-y-4">
          {[
            { icon: Home, label: "Dashboard" },
            { icon: BookOpen, label: "My Courses" },
            { icon: Calendar, label: "My Schedule" },
            { icon: Star, label: "Review" },
            { icon: MessageCircle, label: "Messages" },
            { icon: HelpCircle, label: "Q&A" },
            { icon: User, label: "My Account" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl ${label === "Dashboard"
                  ? "bg-[#F0F4FF] text-[#4C6FFF] font-medium"
                  : "hover:bg-gray-100"
                }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
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

        {/* Range Selector */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "7", label: "Last 7 days" },
            { key: "14", label: "Last 14 days" },
            { key: "28", label: "Last 28 days" },
            { key: "custom", label: "Custom" },
          ].map((r) => (
            <button
              key={r.key}
              onClick={() => setActiveRange(r.key)}
              className={`px-4 py-2 border rounded-full text-sm ${activeRange === r.key
                  ? "bg-[#4C6FFF] text-white"
                  : "bg-white hover:bg-gray-100"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Stats Cards (now clickable) */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Likes", value: "323K", change: "+42k" },
            { label: "Followers", value: "1.2M", change: "+23k" },
            { label: "Views", value: "250k", change: "+15k" },
            { label: "Watch Time", value: "128hr", change: "+3hr" },
          ].map((card, i) => (
            <button
              key={i}
              onClick={() =>
                setSelectedMetric(
                  card.label as "Followers" | "Likes" | "Views" | "Watch Time"
                )
              }
              className={`p-4 rounded-2xl border bg-white text-left transition-all duration-300 ${selectedMetric === card.label
                  ? "border-[#4C6FFF] shadow-md scale-[1.02]"
                  : "border-black hover:shadow-sm"
                }`}
            >
              <h3 className="text-gray-500 text-sm mb-1">{card.label}</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className="text-green-500 text-sm">{card.change}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Line Chart Section */}
        <InstructorLineChart selectedMetric={selectedMetric} />

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
      </main>
    </div>
  );
}
