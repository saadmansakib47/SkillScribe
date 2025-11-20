"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, BookOpen, Calendar, Clipboard, Star, MessageCircle, HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstructorSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isInstructorRoute = pathname.startsWith("/instructor");

  const instructorItems = [
    { icon: Home, label: "Dashboard", href: "/instructor/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/instructor/mycourses" },
    { icon: Clipboard, label: "Quizzes", href: "/instructor/quiz" },
    { icon: Calendar, label: "My Schedule", href: "/instructor/myschedule" },
    { icon: Star, label: "Review", href: "/instructor/review" },
    { icon: MessageCircle, label: "Messages", href: "/instructor/messages" },
    { icon: HelpCircle, label: "Q&A", href: "/learner/community" },
    { icon: User, label: "My Account", href: "/instructor/profile/6" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col p-6"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-[#4C6FFF]">SkillScribe</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            {isInstructorRoute ? (
              <nav className="space-y-1">
                {instructorItems.map(({ label, href, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 transition-colors ${isActive
                          ? "bg-[#F0F4FF] text-[#4C6FFF] font-medium"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-[#4C6FFF]" : "text-gray-600"}`} />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
            ) : (
              <div className="text-gray-400 text-sm italic mt-4">
                No menu for this route yet.
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
