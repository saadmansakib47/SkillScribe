"use client";
import { Video, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScheduleTypeCard from "./scheduleTypeCard";

export default function ScheduleTypeSection({ router }: { router: any }) {
  const scheduleTypes = [
    {
      title: "Live Session",
      color: "bg-[#E6F2FF]",
      icon: <Video className="w-5 h-5" />,
      description:
        "Host a real-time learning experience with your students. Interact, discuss, and share screens live.",
      features: ["Set a start & end time", "Allow students to join live", "Record session automatically"],
      buttonText: "Create Live Session",
      onClick: () => router.push("/instructor/myschedule/createLiveSession"),
    },
    {
      title: "Schedule Recorded Video",
      color: "bg-purple-300",
      icon: <PlayCircle className="w-5 h-5" />,
      description:
        "Publish a pre-recorded session for learners to watch anytime. Ideal for flexible courses.",
      features: ["Upload or link your video", "Choose release date & duration", "Auto-notify enrolled students"],
      buttonText: "Schedule Video Upload",
      onClick: () => router.push("/instructor/myschedule/scheduleRecordedVideo"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {scheduleTypes.map((type, idx) => (
        <ScheduleTypeCard key={idx} {...type} />
      ))}
    </div>
  );
}
