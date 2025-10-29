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
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function InstructorDashboard() {
  const [activeRange, setActiveRange] = useState("7");

  const followersData = [
    { date: "10 May", value: 10000 },
    { date: "11 May", value: 18000 },
    { date: "12 May", value: 9000 },
    { date: "13 May", value: 14000 },
    { date: "14 May", value: 20000 },
    { date: "15 May", value: 11000 },
    { date: "16 May", value: 19000 },
  ];

  const earningData = [
    { name: "Courses", value: 240 },
    { name: "Bytes", value: 100 },
    { name: "Read", value: 42 },
  ];

  const COLORS = ["#4C6FFF", "#E2B8FF", "#E5E483"];

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
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl ${
                label === "Dashboard"
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
              className={`px-4 py-2 border rounded-full text-sm ${
                activeRange === r.key
                  ? "bg-[#4C6FFF] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Likes", value: "323K", change: "+42k" },
            { label: "Followers", value: "1.2M", change: "+23k" },
            { label: "Views", value: "250k", change: "+15k" },
            { label: "Watch Time", value: "128hr", change: "+3hr" },
          ].map((card, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border bg-white ${
                card.label === "Followers" ? "border-[#4C6FFF]" : "border-gray-200"
              }`}
            >
              <h3 className="text-gray-500 text-sm mb-1">{card.label}</h3>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className="text-green-500 text-sm">{card.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl border mb-6">
          <h2 className="text-gray-700 font-medium mb-4">Followers</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={followersData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4C6FFF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Courses In Progress */}
          <div className="bg-white p-6 rounded-2xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">
                Courses In Progress (6)
              </h2>
              <button className="text-[#4C6FFF] text-sm font-medium">
                View All
              </button>
            </div>
            {[
              { title: "What is International Business?", percent: 80, lessons: "11 lessons, 2hr 30 min" },
              { title: "Microsoft excel: Learn MS Excel 2019", percent: 20, lessons: "7 lessons, 1hr 10 min" },
              { title: "Make Website with Wordpress", percent: 50, lessons: "13 lessons, 2hr 13 min" },
            ].map((course, i) => (
              <div key={i} className="mb-4">
                <p className="text-[#4C6FFF] font-medium hover:underline cursor-pointer">
                  {course.title}
                </p>
                <p className="text-sm text-gray-500 mb-1">{course.lessons}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-[#4C6FFF] h-2 rounded-full"
                    style={{ width: `${course.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Earning Pie Chart */}
          <div className="bg-white p-6 rounded-2xl border col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Earning</h2>
              <button className="text-gray-500 text-sm">This Week</button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-48 w-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={earningData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {earningData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-center">
                <span className="text-gray-500">Total Earning</span>
                <br />
                <span className="text-2xl font-semibold">$382</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
