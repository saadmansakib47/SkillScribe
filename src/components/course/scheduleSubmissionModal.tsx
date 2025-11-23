"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ScheduleSubmissionModal() {
  const [open, setOpen] = useState(false);

  // Time selection
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  // Date selection
  const [date, setDate] = useState("");

  const handleSchedule = () => {
    const finalSchedule = {
      date,
      hour,
      minute,
    };

    console.log("Scheduled:", finalSchedule);
    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-sm border border-black/80 rounded-[8px] hover:bg-gray-100"
      >
        Schedule Submission
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] border border-gray-300 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Schedule Submission</h3>

            {/* Graphical Clock */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-40 h-40 rounded-full border-4 border-black flex items-center justify-center relative">
                <div className="text-center text-sm text-gray-700">
                  <p className="font-semibold">{hour}:{minute}</p>
                  <p className="text-xs text-gray-500">Scheduled Time</p>
                </div>
              </div>

              {/* Hour & Minute Select */}
              <div className="flex gap-3 mt-3">
                <select
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="border border-black rounded-[8px] px-2 py-1 text-sm"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="border border-black rounded-[8px] px-2 py-1 text-sm"
                >
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Picker */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border border-black rounded-[8px] px-3 py-2 text-sm mt-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-[8px]"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSchedule}
                className="bg-[#4C6FFF] hover:bg-[#3b58d8] text-white rounded-[8px]"
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
