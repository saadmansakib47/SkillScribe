import Image from 'next/image';

interface CourseHeroProps {
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  price: number;
  children?: React.ReactNode;
}

export default function CourseHero({
  title,
  shortDescription,
  description,
  image,
  price,
  children
}: CourseHeroProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e6ded9]">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-3 text-gray-700">{shortDescription ?? description}</p>

          {children}
        </div>

        <div className="w-full lg:w-80 relative">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Image 
              src={image} 
              alt={title} 
              width={700} 
              height={420} 
              className="w-full h-48 object-cover" 
            />
          </div>
          <div className="absolute right-4 top-40 bg-yellow-50 text-gray-900 px-3 py-1 rounded-lg border border-[#e2c37a] font-medium">
            {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
