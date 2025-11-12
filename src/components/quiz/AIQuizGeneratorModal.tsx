"use client";

interface GenerateAIQuizParams {
  topic: string;
}

interface GeneratedQuizData {
  question: string;
  options: string[];
  correctIndex: number;
}

// Stubbed AI generation logic
export async function generateAIQuiz({ topic }: GenerateAIQuizParams): Promise<GeneratedQuizData> {
  // simulate API delay
  await new Promise((r) => setTimeout(r, 800));

  // For now, return mocked AI output based on topic
  const samples: Record<string, GeneratedQuizData> = {
    "HTML": {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<div>", "<a>", "<link>", "<href>"],
      correctIndex: 1,
    },
    "JavaScript": {
      question: "What keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "define", "constant"],
      correctIndex: 0,
    },
    "React": {
      question: "Which hook is used to manage state in React components?",
      options: ["useClass", "useData", "useState", "useValue"],
      correctIndex: 2,
    },
  };

  // return stubbed topic or fallback
  return samples[topic] || {
    question: `Sample question about ${topic}?`,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctIndex: 0,
  };
}
