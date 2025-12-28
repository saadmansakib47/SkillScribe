"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseMediaUpload() {
  return (
    <div>
      <h3 className="font-semibold mb-1 text-gray-800">Course Media</h3>
      <p className="text-sm text-gray-500 mb-4">
        Add your modules here. Each module averages 1–2 hours, divided into short video lessons.
      </p>

      <div className="border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          <div className="w-56 h-24 border border-black rounded-[4px] bg-gray-50 mb-3 flex items-center justify-center text-gray-400 text-sm">
            400×320 pixel
          </div>
          <Button className="bg-[#094CA4] hover:bg-[#3b58d8] rounded-[8px] text-white flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Photo
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Upload PNG, JPG (max 2 MB)
          </p>
        </div>
      </div>
    </div>
  );
}
