"use client";

import { useState } from 'react';
import { Save, Eye, Upload } from 'lucide-react';
import { POLICIES, Policy, PolicyType } from '@/lib/admin/policies';
import {
  PolicyTabs,
  RichTextEditor,
  PolicyPreviewModal
} from '@/components/admin/policy-management';

export default function PolicyManagementPage() {
  // State management
  const [policies, setPolicies] = useState<Policy[]>(POLICIES);
  const [activeTab, setActiveTab] = useState<PolicyType>('terms');
  const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Get current policy
  const currentPolicy = policies.find(p => p.type === activeTab);
  const content = editedContent[activeTab] || currentPolicy?.content || '';

  // Handlers
  const handleContentChange = (newContent: string) => {
    setEditedContent(prev => ({
      ...prev,
      [activeTab]: newContent
    }));
  };

  const handleSaveDraft = () => {
    if (!currentPolicy) return;

    setPolicies(prev => prev.map(policy =>
      policy.type === activeTab
        ? {
            ...policy,
            content: editedContent[activeTab] || policy.content,
            status: 'draft' as const,
            lastUpdated: new Date().toISOString().split('T')[0],
            version: policy.version + 1
          }
        : policy
    ));

    alert(`${currentPolicy.title} saved as draft successfully!`);
  };

  const handlePublish = () => {
    if (!currentPolicy) return;

    if (confirm(`Are you sure you want to publish ${currentPolicy.title}?`)) {
      setPolicies(prev => prev.map(policy =>
        policy.type === activeTab
          ? {
              ...policy,
              content: editedContent[activeTab] || policy.content,
              status: 'published' as const,
              lastUpdated: new Date().toISOString().split('T')[0],
              version: policy.version + 1
            }
          : policy
      ));

      // Clear edited content after publishing
      setEditedContent(prev => {
        const updated = { ...prev };
        delete updated[activeTab];
        return updated;
      });

      alert(`${currentPolicy.title} published successfully!`);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Manage terms, privacy, and refund policies</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
          
          {/* Tabs */}
          <div className="px-6 pt-6">
            <PolicyTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Policy Editor */}
          {currentPolicy && (
            <div className="p-6">
              {/* Status Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Status:</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                      currentPolicy.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {currentPolicy.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Last Updated:</span>
                    <span className="ml-2 text-sm text-gray-900">
                      {formatDate(currentPolicy.lastUpdated)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Version:</span>
                    <span className="ml-2 text-sm text-gray-900">{currentPolicy.version}</span>
                  </div>
                </div>
              </div>

              {/* Text Area Label */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Text Area</h3>
              </div>

              {/* Rich Text Editor */}
              <RichTextEditor
                value={content}
                onChange={handleContentChange}
              />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all font-bold"
                >
                  <Save className="h-5 w-5" />
                  Save Policy Updates
                </button>
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-[#094CA4] text-[#094CA4] rounded-xl hover:bg-blue-50 transition-all font-bold"
                >
                  <Eye className="h-5 w-5" />
                  Preview Changes
                </button>
                <button
                  onClick={handlePublish}
                  className="flex items-center gap-2 px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-bold"
                >
                  <Upload className="h-5 w-5" />
                  Publish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        <PolicyPreviewModal
          isOpen={isPreviewOpen}
          title={currentPolicy?.title || ''}
          content={content}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </div>
  );
}
