import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconBgGradient?: string;
  badge?: ReactNode;
}

export default function StatsCard({ 
  icon: Icon, 
  value, 
  label, 
  iconBgGradient = 'from-blue-500 to-blue-600',
  badge 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBgGradient} flex items-center justify-center shadow-md`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {badge && <div>{badge}</div>}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
  );
}
