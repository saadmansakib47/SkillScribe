"use client";

import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { Search, Menu, ChevronDown, ShoppingCart, Heart, User, BookOpen, Settings, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import InstructorSidebar from "@/components/ui/collapsibleinstructorsidebar";
import AdminSidebar from "./collapsibleadminsidebar";
import { COURSES } from "@/lib/courses";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getCurrentLearner } from "@/lib/learners";
import { Bell } from "lucide-react";
import AuthRequiredModal from "@/components/auth/authRequiredModal";

export default function Navbar() {
  const [instructorSidebarOpen, setInstructorSidebarOpen] = useState(false);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const currentLearner = getCurrentLearner();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const checkAuth = () => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  };

  // Detect if we're on an instructor page
  const isInstructorPage = pathname.startsWith("/instructor");

  // Detect if we're on an admin page
  const isAdminPage = pathname.startsWith("/admin");

  // Get unique categories from courses
  const categories = Array.from(new Set(COURSES.map(c => c.category).filter(Boolean))).sort();

  // Prevent hydration mismatch
  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  // check auth state on pathname change
  useEffect(() => {
    checkAuth();
  }, [pathname]);


  // hydrate user state to prevent flash of unauthenticated state (ensures smooth SSR)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Close notification dropdown when pathname changes
  useEffect(() => {
    setNotificationOpen(false);
  }, [pathname]);



  // check if we are on landing page, whether to hide sign in/sign up 
  const isLanding = pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleSidebarToggle = () => {
    if (isInstructorPage) {
      setInstructorSidebarOpen((prev) => !prev);
    } else if (isAdminPage) {
      setAdminSidebarOpen((prev) => !prev);
    } else {
      // For learner pages, toggle mobile menu
      setMobileMenuOpen((prev) => !prev);
    }
  };

  //heads user back to homepage
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    router.push("/"); // Redirect to homepage
  };

  //prevent navigation to instruct and communities if not logged in
  const handleProtectedNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      setShowAuthModal(true); // Show the modal
    }
    // If logged in, the Link will work normally
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
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 flex-shrink-0 hover:text-blue-700"
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
          <nav className="hidden items-center gap-4 text-sm text-gray-900 md:flex">
            {!isInstructorPage && !isAdminPage && (
              <>
                {/* Categories Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all font-medium"
                  >
                    Categories
                    <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {categoriesOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">
                          Browse Categories
                        </p>
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={`/learner/allcourses?category=${encodeURIComponent(category as string)}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-all font-medium"
                          >
                            {category}
                          </Link>
                        ))}
                        <div className="border-t border-gray-200 my-3"></div>
                        <Link
                          href="/learner/allcourses"
                          onClick={() => setCategoriesOpen(false)}
                          className="block px-4 py-2.5 text-sm font-semibold text-[#094CA4] hover:bg-blue-50 rounded-lg transition-all"
                        >
                          View All Courses →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/presignup/Question1"
                  onClick={handleProtectedNavigation}
                  className="group hover:text-black px-4 py-3 font-medium transition-colors"
                >
                  <span className="relative">
                    Instruct
                    <span className={`absolute left-0 bottom-[-28px] h-[3px] bg-[#094CA4] transition-all duration-500 rounded-t-sm ${pathname.startsWith('/presignup') ? 'w-full' : 'w-0'}`} />
                  </span>
                </Link>

                <Link
                  href="/learner/community"
                  onClick={handleProtectedNavigation}
                  className="group hover:text-black px-4 py-3 font-medium transition-colors"
                >
                  <span className="relative">
                    Community
                    <span className={`absolute left-0 bottom-[-28px] h-[3px] bg-[#094CA4] transition-all duration-500 rounded-t-sm ${pathname === '/learner/community' ? 'w-full' : 'w-0'}`} />
                  </span>
                </Link>
              </>
            )}

            {!isInstructorPage && !isAdminPage && (
              <>
                <Link href="/about" className="group hover:text-black px-4 py-3 font-medium transition-colors">
                  <span className="relative">
                    About
                    <span className={`absolute left-0 bottom-[-28px] h-[3px] bg-[#094CA4] transition-all duration-500 rounded-t-sm ${pathname === '/about' ? 'w-full' : 'w-0'}`} />
                  </span>
                </Link>

                <Link href="/contact" className="group hover:text-black px-4 py-3 font-medium transition-colors">
                  <span className="relative">
                    Contact
                    <span className={`absolute left-0 bottom-[-28px] h-[3px] bg-[#094CA4] transition-all duration-500 rounded-t-sm ${pathname === '/contact' ? 'w-full' : 'w-0'}`} />
                  </span>
                </Link>
              </>
            )}
          </nav>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Message Icon - Shows for instructors */}
            {isLoggedIn && isInstructorPage && (
              <Link
                href="/instructor/message"
                className={`hidden md:block p-2 rounded-full transition ${pathname === '/instructor/message'
                  ? 'bg-blue-100 text-[#094CA4]'
                  : 'text-gray-800 hover:bg-gray-200'
                  }`}
                title="Messages"
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}

            {/* Notification Bell - Shows for instructors */}
            {isLoggedIn && (isInstructorPage || isAdminPage) && (
              <div className="hidden md:block relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 rounded-full hover:bg-gray-200 transition text-gray-800"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                    <div className="px-4 py-3 text-sm text-gray-600">
                      You have no new notifications!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Avatar Dropdown - Hidden on mobile */}
            {isLoggedIn && (
              <div className="hidden md:block relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-200 transition"
                  title="Account"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#094CA4] to-[#0d6fd9] flex items-center justify-center border-2 border-gray-300">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 truncate">{currentLearner.name}</p>
                      <p className="text-sm text-gray-600 truncate">{currentLearner.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href={`/learner/my-learning/${currentLearner.id}`}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] transition-colors"
                      >
                        <BookOpen className="h-4 w-4" />
                        My Learning
                      </Link>
                      <Link
                        href={`/learner/profile/${currentLearner.id}`}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href={`/learner/settings/${currentLearner.id}`}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isLoggedIn && !isInstructorPage && !isAdminPage && (
              <>
                {/* Cart Icon */}
                <Link
                  href="/learner/cart"
                  className={`relative p-2 rounded-md transition ${pathname === '/learner/cart' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  title="Shopping Cart"
                >
                  <ShoppingCart className={`h-5 w-5 ${pathname === '/learner/cart' ? 'text-[#094CA4]' : 'text-gray-800'}`} />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Wishlist Icon */}
                <Link
                  href="/learner/wishlist"
                  className={`relative p-2 rounded-md transition hidden sm:block ${pathname === '/learner/wishlist' ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  title="Wishlist"
                >
                  <Heart className={`h-5 w-5 ${pathname === '/learner/wishlist' ? 'text-[#094CA4]' : 'text-gray-800'}`} />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Login/Signup - Hidden on mobile */}
            {!isLoggedIn && !isInstructorPage && !isAdminPage && (

              <div className="hidden md:flex items-center gap-2 text-sm whitespace-nowrap">
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
            )}

          </div>
        </div>

        {/* MOBILE SEARCH BAR - Shows below main navbar on mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center rounded-full border border-gray-400 bg-white px-3 py-2 text-sm text-gray-700">
            <Search className="mr-2 h-4 w-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              className="w-full bg-transparent outline-none placeholder:text-gray-500"
              placeholder="Search for courses"
            />
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#094CA4] to-[#0d6fd9] flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{currentLearner.name}</p>
                  <p className="text-sm text-gray-600">{currentLearner.email}</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <Link
                  href={`/learner/my-learning/${currentLearner.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  My Learning
                </Link>
                <Link
                  href={`/learner/profile/${currentLearner.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  My Profile
                </Link>
                <Link
                  href={`/learner/settings/${currentLearner.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/learner/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart {mounted && cartCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
                </Link>
                <Link
                  href="/learner/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist {mounted && wishlistCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{wishlistCount}</span>}
                </Link>
                <Link
                  href="/learner/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/learner/community' ? 'bg-blue-100 text-[#094CA4]' : 'text-gray-700 hover:bg-blue-50 hover:text-[#094CA4]'}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Community
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/about' ? 'bg-blue-100 text-[#094CA4]' : 'text-gray-700 hover:bg-blue-50 hover:text-[#094CA4]'}`}
                >
                  About
                </Link>
                {isInstructorPage ? (
                  <div className="relative">
                    <button
                      onClick={() => setNotificationOpen(!notificationOpen)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] transition-colors"
                      title="Notifications"
                    >
                      <Bell className="h-5 w-5" />
                    </button>

                    {notificationOpen && (
                      <div className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg z-50">
                        <div className="px-4 py-3 text-sm text-gray-600">
                          You have no new notifications!
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/contact'
                      ? 'bg-blue-100 text-[#094CA4]'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-[#094CA4]'
                      }`}
                  >
                    Contact
                  </Link>
                )}

              </nav>

              {/* Categories Section */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                  Categories
                </p>
                <div className="space-y-1">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category}
                      href={`/learner/allcourses?category=${encodeURIComponent(category as string)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#094CA4] rounded-lg transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                    href="/learner/allcourses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-[#094CA4] font-medium hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    View All Courses →
                  </Link>
                </div>
              </div>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t">
                <Link
                  href="/learner/switch-user"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INSTRUCTOR SIDEBAR (Animated) */}
      {isInstructorPage && (
        <InstructorSidebar
          isOpen={instructorSidebarOpen}
          onClose={() => setInstructorSidebarOpen(false)}
        />
      )}

      {/* ADMIN SIDEBAR (Animated) */}
      {isAdminPage && (
        <AdminSidebar
          isOpen={adminSidebarOpen}
          onClose={() => setAdminSidebarOpen(false)}
        />
      )}

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

    </>
  );
}
