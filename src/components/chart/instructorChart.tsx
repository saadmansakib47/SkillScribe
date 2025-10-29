"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { chartData, earningData, COLORS } from "@/lib/chartData";

export default function InstructorChart({
  selectedMetric,
}: {
  selectedMetric: "Followers" | "Likes" | "Views" | "Watch Time";
}) {
  const currentData = chartData[selectedMetric] || chartData["Followers"];

  return (
    <>
      {/* Line Chart (Dynamic) */}
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

      {/* Earning Pie Chart */}
      <div className="bg-white p-6 rounded-2xl border col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">Earning</h2>
          <button className="text-gray-500 text-sm">This Week</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={earningData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {earningData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center">
            <span className="text-gray-500">Total Earning</span>
            <br />
            <span className="text-2xl font-semibold">$382</span>
          </p>
        </div>
      </div>
    </>
  );
}
