"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ScheduleSidebar from "@/components/schedule/scheduleSidebar";
import { Button } from "@/components/ui/button";
import BasicInfoSection from "@/components/schedule/live/basicInfoSection";
import ScheduleSection from "@/components/schedule/live/scheduleSection";
import SessionSettingsSection from "@/components/schedule/live/sessionSettingsSection";

export default function CreateLiveSessionPage() {
  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <main className="flex-1 p-8 flex gap-6">
          {/* Left content */}
          <div className="max-w-[800px] mx-auto py-10 px-6 w-full">
            <BasicInfoSection />
            <ScheduleSection />
            <SessionSettingsSection />

            {/* Create Button */}
            <div className="flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[8px] px-8 py-5 text-md font-semibold">
                Create Live Session
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <ScheduleSidebar />
        </main>
      </div>
    </InstructorLayout>
  );
}
