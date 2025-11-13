"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GenerateAIQuizParams {
  topic: string;
}

interface GeneratedQuizData {
  question: string;
  options: string[];
  correctIndex: number;
}

// Stubbed AI generation logic
export async function generateAIQuiz({
  topic,
}: GenerateAIQuizParams): Promise<GeneratedQuizData> {
  await new Promise((r) => setTimeout(r, 800));

  const hardcodedQuizzes: Record<string, GeneratedQuizData> = {
    "React Fundamentals": {
      question: "Which React hook is used to manage component state?",
      options: ["useState", "useEffect", "useMemo", "useReducer"],
      correctIndex: 0,
    },
    "Data Structures": {
      question: "Which data structure follows the FIFO (First In First Out) principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctIndex: 1,
    },
    "Object-Oriented Programming": {
      question: "Which OOP concept focuses on bundling data and methods together?",
      options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
      correctIndex: 0,
    },
  };

  return (
    hardcodedQuizzes[topic] || {
      question: `Sample question about ${topic}?`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: 0,
    }
  );
}

interface AIQuizGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  course: string;
  onAutofill: (data: { question: string; options: string[]; correctIndex: number }) => void; // ✅ now includes correctIndex
}

export default function AIQuizGeneratorModal({
  open,
  onClose,
  course,
  onAutofill,
}: AIQuizGeneratorModalProps) {
  useEffect(() => {
    if (open && course) {
      const fetchQuiz = async () => {
        const quiz = await generateAIQuiz({ topic: course });
        onAutofill(quiz); // ✅ passes correctIndex
      };

      const timer = setTimeout(fetchQuiz, 700);
      return () => clearTimeout(timer);
    }
  }, [open, course, onAutofill]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-[400px] text-center"
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          Generating Quiz for <span className="text-blue-600">{course}</span>...
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          AI is preparing your question and options. You can edit them afterward.
        </p>

        <div className="flex justify-center">
          <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <Button
          onClick={onClose}
          className="mt-5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg"
        >
          Close
        </Button>
      </motion.div>
    </div>
  );
}
