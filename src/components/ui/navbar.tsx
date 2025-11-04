"use client";

import { useState, KeyboardEvent } from "react";
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import InstructorSidebar from "@/components/ui/sidebar";

export default function Navbar() {
  const [enabled, setEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Detect if we're on an instructor page
  const isInstructorPage = pathname.startsWith("/instructor");

  const handleSidebarToggle = () => {
    if (isInstructorPage) {
      setSidebarOpen((prev) => !prev);
    } else {
      console.log("Non-instructor sidebar toggle logic will go here later.");
    }
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/learner/allcourses?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full border-b border-gray-300 bg-[#FAF7F3] text-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Hamburger menu */}
            <button
              onClick={handleSidebarToggle}
              className="p-2 rounded-md hover:bg-gray-200 transition md:hidden lg:flex"
            >
              <Menu className="h-6 w-6 text-gray-800" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 flex-shrink-0 hover:text-blue-700"
            >
              SkillScribe
            </Link>

            {/* Search */}
            <div className="hidden items-center rounded-full border border-gray-400 bg-white px-3 py-1.5 text-sm text-gray-700 md:flex">
              <Search className="mr-2 h-4 w-4 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                className="w-48 bg-transparent outline-none placeholder:text-gray-500 md:w-80 lg:w-96"
                placeholder="Search for courses"
              />
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-6 text-sm text-gray-900 md:flex">
            <Link href="#" className="hover:text-black">
              Categories
            </Link>
            <Link href="#" className="hover:text-black">
              Instruct
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* Login/Signup */}
            <div className="flex items-center gap-3 text-sm">
              <Link
                href="/auth/signin"
                className="text-gray-900 hover:text-blue-700"
              >
                Sign In
              </Link>
              <span>/</span>
              <Link
                href="/auth/signup"
                className="text-gray-900 hover:text-blue-700"
              >
                Sign Up
              </Link>
            </div>

            {/* Toggle Button */}
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

      {/* ✅ INSTRUCTOR SIDEBAR (Animated) */}
      {isInstructorPage && (
        <InstructorSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
