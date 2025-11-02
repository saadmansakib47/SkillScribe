import CourseCard from "./CourseCard";

export default function LatestCoursesList() {
  const courses = [
    {
      title: "Master UI/UX Projects with Practical Principles",
      date: "03 Oct, 2023",
      status: "Published",
    },
    {
      title: "Next.js for Modern Web Apps",
      date: "10 Oct, 2023",
      status: "Published",
    },
  ] as const;

  return (
    <div className="bg-[#F8FAFF] border border-gray-200 rounded-2xl p-6">
      <h3 className="font-semibold mb-4 text-gray-800">Latest Uploaded Courses</h3>
      <div className="space-y-3">
        {courses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </div>
  );
}
