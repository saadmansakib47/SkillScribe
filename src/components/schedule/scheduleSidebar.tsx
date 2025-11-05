"use client";

export default function ScheduleSidebar() {
  return (
    <aside className="w-[310px] bg-[#fefefe] rounded-xl shadow-sm border border-gray-100 p-5">
      {/* Calendar mini */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">November, 2025</h4>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {[...Array(30)].map((_, i) => {
            const day = i + 1;
            const isSelected = day === 7;
            return (
              <div
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-md ${
                  isSelected
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <button className="w-full bg-[#2563eb] text-white font-medium text-sm py-2 mt-4 rounded-lg hover:bg-blue-600">
          Create New Schedule
        </button>
      </div>

      {/* Next Schedule */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Next Schedule</h4>
        <p className="text-sm font-medium">UI Designers Roadmap to Career</p>
        <p className="text-sm text-gray-500 mt-1">
          Sunday, 2 November <br /> 08:30 - 10:00
        </p>
        <p className="text-sm text-gray-500 mt-1">
          meet.google.com/dkje-fdf-yhf
        </p>
        <p className="text-sm text-gray-500 mt-1">135 Participants</p>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700">
            Join Meeting
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 rounded-md hover:bg-gray-200">
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
