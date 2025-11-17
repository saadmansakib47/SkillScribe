import { UserRole, UserStatus } from '@/lib/admin/users';

interface UserFiltersProps {
  roleFilter: UserRole | 'all';
  statusFilter: UserStatus | 'all';
  onRoleChange: (role: UserRole | 'all') => void;
  onStatusChange: (status: UserStatus | 'all') => void;
}

export default function UserFilters({
  roleFilter,
  statusFilter,
  onRoleChange,
  onStatusChange
}: UserFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Role Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value as UserRole | 'all')}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] bg-white font-medium"
        >
          <option value="all">All Roles</option>
          <option value="learner">Learner</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as UserStatus | 'all')}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] bg-white font-medium"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
}
