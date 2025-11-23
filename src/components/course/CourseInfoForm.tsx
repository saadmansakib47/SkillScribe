"use client";
import { useState } from "react";

export default function CourseInfoForm() {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMediaFile(file);
  };

  // give categories a Record<string, string[]> type so it can be indexed by a string
  const categories: Record<string, string[]> = {
    "Web Development": ["Frontend", "Backend", "Full Stack", "Next.js"],
    "Data Science": ["Machine Learning", "Deep Learning", "Data Analysis"],
    "Design": ["UI/UX", "Graphic Design", "Product Design"],
    "Business": ["Marketing", "Entrepreneurship", "Finance"],
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");

  return (
    <div className="p-6 rounded-2xl bg-[#FAF7F3] w-full max-w-[600px] border border-[#E5E5E5]">
      {/* Header */}
      <h3 className="font-semibold text-lg text-black mb-1">Course Info</h3>
      <p className="text-sm text-gray-600 mb-6">
        Add class details to help student discover your class and better
        understand what they’ll learn, what they’ll need and expect.
      </p>

      {/* Form */}
      <div className="space-y-5">
        {/* Course Name */}
        <div>
          <label className="block font-semibold text-black mb-1 text-sm">
            Course Name
          </label>
          <input
            type="text"
            className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block font-semibold text-black mb-1 text-sm">
            Course Description
          </label>
          <div className="relative border border-black rounded-[8px] bg-white">
            <textarea
              rows={5}
              className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none resize-none"
            />
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-2 py-1 border-t border-gray-300">
              <button className="text-gray-700 font-bold text-sm hover:text-black">B</button>
              <button className="italic text-gray-700 text-sm hover:text-black">I</button>
              <button className="underline text-gray-700 text-sm hover:text-black">U</button>
              <button
                onClick={() => setIsMediaOpen(true)}
                className="ml-auto text-[#4C6FFF] text-sm hover:underline"
              >
                📎 Add Media
              </button>
            </div>
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Category
            </label>

            <select
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSub(""); // reset sub-category when category changes
              }}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Sub-Category
            </label>

            <select
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
              value={selectedSub}
              onChange={(e) => setSelectedSub(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Sub-Category</option>

              {selectedCategory && (
                <>
                  {categories[selectedCategory].map((sub: string) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </>
              )}

            </select>
          </div>
        </div>


        {/* Difficulty & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Difficulty
            </label>
            <select className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 5 hrs"
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Tags & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Tags
            </label>
            <input
              type="text"
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block font-semibold text-black mb-1 text-sm">
              Price
            </label>
            <input
              type="text"
              placeholder="USD"
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>
      </div>

      {/* File Picker Modal */}
      {isMediaOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] relative">
            <h4 className="text-lg font-semibold mb-4">Add Media</h4>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />

            {mediaFile && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 font-medium mb-2">Selected File:</p>
                <p className="text-sm text-gray-600">{mediaFile.name}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsMediaOpen(false)}
                className="px-4 py-2 rounded-[8px] text-sm border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsMediaOpen(false)}
                className="px-4 py-2 rounded-[8px] text-sm bg-[#4C6FFF] text-white hover:bg-[#3B57D0]"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
