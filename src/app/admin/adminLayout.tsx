"use client";

import FixedAdminSidebar from "@/components/ui/fixedadminsidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  return (
    <div className="flex">
      {/* fixed sidebar */}
      <FixedAdminSidebar />

      <main className={`flex-1 ml-64 ${className || "p-8 bg-[#FAF7F3] min-h-screen"}`}>
        {/* ml-64 = same width as sidebar */}
        {children}
      </main>
    </div>
  );
}
