import { ApplicationStatus } from '@/lib/admin/instructorApplications';
import { Search } from 'lucide-react';

interface ApplicationFiltersProps {
  statusFilter: ApplicationStatus | 'all';
  onStatusChange: (status: ApplicationStatus | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ApplicationFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange
}: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
      
      <div className="flex-1 relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] bg-white"
        />
      </div>
    </div>
  );
}
