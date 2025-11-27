"use client";

import PolicyManagementPage from "@/app/admin/policy-management/page";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Users, Shield, UserX, FileTextIcon, DollarSign, BookOpen, FolderOpen, HelpCircle, Flag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const adminItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Shield, label: "Instructor Verification", href: "/admin/instructor-verification" },
    { icon: DollarSign, label : "Instructor Payment", href: "/admin/instructor-payment"},
    { icon: TrendingUp, label: "Financial Report", href: "/admin/financial-report" },
    { icon: UserX, label: "Suspend User", href: "/admin/suspend-user" },
    { icon: Users, label: "User Management", href: "/admin/user-management" },
    { icon: Flag, label: "User Report", href: "/admin/user-report" },
    { icon: BookOpen, label: "Course Management", href: "/admin/course-management" },
    { icon: FolderOpen, label: "Category Management", href: "/admin/category-management" },
    { icon: FileTextIcon, label: "Policy Management", href: "/admin/policy-management" },
    { icon: HelpCircle, label: "FAQ Management", href: "/admin/faq-management" },
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
              <h2 className="text-2xl font-semibold text-[#4C6FFF]">SkillScribe Admin</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {adminItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 transition-colors ${
                      isActive
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
