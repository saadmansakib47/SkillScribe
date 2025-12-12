"use client";

import { usePathname } from "next/navigation";

import CourseInfoForm from "@/components/course/CourseInfoForm";
import CourseMediaUpload from "@/components/course/CourseMediaUpload";
import CourseContentManager from "@/components/course/CourseContentManager";
import LatestCoursesList from "@/components/course/LatestCoursesList";
import InstructorLayout from "@/app/instructor/instructorlayout";

export default function MyCoursesPage() {
  const pathname = usePathname();

  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#F9FAFB]">

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload New Course</h2>

          <div className="bg-[#FAF7F3] border border-[#FAF7F3] rounded-2xl p-6 shadow-sm">
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
    </InstructorLayout>
  );
}
