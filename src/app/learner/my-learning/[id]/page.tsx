"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLearnerById } from '../../../../lib/learners';
import { COURSES } from '../../../../lib/courses';
import { Award, Clock, Search, PlayCircle, Filter, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type FilterTab = 'all' | 'inProgress' | 'completed';
type SortOption = 'recent' | 'progress' | 'alphabetical';

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Learning</h1>
            <p className="text-gray-600">Your enrolled courses and learning progress</p>
          </div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-16 w-16 text-[#094CA4]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Start Your Learning Journey</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              You haven&apos;t enrolled in any courses yet. Explore our wide range of courses and start building your skills today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learner/allcourses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                <Search className="h-5 w-5" />
                Browse All Courses
              </Link>
              <Link
                href="/learner/allcourses?price=free"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#094CA4] border-2 border-[#094CA4] rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg"
              >
                <Award className="h-5 w-5" />
                Try Free Courses
              </Link>
            </div>

            {/* Popular Categories */}
            <div className="mt-12 pt-8 border-t border-gray-200">
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
            </div>
          </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Learning</h1>
          <p className="text-gray-600">Track your progress and continue your learning journey</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalEnrolled}</p>
            <p className="text-sm text-gray-600">Total Courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <PlayCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalInProgress}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalCompleted}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{avgProgress}%</p>
            <p className="text-sm text-gray-600">Avg Progress</p>
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          {/* Filter Tabs */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#094CA4] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Courses ({totalEnrolled})
              </button>
              <button
                onClick={() => setActiveFilter('inProgress')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === 'inProgress'
                    ? 'bg-[#094CA4] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                In Progress ({totalInProgress})
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === 'completed'
                    ? 'bg-[#094CA4] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed ({totalCompleted})
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#094CA4] focus:border-transparent cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="progress">Progress %</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title or instructor..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent text-gray-700 placeholder-gray-500"
            />
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery.trim() 
                ? `No courses match "${searchQuery}"`
                : activeFilter === 'inProgress'
                ? "You don't have any courses in progress yet"
                : activeFilter === 'completed'
                ? "You haven't completed any courses yet"
                : "You haven't enrolled in any courses yet"
              }
            </p>
            <Link
              href="/learner/allcourses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold"
            >
              Browse Courses
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => {
              const progress = currentUser.courseProgress[course.id] || 0;
              const isCompleted = currentUser.completedCourses.includes(course.id);
              const isInProgress = currentUser.inProgressCourses.includes(course.id);

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Course Image */}
                  <Link href={`/learner/course/${course.id}`} className="relative block">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {isCompleted && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <Award className="h-4 w-4" />
                          Completed
                        </div>
                      )}
                      {isInProgress && !isCompleted && (
                        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
                          <PlayCircle className="h-4 w-4" />
                          In Progress
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Course Info */}
                  <div className="p-5">
                    <Link href={`/learner/course/${course.id}`}>
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-[#094CA4] transition-colors min-h-[3rem]">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-4">{course.instructorName}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 font-medium">Progress</span>
                        <span className={`text-sm font-bold ${isCompleted ? 'text-green-600' : 'text-[#094CA4]'}`}>
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                        <div
                          className={`h-2.5 rounded-full transition-all ${
                            isCompleted 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.durationHours}h
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                        {course.level}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {isCompleted ? (
                        <>
                          <Link
                            href={`/learner/course/${course.id}/player`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Review
                          </Link>
                          <Link
                            href={`/learner/course/${course.id}/player`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-sm"
                          >
                            <Award className="h-4 w-4" />
                            Certificate
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/learner/course/${course.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
                          >
                            Details
                          </Link>
                          <Link
                            href={`/learner/course/${course.id}/player`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-all font-semibold text-sm shadow-md"
                          >
                            <PlayCircle className="h-4 w-4" />
                            {progress > 0 ? 'Continue' : 'Start'}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
