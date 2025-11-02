"use client";
import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadCourseForm() {
  const [modules, setModules] = useState([{ title: "", lessons: [] }]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      {/* Course Info */}
      <div>
        <h3 className="font-semibold mb-1 text-gray-800">Course Info</h3>
        <p className="text-sm text-gray-500 mb-4">
          Add class details to help students discover your course and understand what they’ll learn.
        </p>

        <div className="space-y-3">
          <input className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Course Name" />
          <textarea className="w-full border rounded-md px-3 py-2 text-sm" rows={4} placeholder="Course Description" />
          
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded-md px-3 py-2 text-sm" placeholder="Category" />
            <input className="border rounded-md px-3 py-2 text-sm" placeholder="Sub-Category" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Difficulty</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input className="border rounded-md px-3 py-2 text-sm" placeholder="Duration (hrs)" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded-md px-3 py-2 text-sm" placeholder="Tags (comma separated)" />
            <input className="border rounded-md px-3 py-2 text-sm" placeholder="Price (USD)" />
          </div>
        </div>
      </div>

      {/* Course Media + Content */}
      <div>
        <h3 className="font-semibold mb-1 text-gray-800">Course Media</h3>
        <p className="text-sm text-gray-500 mb-3">
          Add your modules here. Each module averages 1–2 hours, divided into short video lessons.
        </p>

        <div className="border border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center mb-4">
          <Upload className="w-6 h-6 text-[#4C6FFF]" />
          <Button className="mt-2 bg-[#4C6FFF] hover:bg-[#3b58d8] text-white">
            Upload Photo
          </Button>
          <p className="text-xs text-gray-500 mt-1">Upload PNG, JPG (max 2MB)</p>
        </div>

        <h4 className="font-medium mb-2">Course Content</h4>

        {modules.map((mod, i) => (
          <div key={i} className="mb-4 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <input className="border rounded-md px-3 py-2 text-sm" placeholder="Module Title" />
              <input className="border rounded-md px-3 py-2 text-sm" placeholder="Lesson Name" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-sm flex items-center gap-1">
                <Upload className="w-4 h-4" /> Upload Video
              </Button>
              <Button variant="outline" className="text-sm flex items-center gap-1">
                <Plus className="w-4 h-4" /> New Lesson
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" /> Add Module
          </Button>
          <Button className="bg-[#4C6FFF] hover:bg-[#3b58d8] text-white text-sm">Submit for Review</Button>
        </div>
      </div>
    </div>
  );
}
