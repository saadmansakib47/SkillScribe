interface PersonalInfoCardProps {
  email: string;
  location: string;
  joinedDate: string;
  formatDate: (date: string) => string;
}

export default function PersonalInfoCard({ email, location, joinedDate, formatDate }: PersonalInfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Info</h2>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Email</p>
          <p className="text-sm font-medium text-gray-900 truncate">{email}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Location</p>
          <p className="text-sm font-medium text-gray-900">{location}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Member Since</p>
          <p className="text-sm font-medium text-gray-900">{formatDate(joinedDate)}</p>
        </div>
      </div>
    </div>
  );
}
