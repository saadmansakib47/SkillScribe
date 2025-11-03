import Link from 'next/link';
import { getQuizById } from '../../../../../../lib/quizzes';
import { COURSES } from '../../../../../../lib/courses';
import QuizRunner from './QuizRunner';

type Props = {
  params: { id: string; quizId: string } | Promise<{ id: string; quizId: string }>;
};

export default async function QuizPage({ params }: Props) {
  const unwrapped = (await params) as { id: string; quizId: string };
  const courseId = Number(unwrapped.id);
  const quizId = Number(unwrapped.quizId);

  const course = COURSES.find((c) => c.id === courseId);
  const quiz = getQuizById(quizId);

  if (!course) {
    return (
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">Course not found</h2>
          <p className="mt-2 text-gray-600">The course you are looking for does not exist.</p>
          <Link href="/learner/allcourses" className="inline-block mt-4 hover:underline" style={{ color: '#094CA4' }}>
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">Quiz not found</h2>
          <p className="mt-2 text-gray-600">The quiz you are looking for does not exist.</p>
          <Link
            href={`/learner/course/${courseId}/player`}
            className="inline-block mt-4 hover:underline"
            style={{ color: '#094CA4' }}
          >
            Back to course
          </Link>
        </div>
      </div>
    );
  }

  // TODO: Add enrollment check here — for now assume user is enrolled
  // if (!isUserEnrolledInCourse(userId, courseId)) { return <NotEnrolled /> }

  return (
    <main className="py-12 bg-[#FAF7F3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href={`/learner/course/${courseId}/player`}
            className="inline-flex items-center hover:underline mb-6"
            style={{ color: '#094CA4' }}
          >
            ← Back to {course.title}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{quiz.title}</h1>
          {quiz.description && <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{quiz.description}</p>}
        </div>

        {/* Quiz Runner */}
        <QuizRunner quiz={quiz} courseId={courseId} />
      </div>
    </main>
  );
}
