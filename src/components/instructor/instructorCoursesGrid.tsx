// File: components/instructor/InstructorCoursesGrid.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Award, ChevronRight } from 'lucide-react';


type Props = {
    courses: import('../../lib/courses').Course[];
};


export default function InstructorCoursesGrid({ courses }: Props) {
    return (
        <div id="courses" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Courses ({courses.length})</h2>
                <Link href="/courses" className="text-sm text-[#094CA4] hover:underline">Browse all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(course => (
                    <Link key={course.id} href={`/course/${course.id}`} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                        <div className="relative w-full h-40">
                            <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#094CA4]">{course.title}</h3>
                            <p className="text-xs text-gray-500 mb-3">{course.shortDescription}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.durationHours}h</span>
                                <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {course.reviews}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}