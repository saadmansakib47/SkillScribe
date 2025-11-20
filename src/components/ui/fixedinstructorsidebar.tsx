"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Clipboard, Calendar, Star, MessageCircle, HelpCircle, User } from "lucide-react";

export default function FixedSidebar() {
  const pathname = usePathname();

  const links = [
    { icon: Home, label: "Dashboard", href: "/instructor/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/instructor/mycourses" },
    { icon: Clipboard, label: "Quizzes", href: "/instructor/quiz" },
    { icon: Calendar, label: "My Schedule", href: "/instructor/myschedule" },
    { icon: Star, label: "Review", href: "/instructor/review" },
    { icon: MessageCircle, label: "Messages", href: "/instructor/message" },
    { icon: HelpCircle, label: "Q&A", href: "/learner/community" },
    { icon: User, label: "My Account", href: "/instructor/profile/6" },
  ];

  return (
    <aside className="w-64 z-10 bg-white border-r flex flex-col p-4 fixed h-screen">
      <h1 className="text-2xl font-semibold mb-8">Ready to Teach?</h1>

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
