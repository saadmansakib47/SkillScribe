"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScheduleCalendar({
  baseDate: baseDateProp = new Date(),
  selected: selectedProp = new Date(),
}: {
  baseDate?: Date;
  selected?: Date;
}) {
  const [baseDate, setBaseDate] = useState(baseDateProp);
  const [selected, setSelected] = useState(selectedProp);

  // Build a 5-month window centered on baseDate's month
  const months = useMemo(() => {
    const centerMonthIndex = baseDate.getMonth();
    const year = baseDate.getFullYear();
    const arr = [];
    for (let offset = -2; offset <= 2; offset++) {
      const dt = new Date(year, centerMonthIndex + offset, 1);
      arr.push(dt);
    }
    return arr;
  }, [baseDate]);

  // Days row: 7 days centered around selected
  const daysRow = useMemo(() => {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const day = selected.getDate();
    const half = 3;
    const start = Math.max(1, day - half);
    const end = Math.min(totalDays, day + half);
    const arr: number[] = [];
    for (let d = start; d <= end; d++) arr.push(d);
    while (arr.length < 7) {
      const prepend = arr[0] - 1;
      if (prepend >= 1) arr.unshift(prepend);
      else {
        const append = arr[arr.length - 1] + 1;
        if (append <= totalDays) arr.push(append);
        else break;
      }
    }
    return arr;
  }, [selected]);

  // Day names row
  const dayNames = useMemo(() => {
    return daysRow.map((d) => {
      const dt = new Date(selected.getFullYear(), selected.getMonth(), d);
      return dt.toLocaleString("default", { weekday: "short" });
    });
  }, [daysRow, selected]);

  // Fade class for opacity gradient
  function fadeClass(index: number, length: number) {
    const center = (length - 1) / 2;
    const dist = Math.abs(index - center);
    if (dist < 0.5) return "opacity-100";
    if (dist < 1.5) return "opacity-90 text-gray-800";
    if (dist < 2.5) return "opacity-70 text-gray-600";
    return "opacity-50 text-gray-500";
  }

  const headerTitle = `${selected.getDate()} ${selected.toLocaleString("default", {
    month: "long",
  })}, ${selected.getFullYear()}`;

  // Slide functions
  const handlePrev = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setBaseDate(newDate);
    setSelected(new Date(selected.getFullYear(), selected.getMonth() - 1, selected.getDate()));
  };

  const handleNext = () => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setBaseDate(newDate);
    setSelected(new Date(selected.getFullYear(), selected.getMonth() + 1, selected.getDate()));
  };

  // Detect if months cross a year boundary
  const uniqueYears = Array.from(new Set(months.map((m) => m.getFullYear())));

  return (
    <div
      className="absolute left-6 top-6 z-20 w-[calc(100%-12rem)] max-w-[820px] bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100"
      role="region"
      aria-label="Schedule calendar overlay"
      style={{ pointerEvents: "auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-sm text-gray-700 font-medium text-center">
          {headerTitle}
        </div>

        <div className="flex items-center gap-2">
          {uniqueYears.length > 1 && (
            <span className="text-xs text-gray-500 font-medium">
              {months[months.length - 1].getFullYear()}
            </span>
          )}
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Months row */}
      <div className="flex items-center justify-between mb-3 px-2">
        {months.map((m, idx) => {
          const label = m.toLocaleString("default", { month: "long" });
          return (
            <div
              key={idx}
              className={`text-sm font-medium text-center ${fadeClass(
                idx,
                months.length
              )}`}
              style={{ width: "18%" }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Dates row */}
      <div className="flex items-center justify-between px-2">
        {daysRow.map((num, idx) => {
          const isSelected =
            num === selected.getDate() &&
            selected.getMonth() === baseDate.getMonth() &&
            selected.getFullYear() === baseDate.getFullYear();

          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
              style={{ width: `${100 / daysRow.length}%` }}
            >
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-[12px] text-sm transition ${
                  isSelected
                    ? "bg-black text-white font-semibold"
                    : `bg-gray-200 text-gray-800 hover:bg-gray-300 ${fadeClass(
                        idx,
                        daysRow.length
                      )}`
                }`}
              >
                {num}
              </div>

              <div className={`mt-2 text-xs ${fadeClass(idx, daysRow.length)}`}>
                {dayNames[idx]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
