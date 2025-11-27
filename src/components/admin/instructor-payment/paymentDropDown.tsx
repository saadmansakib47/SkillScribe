"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Instructor } from "@/lib/instructors";

type PaymentDropdownProps = {
  instructors: Instructor[];
  onFiltered: (filtered: Instructor[]) => void;
};

export function PaymentDropdown({ instructors, onFiltered }: PaymentDropdownProps) {
  const options = ["All", "Has Due", "Fully Paid", "Partially Paid"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  // Helper to parse currency strings like "$205,000" → 205000
  const parseCurrency = (value: string) => parseFloat(value.replace(/[^0-9.-]+/g, ""));

  const filterInstructors = (list: Instructor[], option: string) => {
    switch (option) {
      case "Has Due":
        return list.filter((inst) => parseCurrency(inst.totalDue) > 0);
      case "Fully Paid":
        return list.filter((inst) => parseCurrency(inst.totalDue) === 0);
      case "Partially Paid":
        return list.filter(
          (inst) =>
            parseCurrency(inst.totalDue) > 0 && parseCurrency(inst.totalPaid) > 0
        );
      case "All":
      default:
        return list;
    }
  };

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setOpen(false);
    onFiltered(filterInstructors(instructors, opt));
  };

  // Re-filter if instructors prop changes
  useEffect(() => {
    onFiltered(filterInstructors(instructors, selected));
  }, [instructors]);

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-sm">Payment:</span>

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
            className="absolute top-10 right-0 w-44 bg-white shadow-md border border-black/10 rounded-xl p-2 z-20"
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
