"use client";

import {
  Home,
  BookOpen,
  Calendar,
  Star,
  MessageCircle,
  HelpCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CourseInfoForm from "@/components/course/CourseInfoForm";
import CourseMediaUpload from "@/components/course/CourseMediaUpload";
import CourseContentManager from "@/components/course/CourseContentManager";
import LatestCoursesList from "@/components/course/LatestCoursesList";

export default function MyCoursesPage() {
  const pathname = usePathname();

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
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${
                pathname === href
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
      <div className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Upload New Course</h2>

        <div className="bg-[#FAF7F3] border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/*Two-column layout (Info Form + [Media + Content]) */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_2fr] gap-8">
            <CourseInfoForm />
            <div className="flex flex-col gap-6 ml-4">
              <CourseMediaUpload />
              <CourseContentManager />
            </div>
          </div>
        </div>

        <LatestCoursesList />
      </div>
    </div>
  );
}
