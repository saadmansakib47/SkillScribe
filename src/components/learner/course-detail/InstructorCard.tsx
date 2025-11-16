import Image from 'next/image';

interface InstructorCardProps {
  instructorName: string;
  instructorImage: string;
  rating: number;
  reviews: number;
  durationHours: number;
  level?: string;
  totalVideos: number;
}

export default function InstructorCard({
  instructorName,
  instructorImage,
  rating,
  reviews,
  durationHours,
  level,
  totalVideos
}: InstructorCardProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="flex items-center gap-4">
          <Image 
            src={instructorImage} 
            alt={instructorName} 
            width={64} 
            height={64} 
            className="rounded-full" 
          />
          <div>
            <div className="font-medium">{instructorName}</div>
            <div className="text-sm text-gray-600">Instructor</div>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-gray-700">
          <div>
            Rating: <span className="font-medium">{rating}</span> ({reviews.toLocaleString()})
          </div>
          <div>
            Duration: <span className="font-medium">{durationHours} hr</span>
          </div>
          <div>
            Level: <span className="font-medium">{level}</span>
          </div>
          <div>
            Videos: <span className="font-medium">{totalVideos}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
