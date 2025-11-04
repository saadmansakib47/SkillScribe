"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function QuizBuilder() {
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
        {
            id: "q2",
            text: "Which CSS property is used to change the text color of an element?",
            options: [
                { id: "a", text: "font-color", isCorrect: false },
                { id: "b", text: "text-color", isCorrect: false },
                { id: "c", text: "color", isCorrect: true },
                { id: "d", text: "text-style", isCorrect: false },
            ],
        },
    ]);

    const addQuestion = () => {
        const newId = `q${questions.length + 1}`;
        setQuestions([
            ...questions,
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

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    return (
        <div className="mt-10 bg-[#fdfaf7] p-6 rounded-[8px]">
            <h3 className="text-lg font-semibold mb-4">Quiz Builder</h3>

            {/* Question Blocks */}
            <div className="space-y-6">
                {questions.map((q, qi) => (
                    <div
                        key={q.id}
                        className="border-2 border-dashed border-blue-300 rounded-[8px] p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800">
                                Question {qi + 1}
                            </h4>
                            <Button
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-[12px]"
                                onClick={() => removeQuestion(q.id)}
                            >
                                Remove
                            </Button>
                        </div>

                        {/* Question Text */}
                        <Input
                            placeholder="Enter question text"
                            value={q.text}
                            className="mb-3"
                            style={{ borderRadius: "8px" }}
                            readOnly
                        />

                        {/* Answer Options */}
                        <div>
                            <Label className="mb-1 block">Answer Option</Label>
                            <div className="space-y-4">
                                {q.options.map((opt, oi) => (
                                    <div key={opt.id} className="flex items-center gap-3">
                                        {/* Option letter (A, B, C, D) */}
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 text-gray-600 text-sm font-medium">
                                            {String.fromCharCode(65 + oi)}
                                        </div>

                                        {/* Input box with controlled width */}
                                        <Input
                                            value={opt.text}
                                            placeholder="Enter answer option"
                                            className="w-[350px] md:w-[400px] border-black"
                                            style={{ borderRadius: "8px" }}
                                            readOnly
                                        />

                                        {/* Correct/Wrong indicator */}
                                        <span
                                            className={`text-sm font-medium ${opt.isCorrect ? "text-green-600" : "text-red-500"
                                                }`}
                                        >
                                            {opt.isCorrect ? "Correct" : "Wrong"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between mt-6">
                <Button
                    onClick={addQuestion}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-2 text-sm"
                >
                    <Plus size={16} /> Add New Question
                </Button>

                <div className="flex gap-3">
                    <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-[8px]">
                        Save as Draft
                    </Button>

                    <Button className="bg-red-500 text-white hover:bg-red-600 rounded-[8px]">
                        Cancel
                    </Button>

                    <Button className="bg-green-500 text-white hover:bg-green-600 rounded-[8px]">
                        Publish Quiz
                    </Button>
                </div>
            </div>
        </div>
    );
}
