'use client';

import { motion } from 'framer-motion';

const milestones = [
  { label: "Joined LMS" },
  { label: "Published First Course" },
  { label: "Hit 500 Students" },
  { label: "Achieved 4.8 Rating" },
  { label: "Became Top Rated Instructor" },
  { label: "Reached 10,000 Students" },
];

export default function InstructorMilestones() {
  
  // timeline width grows automatically with number of milestones
  const sectionSpacing = 180; // distance between points
  const svgWidth = milestones.length * sectionSpacing + 100;

  // Generate zig-zag points dynamically
  const points = milestones.map((_, i) => ({
    x: 50 + i * sectionSpacing,
    y: i % 2 === 0 ? 40 : 80, // zigzag pattern
  }));

  const pathString = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full">
      <div className="relative mx-auto" style={{ width: svgWidth }}>
        
        {/* Animated Line */}
        <motion.svg width={svgWidth} height={150}>
          <motion.polyline
            points={pathString}
            fill="none"
            stroke="#0A50B3"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Dots + Labels */}
        {points.map((p, i) => {
          const delay = (i + 1) * 0.45;

          return (
            <div key={i} className="absolute" style={{ top: p.y - 10, left: p.x - 8 }}>
              
              {/* Dot */}
              <motion.div
                className="w-4 h-4 bg-[#094CA4] rounded-full shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay, type: "spring", stiffness: 200 }}
              />

              {/* Label */}
              <motion.div
                className="
                  absolute 
                  left-1/2 
                  -translate-x-1/2 
                  text-sm 
                  text-gray-700 
                  mt-3 
                  whitespace-nowrap 
                  px-2
                "
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.2 }}
              >
                {milestones[i].label}
              </motion.div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
