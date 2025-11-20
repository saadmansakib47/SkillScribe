"use client";

import FixedAdminSidebar from "@/components/ui/fixedadminsidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex">
      {/* fixed sidebar */}
      <FixedAdminSidebar />

      <main className="flex-1 ml-64 p-8">
        {/* ml-64 = same width as sidebar */}
        {children}
      </main>
    </div>
  );
}
