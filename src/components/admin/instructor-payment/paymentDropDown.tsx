"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PaymentDropdown() {
  const options = ["All", "Has Due", "Fully Paid", "Partially Paid"];
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-sm">Payment:</span>

      <Button
        onClick={() => setOpen(!open)}
        variant="outline"
        className="rounded-xl border border-black/20 flex items-center gap-1 text-sm"
      >
        {selected}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15 }}
        >
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
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
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
