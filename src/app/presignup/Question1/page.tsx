"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Briefcase, Wand2, GraduationCap, Rocket, Heart } from "lucide-react";


export default function LearningGoalPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const goals = [
    { id: "new-skill", icon: <Brain size={24} />, title: "Learn a new skill", desc: "I’m exploring something new." },
    { id: "career", icon: <Briefcase size={24} />, title: "Advance my career", desc: "I want to get better at my current job." },
    { id: "switch", icon: <Wand2 size={24} />, title: "Switch to a new field", desc: "I’m preparing for a career change." },
    { id: "academics", icon: <GraduationCap size={24} />, title: "Excel in academics", desc: "I want help with my studies or degree." },
    { id: "projects", icon: <Rocket size={24} />, title: "Build projects or a startup", desc: "I want practical skills to create something." },
    { id: "fun", icon: <Heart size={24} />, title: "Learn for fun / curiosity", desc: "I enjoy learning new things." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex flex-col md:flex-row font-['Droid Sans'] bg-[#fafafa]"
    >
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-10">
        {/* Progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "25%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden"
        >
          <div className="h-2 bg-blue-700 rounded-full" />
        </motion.div>
        <span className="text-sm text-gray-600 font-medium mb-6">Step 1 of 4</span>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold font-['Raleway'] text-center md:text-left text-blue-700 mb-8"
        >
          What brings you here today?
        </motion.h1>

        {/* Scrollable option list */}
        <div className="flex flex-col gap-3 mb-10 max-h-[470px] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-400 [direction:rtl] [&>*]:[direction:ltr]">
          {goals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              onClick={() => setSelected(goal.id)}
              className={`flex items-start gap-8 border rounded-[12px] px-8 py-5 text-left transition-all ${
                selected === goal.id
                  ? "border-blue-700 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <div className={`mt-1 ${selected === goal.id ? "text-blue-700" : "text-gray-600"}`}>
                {goal.icon}
              </div>
              <div>
                <h3 className="font-semibold">{goal.title}</h3>
                <p className="text-gray-600 text-sm">{goal.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => router.push("/presignup/Question2")}
            className="px-6 py-2 rounded-[8px] font-semibold border border-gray-400 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Skip for now
          </button>

          <button
            disabled={!selected}
            onClick={() => router.push("/presignup/Question2")}
            className={`px-6 py-2 rounded-[8px] font-semibold transition-colors ${
              selected
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>

        {/* Tooltip */}
        <p className="text-sm text-gray-500 text-center italic">
          You can change these later in your profile settings.
        </p>
      </div>

      {/* Right side illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden md:flex w-1/2 items-center justify-center relative bg-[#f9f9f9]"
      >
        <Image
          src="/Asset/learning goal.png"
          alt="Learning goal illustration"
          width={520}
          height={520}
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
