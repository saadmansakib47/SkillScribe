"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shield, UserX, Users, FileTextIcon, HelpCircle, BookOpen } from "lucide-react";

export default function FixedAdminSidebar() {
  const pathname = usePathname();

  const links = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Shield, label: "Instructor Verification", href: "/admin/instructor-verification" },
    { icon: UserX, label: "Suspend User", href: "/admin/suspend-user" },
    { icon: Users, label: "User Management", href: "/admin/user-management" },
    { icon: BookOpen, label: "Course Management", href: "/admin/course-management" },
    { icon: FileTextIcon, label: "Policy Management", href: "/admin/policy-management" },
    { icon: HelpCircle, label: "FAQ Management", href: "/admin/faq-management" },
  ];

  return (
    <aside className="w-64 z-10 bg-white border-r flex flex-col p-4 fixed h-screen">
      <h1 className="text-2xl font-semibold mb-8">Admin Panel</h1>

      <nav className="space-y-4">
        {links.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${
              pathname === href
                ? "bg-[#F0F4FF] text-[#4C6FFF] font-medium"
                : "hover:bg-gray-100 text-gray-700"
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
