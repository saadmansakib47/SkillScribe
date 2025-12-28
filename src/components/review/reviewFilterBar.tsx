"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "../ui/searchBar";
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
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allReviews, setAllReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetched = getReviewsForCourse(courseId);
    setAllReviews(fetched);
    onFilteredReviews(fetched);
  }, [courseId]);

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

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      {/* Select Course */}
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-900 mb-1">
          Select Course
        </label>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full h-10 border-gray-300 rounded-[10px]">
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
        <label className="text-sm font-bold text-gray-900 mb-1">
          Filter by Rating
        </label>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-full h-10 border-gray-300 rounded-[10px]">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {[5, 4, 3, 2, 1].map((r) => (
              <SelectItem key={r} value={r.toString()}>
                {r} Stars
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="flex flex-col">
        {/* Helper label for search since SearchBar component might wrap label differently, checking SearchBar usage first... 
            ReviewFilterBar line 116 used SearchBar. let's assume it accepts label. 
            However, I want full control to match "Select Course" style. 
            I'll use the SearchBar but pass specific props if needed, or wrap it. 
            Actually, the original SearchBar component handles the label? 
            Looking at line 117 of original file: `label="Search"`. 
            I will use that, but ensure it renders nicely stacked.
        */}
        <SearchBar
          label="Search"
          placeholder="Search Reviews"
          value={searchQuery}
          onChange={setSearchQuery}
          className="w-full border-gray-300 rounded-[10px]"
        />
      </div>
    </div>
  );
}
