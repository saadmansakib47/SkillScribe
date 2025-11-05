import Image from 'next/image';
import Link from 'next/link';
import { COURSES } from '../../../../lib/courses';
import CourseModules from '../../../../components/course/CourseModules';
import CourseActions from '../../../../components/course/CourseActions';

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: Props) {
  // In some Next.js versions params may be a Promise; await to be safe.
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

  // use modules/outcomes/resources from shared data; fall back to sensible defaults
  const modules = course.modules ?? [];
  const outcomes = course.whatYouWillLearn ?? [];
  const resources = course.resources ?? [];

  // Compute related courses by simple relevance scoring:
  // - +3 points for each overlapping "whatYouWillLearn" item
  // - +1 point if level matches
  // - +0.5 point for each overlapping significant word in the title
  // Fallback: if all scores are zero, pick a small random sample so related looks varied.
  const computeRelated = () => {
    const base = COURSES.filter((c) => c.id !== course.id);

    const normalize = (s = '') => s.toLowerCase();
    const titleWords = (s = '') =>
      normalize(s)
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w && w.length > 2);

    const courseOutcomes = (course.whatYouWillLearn || []).map((o) => normalize(o));

    const scored = base.map((c) => {
      let score = 0;

      // overlap in outcomes
      const otherOutcomes = (c.whatYouWillLearn || []).map((o) => normalize(o));
      for (const o of otherOutcomes) {
        if (courseOutcomes.includes(o)) score += 3;
      }

      // level match
      if (course.level && c.level && normalize(course.level) === normalize(c.level)) score += 1;

      // title word overlap
      const leftWords = titleWords(course.title || '');
      const rightWords = titleWords(c.title || '');
      for (const w of leftWords) {
        if (rightWords.includes(w)) score += 0.5;
      }

      return { course: c, score };
    });

    // sort by score desc, then rating desc
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.course.rating || 0) - (a.course.rating || 0);
    });

    // Hybrid behavior: take positive scored items first, then pad with the best remaining
    const positive = scored.filter((s) => s.score > 0).map((s) => s.course);
    if (positive.length >= 3) return positive.slice(0, 3);

    const picked = [...positive];
    // Flatten full sorted list to courses
    const allSorted = scored.map((s) => s.course);
    for (const c of allSorted) {
      if (picked.length >= 3) break;
      if (!picked.find((p) => p.id === c.id)) picked.push(c);
    }

    return picked.slice(0, 3);
  };

  const related = computeRelated();

  return (
    <main className="py-12 bg-[#fffaf8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#e6ded9]">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-gray-900">{course.title}</h1>
                <p className="mt-3 text-gray-700">{course.shortDescription ?? course.description}</p>

                <CourseActions course={course} />
              </div>

              <div className="w-full lg:w-80 relative">
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <Image src={course.image} alt={course.title} width={700} height={420} className="w-full h-48 object-cover" />
                </div>
                <div className="absolute right-4 top-40 bg-yellow-50 text-gray-900 px-3 py-1 rounded-lg border border-[#e2c37a] font-medium">{course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}</div>
              </div>
            </div>

            {/* Description and details */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
              <div className="mt-3 text-gray-700">
                <p>{course.description}</p>
              </div>
            </section>

            {/* Modules (left) + Resources (right) — client component handles selection and aggregation */}
            <CourseModules modules={modules} topResources={resources} outcomes={outcomes} />

            {/* Related courses */}
            <section className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Related Course</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/learner/course/${r.id}`} className="block bg-white rounded-md border p-3 text-center">
                    <div className="h-24 mb-2 overflow-hidden">
                      <Image src={r.image} alt={r.title} width={300} height={160} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="text-sm font-medium">{r.title}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right column: instructor / stats */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <div className="flex items-center gap-4">
                <Image src={course.instructorImage} alt={course.instructorName} width={64} height={64} className="rounded-full" />
                <div>
                  <div className="font-medium">{course.instructorName}</div>
                  <div className="text-sm text-gray-600">Instructor</div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-gray-700">
                <div>Rating: <span className="font-medium">{course.rating}</span> ({course.reviews.toLocaleString()})</div>
                <div>Duration: <span className="font-medium">{course.durationHours} hr</span></div>
                <div>Level: <span className="font-medium">{course.level}</span></div>
                <div>Videos: <span className="font-medium">{course.totalVideos}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
