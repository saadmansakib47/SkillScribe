"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLearnerById } from '../../../../lib/learners';
import { COURSES } from '../../../../lib/courses';
import { Award, Search, BookOpen } from 'lucide-react';
import PageHeader from '@/components/learner/common/PageHeader';
import EmptyState from '@/components/learner/common/EmptyState';
import LearningStatsGrid from '@/components/learner/my-learning/LearningStatsGrid';
import CourseFilterBar, { FilterTab, SortOption } from '@/components/learner/my-learning/CourseFilterBar';
import CourseCard from '@/components/learner/my-learning/CourseCard';

export default function MyLearningPage() {
  const params = useParams();
  const learnerId = parseInt(params.id as string);
  const currentUser = getLearnerById(learnerId);
  
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  // Show message if no user
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Learner Not Found</h1>
            <p className="text-gray-600 mb-6">The learning dashboard you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/learner/switch-user"
              className="inline-block px-6 py-3 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-colors"
            >
              Switch User
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get course details
  const enrolledCourseDetails = COURSES.filter(course => 
    currentUser.enrolledCourses.includes(course.id)
  );
  const completedCourseDetails = COURSES.filter(course => 
    currentUser.completedCourses.includes(course.id)
  );
  const inProgressCourseDetails = COURSES.filter(course => 
    currentUser.inProgressCourses.includes(course.id)
  );

  // Show empty state if no courses enrolled at all
  if (enrolledCourseDetails.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader 
            title="My Learning" 
            subtitle="Your enrolled courses and learning progress" 
          />
          
          <EmptyState
            icon={BookOpen}
            title="Start Your Learning Journey"
            description="You haven't enrolled in any courses yet. Explore our wide range of courses and start building your skills today!"
            primaryAction={{
              label: 'Browse All Courses',
              href: '/learner/allcourses',
              icon: Search
            }}
            secondaryAction={{
              label: 'Try Free Courses',
              href: '/learner/allcourses?price=free',
              icon: Award
            }}
            footer={
              <>
                <p className="text-sm text-gray-500 mb-4">Popular Categories</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Web Development', 'Data Science', 'Design', 'Business', 'Marketing'].map((category) => (
                    <Link
                      key={category}
                      href={`/learner/allcourses?category=${encodeURIComponent(category)}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#094CA4] hover:text-white transition-all text-sm font-medium"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>
    );
  }

  // Filter courses based on active tab
  const getFilteredCourses = () => {
    let courses = enrolledCourseDetails;
    
    if (activeFilter === 'inProgress') {
      courses = inProgressCourseDetails;
    } else if (activeFilter === 'completed') {
      courses = completedCourseDetails;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sortedCourses = [...courses];
    if (sortBy === 'alphabetical') {
      sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'progress') {
      sortedCourses.sort((a, b) => {
        const progressA = currentUser.courseProgress[a.id] || 0;
        const progressB = currentUser.courseProgress[b.id] || 0;
        return progressB - progressA;
      });
    } else {
      // 'recent' - keep original order (most recent first)
      sortedCourses.reverse();
    }

    return sortedCourses;
  };

  const filteredCourses = getFilteredCourses();

  // Calculate stats
  const totalEnrolled = enrolledCourseDetails.length;
  const totalInProgress = inProgressCourseDetails.length;
  const totalCompleted = completedCourseDetails.length;
  const avgProgress = inProgressCourseDetails.length > 0
    ? Math.round(
        inProgressCourseDetails.reduce((sum, course) => 
          sum + (currentUser.courseProgress[course.id] || 0), 0
        ) / inProgressCourseDetails.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <PageHeader 
          title="My Learning" 
          subtitle="Track your progress and continue your learning journey" 
        />

        {/* Stats Cards */}
        <LearningStatsGrid
          totalEnrolled={totalEnrolled}
          totalInProgress={totalInProgress}
          totalCompleted={totalCompleted}
          avgProgress={avgProgress}
        />

        {/* Filter and Search Bar */}
        <CourseFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalEnrolled={totalEnrolled}
          totalInProgress={totalInProgress}
          totalCompleted={totalCompleted}
        />

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses found"
            description={
              searchQuery.trim() 
                ? `No courses match "${searchQuery}"`
                : activeFilter === 'inProgress'
                ? "You don't have any courses in progress yet"
                : activeFilter === 'completed'
                ? "You haven't completed any courses yet"
                : "You haven't enrolled in any courses yet"
            }
            primaryAction={{
              label: 'Browse Courses',
              href: '/learner/allcourses'
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => {
              const progress = currentUser.courseProgress[course.id] || 0;
              const isCompleted = currentUser.completedCourses.includes(course.id);
              const isInProgress = currentUser.inProgressCourses.includes(course.id);

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={progress}
                  isCompleted={isCompleted}
                  isInProgress={isInProgress}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
