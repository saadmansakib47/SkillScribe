"use client";

import { useState, useMemo } from 'react';
import AdminLayout from '../adminLayout';
import { AdminCourse, ADMIN_COURSES, getCourseCategories, sortCourses, CourseStatus } from '@/lib/admin/courses';
import {
  CourseStatsCards,
  CourseSearchBar,
  CourseFilters,
  CourseTable
} from '@/components/admin/course-management';

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<AdminCourse[]>(ADMIN_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<CourseStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'a-z'>('latest');

  const categories = useMemo(() => getCourseCategories(), []);

  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.instructorName.toLowerCase().includes(query) ||
          course.category?.toLowerCase().includes(query)
      );
    }

    if (activeTab !== 'All') {
      filtered = filtered.filter((course) => course.status === activeTab);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((course) => course.category === categoryFilter);
    }

    filtered = sortCourses(filtered, sortBy);

    return filtered;
  }, [courses, searchQuery, activeTab, categoryFilter, sortBy]);

  const stats = useMemo(() => {
    return {
      total: courses.length,
      published: courses.filter((c) => c.status === 'Published').length,
      pending: courses.filter((c) => c.status === 'Pending').length,
      suspended: courses.filter((c) => c.status === 'Suspended').length
    };
  }, [courses]);

  const handleEdit = (course: AdminCourse) => {
    console.log('Edit course:', course);
    // TODO: Implement edit functionality with modal
  };

  const handleDelete = (courseId: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const handleStatusChange = (courseId: number, newStatus: CourseStatus) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          // When publishing a pending course, generate revenue and student count deterministically
          if (course.status === 'Pending' && newStatus === 'Published') {
            const seed = course.id * 1234;
            return {
              ...course,
              status: newStatus,
              studentCount: ((seed * 137) % 4900) + 100,
              revenue: ((seed * 251) % 49000) + 1000
            };
          }
          // When suspending, keep existing data
          return { ...course, status: newStatus };
        }
        return course;
      })
    );
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="mb-6">
            <CourseSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Stats Cards */}
          <CourseStatsCards
            total={stats.total}
            published={stats.published}
            pending={stats.pending}
            suspended={stats.suspended}
          />

          {/* Filters */}
          <CourseFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
          />

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredCourses.length}</span> of{' '}
              <span className="font-semibold">{courses.length}</span> courses
            </p>
          </div>

          {/* Course Table */}
          <CourseTable 
            courses={filteredCourses} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
