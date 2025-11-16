import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, CheckCircle, TrendingUp } from 'lucide-react';
import StatsCard from '../common/StatsCard';

interface LearningStatsGridProps {
  totalEnrolled: number;
  totalInProgress: number;
  totalCompleted: number;
  avgProgress: number;
}

export default function LearningStatsGrid({
  totalEnrolled,
  totalInProgress,
  totalCompleted,
  avgProgress
}: LearningStatsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    >
      <StatsCard
        icon={BookOpen}
        value={totalEnrolled}
        label="Total Courses"
        iconBgGradient="from-blue-500 to-blue-600"
      />
      <StatsCard
        icon={PlayCircle}
        value={totalInProgress}
        label="In Progress"
        iconBgGradient="from-orange-500 to-red-500"
      />
      <StatsCard
        icon={CheckCircle}
        value={totalCompleted}
        label="Completed"
        iconBgGradient="from-green-500 to-emerald-600"
      />
      <StatsCard
        icon={TrendingUp}
        value={`${avgProgress}%`}
        label="Avg Progress"
        iconBgGradient="from-purple-500 to-pink-600"
      />
    </motion.div>
  );
}
