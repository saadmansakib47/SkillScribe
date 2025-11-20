"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface AdminPieChartProps {
  type: "traffic" | "sales" | "categories";
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
};

export default function AdminPieChart({ type }: AdminPieChartProps) {
  const data = VARIANT_DATA[type];

  // Dynamic colors generated from HSL
  const COLORS = useMemo(() => {
    return data.map((_, i) => `hsl(${(i * 65) % 360} 80% 60%)`);
  }, [type]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-2xl border shadow-sm"
    >
      <h2 className="text-gray-700 font-medium capitalize mb-4">
        {type} analysis
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