"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Clipboard, Calendar, Star, HelpCircle, User } from "lucide-react";

export default function FixedSidebar() {
  const pathname = usePathname();

  const links = [
    { icon: Home, label: "Dashboard", href: "/instructor/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/instructor/mycourses" },
    { icon: Clipboard, label: "Quizzes", href: "/instructor/quiz" },
    { icon: Calendar, label: "My Schedule", href: "/instructor/myschedule" },
    { icon: Star, label: "Review", href: "/instructor/review" },
    { icon: HelpCircle, label: "Q&A", href: "/learner/community" },
    { icon: User, label: "My Account", href: "/instructor/profile/6" },
  ];

  return (
    <aside className="w-64 z-[5] bg-[#EEF6FF] border-r flex flex-col p-4 pb-10 fixed h-screen overflow-y-auto scrollbar-hide">
      <h1 className="text-2xl font-semibold mb-8 text-black">Ready to Teach?</h1>

      <nav className="space-y-4">
        {links.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all ${pathname === href
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
