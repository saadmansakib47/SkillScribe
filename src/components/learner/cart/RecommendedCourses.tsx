import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  instructorName: string;
  image: string;
  price: number;
  rating: number;
  reviews?: number;
}

interface RecommendedCoursesProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export default function RecommendedCourses({ 
  courses, 
  title = "Start with these popular courses",
  subtitle = "Handpicked courses to kickstart your learning"
}: RecommendedCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/learner/course/${course.id}`}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-full h-48">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.instructorName}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFA500" stroke="#FFA500" strokeWidth="1"/>
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                </div>
                <span className="text-lg font-bold" style={{ color: '#094CA4' }}>${course.price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
