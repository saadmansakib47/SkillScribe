"use client";

import { motion } from "framer-motion";
import React from "react";

type Course = {
  title: string;
  lessons: string;
  progress: number;
};

export default function CoursesInProgress() {
  const courses: Course[] = [
    {
      title: "What is International Business?",
      lessons: "11 lessons, 2hr 30min",
      progress: 80,
    },
    {
      title: "Microsoft Excel: Learn MS Excel 2019",
      lessons: "7 lessons, 1hr 10min",
      progress: 20,
    },
    {
      title: "Make Website with WordPress",
      lessons: "13 lessons, 2hr 13min",
      progress: 50,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="col-span-2 bg-white p-6 rounded-2xl border"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Courses In Progress ({courses.length})
        </h2>
        <button className="text-gray-500 text-sm hover:text-[#4C6FFF] transition-colors">
          View All
        </button>
      </div>

      <ul className="space-y-3">
        {courses.map((course, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
            className="p-3 rounded-xl border hover:shadow-sm transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-1">
              <a
                href="#"
                className="text-[#1d4ed8] font-medium hover:underline"
              >
                {course.title}
              </a>

              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-2 bg-[#4C6FFF] rounded-full"
                  ></motion.div>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {course.progress}%
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#EEF2FF] p-2 rounded-full hover:bg-[#DDE4FF]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#4C6FFF]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </motion.button>
              </div>
            </div>
            <p className="text-sm text-gray-500">{course.lessons}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
