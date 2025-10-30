"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { earningDataset, COLORS } from "@/lib/chartData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function InstructorPieChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month" | "all">("week");
  const [open, setOpen] = useState(false);

  const earningData = earningDataset[selectedPeriod];
  const total = earningData.reduce((sum, item) => sum + item.value, 0);

  const options = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "All Time", value: "all" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border col-span-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Earning</h2>

        {/* Floating Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-gray-600 text-sm border border-gray-300 rounded-[8px] px-2 py-1 hover:text-blue-600 hover:border-blue-500 transition-all"
          >
            {options.find((opt) => opt.value === selectedPeriod)?.label}
            <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-32 z-50"
              >
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedPeriod(opt.value as any);
                      setOpen(false);
                    }}
                    className={`block w-full text-left text-sm px-3 py-2 hover:bg-blue-50 hover:text-blue-600 ${
                      selectedPeriod === opt.value ? "text-blue-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pie Chart */}
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
            <span className="text-2xl font-semibold">${total}</span>
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
