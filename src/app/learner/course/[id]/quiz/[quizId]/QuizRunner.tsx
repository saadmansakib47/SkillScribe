'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Quiz } from '../../../../../../lib/quizzes';

type QuizRunnerProps = {
  quiz: Quiz;
  courseId: number;
};

export default function QuizRunner({ quiz, courseId }: QuizRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== null;

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      // correctAnswer is 1-based, but array indices are 0-based
      if (selectedAnswers[index] === question.correctAnswer - 1) {
        correct++;
      }
    });
    return correct;
  };

  const allQuestionsAnswered = selectedAnswers.every((answer) => answer !== null);

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e6ded9]">
          <h2 className="text-3xl font-semibold text-center mb-6">
            {passed ? ' Congratulations!' : ' Keep Learning!'}
          </h2>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
              {percentage}%
            </div>
            <p className="text-lg text-gray-700">
              You scored {score} out of {totalQuestions} questions correctly
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold mb-4">Review Your Answers</h3>
            {quiz.questions.map((question, qIndex) => {
              const userAnswer = selectedAnswers[qIndex];
              // correctAnswer is 1-based, but array indices are 0-based
              const isCorrect = userAnswer === question.correctAnswer - 1;
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        {qIndex + 1}. {question.text}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Your answer:</span>{' '}
                        {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-medium">Correct answer:</span>{' '}
                          {question.options[question.correctAnswer - 1]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswers(new Array(quiz.questions.length).fill(null));
              }}
              className="px-6 py-3 text-white rounded-lg font-medium transition"
              style={{ backgroundColor: '#094CA4' }}
            >
              Retake Quiz
            </button>
            <Link
              href={`/learner/course/${courseId}/player`}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 transition"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e6ded9]">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span>
              {selectedAnswers.filter((a) => a !== null).length} / {totalQuestions} answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`, backgroundColor: '#094CA4' }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6">{currentQuestion.text}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    isSelected
                      ? ''
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                  style={isSelected ? { borderColor: '#094CA4', backgroundColor: '#e0f2fe' } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'bg-white' : 'border-gray-400'
                      }`}
                      style={isSelected ? { borderColor: '#094CA4', backgroundColor: '#094CA4' } : {}}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                  index === currentQuestionIndex
                    ? 'text-white'
                    : selectedAnswers[index] !== null
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
                style={index === currentQuestionIndex ? { backgroundColor: '#094CA4' } : {}}
                title={`Question ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 transition"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className="px-6 py-2 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
              style={{ backgroundColor: '#094CA4' }}
            >
              Next
            </button>
          )}
        </div>

        {/* Helper text */}
        {!allQuestionsAnswered && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Please answer all questions before submitting the quiz
          </p>
        )}
      </div>
    </div>
  );
}
