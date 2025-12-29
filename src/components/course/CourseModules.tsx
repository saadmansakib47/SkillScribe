"use client";

import { useState, useMemo } from 'react';

type Resource = { title: string; size?: string; file?: string };
type Topic = { id: number; title: string; resources?: Resource[] };
type Module = { id: number; title: string; lectures: number; duration?: string; topics?: Topic[] };

export default function CourseModules({
  modules,
  outcomes,
  showOnlyTopics,
  onTopicSelect,
  showAsOverlay,
  open = true,
  onClose,
}: {
  modules?: Module[];
  topResources?: Resource[];
  outcomes?: string[];
  // when true, the right column shows only module topics/lectures (no resources/outcomes)
  showOnlyTopics?: boolean;
  // optional callback when a topic (lecture) is clicked: (moduleId, topicId)
  onTopicSelect?: (moduleId: number, topicId: number) => void;
  // when true, render the sidebar as an overlay fixed panel on the right
  showAsOverlay?: boolean;
  // overlay open state
  open?: boolean;
  // called when the overlay close button is clicked
  onClose?: () => void;
}) {
  const m = useMemo(() => modules || [], [modules]);
  const [selectedId, setSelectedId] = useState<number | null>(m.length > 0 ? m[0].id : null);
  const [showAllModules, setShowAllModules] = useState(false);

  const selected = useMemo(() => m.find((mod) => mod.id === selectedId) ?? null, [m, selectedId]);

  // aggregate resources for selected module
  const moduleResources: Resource[] = useMemo(() => {
    if (!selected || !selected.topics) return [];
    return selected.topics.flatMap((t) => t.resources ?? []);
  }, [selected]);

  if (showOnlyTopics) {
    if (showAsOverlay) {
      // overlay panel
      return (
        <>
          {/* backdrop */}
          {open && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={onClose}
              aria-hidden
            />
          )}

          <div
            className={`fixed top-0 right-0 h-full w-[380px] max-w-full bg-white border-l shadow-lg z-50 transform transition-transform duration-200 ease-in-out ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-hidden={!open}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Course Modules</h3>
                <button onClick={onClose} className="p-1 rounded-md bg-gray-100 hover:bg-gray-200">×</button>
              </div>

              <div className="overflow-auto">
                <div className="space-y-3">
                  {m.map((mod, modIdx) => {
                    const expanded = selectedId === mod.id;
                    return (
                      <div key={mod.id} className="bg-white rounded-lg border">
                        <button
                          onClick={() => setSelectedId(mod.id)}
                          className="w-full flex items-center justify-between p-3 rounded-t-lg bg-[#fbf7f2]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700">{modIdx + 1}.</div>
                            <div>
                              <div className="font-medium text-gray-900">{mod.title}</div>
                              <div className="text-xs text-gray-500">{mod.lectures} lessons</div>
                            </div>
                          </div>
                          <div className="text-gray-500">{expanded ? '▾' : '▸'}</div>
                        </button>

                        <div className={`transition-[max-height] duration-200 overflow-hidden ${expanded ? 'max-h-[800px]' : 'max-h-0'}`}>
                          <div className="p-3 space-y-2">
                            {mod.topics && mod.topics.length > 0 ? (
                              mod.topics.map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => onTopicSelect?.(mod.id, t.id)}
                                  className="w-full text-left flex items-start gap-3 p-2 rounded hover:bg-gray-50"
                                >
                                  <div className="mt-1 w-3 h-3 rounded-full border border-gray-300" />
                                  <div>
                                    <div className="text-sm font-medium">{t.title}</div>
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className="text-sm text-gray-500">No topics</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    // Render a single-column sidebar with accordion-like modules and topic lists
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Course Modules</h3>
          <button className="text-gray-500 text-lg leading-none">×</button>
        </div>

        <div className="space-y-3">
          {m.map((mod, modIdx) => {
            const expanded = selectedId === mod.id;
            return (
              <div key={mod.id} className="bg-white rounded-lg border">
                <button
                  onClick={() => setSelectedId(mod.id)}
                  className="w-full flex items-center justify-between p-3 rounded-t-lg bg-[#fbf7f2]"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold text-gray-700">{modIdx + 1}.</div>
                    <div>
                      <div className="font-medium text-gray-900">{mod.title}</div>
                      <div className="text-xs text-gray-500">{mod.lectures} lessons</div>
                    </div>
                  </div>
                  <div className="text-gray-500">{expanded ? '▾' : '▸'}</div>
                </button>

                {expanded && (
                  <div className="p-3 space-y-2">
                      {mod.topics && mod.topics.length > 0 ? (
                      mod.topics.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => onTopicSelect?.(mod.id, t.id)}
                          className="w-full text-left flex items-start gap-3 p-2 rounded hover:bg-gray-50"
                        >
                          <div className="mt-1 w-3 h-3 rounded-full border border-gray-300" />
                          <div>
                            <div className="text-sm font-medium">{t.title}</div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No topics</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default two-column layout: modules + resources/outcomes
  const displayedModules = showAllModules ? m : m.slice(0, 3);
  const hasMoreModules = m.length > 3;

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Modules</h3>
        <div className="space-y-3">
          {displayedModules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setSelectedId(mod.id)}
              className={`w-full text-left p-4 rounded-xl border ${selectedId === mod.id ? 'border-black bg-white' : 'border-gray-100 bg-[#fffaf8]'} hover:shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{mod.title}</div>
                <div className="text-sm text-gray-600">{mod.lectures} Lectures · {mod.duration ?? ''}</div>
              </div>
              {mod.topics && mod.topics.length > 0 && (
                <div className="mt-2 text-sm text-gray-700">
                  {mod.topics.slice(0, 3).map((t) => (
                    <div key={t.id} className="truncate">• {t.title}</div>
                  ))}
                  {mod.topics.length > 3 && <div className="text-xs text-gray-500 mt-1">and {mod.topics.length - 3} more topics</div>}
                </div>
              )}
            </button>
          ))}

          {hasMoreModules && !showAllModules && (
            <button
              onClick={() => setShowAllModules(true)}
              className="w-full text-center p-3 rounded-xl border border-[#094CA4] bg-white text-[#094CA4] font-medium hover:bg-[#094CA4] hover:text-white transition-colors"
            >
              Show More ({m.length - 3} more {m.length - 3 === 1 ? 'module' : 'modules'})
            </button>
          )}

          {hasMoreModules && showAllModules && (
            <button
              onClick={() => setShowAllModules(false)}
              className="w-full text-center p-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      <aside>
        <h3 className="text-xl font-semibold mb-4">Resources List</h3>
        <div className="space-y-2">
          {m.length > 0 ? (
            m.map((mod) => (
              <div 
                key={mod.id} 
                className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{mod.title}</div>
                    <div className="text-xs text-gray-500">
                      {mod.topics && mod.topics.length > 0 
                        ? `${mod.topics.flatMap(t => t.resources || []).length} files` 
                        : '0 files'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    // Create a dummy PDF and trigger download
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
                    a.download = `${mod.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_resources.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Download resources"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600">No modules available.</div>
          )}

          {/* outcomes */}
          {outcomes && outcomes.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded-xl border-2 border-gray-200">
              <h4 className="font-semibold mb-3 text-gray-900">What you'll learn</h4>
              <ul className="space-y-2 text-sm">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-700">• {o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
