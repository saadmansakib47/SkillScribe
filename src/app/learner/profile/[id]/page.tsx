"use client";

import Image from 'next/image';
import Link from 'next/link';
import { getLearnerById } from '../../../../lib/learners';
import { COURSES } from '../../../../lib/courses';
import { Award, Clock, BookOpen, Target, Edit2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function LearnerProfilePage() {
  const params = useParams();
  const learnerId = parseInt(params.id as string);
  const learner = getLearnerById(learnerId);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                <Image
                  src={learner.avatar}
                  alt={learner.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Name and Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{learner.name}</h2>
              <p className="text-gray-600 mb-3">{learner.bio}</p>
              <p className="text-sm text-gray-500">{learner.location}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FFA726] text-white rounded-lg hover:bg-[#FB8C00] transition-colors">
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            {/* Email */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-gray-900 font-medium">{learner.email}</p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="text-gray-900 font-medium">{learner.location}</p>
            </div>

            {/* Member Since */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="text-gray-900 font-medium">{formatDate(learner.joinedDate)}</p>
            </div>

            {/* Learning Hours */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Learning Hours</p>
              <p className="text-gray-900 font-medium">{learner.totalLearningHours} hours</p>
            </div>

            {/* Certificates */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Certificates Earned</p>
              <p className="text-gray-900 font-medium">{learner.certificatesEarned}</p>
            </div>

            {/* Enrolled Courses */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Enrolled Courses</p>
              <p className="text-gray-900 font-medium">{enrolledCourseDetails.length}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F0FF' }}>
                <BookOpen className="h-5 w-5" style={{ color: '#094CA4' }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourseDetails.length}</p>
                <p className="text-xs text-gray-600">Enrolled</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{learner.completedCourses.length}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{learner.totalLearningHours}</p>
                <p className="text-xs text-gray-600">Hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{learner.certificatesEarned}</p>
                <p className="text-xs text-gray-600">Certificates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courses In Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Courses In Progress</h2>
              {inProgressCourseDetails.length > 0 ? (
                <div className="space-y-3">
                  {inProgressCourseDetails.map(course => {
                    const progress = learner.courseProgress[course.id] || 0;
                    return (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#094CA4] hover:bg-gray-50 transition-all"
                    >
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{course.title}</h3>
                        <p className="text-xs text-gray-500">{course.instructorName}</p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full" style={{ width: `${progress}%`, backgroundColor: '#094CA4' }}></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold" style={{ color: '#094CA4' }}>{progress}%</p>
                      </div>
                    </Link>
                  )})}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 text-sm">No courses in progress</p>
              )}
            </div>

            {/* Completed Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Completed Courses</h2>
              {completedCourseDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCourseDetails.map(course => (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative w-full h-28">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{course.instructorName}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span className="text-xs text-green-600 font-semibold whitespace-nowrap">100%</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 text-sm">No completed courses yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {learner.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {learner.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#094CA4' }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-3">
                {learner.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(achievement.earnedDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
