import { ApplicationStatus } from '@/lib/admin/instructorApplications';

interface ApplicationFiltersProps {
  statusFilter: ApplicationStatus | 'all';
  onStatusChange: (status: ApplicationStatus | 'all') => void;
}

export default function ApplicationFilters({
  statusFilter,
  onStatusChange
}: ApplicationFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Status:</label>
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as ApplicationStatus | 'all')}
        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] bg-white font-medium"
      >
        <option value="all">All Applications</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
