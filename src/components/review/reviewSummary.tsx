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

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  // Proper fractional stars
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
        <div key={i} className="relative w-7 h-7">
          {/* Base empty star */}
          <Star className="absolute w-7 h-7 text-gray-300" strokeWidth={1.5} />
          {/* Filled yellow star */}
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fill}%`, height: "100%" }}
          >
            <Star
              className="w-7 h-7 text-yellow-400 fill-yellow-400"
              strokeWidth={1.5}
            />
          </div>
        </div>
      );
    }
    return <div className="flex justify-center mt-2">{stars}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Reviews */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-2">{total}</h2>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="rounded-xl shadow-sm text-center">
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <h2 className="text-3xl font-bold mt-2">{avgRating.toFixed(1)}</h2>
          {renderStars(avgRating)}
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">Rating Distribution</p>
          <div className="mt-3 space-y-1">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-sm">
                <span>{d.star}★</span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(d.count / total) * 100 || 0}%`,
                    }}
                  />
                </div>
                <span>{d.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
