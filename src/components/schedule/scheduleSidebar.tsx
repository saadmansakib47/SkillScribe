"use client";

import { useEffect, useState } from "react";
import CreateScheduleModal from "@/components/schedule/createScheduleModal";

export default function ScheduleSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  // Runs on mount and whenever the month changes
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get total number of days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(Array.from({ length: totalDays }, (_, i) => i + 1));
  }, [currentDate]);

  const today = new Date().getDate();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  // For formatting the heading (e.g., “November, 2025”)
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-[310px] bg-[#fefefe] rounded-xl shadow-sm border border-gray-100 p-5">
      {/* Calendar mini */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">
          {monthName}, {year}
        </h4>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {daysInMonth.map((day) => {
            const isToday =
              day === today &&
              currentDate.getMonth() === thisMonth &&
              currentDate.getFullYear() === thisYear;

            return (
              <div
                key={day}
                className={`flex items-center justify-center w-9 h-9 rounded-[12px] transition-colors duration-150 cursor-pointer ${isToday
                    ? "bg-black text-white font-semibold"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
              >
                {day}
              </div>
            );
          })}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="w-full max-w-[400px] bg-[#1E40AF] text-white font-semibold text-sm py-2 mt-5 rounded-[10px] hover:bg-[#1d4ed8] transition">
          Create New Schedule
        </button>
        <CreateScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

      {/* Next Schedule */}

      <div className="mb-6">
        <h4 className="font-bold text-black mb-2">Next Schedule</h4>
        <p className="text-sm font-medium">UI Designers Roadmap to Career</p>
        <p className="text-sm text-gray-500 mt-1">
          Sunday, 2 November <br /> 08:30 - 10:00
        </p>
        <p className="text-sm text-gray-500 mt-1">
          meet.google.com/dkje-fdf-yhf
        </p>
        <p className="text-sm text-gray-500 mt-1">135 Participants</p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-[8px] hover:bg-blue-700">
            Join Meeting
          </button>
          <button className="flex-1 bg-gray-300 text-gray-700 text-sm py-2 rounded-[8px] hover:bg-gray-200">
            Invite
          </button>
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Upcoming Schedule</h4>
        <div className="text-sm text-gray-500 space-y-3">
          <p>
            <b className="text-black">
              Design Chitchat with Students
            </b>
            <br />10:00 PM - 11:00 PM, Monday, 10 Nov
            <br />
            <span className="text-gray-400">
              A casual conversation about design
            </span>
          </p>

          <p>
            <b className="text-black">Auto Layout in Figma</b>
            <br />10:00 PM - 11:00 PM, Tuesday, 11 Nov
          </p>
        </div>
      </div>
    </aside>
  );
}
