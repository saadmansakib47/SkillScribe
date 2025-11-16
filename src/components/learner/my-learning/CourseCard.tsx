import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Award, PlayCircle, Clock } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

interface CourseCardProps {
  course: {
    id: number;
    image: string;
    title: string;
    instructorName: string;
    durationHours: number;
    level?: string;
  };
  progress: number;
  isCompleted: boolean;
  isInProgress: boolean;
  index: number;
}

export default function CourseCard({
  course,
  progress,
  isCompleted,
  isInProgress,
  index
}: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
    >
      {/* Course Image */}
      <Link href={`/learner/course/${course.id}`} className="relative block">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <Award className="h-4 w-4" />
              Completed
            </div>
          )}
          {isInProgress && !isCompleted && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <PlayCircle className="h-4 w-4" />
              In Progress
            </div>
          )}
        </div>
      </Link>

      {/* Course Info */}
      <div className="p-5">
        <Link href={`/learner/course/${course.id}`}>
          <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-[#094CA4] transition-colors min-h-[3rem]">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4">{course.instructorName}</p>

        {/* Progress Bar */}
        <ProgressBar progress={progress} isCompleted={isCompleted} className="mb-4" />

        {/* Course Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.durationHours}h
          </span>
          {course.level && (
            <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
              {course.level}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isCompleted ? (
            <>
              <Link
                href={`/learner/course/${course.id}/player`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
              >
                <PlayCircle className="h-4 w-4" />
                Review
              </Link>
              <Link
                href={`/learner/course/${course.id}/player`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-sm"
              >
                <Award className="h-4 w-4" />
                Certificate
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/learner/course/${course.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-semibold text-sm"
              >
                Details
              </Link>
              <Link
                href={`/learner/course/${course.id}/player`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-all font-semibold text-sm shadow-md"
              >
                <PlayCircle className="h-4 w-4" />
                {progress > 0 ? 'Continue' : 'Start'}
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
