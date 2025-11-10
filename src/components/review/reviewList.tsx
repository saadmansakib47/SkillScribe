"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/components/review/reviewCard";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisibleCount((prev) => (prev < reviews.length ? prev + 3 : prev));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reviews.length]);

  return (
    <div className="space-y-6">
      {reviews.slice(0, visibleCount).map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {visibleCount >= reviews.length && (
        <p className="text-center text-gray-400 text-sm mt-4">
          All reviews loaded
        </p>
      )}
    </div>
  );
}
