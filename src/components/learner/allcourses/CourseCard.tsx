import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa';
import WishlistButton from '@/components/course/WishlistButton';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    image: string;
    shortDescription?: string;
    description: string;
    rating: number;
    reviews: number;
    durationHours: number;
    price: number;
    totalVideos: number;
    instructorName: string;
    instructorImage: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="relative">
      <Link href={`/learner/course/${course.id}`} className="no-underline">
        <div className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="h-44 overflow-hidden">
            <Image 
              src={course.image} 
              alt={course.title} 
              width={800} 
              height={400} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <div className="p-5 bg-[#fffaf8] flex flex-col flex-1">
            <div>
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
              <p className="mt-2 text-sm text-gray-700 font-medium line-clamp-2">
                {course.shortDescription ?? course.description}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => 
                  i < Math.round(course.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </div>
              <div className="text-sm font-semibold text-gray-700">
                {course.rating} ({course.reviews.toLocaleString()})
              </div>
            </div>

            <div className="mt-3 flex items-center flex-wrap gap-4 text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {course.durationHours}h
              </div>
              <div className="flex items-center gap-1 font-bold text-[#094CA4]">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </div>
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {course.totalVideos}
              </div>
            </div>

            <div className="border-t-2 border-gray-100 pt-4 mt-4 flex items-center gap-3">
              <Image 
                src={course.instructorImage} 
                alt={course.instructorName} 
                width={36} 
                height={36} 
                className="rounded-full ring-2 ring-gray-200" 
              />
              <div className="text-sm font-semibold text-gray-800">{course.instructorName}</div>
            </div>
          </div>
        </div>
      </Link>
      {/* Wishlist Button - positioned absolutely */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton course={course} size="md" />
      </div>
    </div>
  );
}
