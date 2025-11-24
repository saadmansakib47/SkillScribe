"use client";

import { BookOpen, Users, DollarSign, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { CategoryStats } from '@/lib/admin/categories';

interface CategoryCardProps {
  category: CategoryStats;
}

// Category icon mapping
const getCategoryIcon = (categoryName: string): string => {
  const icons: Record<string, string> = {
    'Web Development': '/Asset/webdev.jpg',
    'Data Science': '/Asset/data science.jpeg',
    'Programming': '/Asset/java script.jpg',
    'Database': '/Asset/database design.jpg',
    'Software Testing': '/Asset/testing.jpg',
    'Design': '/Asset/uiux.webp',
    'Marketing': '/Asset/design think.png'
  };
  return icons[categoryName] || '/Asset/webdev.jpg';
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Icon and Title */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
            <Image
              src={getCategoryIcon(category.name)}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
              {category.trending && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex gap-6 lg:ml-auto">
          <div className="text-center min-w-[100px]">
            <div className="flex justify-center mb-1">
              <BookOpen className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{category.coursesCount}</p>
            <p className="text-xs text-gray-600 mt-1">Courses</p>
          </div>

          <div className="text-center min-w-[100px]">
            <div className="flex justify-center mb-1">
              <Users className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {category.studentsCount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">Student</p>
          </div>

          <div className="text-center min-w-[100px]">
            <div className="flex justify-center mb-1">
              <DollarSign className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(category.revenue)}
            </p>
            <p className="text-xs text-gray-600 mt-1">Revenue</p>
          </div>
        </div>
      </div>

      {/* Course Types - Below */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">Subcategories:</p>
        <div className="flex flex-wrap gap-2">
          {category.courseTypes.map((type) => (
            <span
              key={type}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
