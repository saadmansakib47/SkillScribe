"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedCourses from "@/components/sections/FeaturedCourses";
import Categories from "@/components/sections/Categories";
import Testimonials from "@/components/sections/Testimonials";
import HowItWorks from "@/components/sections/HowItWorks";
import CtaBanner from "@/components/sections/CtaBanner";
import LogoOverlay from "@/components/ui/logoOverLay";

export default function LandingPage() {
  const [showOverlay, setShowOverlay] = useState(true);

  // Hide overlay after animation (~4.5s for full logo animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 4500); // adjust if you tweak the animation duration in LogoOverlay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Glassmorphic overlay with sliding + logo animation */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-full bg-gray-200/20 backdrop-blur-md z-50 flex items-center justify-center"
          >
            {/* Centered Logo Animation */}
            <LogoOverlay onComplete={() => setShowOverlay(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing page content */}
      <div
        className={`${
          showOverlay ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      >
        <HeroSection />
        <FeaturedCourses />
        <Categories />
        <Testimonials />
        <HowItWorks />
        <CtaBanner />
      </div>
    </div>
  );
}
