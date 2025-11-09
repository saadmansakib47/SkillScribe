"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getReviewsForCourse } from "@/lib/reviews";
import { Star } from "lucide-react";

export default function ReviewList({ courseId }: { courseId: number }) {
  const reviews = getReviewsForCourse(courseId);

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-[12px] p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={review.avatar} alt={review.userName} />
              <AvatarFallback>
                {review.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mt-3 text-sm leading-relaxed">{review.text}</p>

              {review.instructorReply && (
                <div className="mt-4 ml-6 border-l-2 border-gray-200 pl-4">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-gray-900">Instructor reply:</span>{" "}
                    {review.instructorReply}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
