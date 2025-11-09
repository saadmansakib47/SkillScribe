"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const upcomingSchedules = [
  { title: "UI Designer Career Path", type: "Live", time: "Tomorrow, 10:30 AM - 12:00 PM" },
  { title: "Frontend Development Basics", type: "Video", time: "Fri, 8 Nov, 5:00 PM" },
  { title: "Backend Integration Workshop", type: "Live", time: "Sat, 9 Nov, 3:00 PM - 4:30 PM" },
];

export default function UpcomingSchedules() {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-4">Upcoming Schedule</h3>
      <div className="space-y-3">
        {upcomingSchedules.map((schedule, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex justify-between items-center bg-[#FAF7F3] border border-black rounded-xl px-4 py-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800">{schedule.title}</h4>
                <span className="text-blue-600 text-sm font-bold">{schedule.type}</span>
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
    </div>
  );
}
