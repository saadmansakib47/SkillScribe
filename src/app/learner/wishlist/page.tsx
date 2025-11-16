"use client";

import Link from 'next/link';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useCart } from '../../../contexts/CartContext';
import { COURSES } from '../../../lib/courses';
import WishlistCard from '@/components/learner/wishlist/WishlistCard';
import RecommendedCourses from '@/components/learner/cart/RecommendedCourses';
import EmptyState from '@/components/learner/common/EmptyState';
import { Search, Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  // Get some recommended courses (courses not in wishlist)
  const recommendedCourses = COURSES.filter(
    course => !items.some(item => item.course.id === course.id)
  ).slice(0, 3);

  const handleAddToCart = (courseId: number) => {
    const course = items.find(item => item.course.id === courseId)?.course;
    if (course) {
      addToCart(course);
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(courseId);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F3' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FAF7F3' }} className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? 'course' : 'courses'} in your wishlist
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        {items.length === 0 ? (
          <>
            {/* Empty Wishlist State */}
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Save courses you're interested in and come back to them later. Start building your wishlist today!"
              primaryAction={{
                label: 'Explore Courses',
                href: '/learner/allcourses',
                icon: Search
              }}
            />

            {/* Recommended Courses */}
            <div className="mt-8">
              <RecommendedCourses
                courses={recommendedCourses}
                title="Popular Courses"
                subtitle="Discover courses loved by thousands of learners"
              />
            </div>
          </>
        ) : (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items.map(({ course }) => (
                <WishlistCard
                  key={course.id}
                  course={course}
                  isInCart={isInCart(course.id)}
                  onAddToCart={() => handleAddToCart(course.id)}
                  onRemove={() => removeFromWishlist(course.id)}
                />
              ))}
            </div>

            {/* More to Explore Section */}
            <RecommendedCourses
              courses={recommendedCourses}
              title="More to Explore"
              subtitle="Courses you might be interested in"
            />
          </>
        )}
      </div>
    </div>
  );
}
