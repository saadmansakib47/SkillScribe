"use client";

export default function VideoPrivacySection() {
  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-8">
      <h2 className="text-blue-700 font-semibold underline mb-4">Privacy</h2>

      <div className="flex flex-col space-y-4">
        <label className="flex items-start gap-3">
          <input type="radio" name="privacy" defaultChecked className="mt-[3px]" />
          <div>
            <p className="text-sm font-medium text-gray-700">Public</p>
            <p className="text-xs text-gray-500">Anyone can watch this video</p>
          </div>
        </label>

        <label className="flex items-start gap-3">
          <input type="radio" name="privacy" className="mt-[3px]" />
          <div>
            <p className="text-sm font-medium text-gray-700">Private</p>
            <p className="text-xs text-gray-500">Only enrolled students can watch</p>
          </div>
        </label>
      </div>
    </div>
  );
}
