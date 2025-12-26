"use client";

import Image from 'next/image';
import Link from 'next/link';
import { getLearnerById } from '../../../../lib/learners';
import { COURSES } from '../../../../lib/courses';
import { Award, Clock, BookOpen, Target, TrendingUp, Flame, Trophy, PlayCircle, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileHero, StatCard, ContinueLearningCard, PersonalInfoCard, SkillsCard, InterestsCard } from '@/components/learner/profile';

export default function LearnerProfilePage() {
  const params = useParams();
  const learnerId = parseInt(params.id as string);
  const learner = getLearnerById(learnerId);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements'>('overview');

  if (!learner) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Learner Not Found</h1>
            <p className="text-gray-600 mb-6">The profile you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/learner/allcourses"
              className="inline-block px-6 py-3 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get course details
  const enrolledCourseDetails = COURSES.filter(course => 
    learner.enrolledCourses.includes(course.id)
  );
  const completedCourseDetails = COURSES.filter(course => 
    learner.completedCourses.includes(course.id)
  );
  const inProgressCourseDetails = COURSES.filter(course => 
    learner.inProgressCourses.includes(course.id)
  );
  const savedCourseDetails = COURSES.filter(course => 
    learner.savedCourses.includes(course.id)
  );

  // Calculate overall progress (only for in-progress courses)
  const inProgressValues = inProgressCourseDetails.map(course => learner.courseProgress[course.id] || 0);
  const avgProgress = inProgressValues.length > 0 
    ? Math.round(inProgressValues.reduce((sum, val) => sum + val, 0) / inProgressValues.length) 
    : 0;

  // Mock learning streak (in real app, would be calculated from activity)
  const learningStreak = 7;
  const weeklyHours = 12;

  // Calculate completion rate
  const completionRate = enrolledCourseDetails.length > 0
    ? Math.round((completedCourseDetails.length / enrolledCourseDetails.length) * 100)
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Hero Section */}
        <ProfileHero
          learnerId={learnerId}
          name={learner.name}
          bio={learner.bio}
          avatar={learner.avatar}
          learningStreak={learningStreak}
          weeklyHours={weeklyHours}
        />

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                activeTab === 'courses'
                  ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                activeTab === 'achievements'
                  ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
            >
              <StatCard
                icon={BookOpen}
                value={enrolledCourseDetails.length}
                label="Enrolled Courses"
                bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
                footer={`${inProgressCourseDetails.length} in progress`}
                delay={0}
              />

              <StatCard
                icon={Award}
                value={completedCourseDetails.length}
                label="Completed"
                bgGradient="bg-gradient-to-br from-green-500 to-emerald-600"
                footer={`${completionRate}% completion rate`}
                delay={0.05}
              />

              <StatCard
                icon={Clock}
                value={`${learner.totalLearningHours}h`}
                label="Learning Time"
                bgGradient="bg-gradient-to-br from-orange-500 to-red-500"
                footer={`${weeklyHours}h this week`}
                delay={0.1}
              />

              <StatCard
                icon={Target}
                value={learner.certificatesEarned}
                label="Certificates"
                bgGradient="bg-gradient-to-br from-purple-500 to-pink-600"
                footer={`${learner.achievements.length} achievements`}
                delay={0.15}
              />
            </motion.div>

            {/* Continue Learning Section */}
            {inProgressCourseDetails.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                      <PlayCircle className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                  </div>
                  <Link href="#" className="text-sm text-[#094CA4] hover:underline font-medium flex items-center gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <motion.div 
                  className="space-y-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {inProgressCourseDetails.slice(0, 3).map((course, index) => {
                    const progress = learner.courseProgress[course.id] || 0;
                    return (
                      <ContinueLearningCard
                        key={course.id}
                        course={course}
                        progress={progress}
                        index={index}
                      />
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Learning Progress Circle */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Learning Progress</h2>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg className="transform -rotate-90" width="200" height="200">
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="12"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke="#094CA4"
                          strokeWidth="12"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 85}`}
                          strokeDashoffset={`${2 * Math.PI * 85 * (1 - avgProgress / 100)}`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-gray-900">{avgProgress}%</span>
                        <span className="text-sm text-gray-600">Average Progress</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-[#094CA4]">{enrolledCourseDetails.length}</p>
                      <p className="text-xs text-gray-600">Total</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{inProgressCourseDetails.length}</p>
                      <p className="text-xs text-gray-600">Active</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{completedCourseDetails.length}</p>
                      <p className="text-xs text-gray-600">Done</p>
                    </div>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Achievements</h2>
                    <button 
                      onClick={() => setActiveTab('achievements')}
                      className="text-sm text-[#094CA4] hover:underline font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learner.achievements.slice(0, 4).map(achievement => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 hover:shadow-md transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h3>
                          <p className="text-xs text-gray-600 line-clamp-2">{achievement.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(achievement.earnedDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Personal Info Card */}
                <PersonalInfoCard
                  email={learner.email}
                  location={learner.location}
                  joinedDate={learner.joinedDate}
                  formatDate={formatDate}
                />

                {/* Skills */}
                <SkillsCard skills={learner.skills} />

                {/* Interests */}
                <InterestsCard interests={learner.interests} />
              </div>
            </div>
          </>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* All Enrolled Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">All Enrolled Courses ({enrolledCourseDetails.length})</h2>
                <Link href="/learner/allcourses" className="text-sm text-[#094CA4] hover:underline font-medium">
                  Browse More
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourseDetails.map(course => {
                  const progress = learner.courseProgress[course.id] || 0;
                  const isCompleted = learner.completedCourses.includes(course.id);
                  return (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative w-full h-40">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isCompleted && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            Completed
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#094CA4] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3">{course.instructorName}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-[#094CA4]'}`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-semibold ${isCompleted ? 'text-green-600' : 'text-[#094CA4]'}`}>
                            {progress}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.durationHours}h
                          </span>
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Saved Courses */}
            {savedCourseDetails.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Saved for Later ({savedCourseDetails.length})</h2>
                  <Link href="/learner/wishlist" className="text-sm text-[#094CA4] hover:underline font-medium">
                    View Wishlist
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {savedCourseDetails.slice(0, 4).map(course => (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative w-full h-28">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-xs line-clamp-2 mb-1 group-hover:text-[#094CA4]">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500">{course.instructorName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* Achievement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-yellow-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{learner.achievements.length}</p>
                <p className="text-sm text-gray-700">Total Achievements</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{learner.certificatesEarned}</p>
                <p className="text-sm text-gray-700">Certificates</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-sm border border-orange-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{learningStreak}</p>
                <p className="text-sm text-gray-700">Day Streak</p>
              </div>
            </div>

            {/* All Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learner.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="group p-5 rounded-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-600 font-medium">
                            Earned {formatDate(achievement.earnedDate)}
                          </p>
                          <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-bold">
                            Achievement
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates Section */}
            {learner.certificatesEarned > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Certificates</h2>
                  <span className="text-sm text-gray-600">{learner.certificatesEarned} earned</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCourseDetails.slice(0, learner.certificatesEarned).map((course, index) => (
                    <div
                      key={course.id}
                      className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#094CA4] bg-gradient-to-br from-blue-50 to-purple-50 p-6 hover:shadow-xl transition-all"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <Award className="h-10 w-10 text-[#094CA4] mb-3" />
                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-xs text-gray-600 mb-3">Instructor: {course.instructorName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Certificate #{String(index + 1).padStart(4, '0')}</span>
                          <button className="text-xs text-[#094CA4] hover:underline font-semibold">
                            View Certificate →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
