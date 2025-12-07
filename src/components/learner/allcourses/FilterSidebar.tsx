"use client";

export const dynamic = "force-dynamic";

interface FilterSidebarProps {
  filters: {
    ratings: number[];
    durations: string[];
    prices: string[];
    levels: string[];
  };
  onRatingChange: (rating: number) => void;
  onDurationChange: (duration: string) => void;
  onPriceChange: (price: string) => void;
  onLevelChange: (level: string) => void;
}

export default function FilterSidebar({
  filters,
  onRatingChange,
  onDurationChange,
  onPriceChange,
  onLevelChange,
}: FilterSidebarProps) {
  return (
    <div className="hidden lg:block w-1/4 bg-white p-6 rounded-2xl shadow-md border-2 border-gray-200 space-y-6">
      <div className="pb-6 border-b-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
      </div>

      {/* Ratings */}
      <div className="pb-6 border-b-2 border-gray-100">
        <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Ratings</p>
        <div className="flex flex-col space-y-2">
          {[5, 4, 3, 2].map((r) => (
            <label key={r} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <input 
                checked={filters.ratings.includes(r)} 
                onChange={() => onRatingChange(r)} 
                type="checkbox" 
                className="mr-3 w-4 h-4 accent-[#094CA4]" 
              /> 
              <span className="text-gray-700 font-medium">{r} Stars & Up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Video Duration */}
      <div className="pb-6 border-b-2 border-gray-100">
        <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Video Duration</p>
        <div className="flex flex-col space-y-2">
          {[
            { value: '0-1', label: '0-1 hour' },
            { value: '1-3', label: '1-3 hours' },
            { value: '3-9', label: '3-9 hours' },
            { value: '9-18', label: '9-18 hours' },
            { value: '18+', label: '18+ hours' }
          ].map((d) => (
            <label key={d.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <input 
                checked={filters.durations.includes(d.value)} 
                onChange={() => onDurationChange(d.value)} 
                type="checkbox" 
                className="mr-3 w-4 h-4 accent-[#094CA4]" 
              /> 
              <span className="text-gray-700 font-medium">{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="pb-6 border-b-2 border-gray-100">
        <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Price</p>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input 
              checked={filters.prices.includes('free')} 
              onChange={() => onPriceChange('free')} 
              type="checkbox" 
              className="mr-3 w-4 h-4 accent-[#094CA4]" 
            /> 
            <span className="text-gray-700 font-medium">Free</span>
          </label>
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <input 
              checked={filters.prices.includes('paid')} 
              onChange={() => onPriceChange('paid')} 
              type="checkbox" 
              className="mr-3 w-4 h-4 accent-[#094CA4]" 
            /> 
            <span className="text-gray-700 font-medium">Paid</span>
          </label>
        </div>
      </div>

      {/* Level */}
      <div>
        <p className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Level</p>
        <div className="flex flex-col space-y-2">
          {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
            <label key={l} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <input 
                checked={filters.levels.includes(l)} 
                onChange={() => onLevelChange(l)} 
                type="checkbox" 
                className="mr-3 w-4 h-4 accent-[#094CA4]" 
              /> 
              <span className="text-gray-700 font-medium">{l}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
