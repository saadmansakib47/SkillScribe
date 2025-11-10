"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/review/reviewCard";
import { getReviewsForCourse } from "@/lib/reviews";

export default function ReviewList({ courseId }: { courseId: number }) {
  const allReviews = getReviewsForCourse(courseId);
  const [visibleCount, setVisibleCount] = useState(5);

  // Extend on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) =>
          prev < allReviews.length ? prev + 3 : prev
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allReviews.length]);

  return (
    <div className="space-y-6">
      {allReviews.slice(0, visibleCount).map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {visibleCount >= allReviews.length && (
        <p className="text-center text-gray-400 text-sm mt-4">
          All reviews loaded
        </p>
      )}
    </div>
  );
}
