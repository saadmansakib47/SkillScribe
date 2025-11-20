import { Policy } from '@/lib/admin/policies';

interface PolicyTabsProps {
  activeTab: 'terms' | 'privacy' | 'refund';
  onTabChange: (tab: 'terms' | 'privacy' | 'refund') => void;
}

export default function PolicyTabs({ activeTab, onTabChange }: PolicyTabsProps) {
  const tabs = [
    { id: 'terms' as const, label: 'Terms and Conditions' },
    { id: 'privacy' as const, label: 'Privacy Policy' },
    { id: 'refund' as const, label: 'Refund Policy' }
  ];

  return (
    <div className="border-b-2 border-gray-200 mb-6">
      <nav className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 font-bold text-sm transition-all relative ${
              activeTab === tab.id
                ? 'text-[#094CA4] border-b-4 border-[#094CA4]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
