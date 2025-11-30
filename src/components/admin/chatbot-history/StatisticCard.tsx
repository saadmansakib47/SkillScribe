import { ReactNode } from "react";

interface StatisticCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  bgColor?: string;
}

export default function StatisticCard({ icon, label, value, bgColor = "bg-blue-50" }: StatisticCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
