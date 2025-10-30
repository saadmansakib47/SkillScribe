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

export default function InstructorLineChart({
  selectedMetric,
}: {
  selectedMetric: "Followers" | "Likes" | "Views" | "Watch Time";
}) {
  const currentData = chartData[selectedMetric] || chartData["Followers"];

  return (
    <div className="bg-white p-6 rounded-2xl border mb-6 transition-all duration-500">
      <h2 className="text-gray-700 font-medium mb-4">{selectedMetric}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4C6FFF"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
