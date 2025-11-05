"use client";

import ScheduleCalendar from "@/components/schedule/scheduleCalendar";
import { useMemo } from "react";

/**
 * Timeline grid with left hour column and dashed lines.
 * - Each 30-minute slot is a row of fixed height (slotHeight)
 * - Dashed lines drawn for every slot
 * - Event cards positioned absolutely on top of the dashed lines
 *
 * Example events are included; replace with your real data source.
 */

type EventItem = {
  id: string;
  title: string;
  start: string; // "HH:MM" 24h
  end: string; // "HH:MM"
  date?: string; // ISO date string or omitted
  meta?: string;
  avatars?: string[]; // avatar image paths
};

const sampleEvents: EventItem[] = [
  {
    id: "evt1",
    title: "UI Designers Roadmap to Career",
    start: "08:30",
    end: "10:00",
    date: undefined,
    meta: "Sunday, 2 November · 08:30 - 10:00",
    avatars: ["/avatars/a1.png", "/avatars/a2.png", "/avatars/a3.png"],
  },
  {
    id: "evt2",
    title: "Figma Basics for Beginners",
    start: "12:15",
    end: "14:00",
    meta: "Sunday, 2 November · 12:15 - 02:00",
    avatars: ["/avatars/a4.png", "/avatars/a5.png"],
  },
];

export default function ScheduleTimeline({
  startHour = 8,
  endHour = 18,
}: {
  startHour?: number;
  endHour?: number;
}) {
  // Visual config
  const slotHeight = 48; // px per 30 minutes. Adjust to scale
  const slotsPerHour = 2; // 30-min slots
  const totalSlots = (endHour - startHour) * slotsPerHour;

  // Build time labels (every 30 minutes)
  const times = useMemo(() => {
    const arr: string[] = [];
    for (let h = startHour; h < endHour; h++) {
      for (let s = 0; s < slotsPerHour; s++) {
        const minutes = s === 0 ? "00" : "30";
        arr.push(`${String(h).padStart(2, "0")}:${minutes}`);
      }
    }
    return arr;
  }, [startHour, endHour]);

  // Helper: convert "HH:MM" to minutes since startHour
  function minutesFromStart(t: string) {
    const [hh, mm] = t.split(":").map(Number);
    return (hh - startHour) * 60 + mm;
  }

  // Compute positioning for events
  const positionedEvents = useMemo(() => {
    return sampleEvents.map((e) => {
      const topMinutes = minutesFromStart(e.start);
      const endMinutes = minutesFromStart(e.end);
      const top = (topMinutes / 30) * slotHeight; // px
      const height = ((endMinutes - topMinutes) / 30) * slotHeight;
      return { ...e, top, height };
    });
  }, [slotHeight]);

  return (
    <div className="relative mt-6">
      {/* The timeline container */}
      <div
        className="bg-[#fffaf9] rounded-xl p-6 relative border border-gray-100 shadow-sm"
        style={{ minHeight: `${totalSlots * slotHeight + 20}px` }}
      >
        {/* Insert calendar overlay here (positioned absolute inside timeline) */}
        <ScheduleCalendar />

        <div className="flex">
          {/* Left time column */}
          <div className="w-20 pr-4 select-none">
            <div className="flex flex-col">
              {times.map((t, i) => {
                // show only hour labels at the top of each hour
                const showHourLabel = t.endsWith(":00");
                return (
                  <div
                    key={i}
                    className="h-[48px] flex items-start"
                    style={{ height: `${slotHeight}px` }}
                  >
                    {showHourLabel ? (
                      <div className="text-xs text-gray-500 mt-0.5">{t}</div>
                    ) : (
                      <div className="text-xs text-gray-400 mt-0.5">&nbsp;</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: timeline grid area (relative container for dashed lines and event cards) */}
          <div className="flex-1 relative overflow-hidden">
            {/* dashed broken lines */}
            <div className="absolute inset-0">
              {times.map((_, i) => (
                <div
                  key={i}
                  className="w-full"
                  style={{
                    position: "absolute",
                    top: `${i * slotHeight}px`,
                    left: 0,
                    right: 0,
                    height: `${slotHeight}px`,
                    // center a dashed rule in the middle of each slot area
                  }}
                >
                  {/* dashed line centered vertically in slot */}
                  <div
                    className="mx-4 border-t border-dashed border-gray-200"
                    style={{
                      position: "absolute",
                      top: `${slotHeight / 2 - 1}px`,
                      left: 0,
                      right: 0,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Event cards overlayed via absolute positioning */}
            <div className="relative z-10">
              {positionedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="absolute left-6 right-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  style={{
                    top: `${ev.top}px`,
                    height: `${Math.max(44, ev.height)}px`,
                    // ensure it overlays dashed lines visually
                  }}
                >
                  <div className="text-sm font-semibold text-gray-700 text-center">
                    {ev.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    {/* icon placeholders + meta */}
                    <div>{ev.meta}</div>
                  </div>

                  <div className="flex items-center justify-center mt-3">
                    <div className="flex -space-x-2">
                      {(ev.avatars || []).map((src, i) => (
                        // small avatar stack
                        <img
                          key={i}
                          src={src}
                          className="w-6 h-6 rounded-full border-2 border-white"
                          alt=""
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 ml-3">and 123 others</div>
                  </div>
                </div>
              ))}
            </div>

            {/* If there are empty slots, the dashed lines remain visible underneath */}
          </div>
        </div>
      </div>
    </div>
  );
}
