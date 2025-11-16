import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, ChevronRight } from 'lucide-react';

interface ContinueLearningCardProps {
  course: {
    id: number;
    title: string;
    image: string;
    instructorName: string;
  };
  progress: number;
  index: number;
}

export default function ContinueLearningCard({ course, progress, index }: ContinueLearningCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      <Link
        href={`/learner/course/${course.id}/player`}
        className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#094CA4] hover:shadow-md transition-all group"
      >
        <div className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <PlayCircle className="h-7 w-7 text-[#094CA4]" />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base mb-1 truncate group-hover:text-[#094CA4] transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 mb-3">{course.instructorName}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-xs shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"
              ></motion.div>
            </div>
            <span className="text-sm font-bold text-[#094CA4] min-w-[3rem] text-right">{progress}%</span>
          </div>
        </div>
        <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-[#094CA4] group-hover:translate-x-1 transition-all" />
      </Link>
    </motion.div>
  );
}
