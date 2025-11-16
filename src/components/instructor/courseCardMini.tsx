"use client";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/lib/courses";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CourseCardMini({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`}>
      <Card className="rounded-xl overflow-hidden hover:shadow-lg transition">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={220}
          className="w-full h-44 object-cover"
        />

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">{course.title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star size={16} className="text-yellow-500" />
            {course.rating} ({course.reviews} reviews)
          </div>

          <p className="text-sm text-gray-500">{course.durationHours} hrs • {course.totalVideos} videos</p>
        </CardContent>
      </Card>
    </Link>
  );
}
