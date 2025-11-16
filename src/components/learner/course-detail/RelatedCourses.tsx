import Image from 'next/image';
import Link from 'next/link';

interface RelatedCoursesProps {
  courses: Array<{
    id: number;
    title: string;
    image: string;
  }>;
}

export default function RelatedCourses({ courses }: RelatedCoursesProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Related Course</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {courses.map((r) => (
          <Link 
            key={r.id} 
            href={`/learner/course/${r.id}`} 
            className="block bg-white rounded-md border p-3 text-center hover:shadow-md transition-shadow"
          >
            <div className="h-24 mb-2 overflow-hidden">
              <Image 
                src={r.image} 
                alt={r.title} 
                width={300} 
                height={160} 
                className="w-full h-full object-cover rounded" 
              />
            </div>
            <div className="text-sm font-medium">{r.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
