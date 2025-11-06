"use client";

import { Upload } from "lucide-react";

export default function VideoUploadSection() {
  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Video Upload</h2>

      {/* Video File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition">
        <Upload className="mx-auto text-gray-400 mb-2 w-6 h-6" />
        <p className="text-sm text-gray-600 font-medium">
          Click to upload or Drag & Drop
        </p>
        <p className="text-xs text-gray-400">MP4, MOV, AVI (Max 2GB)</p>
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Thumbnail Image <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-8 text-center mt-2 cursor-pointer hover:border-blue-400 transition">
          <Upload className="mx-auto text-gray-400 mb-2 w-6 h-6" />
          <p className="text-sm text-gray-600 font-medium">Upload Thumbnail</p>
          <p className="text-xs text-gray-400">JPG, PNG (1280×720 recommended)</p>
        </div>
      </div>
    </div>
  );
}
