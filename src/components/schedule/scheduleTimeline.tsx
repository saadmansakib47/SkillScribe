"use client";

export default function ScheduleTimeline() {
  return (
    <div className="relative">
      {/* Broken divider lines */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="border-t border-dashed border-gray-200 absolute left-0 right-0"
          style={{ top: `${i * 80}px` }}
        />
      ))}

      <div className="space-y-8 relative z-10">
        {/* Schedule Card 1 */}
        <div className="ml-24 mt-2 bg-white shadow-sm border border-gray-100 rounded-xl p-4 w-[500px]">
          <h4 className="font-semibold text-gray-700">
            UI Designers Roadmap to Career
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Sunday, 2 November · 08:30 - 10:00
          </p>
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              <img
                src="/avatars/a1.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <img
                src="/avatars/a2.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <img
                src="/avatars/a3.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            </div>
            <span className="text-gray-500 text-sm ml-3">and 123 others</span>
          </div>
        </div>

        {/* Schedule Card 2 */}
        <div className="ml-24 mt-16 bg-white shadow-sm border border-gray-100 rounded-xl p-4 w-[500px]">
          <h4 className="font-semibold text-gray-700">
            Figma Basics for Beginners
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Sunday, 2 November · 12:15 - 02:00
          </p>
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              <img
                src="/avatars/a4.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <img
                src="/avatars/a5.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
              <img
                src="/avatars/a6.png"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            </div>
            <span className="text-gray-500 text-sm ml-3">and 123 others</span>
          </div>
        </div>
      </div>
    </div>
  );
}
