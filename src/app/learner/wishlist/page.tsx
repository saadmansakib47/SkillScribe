"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useCart } from '../../../contexts/CartContext';
import { COURSES } from '../../../lib/courses';

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
            <div className="bg-white rounded-2xl shadow-sm border p-12 text-center mb-8">
              {/* Icon */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#E8F0FF' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#094CA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Save courses you&apos;re interested in and come back to them later. Start building your wishlist today!
              </p>

              {/* CTA Button */}
              <Link
                href="/learner/allcourses"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#094CA4' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Explore Courses
              </Link>
            </div>

            {/* Recommended Courses */}
            {recommendedCourses.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular Courses</h2>
                  <p className="text-gray-600">Discover courses loved by thousands of learners</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.instructorName}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFA500" stroke="#FFA500" strokeWidth="1"/>
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                          </div>
                          <span className="text-lg font-bold" style={{ color: '#094CA4' }}>${course.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {items.map(({ course }) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/learner/course/${course.id}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/learner/course/${course.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors" style={{ color: '#1f2937' }} onMouseEnter={(e) => e.currentTarget.style.color = '#094CA4'} onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}>
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{course.instructorName}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFA500" stroke="#FFA500" strokeWidth="1"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({course.reviews.toLocaleString()} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold" style={{ color: '#094CA4' }}>
                        ${course.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">{course.durationHours} hours</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(course.id)}
                        disabled={isInCart(course.id)}
                        className={`flex-1 py-2 rounded-[10px] font-semibold transition-all ${
                          isInCart(course.id)
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'text-white hover:opacity-90'
                        }`}
                        style={!isInCart(course.id) ? { backgroundColor: '#094CA4' } : {}}
                      >
                        {isInCart(course.id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => removeFromWishlist(course.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-[10px] transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More to Explore Section */}
            {recommendedCourses.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">More to Explore</h2>
                  <p className="text-gray-600">Courses you might be interested in</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/learner/course/${course.id}`}
                      className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative w-full h-40">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.instructorName}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFA500" stroke="#FFA500" strokeWidth="1"/>
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                          </div>
                          <span className="text-lg font-bold" style={{ color: '#094CA4' }}>${course.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
