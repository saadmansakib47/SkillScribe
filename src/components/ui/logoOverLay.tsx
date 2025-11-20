"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const AnimatedLine = ({ x1, y1, x2, y2, delay }: LineProps) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#051e84ff"
    strokeWidth={1}
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    exit={{ pathLength: 0, opacity: 0 }}
    transition={{ delay, duration: 0.3, ease: "easeInOut" }}
  />
);

export default function LogoOverlay({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  // Hide overlay after fixed time regardless of line animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 1500); // overlay visible for 1.5s, adjust as needed
    return () => clearTimeout(timer);
  }, [onComplete]);

  const S1Lines = [
    { x1: 40, y1: 20, x2: 40, y2: 10 },
    { x1: 40, y1: 10, x2: 10, y2: 10 },
    { x1: 10, y1: 10, x2: 10, y2: 30 },
    { x1: 10, y1: 30, x2: 40, y2: 30 },
    { x1: 40, y1: 30, x2: 40, y2: 50 },
    { x1: 40, y1: 50, x2: 10, y2: 50 },
    { x1: 10, y1: 50, x2: 10, y2: 40 },
  ];

  const S2Lines = S1Lines.map((l) => ({
    ...l,
    x1: l.x1 + 40,
    x2: l.x2 + 40,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Overlay slides immediately from right to left */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gray-200/20 backdrop-blur-md"
            initial={{ x: "0%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.svg
            viewBox="0 0 200 100"
            className="w-80 h-80"
            style={{ transformStyle: "preserve-3d", perspective: 800 }}
            initial={{ rotateY: -20 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {S1Lines.map((line, index) => (
              <AnimatedLine
                key={`s1-${index}`}
                {...line}
                delay={index * 0.2}
              />
            ))}
            {S2Lines.map((line, index) => (
              <AnimatedLine
                key={`s2-${index}`}
                {...line}
                delay={index * 0.2}
              />
            ))}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
