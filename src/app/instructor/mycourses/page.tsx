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
    <InstructorLayout className="bg-[#FAF7F3] min-h-screen p-8">
      <div className="max-w-[1600px] mx-auto space-y-10">

        {/* Course Creation Section */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 items-start">
          <CourseInfoForm />

          <div className="flex flex-col gap-6">
            <CourseMediaUpload />
            <CourseContentManager />
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white"></div>

        {/* Latest Courses List */}
        <LatestCoursesList />
      </div>
    </InstructorLayout>
  );
}
