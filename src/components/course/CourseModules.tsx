"use client";

import { useState, useMemo } from 'react';

type Resource = { title: string; size?: string; file?: string };
type Topic = { id: number; title: string; resources?: Resource[] };
type Module = { id: number; title: string; lectures: number; duration?: string; topics?: Topic[] };

export default function CourseModules({
  modules,
  topResources,
  outcomes,
}: {
  modules?: Module[];
  topResources?: Resource[];
  outcomes?: string[];
}) {
  const m = useMemo(() => modules || [], [modules]);
  const [selectedId, setSelectedId] = useState<number | null>(m.length > 0 ? m[0].id : null);

  const selected = useMemo(() => m.find((mod) => mod.id === selectedId) ?? null, [m, selectedId]);

  // aggregate resources for selected module
  const moduleResources: Resource[] = useMemo(() => {
    if (!selected || !selected.topics) return [];
    return selected.topics.flatMap((t) => t.resources ?? []);
  }, [selected]);

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Modules</h3>
        <div className="space-y-3">
          {m.map((mod) => (
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
        </div>
      </div>

      <aside>
        <h3 className="text-xl font-semibold mb-4">Resources</h3>
        <div className="space-y-2">
          {moduleResources.length > 0 ? (
            moduleResources.map((r, i) => (
              <a key={i} href={r.file} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-white p-3 rounded-md border text-sm">
                <div className="truncate">{r.title}</div>
                <div className="text-xs text-gray-500">{r.size ?? ''}</div>
              </a>
            ))
          ) : (
            <div className="text-sm text-gray-600">Select a module to view its resources.</div>
          )}

          {/* outcomes */}
          {outcomes && outcomes.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">What you will learn</h4>
              <ul className="list-disc ml-5 text-gray-700 space-y-1 text-sm">
                {outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
