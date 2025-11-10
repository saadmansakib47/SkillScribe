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
        <div key={i} className="relative w-7 h-7">
          <Star className="absolute w-7 h-7 text-gray-300" strokeWidth={1.5} />
          <div
            className="absolute top-0 left-0 overflow-hidden transition-all duration-500 ease-out"
            style={{ width: `${fill}%`, height: "100%" }}
          >
            <Star
              className="w-7 h-7 text-blue-600 fill-blue-400"
              strokeWidth={1.5}
            />
          </div>
        </div>
      );
    }
    return <div className="flex justify-center mt-2">{stars}</div>;
  };

  // Shared corner border element
  const CornerBorders = () => (
    <>
      {/* Top-left corner */}
      <div className="absolute top-0 left-0 w-20 h-[4px] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 rounded-tl-xl rounded-tr-md"></div>
      <div className="absolute top-0 left-0 w-[4px] h-20 bg-gradient-to-b from-blue-500 via-blue-300 to-blue-500 rounded-tl-xl rounded-bl-md"></div>

      {/* Bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-20 h-[4px] bg-gradient-to-l from-blue-500 via-blue-300 to-blue-500 rounded-br-xl rounded-bl-md"></div>
      <div className="absolute bottom-0 right-0 w-[4px] h-20 bg-gradient-to-t from-blue-500 via-blue-300 to-blue-500 rounded-br-xl rounded-tr-md"></div>
    </>


  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Reviews */}
      <Card className="relative rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <CornerBorders />
        <CardContent className="p-6 text-center">
          <p className="text-black text-sm uppercase tracking-wide">
            Total Reviews
          </p>
          <h2 className="text-4xl font-extrabold mt-2 text-gray-800">{total}</h2>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="relative rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 bg-gradient-to-br from-white to-yellow-50 text-center overflow-hidden">
        <CornerBorders />
        <CardContent className="p-6">
          <p className="text-black text-sm uppercase tracking-wide">
            Average Rating
          </p>
          <h2 className="text-4xl font-extrabold mt-2 text-black-600">
            {avgRating.toFixed(1)}
          </h2>
          {renderStars(avgRating)}
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <Card className="relative rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <CornerBorders />
        <CardContent className="p-6">
          <p className="text-black text-sm uppercase tracking-wide">
            Rating Distribution
          </p>
          <div className="mt-3 space-y-2">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-sm">
                <span className="w-5 text-gray-600">{d.star}★</span>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${(d.count / total) * 100 || 0}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-gray-700 font-medium">{d.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
