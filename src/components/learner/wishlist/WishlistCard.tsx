import Link from 'next/link';
import Image from 'next/image';

interface WishlistCardProps {
  course: {
    id: number;
    title: string;
    instructorName: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    durationHours: number;
  };
  isInCart: boolean;
  onAddToCart: () => void;
  onRemove: () => void;
}

export default function WishlistCard({ course, isInCart, onAddToCart, onRemove }: WishlistCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
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
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors hover:text-[#094CA4]">
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
            onClick={onAddToCart}
            disabled={isInCart}
            className={`flex-1 py-2 rounded-[10px] font-semibold transition-all ${
              isInCart
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'text-white hover:opacity-90'
            }`}
            style={!isInCart ? { backgroundColor: '#094CA4' } : {}}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={onRemove}
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
  );
}
