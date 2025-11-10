"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ReviewSummary from "@/components/review/reviewSummary";
import ReviewFilterBar from "@/components/review/reviewFilterBar";
import ReviewCard from "@/components/review/reviewCard";
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
    getReviewsForCourse(course.id).map((review) => ({
      id: review.id,
      avatar: course.instructorImage || "/Asset/default-avatar.png",
      name: review.userName,
      course: course.title,
      date: review.date,
      rating: review.rating,
      comment: review.text,
      reply: review.instructorReply,
    }))
  );

  return (
    <InstructorLayout>
      <div className="bg-[#f8f9fb] min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Summary cards */}
          <ReviewSummary reviews={instructorReviews.map((r) => ({
            rating: r.rating,
          })) as any} />

          {/* Filter bar */}
          <ReviewFilterBar />

          {/* Review cards */}
          <div className="space-y-6">
            {instructorReviews.length > 0 ? (
              instructorReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">
                No reviews found for your courses yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
