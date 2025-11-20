import { InstructorApplication } from '@/lib/admin/instructorApplications';
import { X, FileText, ExternalLink, Award, Briefcase } from 'lucide-react';

interface ApplicationReviewModalProps {
  isOpen: boolean;
  application: InstructorApplication | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}

export default function ApplicationReviewModal({
  isOpen,
  application,
  onClose,
  onApprove,
  onReject
}: ApplicationReviewModalProps) {
  if (!isOpen || !application) return null;

  const handleReject = () => {
    const reason = prompt('Please enter the reason for rejection:');
    if (reason && reason.trim()) {
      onReject(application.id, reason.trim());
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCredentialIcon = (type: string) => {
    switch (type) {
      case 'cv':
        return <FileText className="h-5 w-5" />;
      case 'certificate':
        return <Award className="h-5 w-5" />;
      case 'portfolio':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Application Review Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">
              Experienced software developer with 8 years in industry. Passionate about teaching web development and mentoring junior developers.
            </p>
          </div>

          {/* Specialties Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 bg-[#D4E4F7] text-[#094CA4] rounded-full text-sm font-medium">Node.js</span>
              <span className="px-4 py-1.5 bg-[#D4E4F7] text-[#094CA4] rounded-full text-sm font-medium">React</span>
              <span className="px-4 py-1.5 bg-[#D4E4F7] text-[#094CA4] rounded-full text-sm font-medium">TypeScript</span>
              <span className="px-4 py-1.5 bg-[#D4E4F7] text-[#094CA4] rounded-full text-sm font-medium">System Design</span>
            </div>
          </div>

          {/* Submitted Document Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Submitted Document</h3>
            <div className="space-y-3">
              {application.credentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-red-500">
                      {getCredentialIcon(credential.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{credential.name}</p>
                      <p className="text-sm text-gray-600">{Math.floor(Math.random() * 500) + 100} KB</p>
                    </div>
                  </div>
                  <a
                    href={credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection Reason */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Rejection Reason (optional)
            </label>
            <textarea
              placeholder="If rejecting, explain the reason here. This will be included in the email."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#094CA4] resize-none"
              defaultValue={application.rejectionReason || ''}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {application.status === 'pending' && (
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-6 py-4 flex gap-4 rounded-b-2xl">
            <button
              onClick={() => onApprove(application.id)}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all font-semibold whitespace-nowrap"
            >
              Approve and Send Email
            </button>
            <button
              onClick={handleReject}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all font-semibold whitespace-nowrap"
            >
              Reject and Send Email
            </button>
          </div>
        )}

        {application.status !== 'pending' && (
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-6 py-4 rounded-b-2xl">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all font-semibold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
