"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ModalHeader from "@/components/schedule/createScheduleModal/modalHeader";
import ScheduleTypeSection from "@/components/schedule/createScheduleModal/scheduleTypeSection";
import UpcomingSchedules from "@/components/schedule/createScheduleModal/upcomingSchedules";

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateScheduleModal({ isOpen, onClose }: CreateScheduleModalProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.45)",
            transition: {
              opacity: { duration: 0.4, ease: "easeOut" },
              backdropFilter: { duration: 0.6, ease: "easeOut" },
              backgroundColor: { duration: 0.6, ease: "easeOut" },
            },
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0,0,0,0)",
            transition: {
              opacity: { duration: 0.3, ease: "easeIn" },
              backdropFilter: { duration: 0.5, ease: "easeIn" },
              backgroundColor: { duration: 0.5, ease: "easeIn" },
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 130, damping: 16 }}
            className="bg-white border-black rounded-2xl shadow-lg w-full max-w-2xl p-6 relative"
          >
            <ModalHeader onClose={onClose} title="Select Schedule Type" />

            {/* Schedule Type Section */}
            <ScheduleTypeSection router={router} />

            {/* Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="text-sm text-gray-500 px-3">Or view existing schedules</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            {/* Upcoming Schedules */}
            <UpcomingSchedules />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
