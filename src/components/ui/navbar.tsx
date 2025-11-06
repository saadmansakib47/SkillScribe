"use client";

import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { Search, Menu, ChevronDown, ShoppingCart, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import InstructorSidebar from "@/components/ui/sidebar";
import { COURSES } from "@/lib/courses";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getCurrentLearner } from "@/lib/learners";

export default function Navbar() {
  const [enabled, setEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const currentLearner = getCurrentLearner();

  // Detect if we're on an instructor page
  const isInstructorPage = pathname.startsWith("/instructor");

  // Get unique categories from courses
  const categories = Array.from(new Set(COURSES.map(c => c.category).filter(Boolean))).sort();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1 hover:text-black"
              >
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              {categoriesOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/learner/allcourses?category=${encodeURIComponent(category as string)}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#90B2DE] hover:text-black transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 my-2"></div>
                    <Link
                      href="/learner/allcourses"
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-[#094CA4] hover:bg-[#90B2DE] hover:text-black transition-colors"
                    >
                      View All Courses
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Profile Icon */}
            <Link
              href={`/learner/profile/${currentLearner.id}`}
              className="relative p-2 rounded-md hover:bg-gray-200 transition"
              title="Profile"
            >
              <User className="h-5 w-5 text-gray-800" />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/learner/cart"
              className="relative p-2 rounded-md hover:bg-gray-200 transition"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-gray-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/learner/wishlist"
              className="relative p-2 rounded-md hover:bg-gray-200 transition"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-gray-800" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Login/Signup */}
            <div className="flex items-center gap-2 text-sm whitespace-nowrap">
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
              className={`relative flex h-5 w-10 items-center rounded-full transition-colors flex-shrink-0 ${
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
