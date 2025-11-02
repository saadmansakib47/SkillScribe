"use client";

import CourseInfoForm from "@/components/course/CourseInfoForm"
import CourseMediaUpload from "@/components/course/CourseMediaUpload";
import CourseContentManager from "@/components/course/CourseContentManager";
import LatestCoursesList from "@/components/course/LatestCoursesList";

export default function MyCoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Upload New Course</h2>

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CourseInfoForm />
          <CourseMediaUpload />
        </div>

        {/* Course Content section below */}
        <div className="mt-8">
          <CourseContentManager />
        </div>
      </div>

      <LatestCoursesList />
    </div>
  );
}
