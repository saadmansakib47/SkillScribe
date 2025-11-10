"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ReviewSummary from "@/components/review/reviewSummary";
import ReviewFilterBar from "@/components/review/reviewFilterBar";
import ReviewList from "@/components/review/reviewList";
import { COURSES } from "@/lib/courses";
import { getReviewsForCourse } from "@/lib/reviews";

export default function InstructorReviewPage() {
  const currentInstructor = "Jashim Uddin";

  const instructorCourses = COURSES.filter(
    (course) => course.instructorName === currentInstructor
  );

  const instructorReviews = instructorCourses.flatMap((course) =>
    getReviewsForCourse(course.id)
  );

  return (
    <InstructorLayout>
      <div className="bg-[#f8f9fb] min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <ReviewSummary reviews={instructorReviews} />
          <ReviewFilterBar />
          <ReviewList courseId={21} />
        </div>
      </div>
    </InstructorLayout>
  );
}
