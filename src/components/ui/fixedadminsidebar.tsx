"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, DollarSign, UserX, Users, FileTextIcon, HelpCircle, BookOpen, FolderOpen, Flag, TrendingUp } from "lucide-react";

export default function FixedAdminSidebar() {
  const pathname = usePathname();

  const links = [
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
    <aside className="w-64 z-10 bg-[#EEF6FF] border-r flex flex-col p-4 fixed h-screen">
      <h1 className="text-2xl font-semibold mb-8 text-black">Admin Panel</h1>

      <nav className="space-y-4">
        {links.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${
              pathname === href
                ? "bg-white text-black font-medium"
                : "hover:bg-white/20 text-black"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
