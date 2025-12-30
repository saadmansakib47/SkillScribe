import React from 'react';
import { User } from '@/lib/admin/users';
import { X } from 'lucide-react';

interface ReinstateUserFormProps {
  isOpen: boolean;
  selectedUser: User | null;
  onClose: () => void;
  onReinstate: (userId: number, reason: string) => void;
}

export default function ReinstateUserForm({
  isOpen,
  selectedUser,
  onClose,
  onReinstate
}: ReinstateUserFormProps) {
  const [reason, setReason] = React.useState('');

  React.useEffect(() => {
    if (isOpen && selectedUser) {
      setReason('');
    }
  }, [isOpen, selectedUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && reason.trim()) {
      onReinstate(selectedUser.id, reason.trim());
      onClose();
    }
  };

  if (!isOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full">
        {/* Header */}
        <div className="border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Reinstate User</h2>
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
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status</label>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                  SUSPENDED
                </span>
              </div>
              {selectedUser.suspendedDate && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Suspended Since</label>
                  <p className="text-gray-900 text-sm">{selectedUser.suspendedDate}</p>
                </div>
              )}
            </div>
            {selectedUser.suspensionReason && (
              <div className="mt-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Suspension Reason</label>
                <p className="text-gray-900 text-sm bg-white p-3 rounded-lg border border-gray-200">
                  {selectedUser.suspensionReason}
                </p>
              </div>
            )}
          </div>

          {/* Reason for Reinstatement */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Reason for Reinstatement <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Enter the reason for reinstating this user (e.g., appeal approved, suspension period completed, investigation cleared user, etc.)..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] font-medium resize-none"
            />
            <p className="mt-2 text-sm text-gray-600">
              This reason will be logged for audit purposes.
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-green-900">
              ⚠️ Reinstating this user will restore their full access to the platform immediately.
            </p>
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
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Reinstatement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
