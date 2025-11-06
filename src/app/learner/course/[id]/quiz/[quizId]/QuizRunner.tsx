'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Quiz } from '../../../../../../lib/quizzes';

type QuizRunnerProps = {
  quiz: Quiz;
  courseId: number;
};

export default function QuizRunner({ quiz, courseId }: QuizRunnerProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  
  // Timer state - time in seconds
  const totalQuestions = quiz.questions.length;
  const totalTimeInMinutes = Math.ceil(totalQuestions * 1.5);
  const totalTimeInSeconds = totalTimeInMinutes * 60;
  
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInSeconds);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || showResults) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          clearInterval(timerRef.current!);
          setIsTimerActive(false);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, showResults]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get timer color based on time remaining
  const getTimerColor = () => {
    const percentageRemaining = (timeRemaining / totalTimeInSeconds) * 100;
    if (percentageRemaining <= 20) return '#EF4444'; // Red
    if (percentageRemaining <= 50) return '#F59E0B'; // Orange
    return '#094CA4'; // Blue
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsTimerActive(false);
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
                setSelectedAnswers(new Array(quiz.questions.length).fill(null));
                setTimeRemaining(totalTimeInSeconds);
                setIsTimerActive(true);
              }}
              className="px-6 py-3 text-white rounded-xl font-medium transition shadow-md hover:opacity-90"
              style={{ backgroundColor: '#094CA4' }}
            >
              Retake Quiz
            </button>
            <Link
              href={`/learner/course/${courseId}/player`}
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium border-2 border-gray-300 hover:bg-[#90B2DE] hover:border-[#90B2DE] transition-colors duration-150 shadow-sm"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Timer Display - Sticky at top */}
      <div className="sticky top-16 z-10 mb-6">
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200">
          <div className="flex items-center justify-center gap-8">
            {/* Timer Circle */}
            <div className="relative">
              <svg width="120" height="120" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={getTimerColor()}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - timeRemaining / totalTimeInSeconds)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
                />
              </svg>
              {/* Time in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: getTimerColor() }}>
                    {formatTime(timeRemaining)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timer Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke={getTimerColor()} strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke={getTimerColor()} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Time Remaining</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Complete all {totalQuestions} questions before time runs out
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="px-3 py-1 rounded-full bg-gray-100">
                  <span className="text-gray-600">Total: </span>
                  <span className="font-semibold text-gray-900">{totalTimeInMinutes} min</span>
                </div>
                <div className="px-3 py-1 rounded-full" style={{ backgroundColor: `${getTimerColor()}20` }}>
                  <span className="text-gray-600">Status: </span>
                  <span className="font-semibold" style={{ color: getTimerColor() }}>
                    {timeRemaining / totalTimeInSeconds > 0.5 ? 'On Track' : timeRemaining / totalTimeInSeconds > 0.2 ? 'Hurry Up' : 'Almost Done'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Card - Instructions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#094CA4' }}>Read the instructions carefully</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• You have {Math.ceil(totalQuestions * 1.5)} minutes to complete this quiz.</li>
          <li>• Select the best answer for each multiple-choice question.</li>
          <li>• Click Submit when you&apos;re finished.</li>
          <li>• Once submitted, you cannot change your answers.</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-6 text-sm text-gray-700">
          <p className="font-semibold">Questions: <span className="font-normal">{totalQuestions}</span></p>
          <p className="font-semibold">Time: <span className="font-normal">{Math.ceil(totalQuestions * 1.5)} minutes</span></p>
        </div>
      </div>

      {/* All Questions Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        {/* Questions */}
        <div className="space-y-8">
          {quiz.questions.map((question, qIndex) => (
            <div key={question.id}>
              {/* Question Number and Text */}
              <h3 className="text-lg font-bold mb-4" style={{ color: '#094CA4' }}>
                {qIndex + 1}. {question.text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[qIndex] === optionIndex;
                  const optionLabel = String.fromCharCode(65 + optionIndex); // A, B, C, D
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleSelectOption(qIndex, optionIndex)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-2 shadow-md'
                          : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      style={
                        isSelected
                          ? { borderColor: '#094CA4', backgroundColor: '#FAF7F3' }
                          : { backgroundColor: '#FFFFFF' }
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                            isSelected ? 'text-white' : 'text-gray-700 border-2 border-gray-300'
                          }`}
                          style={isSelected ? { backgroundColor: '#094CA4' } : { backgroundColor: '#FFFFFF' }}
                        >
                          {optionLabel}
                        </div>
                        <span className="flex-1 text-gray-800">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center">
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="px-8 py-3 text-white rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition shadow-md"
            style={{ backgroundColor: '#10b981' }}
          >
            Submit
          </button>
        </div>

        {/* Helper text */}
        {!allQuestionsAnswered && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Please answer all questions before submitting
          </p>
        )}
      </div>
    </div>
  );
}
