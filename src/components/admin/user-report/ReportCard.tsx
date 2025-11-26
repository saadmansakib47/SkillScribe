"use client";

import { UserReport } from '@/lib/admin/reports';
import { User } from 'lucide-react';

interface ReportCardProps {
  report: UserReport;
  onClick: () => void;
}

export default function ReportCard({ report, onClick }: ReportCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-black shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">{report.id}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-gray-600" />
              </div>
              <span className="font-medium">{report.userName}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span>{report.dateSubmitted}</span>
          </div>
        </div>

        {/* Priority Badge */}
        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getPriorityColor(report.priority)}`}>
          {report.priority}
        </span>
      </div>

      {/* Description Preview */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {report.description}
      </p>

      {/* Footer - Issue Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-3 py-1 bg-[#E3F2FD] text-[#1976D2] rounded-full text-xs font-medium">
          {report.category}
        </span>
        {report.relatedCourse && (
          <span className="px-3 py-1 bg-[#E3F2FD] text-[#1976D2] rounded-full text-xs font-medium">
            {report.relatedCourse.split(' ')[0]}
          </span>
        )}
      </div>
    </div>
  );
}
