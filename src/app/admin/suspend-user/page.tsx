"use client";

import { useState, useMemo } from 'react';
import { UserX, Users, AlertTriangle } from 'lucide-react';
import { USERS, User, SuspensionDuration, calculateReinstateDate } from '@/lib/admin/users';
import {
  UserSearchBar,
  UserSearchResults,
  SuspendUserForm,
  SuspendedUsersTable
} from '@/components/admin/suspend-user';

import AdminLayout from '../adminLayout';

export default function SuspendUserPage() {
  // State management
  const [users, setUsers] = useState<User[]>(USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get suspended users
  const suspendedUsers = useMemo(() => {
    return users.filter(u => u.status === 'suspended');
  }, [users]);

  // Search users
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return [];

    const query = searchQuery.toLowerCase().trim();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 results
  }, [users, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      suspended: suspendedUsers.length,
      active: users.filter(u => u.status === 'active').length
    };
  }, [users, suspendedUsers]);

  // Handlers
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setShowResults(false);
    setSearchQuery(user.name);
    setIsFormOpen(true);
  };

  const handleSuspend = (userId: number, reason: string, duration: SuspensionDuration) => {
    const suspendedDate = new Date().toISOString().split('T')[0];

    setUsers(prev => prev.map(user =>
      user.id === userId
        ? {
          ...user,
          status: 'suspended' as const,
          suspensionReason: reason,
          suspensionDuration: duration,
          suspendedDate,
          reinstateDate: calculateReinstateDate(suspendedDate, duration)
        }
        : user
    ));

    const user = users.find(u => u.id === userId);
    setSelectedUser(null);
    setSearchQuery('');
    alert(`User ${user?.name} has been suspended successfully.`);
  };

  const handleReinstate = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Are you sure you want to reinstate ${user.name}?`)) {
      setUsers(prev => prev.map(u =>
        u.id === userId
          ? {
            ...u,
            status: 'active' as const,
            suspensionReason: undefined,
            suspensionDuration: undefined,
            suspendedDate: undefined,
            reinstateDate: undefined
          }
          : u
      ));
      alert(`User ${user.name} has been reinstated successfully.`);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.trim().length > 0);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#FAF7F3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Suspend User</h1>
            <p className="text-gray-600">Search and suspend users for policy violations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</p>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <UserX className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.suspended}</p>
              <p className="text-sm text-gray-600 font-medium">Currently Suspended</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats.active}</p>
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Search User</h2>
            <div className="relative">
              <UserSearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              {showResults && (
                <UserSearchResults
                  users={searchResults}
                  onSelectUser={handleSelectUser}
                />
              )}
            </div>
            {searchQuery && searchResults.length === 0 && showResults && (
              <p className="mt-4 text-sm text-gray-600">No users found matching &quot;{searchQuery}&quot;</p>
            )}
          </div>

          {/* Currently Suspended Users Table */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Currently Suspended Users</h2>
            <SuspendedUsersTable
              suspendedUsers={suspendedUsers}
              onReinstate={handleReinstate}
            />
          </div>

          {/* Suspend User Form Modal */}
          <SuspendUserForm
            isOpen={isFormOpen}
            selectedUser={selectedUser}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedUser(null);
            }}
            onSuspend={handleSuspend}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
