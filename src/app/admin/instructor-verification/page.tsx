"use client";

import { useState, useMemo } from 'react';
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
import AdminLayout from '../adminLayout';

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
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 mb-6">
            <ApplicationFilters
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
}
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
    </AdminLayout>
  );
}
