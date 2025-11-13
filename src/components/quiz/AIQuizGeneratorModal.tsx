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

// ------------------------
// Real AI Integration
// ------------------------
export async function generateAIQuiz({
  topic,
}: GenerateAIQuizParams): Promise<GeneratedQuizData> {
  const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
  if (!apiKey) throw new Error("AI API key is not set in .env");

  const prompt = `
Generate a single quiz question for the topic "${topic}".
Provide 4 answer options.
Indicate which option is correct by returning its index (0-3).
Respond in JSON format:
{
  "question": "Your question here",
  "options": ["Option1", "Option2", "Option3", "Option4"],
  "correctIndex": 0
}
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 250,
    }),
  });

  const data = await res.json();

  // Extract content from OpenAI response
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  try {
    const parsed: GeneratedQuizData = JSON.parse(content);
    return parsed;
  } catch {
    // fallback in case AI response isn't valid JSON
    return {
      question: `Sample question about ${topic}?`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctIndex: 0,
    };
  }
}

interface AIQuizGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  course: string;
  onAutofill: (data: { question: string; options: string[]; correctIndex: number }) => void;
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
        try {
          const quiz = await generateAIQuiz({ topic: course });
          onAutofill(quiz); // passes correctIndex
        } catch (err) {
          console.error("AI Quiz generation failed:", err);
          alert("⚠️ Failed to generate quiz. Try again.");
        }
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
