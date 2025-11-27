import { ReactNode } from "react";

interface FinancialCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

export default function FinancialCard({ icon, label, value, color, bgColor }: FinancialCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`${bgColor} ${color} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
