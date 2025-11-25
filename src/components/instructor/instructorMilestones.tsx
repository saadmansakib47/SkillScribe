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

// Month–Year labels (same index as milestones)
const dates = [
    "Jan 2021",
    "Apr 2021",
    "Oct 2021",
    "Mar 2022",
    "Nov 2022",
    "Jul 2025", // example you mentioned
];

export default function InstructorMilestones() {

    const sectionSpacing = 180;
    const svgWidth = milestones.length * sectionSpacing + 100;

    const points = milestones.map((_, i) => ({
        x: 50 + i * sectionSpacing,
        y: i % 2 === 0 ? 40 : 80,
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
                        <div
                            key={i}
                            className="absolute"
                            style={{ top: p.y - 10, left: p.x - 8 }}
                        >

                            {/* Month-Year Above Dot */}
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2 -top-9 text-xs text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: delay - 0.2, duration: 0.8 }}
                            >
                                {dates[i]}
                            </motion.div>

                            {/* Dot */}
                            <motion.div
                                className="w-4 h-4 bg-[#094CA4] rounded-full shadow-md"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay, type: "spring", stiffness: 200 }}
                            />

                            {/* Milestone Label — now slower fade-in */}
                            <motion.div
                                className="
                                    absolute 
                                    left-1/2 
                                    -translate-x-1/2 
                                    text-sm 
                                    text-gray-700 
                                    mt-4 
                                    px-2 
                                    py-1
                                    w-24
                                    text-center
                                    leading-snug
                                    break-words
                                "
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: delay + 0.3, duration: 1.0 }} 
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
