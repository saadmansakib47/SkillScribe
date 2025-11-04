"use client";

import InstructorLayout from "@/app/instructor/instructorlayout";
import QuizCreator from "@/components/quiz/quizCreator";
import QuizBuilder from "@/components/quiz/quizBuilder";

export default function CreateQuizPage() 
{
  return (
    <InstructorLayout>
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-2">Create New Quiz</h2>
          <p className="text-gray-500 mb-6">
            Design and configure your quiz for students
          </p>

          <QuizCreator />
          <QuizBuilder />
        </main>
      </div>
    </InstructorLayout>
  );
}
