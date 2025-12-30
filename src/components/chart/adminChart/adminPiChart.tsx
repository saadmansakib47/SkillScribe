"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface AdminPieChartProps {
  type: "traffic" | "sales" | "categories" | "userRatio" | "regional";
}

const VARIANT_DATA = {
  traffic: [
    { name: "Organic", value: 720 },
    { name: "Referral", value: 280 },
    { name: "Social", value: 190 },
    { name: "Paid", value: 150 },
  ],
  sales: [
    { name: "Completed", value: 540 },
    { name: "Pending", value: 220 },
    { name: "Refunded", value: 90 },
  ],
  categories: [
    { name: "Programming", value: 380 },
    { name: "Design", value: 240 },
    { name: "Marketing", value: 160 },
    { name: "Business", value: 130 },
  ],
  userRatio: [
    { name: "Learners", value: 850 },
    { name: "Instructors", value: 150 },
  ],
  regional: [
    { name: "Asia", value: 450 },
    { name: "Europe", value: 320 },
    { name: "America", value: 280 },
    { name: "Australia", value: 120 },
    { name: "Others", value: 80 },
  ],
};

const COLOR_PALETTES = {
  traffic: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
  sales: ["#10B981", "#F59E0B", "#EF4444"],
  categories: ["#8B5CF6", "#EC4899", "#F97316", "#06B6D4"],
  userRatio: ["#094CA4", "#97BCED"],
  regional: ["#094CA4", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
};

export default function AdminPieChart({ type }: AdminPieChartProps) {
  const data = VARIANT_DATA[type];
  const COLORS = COLOR_PALETTES[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-2xl border shadow-sm"
    >
      <h2 className="text-[#094CA4] font-bold text-lg mb-4">
        {type === "userRatio" ? "User Distribution" : type === "regional" ? "Regional Distribution" : `${type} Analysis`}
      </h2>

      <div className="flex gap-6 items-center">
        {/* Pie Chart */}
        <div className="h-64 w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                animationDuration={900}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 text-sm">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span className="text-gray-700">{entry.name}</span>
              <span className="text-gray-500 font-medium ml-auto">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}