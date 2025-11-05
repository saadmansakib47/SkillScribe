"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ScheduleCalendar from "@/components/schedule/scheduleCalendar";
import ScheduleTimeline from "@/components/schedule/scheduleTimeline";
import ScheduleSidebar from "@/components/schedule/scheduleSidebar";
export default function MySchedulePage() {
  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <main className="flex-1 p-8 flex gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">My Schedule</h2>
            <p className="text-gray-500 mb-6">
              Track, manage and see the latest updates here
            </p>

            <ScheduleCalendar />
            <ScheduleTimeline />
          </div>

          {/* Right Sidebar */}
          <ScheduleSidebar />
        </main>
      </div>
    </InstructorLayout>
  );
}
