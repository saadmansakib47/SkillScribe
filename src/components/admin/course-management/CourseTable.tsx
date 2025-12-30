"use client";

import Image from 'next/image';
import { AdminCourse, getStatusColor, CourseStatus } from '@/lib/admin/courses';

interface CourseTableProps {
  courses: AdminCourse[];
  onStatusChange: (courseId: number, newStatus: CourseStatus) => void;
}

export default function CourseTable({ courses, onStatusChange }: CourseTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
        <p className="text-gray-500 text-lg">No courses found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#EBF3FB] border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Course Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Instructor
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Students
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Revenue
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate max-w-xs">
                        {course.title}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={course.instructorImage}
                        alt={course.instructorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-900">{course.instructorName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{course.category || 'N/A'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {course.studentCount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {course.status === 'Pending' ? (
                      <span className="text-gray-400">Pending approval</span>
                    ) : (
                      formatCurrency(course.revenue)
                    )}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {/* Status-specific actions */}
                    {course.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => {
                            if (confirm(`Publish "${course.title}"?`)) {
                              onStatusChange(course.id, 'Published');
                            }
                          }}
                          className="px-3 py-1.5 bg-[#0B8020] hover:bg-[#096618] text-white rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                          title="Publish course"
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Suspend "${course.title}"?`)) {
                              onStatusChange(course.id, 'Suspended');
                            }
                          }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                          title="Suspend course"
                        >
                          Suspend
                        </button>
                      </>
                    )}
                    
                    {course.status === 'Published' && (
                      <button
                        onClick={() => {
                          if (confirm(`Suspend "${course.title}"?`)) {
                            onStatusChange(course.id, 'Suspended');
                          }
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                        title="Suspend course"
                      >
                        Suspend
                      </button>
                    )}
                    
                    {course.status === 'Suspended' && (
                      <button
                        onClick={() => {
                          if (confirm(`Publish "${course.title}"?`)) {
                            onStatusChange(course.id, 'Published');
                          }
                        }}
                        className="px-3 py-1.5 bg-[#0B8020] hover:bg-[#096618] text-white rounded-full text-xs font-medium transition-colors whitespace-nowrap"
                        title="Publish course"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
