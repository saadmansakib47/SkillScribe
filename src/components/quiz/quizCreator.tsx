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
import QuizBuilder from "@/components/quiz/quizBuilder";

interface QuizCreatorProps {
  onCourseSelect?: (course: string) => void;
}

export default function QuizCreator({ onCourseSelect }: QuizCreatorProps) {
  const [quizData, setQuizData] = useState({
    title: "",
    totalQuestions: "",
    timeLimit: "",
    questionType: "",
    optionsPerQuestion: "",
    course: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });

    // Lift course state if parent wants it
    if (name === "course" && onCourseSelect) {
      onCourseSelect(value);
    }
  };

  return (
    <div>
      <Card className="bg-[#FAF7F3] border border-gray-200 w-[60%] mx-auto my-8 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Add Quiz</CardTitle>
          <Button variant="outline" className="flex items-center gap-2 rounded-[8px]">
            <Plus size={18} /> Add Quiz
          </Button>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Quiz Title */}
          <div>
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
          <div>
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

          {/* Course Dropdown */}
          <div>
            <Label htmlFor="course">Course</Label>
            <select
              id="course"
              name="course"
              value={quizData.course}
              onChange={handleChange}
              className="mt-1 w-full border border-black text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" }}
            >
              <option value="">Select a course</option>
              <option value="React Fundamentals">React Fundamentals</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Object-Oriented Programming">
                Object-Oriented Programming
              </option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              AI will use this course to generate relevant questions
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
          <div className="md:col-span-1">
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
              <li>Course: {quizData.course || "Not selected"}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Pass selected course to QuizBuilder (includes correct/wrong assignment later) */}
      <QuizBuilder course={quizData.course} />
    </div>
  );
}
