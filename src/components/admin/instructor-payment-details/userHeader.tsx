import React from "react";
import { Instructor } from "@/lib/instructors";

export function UserHeader({ instructor }: { instructor: Instructor | undefined }) {
  if (!instructor) return null;

  const handleGenerateReport = () => {
    const dummyContent = `
      SkillScribe Payment Report
      --------------------------
      Instructor: ${instructor.name}
      ID: ${instructor.id}
      Email: ${instructor.email}
      Date: ${new Date().toLocaleDateString()}
      
      Summary:
      Total Paid: ${instructor.totalPaid}
      Total Due: ${instructor.totalDue}
      
      (This is a dummy report generated for demonstration purposes)
    `;

    const blob = new Blob([dummyContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Report_${instructor.name.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <img
        src={instructor.image}
        alt={`${instructor.name}'s Avatar`}
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-800">{instructor.name}</h2>
        <p className="text-sm text-gray-500">ID: {instructor.id}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>{instructor.email}</p>
        <p className="text-gray-400 text-xs">Joined: {instructor.joinedDate}</p>
      </div>

      {/* Buttons on the right */}
      <div className="ml-auto flex gap-2">
        <button
          onClick={handleGenerateReport}
          className="px-4 py-2 bg-white border border-black rounded-[8px] hover:bg-gray-50"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}
