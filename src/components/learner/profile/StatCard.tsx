import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  bgGradient: string;
  badge?: ReactNode;
  footer?: string;
  delay?: number;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  bgGradient,
  badge,
  footer,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, delay }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgGradient} shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {badge}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      {footer && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">{footer}</p>
        </div>
      )}
    </motion.div>
  );
}
