import React from "react";
import { Instructor } from "@/lib/instructors";

export function UserHeader({ instructor }: { instructor: Instructor | undefined }) {
  if (!instructor) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <img
        src={instructor.image}
        alt={`${instructor.name}'s Avatar`}
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-800">{instructor.name}</h2>
        <p className="text-sm text-gray-500">ID: {instructor.id}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>{instructor.email}</p>
        <p className="text-gray-400 text-xs">Joined: {instructor.joinedDate}</p>
      </div>

      {/* Buttons on the right */}
      <div className="ml-auto flex gap-2">
        <button className="px-4 py-2 bg-white border border-black rounded-[8px] hover:bg-gray-50">
          Generate Report
        </button>
        <button className="px-4 py-2 bg-white border border-black rounded-[8px] hover:bg-gray-50">
          Make Payment
        </button>
      </div>
    </div>
  );
}
