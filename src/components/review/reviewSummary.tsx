"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/lib/reviews";

export default function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const avgRating =
    total === 0
      ? 0
      : (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-2">{total}</h2>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <h2 className="text-3xl font-bold">{avgRating}</h2>
            <Star className="text-yellow-500 fill-yellow-500 w-6 h-6" />
          </div>
        </CardContent>
      </Card>

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
