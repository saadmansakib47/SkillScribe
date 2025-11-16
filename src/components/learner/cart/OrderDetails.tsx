import Image from 'next/image';

interface OrderDetailsProps {
  items: Array<{
    course: {
      id: number;
      title: string;
      instructorName: string;
      image: string;
      price: number;
    };
  }>;
}

export default function OrderDetails({ items }: OrderDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      
      <div className="space-y-4 mb-6">
        {items.map(({ course }) => (
          <div key={course.id} className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{course.title}</h3>
              <p className="text-xs text-gray-600">{course.instructorName}</p>
            </div>
            <span className="font-semibold">${course.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
