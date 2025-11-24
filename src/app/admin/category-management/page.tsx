"use client";

import { useState, useMemo } from 'react';
import AdminLayout from '../adminLayout';
import {
  CATEGORIES,
  getCategoryOverallStats,
  sortCategories,
  CategoryStats
} from '@/lib/admin/categories';
import {
  CategoryStatsCards,
  CategorySearchBar,
  CategoryFilters,
  CategoryCard,
  AddCategoryModal
} from '@/components/admin/category-management';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<CategoryStats[]>(CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'a-z' | 'z-a'>('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const overallStats = useMemo(() => getCategoryOverallStats(), []);

  const filteredCategories = useMemo(() => {
    let filtered = [...categories];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query) ||
          category.courseTypes.some((type) => type.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((category) => category.name === categoryFilter);
    }

    // Apply sorting
    filtered = sortCategories(filtered, sortBy);

    return filtered;
  }, [categories, searchQuery, categoryFilter, sortBy]);

  const categoryNames = useMemo(() => categories.map((cat) => cat.name), [categories]);

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const handleSaveCategory = (categoryData: {
    name: string;
    description: string;
    courseTypes: string[];
  }) => {
    const newCategory: CategoryStats = {
      id: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      name: categoryData.name,
      description: categoryData.description,
      coursesCount: 0,
      studentsCount: 0,
      revenue: 0,
      courseTypes: categoryData.courseTypes,
      trending: false
    };

    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="mb-6">
            <CategorySearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Stats Cards */}
          <CategoryStatsCards
            totalCategories={overallStats.totalCategories}
            activeCourses={overallStats.activeCourses}
            totalRevenue={overallStats.totalRevenue}
            trendingCount={overallStats.trendingCount}
          />

          {/* Filters */}
          <CategoryFilters
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categoryNames}
            onAddCategory={handleAddCategory}
          />

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredCategories.length}</span> of{' '}
              <span className="font-semibold">{categories.length}</span> categories
            </p>
          </div>

          {/* Category Cards Grid */}
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No categories found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
      />
    </AdminLayout>
  );
}
