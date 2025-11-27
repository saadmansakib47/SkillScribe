import { CourseRevenue } from "@/lib/admin/financialData";

interface TopCoursesTableProps {
  courses: CourseRevenue[];
}

export default function TopCoursesTable({ courses }: TopCoursesTableProps) {
  // Sort courses by revenue in descending order and take top 5
  const sortedCourses = [...courses].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0047AB] mb-1">Top Courses by Revenue</h2>
        <p className="text-sm text-gray-600">Best performing courses</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Course</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Instructor</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course) => (
              <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-sm text-gray-900">{course.courseName}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{course.instructor}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600 text-right">
                  ${course.totalRevenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
