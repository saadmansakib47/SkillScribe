"use client";

export default function ScheduleCalendar() {
  return (
    <div className="bg-[#fefefe] rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-700 font-semibold">2 November, 2025</h3>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto text-sm text-gray-400">
        {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m, i) => (
          <div
            key={i}
            className={`px-3 py-1 rounded-md ${
              m === "Nov" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            {m}
          </div>
        ))}
      </div>

      <div className="flex gap-1 mt-3">
        {[29, 30, 31, 1, 2, 3, 4].map((d) => (
          <div
            key={d}
            className={`flex flex-col items-center justify-center w-[42px] h-[55px] rounded-md text-sm ${
              d === 2
                ? "bg-black text-white font-semibold"
                : "bg-[#f4f4f5] text-gray-600"
            }`}
          >
            <span>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
