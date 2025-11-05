"use client";

import { useMemo } from "react";

/**
 * Overlay calendar card designed to float over the ScheduleTimeline.
 * - Shows header "D Month, YYYY"
 * - Shows a 5-month spread with center month highlighted (opacity gradient)
 * - Shows date row with rounded [12px] boxes, center date highlighted
 * - Exposes a container suitable for absolute placement over the timeline
 */

export default function ScheduleCalendar({
  // optional: allow passing a base date if desired later
  baseDate = new Date(),
  selected = new Date(),
}: {
  baseDate?: Date;
  selected?: Date;
}) {
  // Build a 5-month window centered on baseDate's month
  const months = useMemo(() => {
    const centerMonthIndex = baseDate.getMonth();
    const year = baseDate.getFullYear();
    // take two months back, center, two months forward
    const arr = [];
    for (let offset = -2; offset <= 2; offset++) {
      const dt = new Date(year, centerMonthIndex + offset, 1);
      arr.push(dt);
    }
    return arr;
  }, [baseDate]);

  // For date boxes: show range around selected month's first week (we'll just show 7 days window like design)
  const daysRow = useMemo(() => {
    // For the selected/current month, render the date numbers of a single week sample:
    // We'll render 7 numbers centered around selected date (or start of month if near edges)
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const day = selected.getDate();
    const half = 3;
    const start = Math.max(1, day - half);
    const end = Math.min(totalDays, day + half);
    const arr: number[] = [];
    for (let d = start; d <= end; d++) arr.push(d);
    // If we have fewer than 7 (month edges), pad preceding/following days (but keep within month)
    while (arr.length < 7) {
      // try prepend
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

  // Day names for daysRow
  const dayNames = useMemo(() => {
    return daysRow.map((d) => {
      const dt = new Date(selected.getFullYear(), selected.getMonth(), d);
      return dt.toLocaleString("default", { weekday: "short" }); // e.g., "Sun"
    });
  }, [daysRow, selected]);

  // helper to get fade class depending on distance from center index
  function fadeClass(index: number, length: number) {
    const center = (length - 1) / 2;
    const dist = Math.abs(index - center);
    // return tailwind classes for opacity - center fully opaque, edges less
    if (dist < 0.5) return "opacity-100";
    if (dist < 1.5) return "opacity-90 text-gray-800";
    if (dist < 2.5) return "opacity-70 text-gray-600";
    return "opacity-50 text-gray-500";
  }

  const headerTitle = `${selected.getDate()} ${selected.toLocaleString("default", {
    month: "long",
  })}, ${selected.getFullYear()}`;

  return (
    <div
      className="absolute left-6 top-6 z-20 w-[calc(100%-12rem)] max-w-[820px] bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100"
      role="region"
      aria-label="Schedule calendar overlay"
      style={{ pointerEvents: "auto" }}
    >
      {/* Header: Selected date */}
      <div className="mb-3">
        <div className="text-sm text-gray-700 font-medium">{headerTitle}</div>
      </div>

      {/* Months row (5 months, equally spaced) */}
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

      {/* Dates row: small rounded [12px] boxes and day names under them */}
      <div className="flex items-center justify-between px-2">
        {daysRow.map((num, idx) => {
          const isSelected =
            num === selected.getDate() &&
            selected.getMonth() === new Date().getMonth() &&
            selected.getFullYear() === new Date().getFullYear();
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
              style={{ width: `${100 / daysRow.length}%` }}
            >
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-[12px] text-sm ${
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
