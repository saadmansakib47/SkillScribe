"use client";

import { Course } from "@/lib/courses";
import CourseCardMini from "./courseCardMini";

export default function CourseListByInstructor({ courses }: { courses: Course[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Courses by this Instructor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <CourseCardMini key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
