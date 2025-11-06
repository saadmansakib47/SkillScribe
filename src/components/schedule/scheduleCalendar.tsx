"use client";

import { useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleCalendar({
  selected,
  onDateChange,
}: {
  selected: Date;
  onDateChange: (date: Date) => void;
}) {
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [monthFadeKey, setMonthFadeKey] = useState(
    `${selected.getMonth()}-${selected.getFullYear()}`
  );

  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(300);

  // ------------------- Core Shifting -------------------
  const shiftDay = (offset: number) => {
    setDirection(offset > 0 ? "next" : "prev");
    const newDate = new Date(selected);
    newDate.setDate(selected.getDate() + offset);

    onDateChange(newDate);

    const newKey = `${newDate.getMonth()}-${newDate.getFullYear()}`;
    if (newKey !== monthFadeKey) setMonthFadeKey(newKey);
  };

  // ------------------- Hold Acceleration -------------------
  const startHold = (offset: number) => {
    speedRef.current = 300;
    holdTimeout.current = setTimeout(() => {
      const accelerate = () => {
        shiftDay(offset);
        speedRef.current = Math.max(speedRef.current * 0.85, 60);
        scrollInterval.current = setTimeout(accelerate, speedRef.current);
      };
      accelerate();
    }, 300);
  };

  const stopHold = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (scrollInterval.current) clearTimeout(scrollInterval.current);
    holdTimeout.current = null;
    scrollInterval.current = null;
    speedRef.current = 300;
  };

  // ------------------- Derived Data -------------------
  const daysRow = useMemo(() => {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const day = selected.getDate();
    const arr: Date[] = [];
    for (let offset = -3; offset <= 3; offset++) {
      arr.push(new Date(year, month, day + offset));
    }
    return arr;
  }, [selected]);

  const headerTitle = `${selected.getDate()} ${selected.toLocaleString("default", {
    month: "long",
  })}, ${selected.getFullYear()}`;

  function fadeClass(index: number, length: number) {
    const center = (length - 1) / 2;
    const dist = Math.abs(index - center);
    if (dist < 0.5) return "opacity-100";
    if (dist < 1.5) return "opacity-90 text-gray-800";
    if (dist < 2.5) return "opacity-70 text-gray-600";
    return "opacity-50 text-gray-500";
  }

  const months = useMemo(() => {
    const arr = [];
    const centerMonthIndex = selected.getMonth();
    const year = selected.getFullYear();
    for (let offset = -2; offset <= 2; offset++) {
      arr.push(new Date(year, centerMonthIndex + offset, 1));
    }
    return arr;
  }, [selected]);

  // ------------------- Animations -------------------
  const variants = {
    enter: (dir: string) => ({
      x: dir === "next" ? 40 : -40,
      opacity: 0,
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
    },
    exit: (dir: string) => ({
      x: dir === "next" ? -40 : 40,
      opacity: 0,
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
    }),
  };

  // ------------------- UI -------------------
  return (
    <div
      className="absolute left-6 top-6 z-20 w-[calc(100%-12rem)] max-w-[820px] bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100"
      style={{ pointerEvents: "auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => shiftDay(-1)}
          onMouseDown={() => startHold(-1)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-sm text-gray-700 font-medium text-center">
          {headerTitle}
        </div>

        <button
          onClick={() => shiftDay(1)}
          onMouseDown={() => startHold(1)}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Subtle Month Fade */}
      <div className="relative mb-3 h-[24px] px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={monthFadeKey}
            variants={variants}
            custom={direction}
            initial={false}
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-between absolute inset-0"
          >
            {months.map((m, idx) => (
              <div
                key={idx}
                className={`text-sm font-medium text-center ${fadeClass(idx, months.length)}`}
                style={{ width: "18%" }}
              >
                {m.toLocaleString("default", { month: "long" })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Dates Row */}
      <div className="relative px-2 h-[80px] overflow-hidden">
        <AnimatePresence custom={direction}>
          <motion.div
            key={selected.toISOString()}
            variants={variants}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-between absolute inset-0"
          >
            {daysRow.map((date, idx) => {
              const isSelected =
                date.getDate() === selected.getDate() &&
                date.getMonth() === selected.getMonth() &&
                date.getFullYear() === selected.getFullYear();

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                  style={{ width: `${100 / daysRow.length}%` }}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-[12px] text-sm transition ${isSelected
                      ? "bg-black text-white font-semibold"
                      : `bg-gray-200 text-gray-800 hover:bg-gray-300 ${fadeClass(idx, daysRow.length)}`
                      }`}
                  >
                    {date.getDate()}
                  </div>

                  <div className={`mt-2 text-xs ${fadeClass(idx, daysRow.length)}`}>
                    {date.toLocaleString("default", { weekday: "short" })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
