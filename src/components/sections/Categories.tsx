"use client";

import Image from 'next/image';
import Link from 'next/link';
import { COURSES } from '@/lib/courses';

export default function Categories() {
  // Calculate real category counts from COURSES
  const categoryMap: Record<string, { count: number; img: string }> = {};
  
  COURSES.forEach((course) => {
    const category = course.category || 'Other';
    if (!categoryMap[category]) {
      categoryMap[category] = { 
        count: 0, 
        img: course.image // Use first course image for category
      };
    }
    categoryMap[category].count++;
  });

  // Convert to array and get top 4 categories
  const categories = Object.entries(categoryMap)
    .map(([title, data]) => ({
      title,
      subtitle: 'Explore courses in this category',
      count: data.count,
      img: data.img,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF7F3]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-black">Explore by Category</h2>
          <p className="mt-2 text-lg text-black">Find the perfect course for your learning goals.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative w-full h-40">
                <Image
                  src={category.img}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-black">{category.title}</h3>
                <p className="mt-2 text-sm text-black">{category.subtitle}</p>
                <p className="mt-2 text-sm text-black font-medium">{category.count} {category.count === 1 ? 'course' : 'courses'}</p>

                <Link
                  href={`/learner/allcourses?category=${encodeURIComponent(category.title)}`}
                  className="mt-4 inline-block px-5 py-2 border border-gray-300 rounded-[10px] shadow-sm text-black transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
