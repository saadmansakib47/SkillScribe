"use client";

import React from "react";

interface RangeSelectorProps {
  selectedRange: "7d" | "14d" | "30d" | "90d";
  setSelectedRange: (range: "7d" | "14d" | "30d" | "90d") => void;
}

export default function RangeSelector({
  selectedRange,
  setSelectedRange,
}: RangeSelectorProps) {
  const ranges: { label: string; value: "7d" | "14d" | "30d" | "90d" }[] = [
    { label: "7 Days", value: "7d" },
    { label: "14 Days", value: "14d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
  ];

  return (
    <div className="flex items-center gap-2 mb-4">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => setSelectedRange(range.value)}
          className={`px-3 py-1.5 text-sm rounded-[8px] border transition-all duration-200 
            ${selectedRange === range.value
              ? "bg-[#094CA4] text-white border-[#094CA4]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#094CA4] hover:text-[#094CA4]"
            }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
