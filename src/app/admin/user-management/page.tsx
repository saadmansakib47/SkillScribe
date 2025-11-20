"use client";

import { useState, useMemo } from 'react';
import { Plus, Users, UserCheck, UserX, Clock } from 'lucide-react';
import { USERS, User, UserRole, UserStatus } from '@/lib/admin/users';
import { UserSearchBar, UserFilters, UserTable, AddUserModal } from '@/components/admin/user-management';
import AdminLayout from '../adminLayout';

export default function UserManagementPage() {
  // State management
  const [users, setUsers] = useState<User[]>(USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: 'suspended' as UserStatus } : user
    ));
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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage all users, roles, and permissions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</p>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</p>
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                  <UserX className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.suspended}</p>
              <p className="text-sm text-gray-600 font-medium">Suspended</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</p>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
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
        </div>
      </div>
    </AdminLayout>
  );
}
