import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import FilterTabs from '../common/FilterTabs';
import SearchBar from '../common/SearchBar';

export type FilterTab = 'all' | 'inProgress' | 'completed';
export type SortOption = 'recent' | 'progress' | 'alphabetical';

interface CourseFilterBarProps {
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalEnrolled: number;
  totalInProgress: number;
  totalCompleted: number;
}

export default function CourseFilterBar({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalEnrolled,
  totalInProgress,
  totalCompleted
}: CourseFilterBarProps) {
  const tabs = [
    { id: 'all' as FilterTab, label: 'All Courses', count: totalEnrolled },
    { id: 'inProgress' as FilterTab, label: 'In Progress', count: totalInProgress },
    { id: 'completed' as FilterTab, label: 'Completed', count: totalCompleted }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
    >
      {/* Filter Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <FilterTabs
          tabs={tabs}
          activeTab={activeFilter}
          onTabChange={(id) => onFilterChange(id as FilterTab)}
        />

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#094CA4] focus:border-transparent cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="progress">Progress %</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search courses by title or instructor..."
      />
    </motion.div>
  );
}
