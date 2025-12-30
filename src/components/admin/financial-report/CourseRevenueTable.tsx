import { CourseRevenue } from "@/lib/admin/financialData";

interface CourseRevenueTableProps {
  courses: CourseRevenue[];
}

export default function CourseRevenueTable({ courses }: CourseRevenueTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0047AB] mb-1">Course Revenue Breakdown</h2>
        <p className="text-sm text-gray-600">Detailed revenue information for all courses</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#EBF3FB] border-b-2 border-gray-200">
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">Course Name</th>
              <th className="text-left py-4 px-6 text-sm font-bold text-gray-900">Instructor</th>
              <th className="text-center py-4 px-6 text-sm font-bold text-gray-900">Students</th>
              <th className="text-right py-4 px-6 text-sm font-bold text-gray-900">Total Revenue</th>
              <th className="text-right py-4 px-6 text-sm font-bold text-gray-900">Instructor Share (60%)</th>
              <th className="text-right py-4 px-6 text-sm font-bold text-gray-900">Platform Share (40%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-900 font-medium">{course.courseName}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{course.instructor}</td>
                <td className="py-4 px-6 text-sm text-gray-700 text-center">{course.students}</td>
                <td className="py-4 px-6 text-sm font-semibold text-green-600 text-right">
                  ${course.totalRevenue.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-orange-600 text-right">
                  ${course.instructorShare.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-blue-600 text-right">
                  ${course.platformShare.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
