"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Instructor } from "@/lib/instructors";

type SortDropdownProps = {
  instructors: Instructor[];
  onSorted: (sorted: Instructor[]) => void;
};

export function SortDropdown({ instructors, onSorted }: SortDropdownProps) {
  const options = [
    "Highest Due",
    "Lowest Due",
    "Highest Paid",
    "Lowest Paid",
    "Name A-Z",
    "Name Z-A",
  ];

  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  // Helper to parse currency strings like "$205,000" → 205000
  const parseCurrency = (value: string) => parseFloat(value.replace(/[^0-9.-]+/g, ""));

  // Sorting logic
  const sortInstructors = (list: Instructor[], option: string) => {
    return [...list].sort((a, b) => {
      switch (option) {
        case "Highest Due":
          return parseCurrency(b.totalDue) - parseCurrency(a.totalDue);
        case "Lowest Due":
          return parseCurrency(a.totalDue) - parseCurrency(b.totalDue);
        case "Highest Paid":
          return parseCurrency(b.totalPaid) - parseCurrency(a.totalPaid);
        case "Lowest Paid":
          return parseCurrency(a.totalPaid) - parseCurrency(b.totalPaid);
        case "Name A-Z":
          return a.name.localeCompare(b.name);
        case "Name Z-A":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Handle selection
  const handleSelect = (opt: string) => {
    setSelected(opt);
    setOpen(false);
    const sorted = sortInstructors(instructors, opt);
    onSorted(sorted);
  };

  // Re-sort when instructors prop changes
  useEffect(() => {
    onSorted(sortInstructors(instructors, selected));
  }, [instructors]);

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-sm">Sort By:</span>

      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        className="rounded-xl border border-black/20 flex items-center gap-1 text-sm"
      >
        {selected}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown size={16} />
        </motion.div>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute top-10 right-0 w-48 bg-white shadow-md border border-black/10 rounded-xl p-2 z-20"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`text-left w-full px-3 py-2 rounded-lg text-sm hover:bg-gray-100 ${
                  selected === opt ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
