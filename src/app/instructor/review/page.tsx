"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ReviewSummary from "@/components/review/reviewSummary";
import ReviewFilterBar from "@/components/review/reviewFilterBar";
import ReviewList from "@/components/review/reviewList";
import { COURSES } from "@/lib/courses";
import { getReviewsForCourse } from "@/lib/reviews";

export default function InstructorReviewPage() {
  const currentInstructor = "Jashim Uddin";

  // Find all courses taught by this instructor
  const instructorCourses = COURSES.filter(
    (course) => course.instructorName === currentInstructor
  );

  // Collect all reviews for those courses
  const instructorReviews = instructorCourses.flatMap((course) =>
    getReviewsForCourse(course.id)
  );

  return (
    <InstructorLayout>
      <div className="bg-[#f8f9fb] min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Summary cards (Average rating, total reviews, etc.) */}
          <ReviewSummary reviews={instructorReviews} />

          {/* Filter bar (Sort by, Rating filter, etc.) */}
          <ReviewFilterBar />

          {/* Review list */}
          <ReviewList courseId={21} />
        </div>
      </div>
    </InstructorLayout>
  );
}
