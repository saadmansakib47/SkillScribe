"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface Props {
  title: string;
  color: string;
  icon: ReactNode;
  description: string;
  features: string[];
  buttonText: string;
  onClick: () => void;
}

export default function ScheduleTypeCard({ title, color, icon, description, features, buttonText, onClick }: Props) {
  return (
    <div className={`${color} text-black rounded-xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition`}>
      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm opacity-90 mb-2">{description}</p>
        <ul className="text-sm space-y-1 opacity-90 list-disc list-inside">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          className="mt-4 border bg-white border-black text-black rounded-[8px] hover:bg-white hover:text-blue-600 transition"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </motion.div>
    </div>
  );
}
