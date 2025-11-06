"use client";

import AddToCartButton from '@/components/cart/AddToCartButton';
import { useWishlist } from '@/contexts/WishlistContext';
import type { Course } from '@/lib/courses';

interface CourseActionsProps {
  course: Course;
}

export default function CourseActions({ course }: CourseActionsProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(course.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  return (
    <div className="mt-6 flex items-center gap-3">
      <button 
        onClick={handleWishlistToggle}
        className={`inline-flex items-center justify-center py-2 px-4 rounded-[10px] border-2 border-black font-medium transition-all hover:opacity-90 ${
          inWishlist 
            ? 'bg-white text-gray-900' 
            : 'bg-[#0b4ca6] text-white'
        }`}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill={inWishlist ? "#EF4444" : "none"} 
          xmlns="http://www.w3.org/2000/svg" 
          className="mr-2"
        >
          <path 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
            stroke={inWishlist ? "#EF4444" : "currentColor"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        {inWishlist ? 'In Wishlist' : 'Wishlist'}
      </button>
      <AddToCartButton course={course} variant="secondary" />
    </div>
  );
}
