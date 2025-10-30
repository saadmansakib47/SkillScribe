"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { earningData, COLORS } from "@/lib/chartData";

export default function InstructorPieChart() {
  return (
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
  );
}
