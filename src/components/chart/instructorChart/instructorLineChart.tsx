"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartData } from "@/lib/chartData";

interface InstructorLineChartProps {
  selectedMetric: "Followers" | "Likes" | "Views" | "Watch Time";
  selectedRange: "7d" | "14d" | "30d" | "90d";
}

export default function InstructorLineChart({
  selectedMetric,
  selectedRange,
}: InstructorLineChartProps) {
  const currentData =
    chartData[selectedMetric]?.[selectedRange] || [];

  return (
    <div className="bg-white p-6 rounded-2xl border mb-6 transition-all duration-500">
      <h2 className="text-gray-700 font-medium mb-4">
        {selectedMetric} ({selectedRange})
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
                <feOffset dx="0" dy="4" result="offset" />
                <feGaussianBlur in="offset" stdDeviation="4" result="blur" />
                <feFlood floodColor="#094CA4" floodOpacity="1" result="color" />
                <feComposite
                  in="color"
                  in2="blur"
                  operator="in"
                  result="shadow"
                />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4C6FFF"
              strokeWidth={1}
              dot={false}
              filter="url(#shadow)"
              activeDot={{
                r: 5,
                strokeWidth: 5,
                stroke: "#17e2d1ff",
                fill: "#4C6FFF",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
