"use client";

import React from "react";

export function UserHeader() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <img
        src="/avatar.png"
        alt="User Avatar"
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-800">Karim Kabir</h2>
        <p className="text-sm text-gray-500">ID: 125-101</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>karimkabir@skillscribe.com</p>
        <p>+01725698799</p>
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
