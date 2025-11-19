import React from 'react';
import { User, SuspensionDuration } from '@/lib/admin/users';
import { X } from 'lucide-react';

interface SuspendUserFormProps {
  isOpen: boolean;
  selectedUser: User | null;
  onClose: () => void;
  onSuspend: (userId: number, reason: string, duration: SuspensionDuration) => void;
}

export default function SuspendUserForm({
  isOpen,
  selectedUser,
  onClose,
  onSuspend
}: SuspendUserFormProps) {
  const [reason, setReason] = React.useState('');
  const [duration, setDuration] = React.useState<SuspensionDuration>('1day');

  React.useEffect(() => {
    if (isOpen && selectedUser) {
      setReason('');
      setDuration('1day');
    }
  }, [isOpen, selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && reason.trim()) {
      onSuspend(selectedUser.id, reason.trim(), duration);
      onClose();
    }
  };

  if (!isOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full">
        {/* Header */}
        <div className="border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Suspend User</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selected User Info */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <h3 className="font-bold text-gray-900 mb-3">Selected User</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                selectedUser.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : selectedUser.status === 'suspended'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedUser.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Reason for Suspension */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Reason for Suspension <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Enter the reason for suspending this user..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] font-medium resize-none"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Duration <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: '1day', label: '1 day' },
                { value: '7days', label: '7 days' },
                { value: '15days', label: '15 days' },
                { value: '30days', label: '30 days' },
                { value: 'permanent', label: 'Permanent' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                    duration === option.value
                      ? 'border-[#094CA4] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={option.value}
                    checked={duration === option.value}
                    onChange={(e) => setDuration(e.target.value as SuspensionDuration)}
                    className="h-4 w-4 text-[#094CA4] focus:ring-[#094CA4]"
                  />
                  <span className="font-semibold text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suspend User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
