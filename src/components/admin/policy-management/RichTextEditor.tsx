"use client";

import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="rich-text-editor">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[400px] p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] font-mono text-sm resize-y"
        placeholder="Enter HTML content here..."
      />
      <p className="mt-2 text-sm text-gray-600">
        Use HTML tags to format your content (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.)
      </p>
    </div>
  );
}
