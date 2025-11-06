"use client";

import { useWishlist } from '@/contexts/WishlistContext';
import type { Course } from '@/lib/courses';

interface WishlistButtonProps {
  course: Course;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function WishlistButton({ course, size = 'md', showText = false }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(course.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if used inside a Link
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full transition-all hover:scale-110 ${
        inWishlist 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
      }`}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg 
        className={iconSizes[size]} 
        viewBox="0 0 24 24" 
        fill={inWishlist ? "currentColor" : "none"} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="ml-2 text-sm font-medium">
          {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </button>
  );
}
