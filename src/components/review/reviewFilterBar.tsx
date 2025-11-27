"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SearchBar } from "../ui/searchBar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { getReviewsForCourse } from "@/lib/reviews";

const courses = [
  { id: "21", name: "Machine Learning with Python" },
  { id: "all", name: "All Courses" },
];

export default function ReviewFilterBar({
  courseId,
  onFilteredReviews,
}: {
  courseId: number;
  onFilteredReviews: (filtered: any[]) => void;
}) {
  // Dual state: ID for logic, name for display
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [courseName, setCourseName] = useState<string>("All Courses"); // Display name
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allReviews, setAllReviews] = useState<any[]>([]);

  // Fetch reviews once
  useEffect(() => {
    const fetched = getReviewsForCourse(courseId);
    setAllReviews(fetched);
    onFilteredReviews(fetched);
  }, [courseId]);

  // Re-filter when any filter changes
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = allReviews.filter((r) => {
      const matchesSearch =
        r.userName.toLowerCase().includes(query) ||
        r.text.toLowerCase().includes(query) ||
        (r.instructorReply && r.instructorReply.toLowerCase().includes(query));

      const matchesRating =
        ratingFilter === "all" || r.rating === Number(ratingFilter);
      const matchesCourse =
        courseFilter === "all" || r.courseId.toString() === courseFilter;


      return matchesSearch && matchesRating && matchesCourse;
    });

    onFilteredReviews(filtered);
  }, [searchQuery, ratingFilter, courseFilter, allReviews]);

  // Handle course selection
  const handleCourseChange = (id: string) => {
    setCourseFilter(id);
    const course = courses.find((c) => c.id === id);
    setCourseName(course?.name ?? "All Courses");
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white border border-gray-200 rounded-[8px] p-4 shadow-sm">
      {/* Select Course */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Select Course
        </label>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[180px]">
            {/* Only use placeholder */}
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>

          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

      {/* Filter by Rating */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Filter by Rating
        </label>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            {[5, 4, 3, 2, 1].map((r) => (
              <SelectItem key={r} value={r.toString()}>
                {r} Stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <SearchBar
        label="Search"
        placeholder="Search Reviews"
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
  );
}
