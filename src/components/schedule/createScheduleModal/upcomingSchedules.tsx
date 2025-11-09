"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { upcomingSchedules } from "@/lib/upcomingSchedule"; 

export default function UpcomingSchedules() {
  // 🔹 Prepare filtered & formatted upcoming items
  const upcoming = useMemo(() => {
    const now = new Date();

    // Filter only future schedules
    const futureSchedules = upcomingSchedules.filter(
      (s) => new Date(s.date) > now
    );

    // Sort by soonest date
    futureSchedules.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Format “Tomorrow” / “Fri, 8 Nov” and time range
    const formatLabel = (dateStr: string) => {
      const date = new Date(dateStr);
      const diffDays = Math.floor(
        (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays < 1 && date.getDate() === now.getDate()) return "Today";
      if (diffDays === 1) return "Tomorrow";

      return date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    };

    const formatTimeRange = (start: string, end: string) => {
      const startTime = new Date(start).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const endTime = new Date(end).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return `${startTime} - ${endTime}`;
    };

    return futureSchedules.slice(0, 3).map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type,
      time: `${formatLabel(s.date)}, ${formatTimeRange(s.date, s.endDate)}`,
    }));
  }, []);

  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-4">
        Upcoming Schedule
      </h3>

      {upcoming.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No upcoming schedules.</p>
      ) : (
        <div className="space-y-3">
          {upcoming.map((schedule, idx) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center bg-[#FAF7F3] border border-black rounded-xl px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800">
                    {schedule.title}
                  </h4>
                  <span className="text-blue-600 text-sm font-bold">
                    {schedule.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{schedule.time}</p>
              </div>

              <div className="flex gap-2">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="border border-black text-black rounded-[8px] bg-white hover:bg-gray-100 text-sm px-3 py-1"
                  >
                    View
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button className="bg-blue-600 text-white rounded-[8px] border border-blue-600 hover:bg-blue-700 text-sm px-3 py-1">
                    Edit
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
