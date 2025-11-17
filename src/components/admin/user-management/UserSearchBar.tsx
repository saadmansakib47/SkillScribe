import { Search } from 'lucide-react';

interface UserSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function UserSearchBar({ searchQuery, onSearchChange }: UserSearchBarProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] transition-all"
      />
    </div>
  );
}
