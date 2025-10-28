"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotificationPreferencesPage() 
{
  const router = useRouter();

  const [frequency, setFrequency] = useState("weekly");
  const [channels, setChannels] = useState<string[]>(["email", "in-app"]);
  const [preferences, setPreferences] = useState<string[]>([
    "new-courses",
    "reminders",
    "recommendations",
  ]);
  const [showSummary, setShowSummary] = useState(false);

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const togglePreference = (id: string) =>
    setPreferences((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Droid Sans'] bg-[#fafafa] relative">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
            <div className="h-2 bg-blue-700 rounded-full w-full"></div>
          </div>
          <span className="text-sm text-gray-600 font-medium">Step 4 of 4</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-center md:text-left text-blue-700 mb-6">
          How would you like to stay updated?
        </h1>

        {/* Notification Frequency */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Notification Frequency</h2>
          <div className="flex flex-col gap-2">
            {[
              { id: "daily", label: "Daily" },
              { id: "weekly", label: "Weekly (recommended)" },
              { id: "important", label: "Only for important updates" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 border rounded-[10px] px-4 py-2 cursor-pointer transition-all ${
                  frequency === opt.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="radio"
                  name="frequency"
                  value={opt.id}
                  checked={frequency === opt.id}
                  onChange={() => setFrequency(opt.id)}
                  className="accent-blue-700"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Notification Channels</h2>
          <div className="flex flex-col gap-2">
            {[
              { id: "email", label: "Email notifications" },
              { id: "in-app", label: "In-app notifications" },
              { id: "push", label: "Push notifications (mobile only)" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 border rounded-[10px] px-4 py-2 cursor-pointer transition-all ${
                  channels.includes(opt.id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={channels.includes(opt.id)}
                  onChange={() => toggleChannel(opt.id)}
                  className="accent-blue-700"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Content Preferences */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3">Content Preferences</h2>
          <div className="flex flex-col gap-2">
            {[
              {
                id: "new-courses",
                label: "Notify me about new courses in my selected topics",
              },
              {
                id: "reminders",
                label: "Remind me to continue learning if inactive",
              },
              {
                id: "recommendations",
                label: "Send personalized learning recommendations",
              },
              {
                id: "offers",
                label: "Include special offers & promotions (optional)",
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 border rounded-[10px] px-4 py-2 cursor-pointer transition-all ${
                  preferences.includes(opt.id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.includes(opt.id)}
                  onChange={() => togglePreference(opt.id)}
                  className="accent-blue-700"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => router.push("/presignup/Question3")}
            className="px-6 py-2 rounded-[8px] font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => setShowSummary(true)}
            className="px-6 py-2 rounded-[8px] font-semibold bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          >
            Finish Setup
          </button>
        </div>
      </div>

      {/* Right side illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#f9f9f9]">
        <Image
          src="/Asset/notifications.jpg"
          alt="Notifications illustration"
          width={460}
          height={460}
          className="object-contain"
          priority
        />
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Thanks! 🎉
            </h2>
            <p className="text-gray-700 mb-6">
              We’ve set up your personalized learning space based on your
              preferences.
            </p>
            <button
              onClick={() => router.push("/auth/signup")}
              className="px-6 py-2 rounded-[8px] font-semibold bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              Proceed to Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
