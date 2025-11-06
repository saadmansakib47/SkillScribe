"use client";

import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";

export default function VideoScheduleSection() {
  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Schedule</h2>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Release Date <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <Input type="date" className="rounded-[8px] border-black pr-10" />
          <Calendar className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Release Time <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <Input type="time" className="rounded-[8px] border-black pr-10" />
          <Clock className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Video will be automatically published at the scheduled time
      </p>
    </div>
  );
}
