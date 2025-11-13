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
          <div className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl shadow-md border-2 border-gray-200 space-y-6">
            <div className="pb-6 border-b-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Filters</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={applyFilters} 
                  className="flex-1 bg-[#0b4ca6] text-white py-2.5 px-4 rounded-xl font-semibold transition-all hover:bg-[#083a8a] shadow-md hover:shadow-lg"
                >
                  Apply
                </button>
                <button 
                  onClick={clearFilters} 
                  className="flex-1 bg-white text-gray-900 py-2.5 px-4 rounded-xl border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Ratings */}
            <div className="pb-6 border-b-2 border-gray-100">
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Ratings</p>
              <div className="flex flex-col space-y-2">
                {[5, 4, 3, 2].map((r) => (
                  <label key={r} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input 
                      checked={filters.ratings.includes(r)} 
                      onChange={() => handleRatingChange(r)} 
                      type="checkbox" 
                      className="mr-3 w-4 h-4 accent-[#094CA4]" 
                    /> 
                    <span className="text-gray-700 font-medium">{r} Stars & Up</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Video Duration */}
            <div className="pb-6 border-b-2 border-gray-100">
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Video Duration</p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.durations.includes('0-1')} 
                    onChange={() => handleDurationChange('0-1')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">0-1 hour</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.durations.includes('1-3')} 
                    onChange={() => handleDurationChange('1-3')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">1-3 hours</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.durations.includes('3-9')} 
                    onChange={() => handleDurationChange('3-9')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">3-9 hours</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.durations.includes('9-18')} 
                    onChange={() => handleDurationChange('9-18')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">9-18 hours</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.durations.includes('18+')} 
                    onChange={() => handleDurationChange('18+')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">18+ hours</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="pb-6 border-b-2 border-gray-100">
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Price</p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.prices.includes('free')} 
                    onChange={() => handlePriceChange('free')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">Free</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input 
                    checked={filters.prices.includes('paid')} 
                    onChange={() => handlePriceChange('paid')} 
                    type="checkbox" 
                    className="mr-3 w-4 h-4 accent-[#094CA4]" 
                  /> 
                  <span className="text-gray-700 font-medium">Paid</span>
                </label>
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Level</p>
              <div className="flex flex-col space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <label key={l} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input 
                      checked={filters.levels.includes(l)} 
                      onChange={() => handleLevelChange(l)} 
                      type="checkbox" 
                      className="mr-3 w-4 h-4 accent-[#094CA4]" 
                    /> 
                    <span className="text-gray-700 font-medium">{l}</span>
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
                  <div className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-white shadow-md flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="h-44 overflow-hidden">
                      <Image src={course.image} alt={course.title} width={800} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5 bg-[#fffaf8] flex flex-col flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
                        <p className="mt-2 text-sm text-gray-700 font-medium line-clamp-2">{course.shortDescription ?? course.description}</p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (i < Math.round(course.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />))}
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{course.rating} ({course.reviews.toLocaleString()})</div>
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
                        <Image src={course.instructorImage} alt={course.instructorName} width={36} height={36} className="rounded-full ring-2 ring-gray-200" />
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
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
