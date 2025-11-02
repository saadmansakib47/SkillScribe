"use client";

import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseContentManager() {
  const [modules, setModules] = useState([{ id: 1, title: "", lessons: [] }]);

  const addModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "", lessons: [] }]);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3 text-gray-800">Course Content</h3>

      {modules.map((mod, i) => (
        <div key={mod.id} className="mb-6 bg-[#F9FAFB] p-4 rounded-xl border border-gray-200">
          <h4 className="text-sm font-medium mb-3 text-gray-700">
            Module {i + 1}
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              className="border rounded-md px-3 py-2 text-sm"
              placeholder="Title"
            />
            <input
              className="border rounded-md px-3 py-2 text-sm"
              placeholder="Lesson Name"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-sm flex items-center gap-1 border-gray-300"
            >
              <Upload className="w-4 h-4" /> Upload Video
            </Button>
            <Button
              variant="outline"
              className="text-sm flex items-center gap-1 border-gray-300"
            >
              <Plus className="w-4 h-4" /> New Lesson
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={addModule}
          className="flex items-center gap-1 text-sm border-gray-300"
        >
          <Plus className="w-4 h-4" /> Add Module
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="text-sm border-gray-300">
            Create Quiz
          </Button>
          <Button className="bg-[#4C6FFF] hover:bg-[#3b58d8] text-white text-sm">
            Submit for Review
          </Button>
        </div>
      </div>
    </div>
  );
}
