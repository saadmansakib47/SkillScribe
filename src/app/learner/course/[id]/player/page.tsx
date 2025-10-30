import Link from 'next/link';
import { COURSES } from '../../../../../lib/courses';
import PlayerClient from './PlayerClient';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function CoursePlayerPage({ params }: Props) {
  const unwrapped = (await params) as { id: string };
  const id = Number(unwrapped.id);
  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Course not found</h2>
          <p className="mt-2 text-gray-600">The course you are looking for does not exist.</p>
          <Link href="/learner/allcourses" className="inline-block mt-4 text-blue-600">Back to courses</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8 bg-[#fffaf8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <PlayerClient course={course} />
      </div>
    </main>
  );
}
