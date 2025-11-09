"use client";

import { useEffect, useState, useMemo } from "react";
import CreateScheduleModal from "@/components/schedule/createScheduleModal/createScheduleModal";
import { upcomingSchedules, ScheduleEvent } from "@/lib/upcomingSchedule";

export default function ScheduleSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysArray, setDaysArray] = useState<{ day: number; weekday: number }[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return { day: i + 1, weekday: date.getDay() };
    });
    setDaysArray(days);
  }, [currentDate]);

  const today = new Date().getDate();
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();

  const selectedDate = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
  }, [selectedDay, currentDate]);

  // Compute dynamic schedules
  const nextSchedule = useMemo(() => {
    return upcomingSchedules
      .map((e) => ({ ...e, dateObj: new Date(e.date) }))
      .filter((e) => e.dateObj >= selectedDate)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())[0];
  }, [selectedDate]);

  const upcomingList = useMemo(() => {
    const limitDate = new Date(selectedDate);
    limitDate.setDate(limitDate.getDate() + 7);

    return upcomingSchedules
      .map((e) => ({ ...e, dateObj: new Date(e.date) }))
      .filter((e) => e.dateObj >= selectedDate && e.dateObj <= limitDate)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  }, [selectedDate]);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleString("default", { weekday: "long" });
    const monthName = date.toLocaleString("default", { month: "short" });
    return `${dayName}, ${date.getDate()} ${monthName}`;
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <aside className="w-[310px] bg-[#fefefe] rounded-xl shadow-sm border border-gray-100 p-5 space-y-5">
      {/* Mini Calendar */}
      <div className="bg-[#FAF7F3] rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          {monthName}, {year}
        </h4>

        <div className="grid grid-cols-7 gap-2 mb-1 text-xs text-gray-500 font-medium text-center select-none">
          {dayNames.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-3 gap-y-2 text-sm text-center">
          {(() => {
            const firstDayOfWeek = daysArray[0]?.weekday || 0;
            const blanks = Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} />
            ));

            return (
              <>
                {blanks}
                {daysArray.map(({ day }) => {
                  const isToday =
                    day === today &&
                    currentDate.getMonth() === thisMonth &&
                    currentDate.getFullYear() === thisYear;
                  const isSelected = day === selectedDay;
                  const active = isSelected;

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex items-center justify-center w-7 h-7 rounded-[12px] cursor-pointer transition-colors duration-150 select-none
                        ${
                          active
                            ? "bg-black text-white font-semibold"
                            : isToday
                            ? "bg-gray-300 text-gray-900"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[400px] bg-[#1E40AF] text-white font-semibold text-sm py-2 mt-5 rounded-[10px] hover:bg-[#1d4ed8] transition"
        >
          Create New Schedule
        </button>

        <CreateScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

      {/* Next Schedule */}
      <div className="bg-[#FAF7F3] rounded-xl p-4">
        <h4 className="font-bold text-black mb-2">Next Schedule</h4>
        {nextSchedule ? (
          <>
            <p className="text-sm font-medium">{nextSchedule.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(nextSchedule.date)} <br />
              {formatTime(nextSchedule.date)} - {formatTime(nextSchedule.endDate)}
            </p>
            <p className="text-sm text-gray-500 mt-1">{nextSchedule.meetingLink}</p>
            <p className="text-sm text-gray-500 mt-1">
              {nextSchedule.participants} Participants
            </p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-[8px] hover:bg-blue-700">
                Join Meeting
              </button>
              <button className="flex-1 bg-gray-300 text-gray-700 text-sm py-2 rounded-[8px] hover:bg-gray-200">
                Invite
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">No upcoming schedule found.</p>
        )}
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-[#FAF7F3] rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 mb-2">Upcoming Schedule</h4>
        <div className="text-sm text-gray-500 space-y-3">
          {upcomingList.length > 0 ? (
            upcomingList.map((e) => (
              <p key={e.id}>
                <b className="text-black">{e.title}</b>
                <br />
                {`${formatTime(e.date)} - ${formatTime(e.endDate)}, ${formatDate(e.date)}`}
                <br />
                {e.description && <span className="text-gray-400">{e.description}</span>}
              </p>
            ))
          ) : (
            <p>No schedules in the next 7 days.</p>
          )}
        </div>
      </div>
    </aside>
  );
}
