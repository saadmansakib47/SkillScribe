"use client";

import { useMemo, useState, useRef, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { FaStar, FaRegStar } from 'react-icons/fa';

type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  durationHours: number;
  price: number; // 0 = free
  totalVideos: number;
  instructorName: string;
  instructorImage: string;
  level?: string;
};

const COURSES: Course[] = [
  {
    id: 12,
    title: 'Complete Software Testing Mastery',
    description: 'Master both manual and automated testing with real-world examples and hands-on practice.',
    image: '/Asset/software test.jpg',
    rating: 4.6,
    reviews: 950,
    durationHours: 16,
    price: 20,
    totalVideos: 28,
    instructorName: 'Kate Weber',
    instructorImage: '/Asset/Kate weber.png',
    level: 'Intermediate',
  },
  {
    id: 11,
    title: 'Node.js APIs and Microservices',
    description: 'Build scalable APIs with Node, Express and microservice patterns.',
    image: '/Asset/nodejs.jpg',
    rating: 3.3,
    reviews: 480,
    durationHours: 14,
    price: 29,
    totalVideos: 26,
    instructorName: 'Samira Khan',
    instructorImage: '/Asset/samira.jpg',
    level: 'Advanced',
  },
  {
    id: 10,
    title: 'Design Thinking for Product Teams',
    description: 'Learn user-centric design and rapid prototyping for product teams.',
    image: '/Asset/design think.png',
    rating: 4.1,
    reviews: 390,
    durationHours: 6,
    price: 0,
    totalVideos: 12,
    instructorName: 'John Hamilton',
    instructorImage: '/Asset/john hamilton.jpg',
    level: 'Beginner',
  },
  {
    id: 9,
    title: 'Intro to Database',
    description: 'Understand relational and NoSQL databases and how to model data.',
    image: '/Asset/database.jpg',
    rating: 4.0,
    reviews: 210,
    durationHours: 7,
    price: 9,
    totalVideos: 15,
    instructorName: 'Daniel Park',
    instructorImage: '/Asset/daniel.jpg',
    level: 'Beginner',
  },
  {
    id: 8,
    title: 'Python Crash Course',
    description: 'A fast-paced introduction to Python for beginners and engineers who want to prototype quickly.',
    image: '/Asset/python.webp',
    rating: 4.6,
    reviews: 890,
    durationHours: 8,
    price: 10,
    totalVideos: 20,
    instructorName: 'Karan Sharma',
    instructorImage: '/Asset/karan.jpg',
    level: 'Beginner',
  },
  {
    id: 7,
    title: 'Advanced React Patterns',
    description: 'Take your React skills to the next level with hooks, context, and performance patterns.',
    image: '/Asset/advance react.jpg',
    rating: 4.4,
    reviews: 640,
    durationHours: 10,
    price: 30,
    totalVideos: 18,
    instructorName: 'Morgan Lee',
    instructorImage: '/Asset/morgan lee.jpg',
    level: 'Advanced',
  },
  {
    id: 6,
    title: 'Web Development Bootcamp',
    description: 'Become a fullstack web developer by taking this ONE course, even if you have never coded before.',
    image: '/Asset/webdev.jpg',
    rating: 4.9,
    reviews: 3530,
    durationHours: 12,
    price: 0,
    totalVideos: 22,
    instructorName: 'Karim Kabir',
    instructorImage: '/Asset/karim.jpg',
    level: 'Beginner',
  },
  {
    id: 5,
    title: 'UI/UX Fundamentals',
    description: 'Do you love designing? If so this course is the perfect one for you.',
    image: '/Asset/uiux.webp',
    rating: 2.9,
    reviews: 2570,
    durationHours: 5,
    price: 14,
    totalVideos: 7,
    instructorName: 'John Hamilton',
    instructorImage: '/Asset/john hamilton.jpg',
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Learn data science with python by taking this course, and build your desired career.',
    image: '/Asset/data science.jpeg',
    rating: 3.9,
    reviews: 1340,
    durationHours: 18,
    price: 25,
    totalVideos: 30,
    instructorName: 'Jashim Uddin',
    instructorImage: '/Asset/jashim uddin.jpg',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'HTML, CSS, JS basics',
    description: 'Learn Frontend development by enrolling in this course, even if you are a beginner because it covers everything basic.',
    image: '/Asset/html-css-javascript.jpg',
    rating: 3.8,
    reviews: 2200,
    durationHours: 12,
    price: 0,
    totalVideos: 22,
    instructorName: 'Emily rose',
    instructorImage: '/Asset/emily rose.jpg',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Manual and Automated Testing',
    description: 'Do you find bugs and faults very easily? Learn testing with me and explore the world of testers.',
    image: '/Asset/testing.jpg',
    rating: 4.7,
    reviews: 1100,
    durationHours: 11,
    price: 12,
    totalVideos: 17,
    instructorName: 'Kate Weber',
    instructorImage: '/Asset/Kate weber.png',
    level: 'Intermediate',
  },
  {
    id: 1,
    title: 'Web Development with MERN',
    description: 'Become a Fullstack web developer by conquering MERN and build your desired successful career.',
    image: '/Asset/mern stack.jpg',
    rating: 4.8,
    reviews: 2340,
    durationHours: 19,
    price: 22,
    totalVideos: 34,
    instructorName: 'Sadia Islam',
    instructorImage: '/Asset/sadia islam.jpg',
    level: 'Advanced',
  },
];

