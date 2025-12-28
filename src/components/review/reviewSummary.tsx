// src/components/review/reviewSummary.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/lib/reviews";

export default function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const avgRating =
    total === 0
      ? 0
      : parseFloat(
        (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      );

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fill =
        i <= Math.floor(rating)
          ? 100
          : i - 1 < rating && rating < i
            ? (rating - (i - 1)) * 100
            : 0;

      stars.push(
        <div key={i} className="relative w-5 h-5">
          <Star className="absolute w-5 h-5 text-gray-300" strokeWidth={1.5} />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fill}%`, height: "100%" }}
          >
            <Star
              className="w-5 h-5 text-blue-700 fill-blue-600"
              strokeWidth={1.5}
            />
          </div>
        </div>
      );
    }
    return <div className="flex justify-center mt-2 gap-1">{stars}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Reviews */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardContent className="p-6 flex flex-col h-40">
          <p className="font-bold text-gray-900 text-sm">Total Reviews</p>
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-5xl font-bold text-blue-600">{total}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardContent className="p-6 flex flex-col h-40">
          <p className="font-bold text-gray-900 text-sm">Average Ratings</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-5xl font-bold text-blue-600">
              {avgRating.toFixed(1)}
            </h2>
            {renderStars(avgRating)}
          </div>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
        <CardContent className="p-6 h-40 flex flex-col justify-center">
          <p className="font-bold text-gray-900 text-sm mb-2">Rating Distributions</p>
          <div className="space-y-1 w-full">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-blue-700 font-medium">{d.star}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{
                      width: `${(d.count / total) * 100 || 0}%`,
                    }}
                  />
                </div>
                <span className="w-3 text-gray-500 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
