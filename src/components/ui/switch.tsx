"use client";

import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-6 flex items-center rounded-full p-[2px] cursor-pointer transition-colors duration-300 ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <motion.div
        layout
        animate={{ x: checked ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="w-5 h-5 bg-white rounded-full shadow-sm"
      />
    </div>
  );
}
