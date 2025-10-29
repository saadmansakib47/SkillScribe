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
import InstructorChart from "@/components/chart/instructorChart";

export default function InstructorDashboard() {
  const [activeRange, setActiveRange] = useState("7");
  const [selectedMetric, setSelectedMetric] = useState<"Followers" | "Likes" | "Views" | "Watch Time">("Followers");

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
              onClick={() => setSelectedMetric(card.label as "Followers" | "Likes" | "Views" | "Watch Time")}
              className={`p-4 rounded-2xl border bg-white text-left transition-all duration-300 ${
                selectedMetric === card.label
                  ? "border-[#4C6FFF] shadow-md scale-[1.02]"
                  : "border-gray-200 hover:shadow-sm"
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

        {/* Charts */}
        <InstructorChart selectedMetric={selectedMetric} />

        {/* Bottom Section */}
        {/* (Courses in progress, same as before) */}
      </main>
    </div>
  );
}
