import { LEARNERS } from '../learners';
import { INSTRUCTORS } from '../instructors';

export type UserRole = 'learner' | 'instructor' | 'admin';
export type UserStatus = 'active' | 'suspended' | 'pending';
export type SuspensionDuration = '1day' | '7days' | '15days' | '30days' | 'permanent';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
  avatar?: string;
  lastLogin?: string;
  suspensionReason?: string;
  suspensionDuration?: SuspensionDuration;
  suspendedDate?: string;
  reinstateDate?: string;
}

// Transform learners to users format
const learnersAsUsers: User[] = LEARNERS.map((learner) => ({
  id: learner.id,
  name: learner.name,
  email: learner.email,
  role: 'learner' as UserRole,
  status: 'active' as UserStatus, // Existing learners are active
  registrationDate: learner.joinedDate,
  avatar: learner.avatar,
  lastLogin: '2024-11-17' // Recent login for active users
}));

// Transform instructors to users format
const instructorsAsUsers: User[] = INSTRUCTORS.map((instructor) => ({
  id: instructor.id + 100, // Offset IDs to avoid conflicts with learners
  name: instructor.name,
  email: instructor.name.toLowerCase().replace(/\s+/g, '.') + '@skillscribe.com',
  role: 'instructor' as UserRole,
  status: 'active' as UserStatus, // Existing instructors are active
  registrationDate: instructor.joinedDate,
  avatar: instructor.image,
  lastLogin: '2024-11-17' // Recent login for active instructors
}));

// Add some additional users for demonstration (suspended, pending, admin)
const additionalUsers: User[] = [
  {
    id: 200,
    name: 'Jessica Brown',
    email: 'jessica.brown@example.com',
    role: 'learner',
    status: 'suspended',
    registrationDate: '2024-02-28',
    avatar: '/Asset/jessica.jpeg',
    lastLogin: '2024-10-20',
    suspensionReason: 'Violation of community guidelines',
    suspensionDuration: 'permanent',
    suspendedDate: '2024-10-20'
  },
  {
    id: 201,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'instructor',
    status: 'pending',
    registrationDate: '2024-11-10',
    avatar: '/Asset/lisa.jpeg',
    lastLogin: undefined
  },
  {
    id: 202,
    name: 'Linda Taylor',
    email: 'linda.taylor@example.com',
    role: 'instructor',
    status: 'suspended',
    registrationDate: '2024-04-18',
    avatar: '/Asset/linda.jpeg',
    lastLogin: '2024-09-12',
    suspensionReason: 'Inappropriate course content',
    suspensionDuration: '30days',
    suspendedDate: '2024-10-15',
    reinstateDate: '2024-11-14'
  },
  {
    id: 203,
    name: 'Clark Wilson',
    email: 'clark.wilson@example.com',
    role: 'learner',
    status: 'pending',
    registrationDate: '2024-11-12',
    avatar: '/Asset/clark.jpeg',
    lastLogin: undefined
  },
  {
    id: 999,
    name: 'Admin',
    email: 'admin@skillscribe.com',
    role: 'admin',
    status: 'active',
    registrationDate: '2023-01-01',
    avatar: '/Asset/rohan patel.jpg',
    lastLogin: '2024-11-17'
  }
];

// Combine all users: learners + instructors + additional demo users
export const USERS: User[] = [
  ...learnersAsUsers,
  ...instructorsAsUsers,
  ...additionalUsers
];

// Helper function to get user by ID
export function getUserById(id: number): User | undefined {
  return USERS.find(user => user.id === id);
}

// Helper function to get users by role
export function getUsersByRole(role: UserRole): User[] {
  return USERS.filter(user => user.role === role);
}

// Helper function to get users by status
export function getUsersByStatus(status: UserStatus): User[] {
  return USERS.filter(user => user.status === status);
}

// Helper function to search users by name or email
export function searchUsers(query: string): User[] {
  const lowerQuery = query.toLowerCase();
  return USERS.filter(user =>
    user.name.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery)
  );
}

// Suspension helper functions
export function getDurationLabel(duration: SuspensionDuration): string {
  switch (duration) {
    case '1day':
      return '1 Day';
    case '7days':
      return '7 Days';
    case '15days':
      return '15 Days';
    case '30days':
      return '30 Days';
    case 'permanent':
      return 'Permanent';
    default:
      return duration;
  }
}

export function calculateReinstateDate(suspendedDate: string, duration: SuspensionDuration): string | undefined {
  if (duration === 'permanent') return undefined;
  
  const date = new Date(suspendedDate);
  const daysToAdd = parseInt(duration.replace('days', '').replace('day', ''));
  date.setDate(date.getDate() + daysToAdd);
  
  return date.toISOString().split('T')[0];
}
