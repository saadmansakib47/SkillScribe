"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import ScheduleSidebar from "@/components/schedule/scheduleSidebar";
import { Button } from "@/components/ui/button";
import VideoUploadSection from "@/components/schedule/video/videoUploadSection";
import VideoInfoSection from "@/components/schedule/video/videoInfoSection";
import VideoScheduleSection from "@/components/schedule/video/videoScheduleSection";
import VideoSettingsSection from "@/components/schedule/video/videoSettingsSection";
import VideoPrivacySection from "@/components/schedule/video/videoPrivacySection";

export default function ScheduleRecordedVideoPage() {
  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <main className="flex-1 p-8 flex gap-6">
          {/* Left content */}
          <div className="max-w-[1000px] mx-auto py-10 px-6 w-full">
            <VideoUploadSection />
            <VideoInfoSection />
            <VideoScheduleSection />
            <VideoSettingsSection />
            <VideoPrivacySection />

            {/* Create Button */}
            <div className="flex justify-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[8px] px-8 py-5 text-md font-semibold">
                Schedule Recorded Video
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
