"use client";

import FixedSidebar from "@/components/ui/fixedinstructorsidebar";

interface InstructorLayoutProps 
{
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) 
{
  return (
    <div className="flex">
      <FixedSidebar /> {/* fixed sidebar */}

      <main className="flex-1 ml-64 p-8">
        {/* ml-64 = same width as sidebar */}
        {children}
      </main>
    </div>
  );
}
