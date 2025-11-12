"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function QuizCreator() {
  const [quizData, setQuizData] = useState({
    title: "",
    totalQuestions: "",
    timeLimit: "",
    questionType: "",
    optionsPerQuestion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  return (
    <Card className="bg-[#FAF7F3] border border-gray-200 w-[60%] display-flex justify-content-center mx-auto my-8 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Add Quiz</CardTitle>
        <Button variant="outline" className="flex items-center gap-2 rounded-[8px]">
          <Plus size={18} /> Add Quiz
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Quiz Title */}
        <div className="justify-start">
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter quiz title"
            value={quizData.title}
            onChange={handleChange}
            className="mt-1"
            style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
          />
        </div>

        {/* Time Limit */}
        <div className="justify-end">
          <Label htmlFor="timeLimit">Time (limit) Minutes</Label>
          <Input
            id="timeLimit"
            name="timeLimit"
            placeholder="e.g. 25"
            value={quizData.timeLimit}
            onChange={handleChange}
            className="mt-1"
            style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
          />
        </div>

        {/* Total Questions */}
        <div>
          <Label htmlFor="totalQuestions">Total Number of Questions</Label>
          <Input
            id="totalQuestions"
            name="totalQuestions"
            placeholder="e.g. 20"
            value={quizData.totalQuestions}
            onChange={handleChange}
            className="mt-1"
            style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Specify how many questions will be in this quiz
          </p>
        </div>

        {/* Question Type */}
        <div>
          <Label htmlFor="questionType">Type of Question *</Label>
          <Input
            id="questionType"
            name="questionType"
            placeholder="Multiple Choice Questions (MCQ)"
            value={quizData.questionType}
            onChange={handleChange}
            className="mt-1"
            style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
          />
        </div>

        {/* Options per Question */}
        <div className="md:col-span-2">
          <Label htmlFor="optionsPerQuestion">
            Number of Options per Question (for MCQ) *
          </Label>
          <Input
            id="optionsPerQuestion"
            name="optionsPerQuestion"
            placeholder="e.g. 4"
            value={quizData.optionsPerQuestion}
            onChange={handleChange}
            className="mt-1"
            style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
          />
          <p className="text-xs text-gray-500 mt-1">
            This will apply to all questions in this quiz
          </p>
        </div>

        {/* Preview Box */}
        <div className="md:col-span-2 mt-2 bg-blue-50 border border-blue-200 rounded-[8px] p-4 text-sm text-gray-700">
          <p className="font-medium mb-1">Current Quiz Preview:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Type: {quizData.questionType || "Multiple Choice Questions (MCQ)"}
            </li>
            <li>
              Questions: {quizData.totalQuestions || "20"} | Options per Question:{" "}
              {quizData.optionsPerQuestion || "4"} | Time:{" "}
              {quizData.timeLimit || "25"} minutes
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
