'use client';

import { motion } from 'framer-motion';

const milestones = [
  { label: "Joined LMS", delay: 0.1 },
  { label: "Published First Course", delay: 0.2 },
  { label: "Hit 500 Students", delay: 0.3 },
  { label: "Achieved 4.8 Rating", delay: 0.4 },
];

export default function InstructorMilestones() {
  return (
    <div className="relative w-full">
      {/* Connecting Line */}
      <div className="absolute top-4 left-0 right-0 h-[3px] bg-blue-200"></div>

      <div className="flex justify-between relative">
        {milestones.map((m, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: m.delay, duration: 0.4 }}
          >
            {/* Label */}
            <span className="text-sm text-gray-700 mb-2 text-center w-24">
              {m.label}
            </span>

            {/* Dot */}
            <motion.div
              className="w-4 h-4 bg-[#094CA4] rounded-full shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: m.delay + 0.1, type: "spring", stiffness: 200 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
