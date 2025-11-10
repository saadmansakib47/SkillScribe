"use client";

import { useMemo, useState, useRef, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { COURSES } from '../../../lib/courses';
import WishlistButton from '@/components/course/WishlistButton';

export default function CoursesPage() {
  // UI state
  const [sort, setSort] = useState<'newest' | 'price' | 'rating'>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    setFiltersOpen(false); // Close mobile modal after applying
  };

  const clearFilters = () => {
    const empty = { ratings: [], durations: [], prices: [], levels: [] };
    setFilters(empty);
    setApplied(empty);
  };

  // ref to courses grid so we can auto-scroll into view on filter/sort changes
  const gridRef = useRef<HTMLDivElement | null>(null);

  // read search params to support links like ?price=free
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const p = searchParams.get('price');
    if (p === 'free') {
      const freeFilters = { ratings: [] as number[], durations: [] as string[], prices: ['free'], levels: [] as string[] };
      // only update if different to avoid cascading renders
      const currentFilters = JSON.stringify(filters);
      const target = JSON.stringify(freeFilters);
      if (currentFilters !== target) {
        // schedule async to avoid synchronous setState in effect
        setTimeout(() => setFilters(freeFilters), 0);
      }
      const currentApplied = JSON.stringify(applied);
      if (currentApplied !== target) {
        setTimeout(() => setApplied(freeFilters), 0);
      }
    }
  }, [searchParams, filters, applied]);

  const qParam = searchParams ? (searchParams.get('q') || '') : '';
  const q = qParam.toLowerCase();
  const categoryParam = searchParams ? (searchParams.get('category') || '') : '';

  // auto-scroll to courses when applied filters or sort change
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [applied, sort, q, categoryParam]);

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

    // apply category filter if present
    if (categoryParam) {
      list = list.filter((c) => c.category === categoryParam);
    }

    // apply free/text search query if present
    if (q) {
      list = list.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
      );
    }

    // sort
    if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    if (sort === 'price') list.sort((a, b) => a.price - b.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [applied, sort, q, categoryParam]);

  return (
    <section className="bg-[#FAF7F3] py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Courses</h1>
          </div>
          <div className="w-full sm:w-auto">
            <select value={sort} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as 'newest' | 'price' | 'rating')} className="w-full sm:w-auto border-2 border-gray-400 rounded-[8px] px-4 py-2 text-gray-900">
              <option value="newest">Sort by: Newest</option>
              <option value="price">Sort by: Price</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setFiltersOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filters & Sort
          </button>
        </div>

  <div className="flex gap-8 items-start">
          {/* Desktop Sidebar: Filters */}
          <div className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 ring-1 ring-gray-50 space-y-6 divide-y divide-gray-100">
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

          {/* Mobile Filter Modal */}
          {filtersOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setFiltersOpen(false)}
              />
              
              {/* Modal Panel */}
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                  <h3 className="text-xl font-semibold">Filters</h3>
                  <button 
                    onClick={() => setFiltersOpen(false)} 
                    className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close filters"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Filter Content */}
                <div className="overflow-y-auto flex-1 p-6 space-y-6">
                  {/* Ratings */}
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">Ratings</p>
                    <div className="flex flex-col space-y-2">
                      {[5, 4, 3, 2].map((r) => (
                        <label key={r} className="flex items-center">
                          <input checked={filters.ratings.includes(r)} onChange={() => handleRatingChange(r)} type="checkbox" className="mr-3 w-5 h-5" /> 
                          <span className="text-gray-700">{r} Stars</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Video Duration */}
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-gray-800 mb-3">Video Duration</p>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <input checked={filters.durations.includes('0-1')} onChange={() => handleDurationChange('0-1')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">0-1 hour</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={filters.durations.includes('1-3')} onChange={() => handleDurationChange('1-3')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">1-3 hours</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={filters.durations.includes('3-9')} onChange={() => handleDurationChange('3-9')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">3-9 hours</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={filters.durations.includes('9-18')} onChange={() => handleDurationChange('9-18')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">9-18 hours</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={filters.durations.includes('18+')} onChange={() => handleDurationChange('18+')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">18+ hours</span>
                      </label>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-gray-800 mb-3">Price</p>
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <input checked={filters.prices.includes('free')} onChange={() => handlePriceChange('free')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">Free</span>
                      </label>
                      <label className="flex items-center">
                        <input checked={filters.prices.includes('paid')} onChange={() => handlePriceChange('paid')} type="checkbox" className="mr-3 w-5 h-5" /> 
                        <span className="text-gray-700">Paid</span>
                      </label>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-gray-800 mb-3">Level</p>
                    <div className="flex flex-col space-y-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                        <label key={l} className="flex items-center">
                          <input checked={filters.levels.includes(l)} onChange={() => handleLevelChange(l)} type="checkbox" className="mr-3 w-5 h-5" /> 
                          <span className="text-gray-700">{l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t bg-white sticky bottom-0 flex gap-3">
                  <button 
                    onClick={clearFilters} 
                    className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-xl font-medium border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={applyFilters} 
                    className="flex-1 px-4 py-3 bg-[#0b4ca6] text-white rounded-xl font-medium hover:bg-[#083a8a] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          <div ref={gridRef} className="w-full lg:w-3/4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-stretch pr-2">
            {displayed.map((course) => (
              <div key={course.id} className="relative">
                <Link href={`/learner/course/${course.id}`} className="no-underline">
                  <div className="rounded-2xl border border-[#e6ded9] overflow-hidden bg-white shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="h-44 overflow-hidden rounded-t-lg">
                      <Image src={course.image} alt={course.title} width={800} height={400} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 bg-[#fffaf8] flex flex-col flex-1">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                        <p className="mt-2 text-sm text-gray-700">{course.shortDescription ?? course.description}</p>
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
                </Link>
                {/* Wishlist Button - positioned absolutely */}
                <div className="absolute top-3 right-3 z-10">
                  <WishlistButton course={course} size="md" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
