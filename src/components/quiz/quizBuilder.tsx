"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AIQuizGeneratorModal from "@/components/quiz/AIQuizGeneratorModal";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface QuizBuilderProps {
  course: string;
}

export default function QuizBuilder({ course }: QuizBuilderProps) {
  const quizTitle = "Sample Quiz";

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q1",
      text: "What is the primary purpose of HTML in web development?",
      options: [
        { id: "a", text: "To style web pages", isCorrect: false },
        { id: "b", text: "To structure content on web pages", isCorrect: true },
        { id: "c", text: "To add interactivity to web pages", isCorrect: false },
        { id: "d", text: "To manage databases", isCorrect: false },
      ],
    },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handlePreview = () => setShowPreview(true);
  const handleExitPreview = () => setShowPreview(false);
  const handlePublish = () => alert("✅ Quiz published successfully!");

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text: value } : q))
    );
  };

  const handleOptionChange = (qid: string, oid: string, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? { ...q, options: q.options.map((opt) => opt.id === oid ? { ...opt, text: value } : opt) }
          : q
      )
    );
  };

  const toggleCorrect = (qid: string, oid: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? { ...q, options: q.options.map((opt) => opt.id === oid ? { ...opt, isCorrect: !opt.isCorrect } : opt) }
          : q
      )
    );
  };

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`;
    setQuestions((prev) => [
      ...prev,
      {
        id: newId,
        text: "",
        options: [
          { id: "a", text: "", isCorrect: false },
          { id: "b", text: "", isCorrect: false },
          { id: "c", text: "", isCorrect: false },
          { id: "d", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const addOption = (qid: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
            ...q,
            options: [
              ...q.options,
              { id: String.fromCharCode(97 + q.options.length), text: "", isCorrect: false },
            ],
          }
          : q
      )
    );
  };

  const removeQuestion = (id: string) => setQuestions((prev) => prev.filter((q) => q.id !== id));
  const removeOption = (qid: string, oid: string) =>
    setQuestions((prev) =>
      prev.map((q) => (q.id === qid ? { ...q, options: q.options.filter((opt) => opt.id !== oid) } : q))
    );

  // -----------------------------
  // AI Generation
  // -----------------------------
  const handleGenerateAI = (questionId: string) => {
    if (!course) return alert("⚠️ Please select a course first!");
    setCurrentQuestionId(questionId);
    setAiModalOpen(true);
  };

  const handleAutofill = (data: { question: string; options: string[]; correctIndex: number }) => {
    if (!currentQuestionId) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === currentQuestionId
          ? {
            ...q,
            text: data.question,
            options: q.options.map((opt, i) => ({
              ...opt,
              text: data.options[i] || "",
              isCorrect: i === data.correctIndex, // ✅ AI sets the correct option
            })),
          }
          : q
      )
    );

    setAiModalOpen(false);
  };

  // -----------------------------
  // Preview Mode
  // -----------------------------
  if (showPreview) {
    return (
      <div className="mt-10 bg-[#fdfaf7] p-6 rounded-[8px]">
        <h3 className="text-lg font-semibold mb-4">Preview Mode — {quizTitle}</h3>
        {questions.map((q, qi) => (
          <div key={q.id} className="border-2 border-blue-200 rounded-[8px] p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-3">
              {qi + 1}. {q.text}
            </h4>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <div
                  key={opt.id}
                  className={`flex items-center gap-2 bg-white border ${opt.isCorrect ? "border-green-400" : "border-gray-300"
                    } rounded-[8px] px-3 py-2 hover:bg-gray-50 cursor-pointer`}
                >
                  <div className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded-full text-xs text-gray-700">
                    {String.fromCharCode(65 + oi)}
                  </div>
                  <span>{opt.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <Button onClick={handleExitPreview} className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-[8px]">
            Exit Preview
          </Button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Builder Mode
  // -----------------------------
  return (
    <div className="mt-10 w-[70%] bg-[#fdfaf7] p-6 rounded-[8px] mx-auto my-8 shadow-md">
      <h3 className="text-lg font-semibold text-center mb-4">Q U I Z E D I T O R</h3>
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={q.id} className="border-2 border-dashed border-blue-300 rounded-[8px] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-gray-800">Question {qi + 1}</h4>
                <Button
                  type="button"
                  className="border border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 text-sm rounded-[8px] px-3 py-1"
                  onClick={() => handleGenerateAI(q.id)}
                >
                  Generate with AI
                </Button>
              </div>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-[8px]"
                onClick={() => removeQuestion(q.id)}
              >
                Remove
              </Button>
            </div>

            <hr className="border-black my-3" />

            <Input
              placeholder="Enter question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(q.id, e.target.value)}
              className="mb-3 border-black"
              style={{ borderRadius: "8px" }}
            />

            <div>
              <Label className="mb-1 block text-sm text-gray-700">Answer Options</Label>
              <div className="space-y-3">
                {q.options.map((opt, oi) => (
                  <div key={opt.id} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 text-gray-600 text-sm font-medium">
                      {String.fromCharCode(65 + oi)}
                    </div>

                    <Input
                      value={opt.text}
                      placeholder="Enter answer option"
                      onChange={(e) => handleOptionChange(q.id, opt.id, e.target.value)}
                      className="w-[320px] md:w-[400px] border-gray-500"
                      style={{ borderRadius: "8px" }}
                    />

                    <Button
                      type="button"
                      onClick={() => toggleCorrect(q.id, opt.id)}
                      className={`flex items-center gap-1 text-sm rounded-[8px] px-2 py-1 ${opt.isCorrect
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                    >
                      {opt.isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {opt.isCorrect ? "Correct" : "Wrong"}
                    </Button>

                    <button
                      onClick={() => removeOption(q.id, opt.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => addOption(q.id)}
                className="mt-3 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm rounded-[8px]"
              >
                + Add Option
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          onClick={addQuestion}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-2 text-sm rounded-[8px]"
        >
          <Plus size={16} /> Add New Question
        </Button>

        <div className="flex gap-3">
          <Button onClick={handlePreview} className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-[8px]">
            Preview
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600 rounded-[8px]">Cancel</Button>
          <Button onClick={handlePublish} className="bg-green-500 text-white hover:bg-green-600 rounded-[8px]">
            Publish Quiz
          </Button>
        </div>
      </div>

      <AIQuizGeneratorModal
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        course={course}
        onAutofill={handleAutofill}
      />
    </div>
  );
}