export default function CoursesPage() {
  // UI state
  const [sort, setSort] = useState<'newest' | 'price' | 'rating'>('newest');

  // transient filter checkboxes (what user currently toggles)
  const [filters, setFilters] = useState({
    ratings: [] as number[],
    durations: [] as string[],
    prices: [] as string[],
    levels: [] as string[],
  });

  // applied filters (used to compute displayed list) — updated when user clicks Filter
  const [applied, setApplied] = useState(filters);

  const toggleArray = <T,>(arr: T[], value: T) => {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  };

  const handleRatingChange = (r: number) => {
    setFilters((prev) => ({ ...prev, ratings: toggleArray(prev.ratings, r) }));
  };

  const handleDurationChange = (d: string) => {
    setFilters((prev) => ({ ...prev, durations: toggleArray(prev.durations, d) }));
  };

  const handlePriceChange = (p: string) => {
    setFilters((prev) => ({ ...prev, prices: toggleArray(prev.prices, p) }));
  };

  const handleLevelChange = (l: string) => {
    setFilters((prev) => ({ ...prev, levels: toggleArray(prev.levels, l) }));
  };

  const applyFilters = () => {
    setApplied(filters);
  };

  const clearFilters = () => {
    const empty = { ratings: [], durations: [], prices: [], levels: [] };
    setFilters(empty);
    setApplied(empty);
  };

  // ref to courses grid so we can auto-scroll into view on filter/sort changes
  const gridRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to courses when applied filters or sort change
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [applied, sort]);

  const displayed = useMemo(() => {
    let list = [...COURSES];

    // apply filters
    const { ratings, durations, prices, levels } = applied;

    if (ratings.length > 0) {
      list = list.filter((c) => ratings.some((r) => c.rating >= r));
    }

    if (durations.length > 0) {
      list = list.filter((c) => {
        return durations.some((d) => {
          if (d === '0-1') return c.durationHours <= 1;
          if (d === '1-3') return c.durationHours > 1 && c.durationHours <= 3;
          if (d === '3-9') return c.durationHours > 3 && c.durationHours <= 9;
          if (d === '9-18') return c.durationHours > 9 && c.durationHours <= 18;
          if (d === '18+') return c.durationHours > 18;
          return true;
        });
      });
    }

    if (prices.length > 0) {
      list = list.filter((c) => {
        return prices.some((p) => (p === 'free' ? c.price === 0 : c.price > 0));
      });
    }

    if (levels.length > 0) {
      list = list.filter((c) => levels.includes(c.level || ''));
    }

    // sort
    if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    if (sort === 'price') list.sort((a, b) => a.price - b.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [applied, sort]);

  return (
    <section className="bg-[#FAF7F3] py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">All Courses</h1>
          </div>
          <div>
            <select value={sort} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as 'newest' | 'price' | 'rating')} className="border-2 border-gray-400 rounded-[8px] px-4 py-2 text-gray-900">
              <option value="newest">Sort by: Newest</option>
              <option value="price">Sort by: Price</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </div>
        </div>

  <div className="flex gap-8 items-start">
          {/* Sidebar: Filters */}
          <div className="w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 ring-1 ring-gray-50 space-y-6 divide-y divide-gray-100">
            <div className="flex items-center justify-start gap-3 mb-4">
              <button onClick={applyFilters} className="inline-flex items-center justify-center bg-[#0b4ca6] text-white py-2 px-4 rounded-[8px] border-2 border-black font-medium transition-colors duration-150 ease-in-out hover:bg-[#083a8a] hover:border-[#052a62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]">Apply</button>
              <button onClick={clearFilters} className="inline-flex items-center justify-center bg-white text-gray-900 py-2 px-4 rounded-[8px] border-2 border-gray-400">Clear</button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Filter</h2>

            {/* Ratings */}
            <div className="py-4">
              <p className="font-semibold text-gray-800">Ratings</p>
              <div className="flex flex-col mt-2">
                {[5, 4, 3, 2].map((r) => (
                  <label key={r} className="flex items-center">
                    <input checked={filters.ratings.includes(r)} onChange={() => handleRatingChange(r)} type="checkbox" className="mr-2" /> {r} Stars
                  </label>
                ))}
              </div>
            </div>

            {/* Video Duration */}
            <div className="py-4">
              <p className="font-semibold text-gray-800">Video Duration</p>
              <div className="flex flex-col mt-2">
                <label className="flex items-center">
                  <input checked={filters.durations.includes('0-1')} onChange={() => handleDurationChange('0-1')} type="checkbox" className="mr-2" /> 0-1 hour
                </label>
                <label className="flex items-center">
                  <input checked={filters.durations.includes('1-3')} onChange={() => handleDurationChange('1-3')} type="checkbox" className="mr-2" /> 1-3 hours
                </label>
                <label className="flex items-center">
                  <input checked={filters.durations.includes('3-9')} onChange={() => handleDurationChange('3-9')} type="checkbox" className="mr-2" /> 3-9 hours
                </label>
                <label className="flex items-center">
                  <input checked={filters.durations.includes('9-18')} onChange={() => handleDurationChange('9-18')} type="checkbox" className="mr-2" /> 9-18 hours
                </label>
                <label className="flex items-center">
                  <input checked={filters.durations.includes('18+')} onChange={() => handleDurationChange('18+')} type="checkbox" className="mr-2" /> 18+ hours
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="py-4">
              <p className="font-semibold text-gray-800">Price</p>
              <div className="flex flex-col mt-2">
                <label className="flex items-center">
                  <input checked={filters.prices.includes('free')} onChange={() => handlePriceChange('free')} type="checkbox" className="mr-2" /> Free
                </label>
                <label className="flex items-center">
                  <input checked={filters.prices.includes('paid')} onChange={() => handlePriceChange('paid')} type="checkbox" className="mr-2" /> Paid
                </label>
              </div>
            </div>

            {/* Level */}
            <div className="py-4">
              <p className="font-semibold text-gray-800">Level</p>
              <div className="flex flex-col mt-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <label key={l} className="flex items-center">
                    <input checked={filters.levels.includes(l)} onChange={() => handleLevelChange(l)} type="checkbox" className="mr-2" /> {l}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div ref={gridRef} className="w-3/4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-stretch pr-2">
            {displayed.map((course) => (
              <div key={course.id} className="rounded-2xl border border-[#e6ded9] overflow-hidden bg-white shadow-sm flex flex-col h-full">
                <div className="h-44 overflow-hidden rounded-t-lg">
                  <Image src={course.image} alt={course.title} width={800} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 bg-[#fffaf8] flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <p className="mt-2 text-sm text-gray-700">{course.description}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (i < Math.round(course.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />))}
                    </div>
                    <div className="text-sm text-gray-700">{course.rating} ({course.reviews.toLocaleString()})</div>
                  </div>

                  <div className="mt-3 flex items-center gap-6 text-sm text-gray-700">
                    <div>Duration: {course.durationHours} hr</div>
                    <div>Price: {course.price === 0 ? 'Free' : `$${course.price}`}</div>
                    <div>Total Videos: {course.totalVideos}</div>
                  </div>

                  <div className="border-t pt-4 flex items-center gap-3 mt-auto">
                    <Image src={course.instructorImage} alt={course.instructorName} width={36} height={36} className="rounded-full" />
                    <div className="text-sm font-medium text-gray-800">{course.instructorName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
