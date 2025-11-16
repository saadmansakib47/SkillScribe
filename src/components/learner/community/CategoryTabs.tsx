import { PostCategory } from '../../../lib/posts';

interface CategoryTabsProps {
  categories: (PostCategory | 'All')[];
  activeTab: PostCategory | 'All';
  onTabChange: (category: PostCategory | 'All') => void;
}

export default function CategoryTabs({ categories, activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 mb-6 overflow-hidden">
      <div className="flex border-b-2 border-gray-100 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onTabChange(category)}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === category
                ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
