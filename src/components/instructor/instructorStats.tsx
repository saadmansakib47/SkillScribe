"use client";

import { Course } from "@/lib/courses";
import { Card, CardContent } from "@/components/ui/card";

export default function InstructorStats({ courses }: { courses: Course[] }) {
  const totalHours = courses.reduce((sum, c) => sum + c.durationHours, 0);
  const avgRating = (
    courses.reduce((sum, c) => sum + c.rating, 0) / courses.length
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Card className="p-5">
        <CardContent>
          <p className="text-gray-500">Total Courses</p>
          <h2 className="text-2xl font-bold mt-1">{courses.length}</h2>
        </CardContent>
      </Card>

      <Card className="p-5">
        <CardContent>
          <p className="text-gray-500">Total Duration</p>
          <h2 className="text-2xl font-bold mt-1">{totalHours} hrs</h2>
        </CardContent>
      </Card>

      <Card className="p-5">
        <CardContent>
          <p className="text-gray-500">Avg Rating</p>
          <h2 className="text-2xl font-bold mt-1">{avgRating}</h2>
        </CardContent>
      </Card>
    </div>
  );
}
