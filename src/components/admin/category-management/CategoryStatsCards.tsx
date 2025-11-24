"use client";

import { FolderOpen, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

interface CategoryStatsCardsProps {
  totalCategories: number;
  activeCourses: number;
  totalRevenue: number;
  trendingCount: number;
}

export default function CategoryStatsCards({
  totalCategories,
  activeCourses,
  totalRevenue,
  trendingCount
}: CategoryStatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const stats = [
    {
      label: 'Total Categories',
      value: totalCategories,
      icon: FolderOpen,
      bgColor: 'bg-[#E8F4FF]',
      iconColor: 'text-[#094CA4]'
    },
    {
      label: 'Active Courses',
      value: activeCourses,
      icon: BookOpen,
      bgColor: 'bg-[#E8F8F0]',
      iconColor: 'text-[#0B8020]'
    },
    {
      label: 'Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      bgColor: 'bg-[#FFF8E6]',
      iconColor: 'text-[#F59E0B]',
      isFormatted: true
    },
    {
      label: 'Trending',
      value: trendingCount,
      icon: TrendingUp,
      bgColor: 'bg-[#F3E8FF]',
      iconColor: 'text-[#9333EA]'
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
              <p className="text-3xl font-bold text-gray-900">
                {stat.isFormatted ? stat.value : stat.value}
              </p>
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
