"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function VideoInfoSection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // 🔵 Same mock course data as BasicInfoSection (LIVE SESSION PAGE)
  const categoryCourses: Record<string, string[]> = {
    design: ["UI Design Foundations", "UX Research Basics", "Product Design Mastery"],
    frontend: ["React Essentials", "Next.js Zero to Hero", "Advanced JavaScript"],
    backend: ["Node.js Fundamentals", "Express Masterclass", "API Design Patterns"],
    marketing: ["Digital Marketing 101", "SEO Bootcamp", "Growth Hacking"],
  };

  const courseOptions = selectedCategory
    ? categoryCourses[selectedCategory]
    : [];

  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Video Information</h2>

      {/* Video Title */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Video Title <span className="text-red-500">*</span>
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
          placeholder="Describe what student will learn from this video session"
          className="mt-1 border-black rounded-[8px] h-24"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>

        <Select
          onValueChange={(value) => {
            setSelectedCategory(value);
            setSelectedCourse(""); // reset course on category change
          }}
        >
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

      {/* Course Dropdown (appears only when category selected) */}
      {selectedCategory && (
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Course <span className="text-red-500">*</span>
          </label>

          <Select onValueChange={setSelectedCourse}>
            <SelectTrigger
              className="w-full border border-black rounded-[8px] px-3 py-2 text-sm bg-white"
              disabled={!selectedCategory}
            >
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>

            <SelectContent>
              {courseOptions.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Tags */}
      <div>
        <label className="text-sm font-medium text-gray-700">Tags</label>
        <Input
          placeholder="e.g. design, frontend..."
          className="mt-1 border-black rounded-[8px]"
        />
      </div>
    </div>
  );
}
