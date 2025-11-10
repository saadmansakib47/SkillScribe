"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ReviewFilterBar() {
  const [courseFilter, setCourseFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white border border-gray-200 rounded-[8px] p-4 shadow-sm">
      {/* Select Course */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Select Course
        </label>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="21">Machine Learning with Python</SelectItem>
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
      <div className="flex flex-col flex-1 min-w-[220px]">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search Reviews"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
    </div>
  );
}
