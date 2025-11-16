interface InterestsCardProps {
  interests: string[];
}

export default function InterestsCard({ interests }: InterestsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#094CA4' }}
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
