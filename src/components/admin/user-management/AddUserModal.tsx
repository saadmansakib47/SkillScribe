import { useState } from 'react';
import { X } from 'lucide-react';
import { User, UserRole, UserStatus } from '@/lib/admin/users';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Omit<User, 'id' | 'registrationDate'>) => void;
  editingUser?: User | null;
}

export default function AddUserModal({ isOpen, onClose, onSave, editingUser }: AddUserModalProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  }>({
    name: editingUser?.name || '',
    email: editingUser?.email || '',
    role: editingUser?.role || 'learner',
    status: editingUser?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      avatar: editingUser?.avatar || `/Asset/Avatar/${Math.floor(Math.random() * 12) + 1}.png`,
      lastLogin: editingUser?.lastLogin || undefined
    });
    setFormData({ name: '', email: '', role: 'learner', status: 'active' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all"
                placeholder="user@example.com"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all bg-white"
              >
                <option value="learner">Learner</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all bg-white"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                {editingUser ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
