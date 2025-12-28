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
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Latest Uploaded Courses</h3>
      <div className="space-y-4">
        {courses.map((course, i) => (
          <CourseCard key={i} {...course} />
        ))}
      </div>
    </div>
  );
}
