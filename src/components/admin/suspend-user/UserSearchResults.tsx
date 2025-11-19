import { User } from '@/lib/admin/users';

interface UserSearchResultsProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export default function UserSearchResults({ users, onSelectUser }: UserSearchResultsProps) {
  if (users.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-200 max-h-96 overflow-y-auto z-10">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <div className="font-semibold text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-1">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
              user.status === 'active'
                ? 'bg-green-100 text-green-800'
                : user.status === 'suspended'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.status.toUpperCase()}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
