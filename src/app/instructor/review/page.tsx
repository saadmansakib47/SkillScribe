"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ReviewSummary from "@/components//review/reviewSummary";
import ReviewList from "@/components/review/reviewList";
import { COURSES } from "@/lib/courses";
import { getReviewsForCourse } from "@/lib/reviews";

export default function InstructorReviewPage() {
  const currentInstructor = "Jashim Uddin";

  // find courses taught by this instructor
  const instructorCourses = COURSES.filter(
    (course) => course.instructorName === currentInstructor
  );

  // collect all reviews for those courses
  const instructorReviews = instructorCourses.flatMap((course) =>
    getReviewsForCourse(course.id)
  );

  return (
    <InstructorLayout>
      <div className="bg-[#f8f9fb] min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Summary cards */}
          <ReviewSummary reviews={instructorReviews} />

          {/* Review list */}
          <ReviewList courseId={21} />
        </div>
      </div>
    </InstructorLayout>
  );
}
