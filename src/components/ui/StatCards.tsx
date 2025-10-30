"use client";

import { useState } from "react";
import { Heart, Users, Eye, Clock } from "lucide-react";

// Define the valid metric types
type MetricType = "Followers" | "Likes" | "Views" | "Watch Time";

interface StatCardsProps {
  selectedMetric?: MetricType;
  setSelectedMetric?: (metric: MetricType) => void;
}

export default function StatCards({
  selectedMetric: externalSelected,
  setSelectedMetric: externalSetSelected,
}: StatCardsProps) {
  // If parent doesn’t pass states, use internal ones
  const [internalMetric, setInternalMetric] = useState<MetricType>("Followers");

  const selectedMetric = externalSelected ?? internalMetric;
  const setSelectedMetric = externalSetSelected ?? setInternalMetric;

  const stats = [
    { label: "Likes", value: "323K", change: "+42k", icon: Heart, color: "text-pink-500" },
    { label: "Followers", value: "1.2M", change: "+23k", icon: Users, color: "text-blue-600" },
    { label: "Views", value: "250K", change: "+15k", icon: Eye, color: "text-indigo-500" },
    { label: "Watch Time", value: "128hr", change: "+3hr", icon: Clock, color: "text-amber-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((card, i) => {
        const Icon = card.icon;
        const isActive = selectedMetric === card.label;
        return (
          <button
            key={i}
            onClick={() => setSelectedMetric(card.label as MetricType)}
            className={`p-4 rounded-2xl border text-left transition-all duration-300 bg-white
              ${isActive
                ? "border-[#4C6FFF] shadow-md scale-[1.02]"
                : "border-gray-200 hover:shadow-sm"
              }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon size={18} className={`${card.color}`} />
              <h3 className="text-gray-500 text-sm font-medium">{card.label}</h3>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
              <p className="text-green-500 text-sm">{card.change}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
