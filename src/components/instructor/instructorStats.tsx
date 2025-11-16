// File: components/instructor/InstructorStats.tsx
'use client';
import { Award, Clock, Users, Star } from 'lucide-react';


type Props = { instructor: import('../../lib/instructors').Instructor };


export default function InstructorStats({ instructor }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Users className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500">Students</div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{instructor.totalStudents}</p>
        <p className="text-xs text-gray-500 mt-2">Across {instructor.courseIds.length} courses</p>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <Award className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500">Reviews</div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{instructor.totalReviews}</p>
        <p className="text-xs text-gray-500 mt-2">Avg Rating: {instructor.rating || 0} <Star className="inline-block h-3 w-3 text-yellow-500 ml-1" /></p>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500">Hours</div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{instructor.totalTeachingHours}h</p>
        <p className="text-xs text-gray-500 mt-2">Total teaching time</p>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <Star className="h-5 w-5" />
          </div>
          <div className="text-sm text-gray-500">Rating</div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{instructor.rating || 0}</p>
        <p className="text-xs text-gray-500 mt-2">Based on course ratings</p>
      </div>
    </div>
  );
}