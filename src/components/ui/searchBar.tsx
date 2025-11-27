"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;        // optional for extra styling
};

export function SearchBar({
  label = "Search",
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}: SearchBarProps) {
  return (
    <div className={`flex flex-col flex-1 min-w-[220px] ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8 rounded-[8px] h-9"
        />
      </div>
    </div>
  );
}
