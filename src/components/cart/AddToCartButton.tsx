"use client";

import { useCart } from '@/contexts/CartContext';
import type { Course } from '@/lib/courses';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AddToCartButtonProps {
  course: Course;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function AddToCartButton({ course, variant = 'secondary', className = '' }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only access cart state after component mounts (client-side only)
  useEffect(() => {
    // Using a microtask to avoid the cascading setState warning
    Promise.resolve().then(() => setMounted(true));
  }, []);

  const handleClick = () => {
    if (isInCart(course.id)) {
      router.push('/learner/cart');
    } else {
      addToCart(course);
    }
  };

  const isPrimary = variant === 'primary';
  const inCart = mounted && isInCart(course.id);

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center py-2 px-4 rounded-[10px] border-2 font-medium transition-all hover:opacity-90 ${
        isPrimary
          ? 'bg-[#0b4ca6] text-white border-black'
          : 'bg-white text-gray-900 border-black'
      } ${className}`}
    >
      {inCart ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go to Cart
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
