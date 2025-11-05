"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Video, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateScheduleModal({
  isOpen,
  onClose,
}: CreateScheduleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Select Schedule Type
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Schedule Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Live Session Card */}
              <div className="bg-blue-500 text-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Live Session</h3>
                  </div>
                  <p className="text-sm opacity-90 mb-2">
                    Host a real-time learning experience with your students.
                    Interact, discuss, and share screens live.
                  </p>
                  <ul className="text-sm space-y-1 opacity-90 list-disc list-inside">
                    <li>Set a start & end time</li>
                    <li>Allow students to join live</li>
                    <li>Record session automatically</li>
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 border border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Create Live Session
                </Button>
              </div>

              {/* Recorded Video Card */}
              <div className="bg-purple-500 text-white rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <PlayCircle className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">
                      Schedule Recorded Video
                    </h3>
                  </div>
                  <p className="text-sm opacity-90 mb-2">
                    Publish a pre-recorded session for learners to watch
                    anytime. Ideal for flexible courses.
                  </p>
                  <ul className="text-sm space-y-1 opacity-90 list-disc list-inside">
                    <li>Upload or link your video</li>
                    <li>Choose release date & duration</li>
                    <li>Auto-notify enrolled students</li>
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 border border-white text-white hover:bg-white hover:text-purple-600"
                >
                  Schedule Live Video
                </Button>
              </div>
            </div>

            {/* Divider with text */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-sm text-gray-500 px-3">
                Or view existing schedules
              </span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            {/* Upcoming Schedules */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Upcoming Schedule
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "UI Designer Career Path",
                    type: "Live",
                    time: "Tomorrow, 10:30 AM - 12:00 PM",
                  },
                  {
                    title: "Frontend Development Basics",
                    type: "Video",
                    time: "Fri, 8 Nov, 5:00 PM",
                  },
                  {
                    title: "Backend Integration Workshop",
                    type: "Live",
                    time: "Sat, 9 Nov, 3:00 PM - 4:30 PM",
                  },
                ].map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border border-black rounded-xl px-4 py-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">
                          {schedule.title}
                        </h4>
                        <span className="text-blue-600 text-sm font-medium">
                          ({schedule.type})
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {schedule.time}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border border-black text-black bg-white hover:bg-gray-100 text-sm px-3 py-1"
                      >
                        View
                      </Button>
                      <Button
                        className="bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 text-sm px-3 py-1"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
