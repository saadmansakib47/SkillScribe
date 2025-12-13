"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import QuizCreator from "@/components/quiz/quizCreator";

export default function CreateQuizPage() 
{
  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Create New Quiz
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Design and configure your quiz for students
          </p>

          <QuizCreator />
        </main>
      </div>
    </InstructorLayout>
  );
}
