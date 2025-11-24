"use client";

import { Search } from 'lucide-react';

interface CourseSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CourseSearchBar({ searchQuery, onSearchChange }: CourseSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search for courses"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent transition-all"
      />
    </div>
  );
}
