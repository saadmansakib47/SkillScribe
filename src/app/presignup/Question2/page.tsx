"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Code2,
  Palette,
  BarChart3,
  GraduationCap,
  Briefcase,
  Cog,
  BookOpen,
  User,
  Baby,
  Zap,
} from "lucide-react";

export default function ProfessionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [experience, setExperience] = useState<Record<string, string>>({});

  const professions = [
    { id: "software", icon: <Code2 size={24} />, title: "Software Developer / Engineer" },
    { id: "designer", icon: <Palette size={24} />, title: "Designer / Artist" },
    { id: "data", icon: <BarChart3 size={24} />, title: "Data Analyst / Scientist" },
    { id: "student", icon: <GraduationCap size={24} />, title: "Student / Undergraduate" },
    { id: "business", icon: <Briefcase size={24} />, title: "Business Professional / Manager" },
    { id: "engineer", icon: <Cog size={24} />, title: "Engineer (Non-Software)" },
    { id: "teacher", icon: <BookOpen size={24} />, title: "Teacher / Educator" },
    { id: "freelancer", icon: <User size={24} />, title: "Freelancer / Self-employed" },
    { id: "highschool", icon: <Baby size={24} />, title: "High School Student" },
    { id: "other", icon: <Zap size={24} />, title: "Other" },
  ];

  const handleExperienceChange = (id: string, level: string) => {
    setExperience((prev) => ({ ...prev, [id]: level }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Droid Sans'] bg-[#fafafa]">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
            <div className="h-2 bg-blue-700 rounded-full w-1/2"></div>
          </div>
          <span className="text-sm text-gray-600 font-medium">Step 2 of 4</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-center md:text-left text-blue-700 mb-8">
          Tell us a bit about your professional background.
        </h1>

        {/* Scrollable list */}
        <div className="flex flex-col gap-3 mb-10 max-h-[470px] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 [direction:rtl] [&>*]:[direction:ltr]">
          {professions.map((prof) => (
            <div
              key={prof.id}
              className={`flex flex-col border rounded-[12px] px-6 py-4 transition-all ${
                selected === prof.id
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setSelected(prof.id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${
                      selected === prof.id ? "text-blue-700" : "text-gray-600"
                    }`}
                  >
                    {prof.icon}
                  </div>
                  <h3 className="font-semibold">{prof.title}</h3>
                </div>

                {/* Experience level dropdown */}
                {selected === prof.id && prof.id !== "other" && (
                  <select
                    value={experience[prof.id] || ""}
                    onChange={(e) => handleExperienceChange(prof.id, e.target.value)}
                    className="border border-gray-300 rounded-[8px] px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                )}
              </div>

              {/* If "Other", show input */}
              {selected === "other" && prof.id === "other" && (
                <input
                  type="text"
                  placeholder="Please specify your profession"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="mt-3 border border-gray-300 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => router.push("/presignup/Question1")}
            className="px-6 py-2 rounded-[8px] font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back
          </button>

          <button
            disabled={!selected || (selected === "other" && !otherText.trim())}
            onClick={() => router.push("/presignup/Question3")}
            className={`px-6 py-2 rounded-[8px] font-semibold transition-colors ${
              selected && (selected !== "other" || otherText.trim())
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>

        {/* Tooltip */}
        <p className="text-sm text-gray-500 text-center italic">
          You can change these later in your profile settings.
        </p>
      </div>

      {/* Right side illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative bg-[#f9f9f9]">
        <Image
          src="/Asset/profession.png"
          alt="Profession illustration"
          width={480}
          height={480}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
