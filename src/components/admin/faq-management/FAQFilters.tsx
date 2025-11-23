import { FAQCategory, getCategoryLabel } from '@/lib/admin/faqs';

interface FAQFiltersProps {
  categoryFilter: FAQCategory | 'all';
  onCategoryChange: (category: FAQCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories: (FAQCategory | 'all')[] = ['all', 'general', 'technical', 'billing', 'account', 'courses'];

export default function FAQFilters({
  categoryFilter,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: FAQFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#094CA4]"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value as FAQCategory | 'all')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#094CA4]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
