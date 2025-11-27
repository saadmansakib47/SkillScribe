"use client";

import { useMemo, useState, useRef, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { COURSES } from '../../../lib/courses';
import { FilterSidebar, MobileFilterModal, CourseCard } from '@/components/learner/allcourses';

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
      const currentApplied = JSON.stringify(filters);
      if (currentApplied !== target) {
        setTimeout(() => setFilters(freeFilters), 0);
      }
    }
  }, [searchParams, filters]);

  const qParam = searchParams ? (searchParams.get('q') || '') : '';
  const q = qParam.toLowerCase();
  const categoryParam = searchParams ? (searchParams.get('category') || '') : '';

  // auto-scroll to courses when filters or sort change
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filters, sort, q, categoryParam]);

  const displayed = useMemo(() => {
    let list = [...COURSES];

    // apply filters
    const { ratings, durations, prices, levels } = filters;

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
  }, [filters, sort, q, categoryParam]);

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
          <FilterSidebar
            filters={filters}
            onRatingChange={handleRatingChange}
            onDurationChange={handleDurationChange}
            onPriceChange={handlePriceChange}
            onLevelChange={handleLevelChange}
          />

          {/* Mobile Filter Modal */}
          <MobileFilterModal
            isOpen={filtersOpen}
            filters={filters}
            onClose={() => setFiltersOpen(false)}
            onRatingChange={handleRatingChange}
            onDurationChange={handleDurationChange}
            onPriceChange={handlePriceChange}
            onLevelChange={handleLevelChange}
            onApply={() => setFiltersOpen(false)}
            onClear={() => setFilters({ ratings: [], durations: [], prices: [], levels: [] })}
          />

          {/* Courses Grid */}
          <div ref={gridRef} className="w-full lg:w-3/4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-stretch pr-2">
            {displayed.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
