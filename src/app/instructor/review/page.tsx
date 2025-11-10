"use client";

import { useState, useMemo } from "react";
import InstructorLayout from "@/app/instructor/instructorlayout";
import ReviewSummary from "@/components/review/reviewSummary";
import ReviewFilterBar from "@/components/review/reviewFilterBar";
import ReviewList from "@/components/review/reviewList";
import { COURSES } from "@/lib/courses";
import { getReviewsForCourse } from "@/lib/reviews";

export default function InstructorReviewPage() {
  const currentInstructor = "Jashim Uddin";

  // Find all courses taught by this instructor
  const instructorCourses = useMemo(
    () => COURSES.filter((course) => course.instructorName === currentInstructor),
    [currentInstructor]
  );

  // Collect all reviews for those courses
  const instructorReviews = useMemo(
    () => instructorCourses.flatMap((course) => getReviewsForCourse(course.id)),
    [instructorCourses]
  );

  // We'll store filtered reviews here
  const [filteredReviews, setFilteredReviews] = useState(instructorReviews);

  return (
    <InstructorLayout>
      <div className="bg-[#f8f9fb] min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Summary cards */}
          <ReviewSummary reviews={filteredReviews} />

          {/* Filter bar (pass props here) */}
          <ReviewFilterBar
            courseId={21}
            onFilteredReviews={setFilteredReviews}
          />

          {/* Review list (shows filtered reviews dynamically) */}
          <ReviewList reviews={filteredReviews} />
        </div>
      </div>
    </InstructorLayout>
  );
}
