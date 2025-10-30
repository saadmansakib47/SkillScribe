"use client";

import { useMemo, useState } from 'react';
import CourseModules from '../../../../../components/course/CourseModules';
import type { Course } from '../../../../../lib/courses';

type Props = { course: Course };

export default function PlayerClient({ course }: Props) {
  const [tab, setTab] = useState<'Overview' | 'Resources' | 'Reviews' | 'Quizzes' | 'Certificate'>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Aggregate resources from modules -> topics only (exclude top-level course.resources)
  const aggregatedResources = useMemo(() => {
    const list: { title: string; size?: string; file?: string; source?: string }[] = [];
    (course.modules || []).forEach((m) => {
      (m.topics || []).forEach((t) => {
        (t.resources || []).forEach((res) => list.push({ ...res, source: `${m.title} › ${t.title}` }));
      });
    });
    return list;
  }, [course]);

  // Create a dummy PDF (base64) and trigger download when user clicks "Download PDF"
  const downloadResourcesPdf = () => {
    try {
      // Minimal one-page PDF (dummy) in base64. This is a small placeholder PDF.
      const pdfBase64 =
        'JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9UeXBlIC9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXMgPDwvRm9udCA8PC9GMSA1IDAgUj4+Pj4vQ29udGVudHMgNiAwIFIvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXT4+CmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQvU3ViVHlwZSAvVHlwZTEvQmFzZUZvbnQgL0hlbHZldGljYT4+CmVuZG9iago2IDAgb2JqCjw8L0xlbmd0aCA0Mj4+CnN0cmVhbQpCVAovRjEgMTIgVGYKMTAgNzIwIFRkCihSZXNvdXJjZXMgUmVzb3VyY2VzKQpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZSAvUGFnZXMvS2lkcyBbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKc3RhcnR4cmVmCjQzMwolJUVPRgo=';

      // decode base64 to binary
      const byteChars = atob(pdfBase64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resources.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
  } catch {
      // fallback: generate a TXT file with resource list
      const txt = (course.modules || [])
        .flatMap((m) => (m.topics || []).flatMap((t) => (t.resources || []).map((r) => `${m.title} › ${t.title} - ${r.title}`)))
        .join('\n') || 'No resources.';
      const blob = new Blob([txt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resources.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  };

  // Download a single resource by fetching it and saving as a blob.
  // This provides a nicer fallback and shows an error if the file cannot be fetched (e.g., dev server down).
  const downloadResource = (file?: string, title?: string) => {
    // For now, create a small dummy PDF (same approach as Download All) so every
    // resource button produces a consistent download experience without depending
    // on the dev server or real files. Replace later with real fetch/download logic.
    const pdfBase64 =
      'JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9UeXBlIC9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXMgPDwvRm9udCA8PC9GMSA1IDAgUj4+Pj4vQ29udGVudHMgNiAwIFIvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXT4+CmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQvU3ViVHlwZSAvVHlwZTEvQmFzZUZvbnQgL0hlbHZldGljYT4+CmVuZG9iago2IDAgb2JqCjw8L0xlbmd0aCA0Mj4+CnN0cmVhbQpCVAovRjEgMTIgVGYKMTAgNzIwIFRkCihSZXNvdXJjZXMgUmVzb3VyY2VzKQpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZSAvUGFnZXMvS2lkcyBbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKc3RhcnR4cmVmCjQzMwolJUVPRgo=';

    const byteChars = atob(pdfBase64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = title ? `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf` : (file?.split('/').pop() || 'resource.pdf');
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // selected lesson (moduleId + topicId)
  const initialLesson = useMemo(() => {
    const m = course.modules && course.modules.length > 0 ? course.modules[0] : undefined;
    const t = m && m.topics && m.topics.length > 0 ? m.topics[0] : undefined;
    return t ? { moduleId: m!.id, topicId: t.id, title: t.title } : null;
  }, [course]);

  const [currentLesson, setCurrentLesson] = useState<{ moduleId: number; topicId: number; title: string } | null>(initialLesson);

  return (
    <div>
      {/* Player area */}
      <div className="relative">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
          {/* 16:9 container */}
          <div className="w-full" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
                      <path d="M5 3v18l15-9L5 3z" fill="#0b4ca6" />
                    </svg>
                  </div>
                </div>

                {/* lesson title badge */}
                {currentLesson && (
                  <div className="absolute left-6 bottom-16 bg-white/90 px-3 py-1 rounded-md text-sm font-medium shadow">{currentLesson.title}</div>
                )}
              </div>

              {/* fake control bar */}
              <div className="h-14 bg-gradient-to-t from-black/60 to-transparent flex items-center px-4 gap-4">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                  ►
                </button>
                <div className="text-xs text-white bg-white/10 px-2 py-1 rounded">0:00 / 0:00</div>
                <div className="flex-1">
                  <div className="h-2 bg-white/20 rounded overflow-hidden">
                    <div className="h-2 bg-blue-400" style={{ width: '0%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/90">CC</button>
                  <button className="text-white/90">⤢</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modules opener at top-right of player */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden lg:flex absolute right-2 top-2 z-50 bg-white border rounded-md px-3 py-2 items-center gap-2 shadow-md"
          aria-label="Open course modules"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-700">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#0b4ca6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium">Modules</span>
        </button>
      </div>

      <div className="mt-4 flex gap-3 items-center">
        {(['Overview', 'Resources', 'Reviews', 'Quizzes', 'Certificate'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md ${tab === t ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {tab === 'Overview' && (
            <div>
              <h3 className="text-2xl font-semibold">{course.title}</h3>
              <div className="mt-3 text-gray-700">{course.description}</div>
            </div>
          )}

          {tab === 'Resources' && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Resources</h3>
                <div>
                  <button
                    onClick={downloadResourcesPdf}
                    className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                  >
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {aggregatedResources.length === 0 && <div className="text-gray-600">No resources for this course.</div>}
                {aggregatedResources.map((r, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-md border flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-gray-500">{r.source}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">{r.size ?? ''}</div>
                      {r.file ? (
                        <button
                          onClick={() => downloadResource(r.file, r.title)}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-white border rounded text-sm text-blue-600 hover:bg-blue-50"
                        >
                          Download
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">No file</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Reviews' && (
            <div>
              <h3 className="text-2xl font-semibold">Reviews</h3>
              <div className="mt-4 text-gray-600">Reviews UI placeholder.</div>
            </div>
          )}

          {tab === 'Quizzes' && (
            <div>
              <h3 className="text-2xl font-semibold">Quizzes</h3>
              <div className="mt-4 text-gray-600">Quizzes UI placeholder.</div>
            </div>
          )}

          {tab === 'Certificate' && (
            <div>
              <h3 className="text-2xl font-semibold">Certificate</h3>
              <div className="mt-4 text-gray-600">Certificate UI placeholder.</div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="hidden lg:block">
            {/* Desktop: show overlay-styled sticky panel */}
            <CourseModules
              modules={course.modules ?? []}
              outcomes={[]}
              showOnlyTopics
              showAsOverlay
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onTopicSelect={(moduleId, topicId) => {
                const m = (course.modules || []).find((x) => x.id === moduleId);
                const t = m?.topics?.find((x) => x.id === topicId);
                if (t) setCurrentLesson({ moduleId, topicId, title: t.title });
              }}
            />
          </div>

          <div className="block lg:hidden">
            {/* Mobile: a compact modules button to open sidebar */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full bg-white border rounded-lg py-2 text-sm font-medium"
            >
              Open Modules
            </button>
            {/* Render inline modules when open on small screens */}
            {sidebarOpen && (
              <div className="mt-3">
                <CourseModules
                  modules={course.modules ?? []}
                  outcomes={[]}
                  showOnlyTopics
                  onTopicSelect={(moduleId, topicId) => {
                    const m = (course.modules || []).find((x) => x.id === moduleId);
                    const t = m?.topics?.find((x) => x.id === topicId);
                    if (t) setCurrentLesson({ moduleId, topicId, title: t.title });
                    setSidebarOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
