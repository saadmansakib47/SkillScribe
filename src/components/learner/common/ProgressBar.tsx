interface ProgressBarProps {
  progress: number;
  isCompleted?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressBar({ 
  progress, 
  isCompleted = false, 
  showLabel = true,
  size = 'md',
  className = '' 
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3'
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600 font-medium">Progress</span>
          <span className={`text-sm font-bold ${isCompleted ? 'text-green-600' : 'text-[#094CA4]'}`}>
            {progress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]} shadow-inner`}>
        <div
          className={`${heightClasses[size]} rounded-full transition-all ${
            isCompleted 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
