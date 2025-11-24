"use client";

import { CourseStatus } from '@/lib/admin/courses';

interface CourseFiltersProps {
  activeTab: CourseStatus | 'All';
  onTabChange: (tab: CourseStatus | 'All') => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'latest' | 'a-z';
  onSortChange: (sort: 'latest' | 'a-z') => void;
  categories: string[];
}

export default function CourseFilters({
  activeTab,
  onTabChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories
}: CourseFiltersProps) {
  const tabs: (CourseStatus | 'All')[] = ['All', 'Published', 'Pending', 'Suspended'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#094CA4] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            onChange={(e) => onSortChange(e.target.value as 'latest' | 'a-z')}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#094CA4] focus:border-transparent"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
