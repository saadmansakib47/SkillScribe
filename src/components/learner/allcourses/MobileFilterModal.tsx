interface MobileFilterModalProps {
  isOpen: boolean;
  filters: {
    ratings: number[];
    durations: string[];
    prices: string[];
    levels: string[];
  };
  onClose: () => void;
  onRatingChange: (rating: number) => void;
  onDurationChange: (duration: string) => void;
  onPriceChange: (price: string) => void;
  onLevelChange: (level: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function MobileFilterModal({
  isOpen,
  filters,
  onClose,
  onRatingChange,
  onDurationChange,
  onPriceChange,
  onLevelChange,
  onApply,
  onClear
}: MobileFilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold">Filters</h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close filters"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Ratings */}
          <div>
            <p className="font-semibold text-gray-800 mb-3">Ratings</p>
            <div className="flex flex-col space-y-2">
              {[5, 4, 3, 2].map((r) => (
                <label key={r} className="flex items-center">
                  <input checked={filters.ratings.includes(r)} onChange={() => onRatingChange(r)} type="checkbox" className="mr-3 w-5 h-5" /> 
                  <span className="text-gray-700">{r} Stars</span>
                </label>
              ))}
            </div>
          </div>

          {/* Video Duration */}
          <div className="pt-4 border-t">
            <p className="font-semibold text-gray-800 mb-3">Video Duration</p>
            <div className="flex flex-col space-y-2">
              {[
                { value: '0-1', label: '0-1 hour' },
                { value: '1-3', label: '1-3 hours' },
                { value: '3-9', label: '3-9 hours' },
                { value: '9-18', label: '9-18 hours' },
                { value: '18+', label: '18+ hours' }
              ].map((d) => (
                <label key={d.value} className="flex items-center">
                  <input checked={filters.durations.includes(d.value)} onChange={() => onDurationChange(d.value)} type="checkbox" className="mr-3 w-5 h-5" /> 
                  <span className="text-gray-700">{d.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="pt-4 border-t">
            <p className="font-semibold text-gray-800 mb-3">Price</p>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input checked={filters.prices.includes('free')} onChange={() => onPriceChange('free')} type="checkbox" className="mr-3 w-5 h-5" /> 
                <span className="text-gray-700">Free</span>
              </label>
              <label className="flex items-center">
                <input checked={filters.prices.includes('paid')} onChange={() => onPriceChange('paid')} type="checkbox" className="mr-3 w-5 h-5" /> 
                <span className="text-gray-700">Paid</span>
              </label>
            </div>
          </div>

          {/* Level */}
          <div className="pt-4 border-t">
            <p className="font-semibold text-gray-800 mb-3">Level</p>
            <div className="flex flex-col space-y-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                <label key={l} className="flex items-center">
                  <input checked={filters.levels.includes(l)} onChange={() => onLevelChange(l)} type="checkbox" className="mr-3 w-5 h-5" /> 
                  <span className="text-gray-700">{l}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 border-t bg-white sticky bottom-0 flex gap-3">
          <button 
            onClick={onClear} 
            className="flex-1 px-4 py-3 bg-white text-gray-900 rounded-xl font-medium border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={onApply} 
            className="flex-1 px-4 py-3 bg-[#0b4ca6] text-white rounded-xl font-medium hover:bg-[#083a8a] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
