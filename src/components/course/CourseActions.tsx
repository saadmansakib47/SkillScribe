"use client";

import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';
import type { Course } from '@/lib/courses';

interface CourseActionsProps {
  course: Course;
}

export default function CourseActions({ course }: CourseActionsProps) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <Link 
        href="#" 
        className="inline-flex items-center justify-center bg-[#0b4ca6] text-white py-2 px-4 rounded-[10px] border-2 border-black font-medium transition-all hover:opacity-90"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Wishlist
      </Link>
      <AddToCartButton course={course} variant="secondary" />
    </div>
  );
}
