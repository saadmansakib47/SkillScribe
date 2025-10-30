"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { earningData, COLORS } from "@/lib/chartData";

export default function InstructorPieChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border col-span-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Earning</h2>
        <button className="text-gray-500 text-sm">This Week</button>
      </div>

      {/* Pie Chart with Center Text */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="h-56 w-56 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={earningData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {earningData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-gray-500 text-sm">Total Earning</span>
            <span className="text-2xl font-semibold">$382</span>
          </div>
        </div>

        {/* Legends */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {earningData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
