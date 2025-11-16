import Image from 'next/image';

interface CartItemProps {
  course: {
    id: number;
    title: string;
    instructorName: string;
    image: string;
    price: number;
  };
  onRemove: () => void;
}

export default function CartItem({ course, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-600">{course.instructorName}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-900">${course.price.toFixed(2)}</span>
        <button
          onClick={onRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove from cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
