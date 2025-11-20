import { User, getDurationLabel } from '@/lib/admin/users';
import { RotateCcw } from 'lucide-react';

interface SuspendedUsersTableProps {
  suspendedUsers: User[];
  onReinstate: (userId: number) => void;
}

export default function SuspendedUsersTable({
  suspendedUsers,
  onReinstate
}: SuspendedUsersTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (suspendedUsers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Suspended Users</h3>
        <p className="text-gray-600">There are currently no suspended users.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#EBF3FB] border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">User ID</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Reason</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Suspended Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suspendedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">#{user.id}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="text-gray-700 line-clamp-2">{user.suspensionReason || 'No reason provided'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                    user.suspensionDuration === 'permanent'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {user.suspensionDuration ? getDurationLabel(user.suspensionDuration) : 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{user.suspendedDate ? formatDate(user.suspendedDate) : 'N/A'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onReinstate(user.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-sm"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reinstate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
