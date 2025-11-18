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
          {/* Applicant Information */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{application.name}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{application.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Applied For</label>
                <p className="text-gray-900">{application.appliedFor || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Application Date</label>
                <p className="text-gray-900">{formatDate(application.applicationDate)}</p>
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Credentials</h3>
            <div className="space-y-3">
              {application.credentials.map((credential, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#094CA4] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {getCredentialIcon(credential.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{credential.type}</p>
                      <p className="text-sm text-gray-600">{credential.name}</p>
                    </div>
                  </div>
                  <a
                    href={credential.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-[#094CA4] border-2 border-[#094CA4] rounded-lg hover:bg-[#094CA4] hover:text-white transition-all font-semibold"
                  >
                    View Document
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Certificate Checkbox */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={application.credentials.some(c => c.type === 'certificate')}
                readOnly
                className="h-5 w-5 text-[#094CA4] border-2 border-gray-300 rounded focus:ring-[#094CA4]"
              />
              <span className="font-semibold text-gray-900">Teaching Certificate</span>
            </label>
          </div>

          {/* Portfolio Checkbox */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={application.credentials.some(c => c.type === 'portfolio')}
                readOnly
                className="h-5 w-5 text-[#094CA4] border-2 border-gray-300 rounded focus:ring-[#094CA4]"
              />
              <span className="font-semibold text-gray-900">Portfolio</span>
            </label>
          </div>

          {/* Rejection Reason (if applicable) */}
          {application.status === 'rejected' && application.rejectionReason && (
            <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
              <h4 className="font-bold text-red-900 mb-2">Rejection Reason (optional)</h4>
              <p className="text-red-800">{application.rejectionReason}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {application.status === 'pending' && (
          <div className="sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 px-6 py-4 flex gap-4 rounded-b-2xl">
            <button
              onClick={() => onApprove(application.id)}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-bold"
            >
              Approve & Send Email
            </button>
            <button
              onClick={handleReject}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold"
            >
              Reject & Send Email
            </button>
          </div>
        )}

        {application.status !== 'pending' && (
          <div className="sticky bottom-0 bg-gray-50 border-t-2 border-gray-200 px-6 py-4 rounded-b-2xl">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
