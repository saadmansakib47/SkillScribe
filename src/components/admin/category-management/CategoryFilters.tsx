"use client";

import { Plus } from 'lucide-react';

interface CategoryFiltersProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'latest' | 'oldest' | 'a-z' | 'z-a';
  onSortChange: (sort: 'latest' | 'oldest' | 'a-z' | 'z-a') => void;
  categories: string[];
  onAddCategory: () => void;
}

export default function CategoryFilters({
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  onAddCategory
}: CategoryFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left side - Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full lg:w-auto">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'latest' | 'oldest' | 'a-z' | 'z-a')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        {/* Right side - Add Button */}
        <div className="w-full lg:w-auto">
          <button
            onClick={onAddCategory}
            className="w-full lg:w-auto px-6 py-3 bg-[#094CA4] hover:bg-[#073a85] text-white rounded-full font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap mt-0 lg:mt-6"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
