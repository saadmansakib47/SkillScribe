"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [enabled, setEnabled] = useState(true);

  return (
    <header className="w-full border-b border-gray-300 bg-[#FAF7F3] text-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900 flex-shrink-0">
            Skillscribe
          </div>

          {/* Search */}
          <div className="hidden items-center rounded-full border border-gray-400 bg-white px-3 py-1.5 text-sm text-gray-700 md:flex">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              className="w-48 bg-transparent outline-none placeholder:text-gray-500 md:w-80 lg:w-96"
              placeholder="Search for courses"
            />
          </div>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-6 text-sm text-gray-900 md:flex">
          <a className="hover:text-black" href="#">Categories</a>
          <a className="hover:text-black" href="#">Instruct</a>
          <a className="hover:text-black" href="#">About</a>
          <a className="hover:text-black" href="#">Contact</a>
        </nav>

        {/* Login */}
        <div className="flex items-center gap-4">
          <a
            href="/auth/signin"
            className="text-sm text-gray-900 hover:text-black"
          >
            Login/Signup
          </a>

          {/* Toggle */}
          <button
            onClick={() => setEnabled((v) => !v)}
            className={`relative flex h-5 w-10 items-center rounded-full transition-colors ${
              enabled ? "bg-[#1d4ed8]" : "bg-gray-400"
            }`}
          >
            <span
              className={`inline-block h-[14px] w-[14px] transform rounded-full bg-white transition-transform ${
                enabled ? "translate-x-[22px]" : "translate-x-[4px]"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
