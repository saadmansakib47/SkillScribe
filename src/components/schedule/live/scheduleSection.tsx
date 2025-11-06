"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";

export default function ScheduleSection() {
  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Schedule</h2>

      {/* Date */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Session Date <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <Input type="date" className="rounded-[8px] border-gray-300 pr-10" />
          <Calendar className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Time */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Starting Time <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <Input type="time" className="rounded-[8px] border-gray-300 pr-10" />
          <Clock className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Duration (minutes) <span className="text-red-500">*</span>
        </label>
        <Select>
          <SelectTrigger className="mt-1 rounded-[8px] border-gray-300">
            <SelectValue placeholder="60 min" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 min</SelectItem>
            <SelectItem value="45">45 min</SelectItem>
            <SelectItem value="60">60 min</SelectItem>
            <SelectItem value="90">90 min</SelectItem>
            <SelectItem value="120">120 min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Max Participants */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Max Participants
        </label>
        <Input
          placeholder="Leave empty for unlimited participants"
          className="mt-1 rounded-[8px] border-gray-300"
        />
      </div>
    </div>
  );
}
