"use client";

import { UserReport } from '@/lib/admin/reports';
import { X, User, Calendar, Tag, AlertTriangle, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

interface ReportDetailModalProps {
  report: UserReport;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportDetailModal({ report, isOpen, onClose }: ReportDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-blue-100 text-blue-700';
      case 'In Progress':
        return 'bg-purple-100 text-purple-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div>
            <span className="text-sm font-medium text-gray-500">{report.id}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{report.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-[#094CA4]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Reported By</p>
                <p className="font-semibold text-gray-900">{report.userName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Date Submitted</p>
                <p className="font-semibold text-gray-900">{report.dateSubmitted}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Tag className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold text-gray-900">{report.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Priority</p>
                <p className="font-semibold text-gray-900">{report.priority}</p>
              </div>
            </div>
          </div>

          {/* Status and Related Course */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(report.status)}`}>
              {report.status}
            </span>
          </div>

          {report.relatedCourse && (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <BookOpen className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Related Course</p>
                <p className="font-semibold text-gray-900">{report.relatedCourse}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Report Description</h3>
            <p className="text-gray-700 leading-relaxed">{report.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
