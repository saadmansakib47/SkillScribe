interface SkillsCardProps {
  skills: string[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
