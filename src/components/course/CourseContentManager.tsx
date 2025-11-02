"use client";

import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseContentManager() {
  const [modules, setModules] = useState([{ id: 1, title: "", lessons: [] }]);
  const [filePickerOpen, setFilePickerOpen] = useState(false);

  const addModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "", lessons: [] }]);
  };

  const handleFilePick = () => {
    setFilePickerOpen(true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = () => setFilePickerOpen(false);
    input.click();
  };

  return (
    <div className="p-6 border-[#FAF7F3] rounded-2xl bg-[#FAF7F3] w-full">
      <h3 className="font-semibold mb-1 text-gray-800">Course Content</h3>
      <p className="text-sm text-gray-500 mb-4">
        Organize your course into modules and lessons. Upload video lectures and
        add quizzes to help students learn effectively.
      </p>

      {modules.map((mod, i) => (
        <div
          key={mod.id}
          className="mb-6 bg-white p-4 rounded-[8px] border border-black/90 shadow-sm"
        >
          <h4 className="text-base font-bold mb-3 text-gray-900">
            Module {i + 1}
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">
                Title
              </label>
              <input
                className="w-full border border-black/90 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Module Title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800">
                Lesson Name
              </label>
              <input
                className="w-full border border-black/90 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lesson Name"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleFilePick}
              className="text-sm flex items-center gap-1 border border-black/90 rounded-[8px] hover:bg-gray-100"
            >
              <Upload className="w-4 h-4" /> Upload Video
            </Button>
            <Button
              variant="outline"
              className="text-sm flex items-center gap-1 border border-black/90 rounded-[8px] hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" /> New Lesson
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={addModule}
          className="flex items-center gap-1 text-sm border border-black/90 rounded-[8px] hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" /> Add Module
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-sm border border-black/90 rounded-[8px] hover:bg-gray-100"
          >
            Create Quiz
          </Button>
          <Button className="bg-[#4C6FFF] hover:bg-[#3b58d8] text-white text-sm rounded-[8px]">
            Submit for Review
          </Button>
        </div>
      </div>

      {filePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <p className="text-gray-800 font-medium mb-3">
              Select a video file to upload
            </p>
            <Button
              onClick={() => (document.querySelector("input[type=file]") as HTMLInputElement)?.click()}
              className="bg-[#4C6FFF] hover:bg-[#3b58d8] text-white text-sm rounded-[8px]"
            >
              Choose File
            </Button>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => setFilePickerOpen(false)}
                className="text-sm border border-black/90 rounded-[8px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
