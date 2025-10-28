"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TopicsOfInterestPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const categories = {
    Technology: [
      "Web Development",
      "Mobile App Development",
      "Data Science",
      "Machine Learning / AI",
      "Cybersecurity",
      "Cloud Computing",
    ],
    Design: ["UI/UX Design", "Graphic Design", "Animation / Motion Graphics"],
    "Business & Productivity": [
      "Entrepreneurship",
      "Marketing & SEO",
      "Finance / Investing",
      "Leadership / Management",
      "Excel / Productivity Tools",
    ],
    "Personal Development": [
      "Communication Skills",
      "Public Speaking",
      "Critical Thinking",
      "Language Learning",
    ],
    Creative: ["Music Production", "Photography", "Writing / Storytelling"],
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const filteredCategories: [string, string[]][] = Object.entries(categories).map(([cat, topics]) => [
    cat,
    topics.filter((t) =>
      t.toLowerCase().includes(search.toLowerCase())
    ),
  ]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Droid Sans'] bg-[#fafafa]">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
            <div className="h-2 bg-blue-700 rounded-full w-3/4"></div>
          </div>
          <span className="text-sm text-gray-600 font-medium">Step 3 of 4</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-center md:text-left text-blue-700 mb-6">
          Which topics are you interested in learning?
        </h1>

        {/* Search box */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Selected chips */}
        {selectedTopics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-2"
              >
                {topic}
                <button
                  onClick={() => toggleTopic(topic)}
                  className="text-blue-700 hover:text-blue-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Scrollable list */}
        <div className="flex flex-col gap-3 mb-10 max-h-[470px] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 [direction:rtl] [&>*]:[direction:ltr]">

          {filteredCategories.map(([category, topics]) =>
            topics.length > 0 ? (
              <div key={category} className="mb-4">
                <h2 className="font-semibold text-gray-700 mb-2">{category}</h2>
                <div className="flex flex-col gap-2">
                  {topics.map((topic) => (
                    <label
                      key={topic}
                      className={`flex items-center gap-3 border rounded-[10px] px-4 py-2 cursor-pointer transition-all ${
                        selectedTopics.includes(topic)
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="accent-blue-700"
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => router.push("/presignup/Question2")}
            className="px-6 py-2 rounded-[8px] font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => router.push("/presignup/Question4")}
            className="px-6 py-2 rounded-[8px] font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Skip for now
          </button>

          <button
            disabled={selectedTopics.length === 0}
            onClick={() => router.push("/presignup/Question4")}
            className={`px-6 py-2 rounded-[8px] font-semibold transition-colors ${
              selectedTopics.length > 0
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right side live preview */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#f9f9f9] text-center px-8">
        <Image
          src="/Asset/topic.png"
          alt="Topics illustration"
          width={420}
          height={420}
          className="mb-6 object-contain"
        />
        <h3 className="text-lg font-semibold mb-2 text-blue-700">
          You’ll see more of:
        </h3>
        <p className="text-gray-700">
          {selectedTopics.length > 0
            ? selectedTopics.slice(0, 3).join(", ") +
              (selectedTopics.length > 3 ? "..." : "")
            : "—"}
        </p>
      </div>
    </div>
  );
}
