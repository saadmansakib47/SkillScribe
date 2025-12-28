"use client";

import FixedSidebar from "@/components/ui/fixedinstructorsidebar";

interface InstructorLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional custom class for main tag
}

export default function InstructorLayout({ children, className }: InstructorLayoutProps) {
  return (
    <div className="flex">
      <FixedSidebar /> {/* fixed sidebar */}

      <main className={`flex-1 ml-64 ${className || "p-8"}`}>
        {/* ml-64 = same width as sidebar */}
        {children}
      </main>
    </div>
  );
}
