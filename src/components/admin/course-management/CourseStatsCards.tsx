"use client";

import { BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react';

interface CourseStatsCardsProps {
  total: number;
  published: number;
  pending: number;
  suspended: number;
}

export default function CourseStatsCards({ total, published, pending, suspended }: CourseStatsCardsProps) {
  const stats = [
    {
      label: 'Total Courses',
      value: total,
      icon: BookOpen,
      bgColor: 'bg-[#E8F4FF]',
      iconColor: 'text-[#094CA4]'
    },
    {
      label: 'Published',
      value: published,
      icon: CheckCircle,
      bgColor: 'bg-[#E8F8F0]',
      iconColor: 'text-[#0B8020]'
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      bgColor: 'bg-[#FFF8E6]',
      iconColor: 'text-[#F59E0B]'
    },
    {
      label: 'Suspended',
      value: suspended,
      icon: XCircle,
      bgColor: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
