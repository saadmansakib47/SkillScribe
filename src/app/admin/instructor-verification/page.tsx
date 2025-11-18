"use client";

import { useState, useMemo } from 'react';
import { ClipboardCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import {
  INSTRUCTOR_APPLICATIONS,
  InstructorApplication,
  ApplicationStatus
} from '@/lib/admin/instructorApplications';
import {
  ApplicationList,
  ApplicationReviewModal,
  ApplicationFilters
} from '@/components/admin/instructor-verification';

export default function InstructorVerificationPage() {
  // State management
  const [applications, setApplications] = useState<InstructorApplication[]>(INSTRUCTOR_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [selectedApplication, setSelectedApplication] = useState<InstructorApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter applications
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    // Apply status filter - must be exact match
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    return filtered;
  }, [applications, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length
    };
  }, [applications]);

  // Handlers
  const handleReview = (application: InstructorApplication) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleApprove = (id: number) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'approved' as ApplicationStatus } : app
    ));
    setIsModalOpen(false);
    setSelectedApplication(null);
    // In production, this would send an approval email
    alert(`Approval email sent to ${selectedApplication?.email}`);
  };

  const handleReject = (id: number, reason: string) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status: 'rejected' as ApplicationStatus, rejectionReason: reason } : app
    ));
    setIsModalOpen(false);
    setSelectedApplication(null);
    // In production, this would send a rejection email
    alert(`Rejection email sent to ${selectedApplication?.email}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pending Instructor Application</h1>
          <p className="text-gray-600">Review and approve instructor applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</p>
            <p className="text-sm text-gray-600 font-medium">Total Applications</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</p>
            <p className="text-sm text-gray-600 font-medium">Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.approved}</p>
            <p className="text-sm text-gray-600 font-medium">Approved</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.rejected}</p>
            <p className="text-sm text-gray-600 font-medium">Rejected</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 mb-6">
          <ApplicationFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Results Info */}
        <div className="mb-4 text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredApplications.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{applications.length}</span> applications
        </div>

        {/* Application List */}
        <ApplicationList
          applications={filteredApplications}
          onReview={handleReview}
        />

        {/* Application Review Modal */}
        <ApplicationReviewModal
          isOpen={isModalOpen}
          application={selectedApplication}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
