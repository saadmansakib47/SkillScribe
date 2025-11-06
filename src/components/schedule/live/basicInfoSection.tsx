"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function BasicInfoSection() {
  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Basic Information</h2>

      {/* Session Title */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Session Title <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="e.g. UI Designer Career Path"
          className="mt-1 border-black rounded-[8px]"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Describe what students will learn from this session"
          className="mt-1 border-black rounded-[8px] h-24"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>
        <Select>
          <SelectTrigger className="mt-1 rounded-[8px] border-black">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="frontend">Frontend Development</SelectItem>
            <SelectItem value="backend">Backend Development</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
