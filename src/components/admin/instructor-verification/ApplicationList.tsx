import { InstructorApplication } from '@/lib/admin/instructorApplications';
import { FileText } from 'lucide-react';

interface ApplicationListProps {
  applications: InstructorApplication[];
  onReview: (application: InstructorApplication) => void;
}

export default function ApplicationList({ applications, onReview }: ApplicationListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-12 text-center">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
        <p className="text-gray-600">There are no pending instructor applications at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Credentials/Documents</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Application Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{application.name}</div>
                  <div className="text-sm text-gray-500">ID: {application.id}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{application.email}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {application.credentials.map((credential, index) => (
                      <a
                        key={index}
                        href={credential.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="h-3 w-3" />
                        {credential.type === 'cv' && 'CV'}
                        {credential.type === 'certificate' && 'Certificate'}
                        {credential.type === 'portfolio' && 'Portfolio'}
                      </a>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{formatDate(application.applicationDate)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onReview(application)}
                    className="px-4 py-2 bg-[#094CA4] text-white rounded-lg hover:bg-[#073a85] transition-all font-semibold text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
