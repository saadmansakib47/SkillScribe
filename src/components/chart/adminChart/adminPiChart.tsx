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
  userRatio: ["#094CA4", "#93C5FD"],
  regional: ["#EF4444", "#3B82F6", "#FBBF24", "#10B981", "#111827"],
};

export default function AdminPieChart({ type }: AdminPieChartProps) {
  const data = VARIANT_DATA[type];
  const COLORS = COLOR_PALETTES[type];
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl border shadow-sm h-full"
    >
      <h2 className="text-[#094CA4] font-bold text-lg mb-4">
        {type === "userRatio" ? "User Distribution" : type === "regional" ? "Regional Distribution" : `${type} Analysis`}
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Pie Chart */}
        <div className="h-64 w-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                animationDuration={1500}
                animationBegin={200}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">Total</span>
            <span className="text-2xl font-bold text-gray-800">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 text-sm flex-1">
          {data.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-gray-600 font-medium">{entry.name}</span>
              <span className="text-gray-400 ml-auto">
                {((entry.value / total) * 100).toFixed(0)}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}