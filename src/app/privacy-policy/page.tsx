"use client";

import { useEffect, useState } from 'react';
import { getPolicyByType } from '@/lib/admin/policies';
import { Shield, Home, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const policy = getPolicyByType('privacy');
    if (policy) {
      setContent(policy.content);
      setLastUpdated(policy.lastUpdated);
    }
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F3]">
      {/* Header Section */}
      <div className="bg-white border-b-2 border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-[#094CA4] transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </div>

          {/* Title */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#094CA4] flex items-center justify-center flex-shrink-0">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
              <p className="text-gray-600 text-lg">Your privacy and data security are our top priorities</p>
              {lastUpdated && (
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {formatDate(lastUpdated)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden">
          {/* Accent Bar */}
          <div className="h-2 bg-[#094CA4]"></div>
          
          {/* Content */}
          <div className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-blue-100
                prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-[#094CA4]
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-ul:space-y-2
                prose-li:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-[#094CA4] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold"
          >
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
