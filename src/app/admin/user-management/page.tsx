"use client";

import { useState, useMemo } from 'react';
import { Plus, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { USERS, User, UserRole, UserStatus } from '@/lib/admin/users';
import { UserSearchBar, UserFilters, UserTable, AddUserModal, SuspendUserModal } from '@/components/admin/user-management';
import AdminLayout from '../adminLayout';

export default function UserManagementPage() {
  // State management
  const [users, setUsers] = useState<User[]>(USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState<User | null>(null);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    // Apply role filter - must be exact match
    if (roleFilter && roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply status filter - must be exact match
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    return filtered;
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      pending: users.filter(u => u.status === 'pending').length
    };
  }, [users]);

  // Handlers
  const handleAddUser = (userData: Omit<User, 'id' | 'registrationDate'>) => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user =>
        user.id === editingUser.id
          ? { ...user, ...userData }
          : user
      ));
      setEditingUser(null);
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
        registrationDate: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [...prev, newUser]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSuspendUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToSuspend(user);
      setIsSuspendModalOpen(true);
    }
  };

  const handleConfirmSuspend = (userId: number, reason: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: 'suspended' as UserStatus, suspensionReason: reason } : user
    ));
    setIsSuspendModalOpen(false);
    setUserToSuspend(null);
    // In production, this would send a notification email
    alert(`User suspended. Reason: ${reason}`);
  };

  const handleActivateUser = (userId: number) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: 'active' as UserStatus } : user
    ));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-[#E8F4FF] p-3 rounded-xl">
                  <Users className="w-6 h-6 text-[#094CA4]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                </div>
                <div className="bg-[#E8F8F0] p-3 rounded-xl">
                  <UserCheck className="w-6 h-6 text-[#0B8020]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Suspended</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.suspended}</p>
                </div>
                <div className="bg-[#FEE2E2] p-3 rounded-xl">
                  <UserX className="w-6 h-6 text-[#DC2626]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <div className="bg-[#FFF8E6] p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </div>
          </div>

          {/* Search, Filters, and Add Button */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1 w-full">
                <UserSearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <UserFilters
                  roleFilter={roleFilter}
                  statusFilter={statusFilter}
                  onRoleChange={setRoleFilter}
                  onStatusChange={setStatusFilter}
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <Plus className="h-5 w-5" />
                Add New User
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredUsers.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{users.length}</span> users
          </div>

          {/* User Table */}
          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onSuspend={handleSuspendUser}
            onActivate={handleActivateUser}
          />

          {/* Add/Edit User Modal */}
          <AddUserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleAddUser}
            editingUser={editingUser}
          />

          {/* Suspend User Modal */}
          <SuspendUserModal
            isOpen={isSuspendModalOpen}
            user={userToSuspend}
            onClose={() => {
              setIsSuspendModalOpen(false);
              setUserToSuspend(null);
            }}
            onConfirm={handleConfirmSuspend}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
