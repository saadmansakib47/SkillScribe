import { FaStar, FaRegStar } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedCourses() {
  return (
    <section className="bg-[#FAF7F3] py-16">
  <div className="mx-auto max-w-7xl px-4 text-left text-black">
        <h2 className="text-3xl font-semibold">Featured Courses</h2>
        <p className="mt-2 text-lg">
          Handpicked courses to accelerate your learning journey.
        </p>

        {/* Course cards */}
  <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Web Development Bootcamp */}
          <div className="bg-white border border-black p-0 rounded-lg overflow-hidden text-left">
            <div className="relative w-full h-40">
              <Image src="/Asset/webdev.jpg" alt="Web Development Bootcamp" fill className="object-cover" />
            </div>
            <div className="p-6 border-t border-black">
              <h3 className="text-xl font-semibold text-black">
                Web Development Bootcamp
              </h3>
              <div className="mt-2 text-black">Instructor: Karim Kabir</div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="text-sm text-black">4.9 (3,530 reviews)</div>
              </div>

              <div className="mt-3 text-black">Duration: 12 hours</div>
              <div className="mt-1 text-black">Price: Free</div>

              <Link
                href="/learner/course/6"
                className="mt-6 inline-block w-full rounded-[10px] border border-black py-3 px-4 text-center bg-white transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
                >    
                View Details
              </Link>
            </div>
          </div>

          {/* UI/UX Fundamentals */}
          <div className="bg-white border border-black p-0 rounded-lg overflow-hidden text-left">
            <div className="relative w-full h-40">
              <Image src="/Asset/uiux.webp" alt="UI/UX Fundamentals" fill className="object-cover" />
            </div>
            <div className="p-6 border-t border-black">
              <h3 className="text-xl font-semibold text-black">
                UI/UX Fundamentals
              </h3>
              <div className="mt-2 text-black">Instructor: John Hamilton</div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="text-sm text-black">4.5 (2,570 reviews)</div>
              </div>

              <div className="mt-3 text-black">Duration: 5 hours</div>
              <div className="mt-1 text-black">Price: $14</div>

              <Link
                href="/learner/course/5"
                className="mt-6 inline-block w-full rounded-[10px] border border-black py-3 px-4 text-center bg-white transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
                >
                View Details
              </Link>
            </div>
          </div>

          {/* Data Science with Python */}
          <div className="bg-white border border-black p-0 rounded-lg overflow-hidden text-left">
            <div className="relative w-full h-40">
              <Image src="/Asset/data science.jpeg" alt="Data Science with Python" fill className="object-cover" />
            </div>
            <div className="p-6 border-t border-black">
              <h3 className="text-xl font-semibold text-black">
                Data Science with Python
              </h3>
              <div className="mt-2 text-black">Instructor: Jashim Uddin</div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
                <div className="text-sm text-black">3.9 (1,340 reviews)</div>
              </div>

              <div className="mt-3 text-black">Duration: 18 hours</div>
              <div className="mt-1 text-black">Price: $25</div>

              <Link
                href="/learner/course/4"
                className="mt-6 inline-block w-full rounded-[10px] border border-black py-3 px-4 text-center bg-white transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
                >
                View Details
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/learner/allcourses" className="inline-block bg-[#0b4ca6] text-white py-3 px-10 rounded-[10px] hover:bg-[#083a8a] transition-colors">
            View all courses
          </Link>
        </div>
      </div>
    </section>
  );
}
