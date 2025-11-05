"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Course } from '../../../../../lib/courses';
import { getQuizzesForCourse } from '../../../../../lib/quizzes';
import { getReviewsForCourse, type Review } from '../../../../../lib/reviews';

type Props = { course: Course };

export default function PlayerClient({ course }: Props) {
  const [tab, setTab] = useState<'Overview' | 'Resources' | 'Reviews' | 'Quizzes' | 'Certificate'>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });
  
  // Review state
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [userSubmittedReviews, setUserSubmittedReviews] = useState<Review[]>([]);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [userReplies, setUserReplies] = useState<Record<number, string>>({});

  // Generate stable certificate ID from course ID
  const certificateId = useMemo(() => {
    const hash = course.id * 7919; // Simple deterministic hash
    return `CERT-${course.id}-${hash.toString(36).toUpperCase().slice(0, 6)}`;
  }, [course.id]);

  // Load reviews for this course (memoized)
  const courseReviews = useMemo(() => getReviewsForCourse(course.id), [course.id]);
  
  // Combine user-submitted reviews with course reviews
  const reviews = useMemo(() => [...userSubmittedReviews, ...courseReviews], [userSubmittedReviews, courseReviews]);

  // Calculate rating breakdown from actual reviews
  const ratingBreakdown = useMemo(() => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        breakdown[review.rating as keyof typeof breakdown]++;
      }
    });
    
    const total = reviews.length || 1; // Avoid division by zero
    return [
      { star: 5, count: breakdown[5], percentage: Math.round((breakdown[5] / total) * 100) },
      { star: 4, count: breakdown[4], percentage: Math.round((breakdown[4] / total) * 100) },
      { star: 3, count: breakdown[3], percentage: Math.round((breakdown[3] / total) * 100) },
      { star: 2, count: breakdown[2], percentage: Math.round((breakdown[2] / total) * 100) },
      { star: 1, count: breakdown[1], percentage: Math.round((breakdown[1] / total) * 100) },
    ];
  }, [reviews]);

  // Get quizzes for this course
  const quizzes = useMemo(() => getQuizzesForCourse(course.id), [course.id]);

  // Review handlers
  const handleSubmitReview = () => {
    if (userRating === 0 || reviewText.trim() === '') {
      alert('Please provide both a rating and review text.');
      return;
    }

    const newReview: Review = {
      id: Date.now(), // Use timestamp as unique id
      courseId: course.id,
      userName: 'You', // In real app, get from user context
      rating: userRating,
      date: 'Just now',
      text: reviewText,
    };

    setUserSubmittedReviews([newReview, ...userSubmittedReviews]);
    setUserRating(0);
    setReviewText('');
    alert('Review submitted successfully!');
  };

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleLikeReview = (reviewId: number) => {
    setLikedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const handleReplyClick = (reviewId: number) => {
    setReplyingTo(reviewId === replyingTo ? null : reviewId);
    setReplyText('');
  };

  const handleSubmitReply = (reviewId: number) => {
    if (replyText.trim() === '') {
      alert('Please write a reply before submitting.');
      return;
    }
    // Store the user's reply for this review
    setUserReplies(prev => ({
      ...prev,
      [reviewId]: replyText
    }));
    setReplyText('');
    setReplyingTo(null);
  };

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

  // Download certificate as PDF
  const downloadCertificate = () => {
    try {
      // Minimal certificate PDF (dummy) in base64
      const pdfBase64 =
        'JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9UeXBlIC9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXMgPDwvRm9udCA8PC9GMSA1IDAgUj4+Pj4vQ29udGVudHMgNiAwIFIvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXT4+CmVuZG9iago1IDAgb2JqCjw8L1R5cGUgL0ZvbnQvU3ViVHlwZSAvVHlwZTEvQmFzZUZvbnQgL0hlbHZldGljYT4+CmVuZG9iago2IDAgb2JqCjw8L0xlbmd0aCA0OD4+CnN0cmVhbQpCVAovRjEgMjAgVGYKNTAgNzAwIFRkCihDZXJ0aWZpY2F0ZSBvZiBDb21wbGV0aW9uKQpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZSAvUGFnZXMvS2lkcyBbNCAwIFJdL0NvdW50IDE+PgplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjMgMCBvYmoKPDw+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwNDM1IDAwMDAwIG4NCjAwMDAwMDAzODYgMDAwMDAgbg0KMDAwMDAwMDQ4NCAwMDAwMCBuDQowMDAwMDAwMDA5IDAwMDAwIG4NCjAwMDAwMDAxNDYgMDAwMDAgbg0KMDAwMDAwMDIxNSAwMDAwMCBuDQp0cmFpbGVyCjw8L1NpemUgNy9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjUwMwolJUVPRgo=';

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
      a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Error downloading certificate. Please try again.');
    }
  };

  // Share certificate to social media
  const shareCertificate = (platform: 'linkedin' | 'twitter' | 'copy') => {
    const certificateUrl = `${window.location.origin}/learner/course/${course.id}/certificate`;
    const text = `I just completed "${course.title}" on SkillScribe! 🎓`;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(certificateUrl)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(certificateUrl).then(() => {
        alert('Certificate link copied to clipboard!');
      });
    }
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
      {/* Player area with flex layout for sidebar */}
      <div className="relative flex gap-4">
        {/* Video player container - shrinks when sidebar is open */}
        <div className={`relative rounded-2xl overflow-hidden shadow-2xl bg-black transition-all duration-300 ${
          sidebarOpen ? 'lg:flex-1' : 'w-full'
        }`}>
          {/* 16:9 container */}
          <div className="w-full" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
                      <path d="M5 3v18l15-9L5 3z" fill="#094CA4" />
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

          {/* modules opener at top-right of player */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden lg:flex absolute right-2 top-2 z-50 bg-white border rounded-md px-3 py-2 items-center gap-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Open course modules"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="#094CA4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium">Modules</span>
            </button>
          )}
        </div>

        {/* Desktop sidebar - shown inline when open */}
        {sidebarOpen && (
          <div className="hidden lg:block w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl border shadow-lg h-full max-h-[calc(100vh-12rem)] overflow-hidden flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-xl font-semibold">Course Modules</h3>
                <button 
                  onClick={() => setSidebarOpen(false)} 
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modules"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="overflow-auto flex-1 p-4">
                <div className="space-y-3">
                  {(course.modules || []).map((mod, modIdx) => {
                    const expanded = expandedModules[modIdx] ?? false;
                    return (
                      <div key={mod.id} className="bg-white rounded-lg border">
                        <button
                          onClick={() => setExpandedModules(prev => ({ ...prev, [modIdx]: !prev[modIdx] }))}
                          className="w-full flex items-center justify-between p-3 rounded-t-lg bg-[#fbf7f2] hover:bg-[#f5f1ec] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700">{modIdx + 1}.</div>
                            <div className="text-left">
                              <div className="font-medium text-gray-900">{mod.title}</div>
                              <div className="text-xs text-gray-500">{mod.lectures} lessons</div>
                            </div>
                          </div>
                          <div className="text-gray-500">{expanded ? '▾' : '▸'}</div>
                        </button>

                        <div className={`transition-all duration-200 overflow-hidden ${expanded ? 'max-h-[800px]' : 'max-h-0'}`}>
                          <div className="p-3 space-y-2">
                            {mod.topics && mod.topics.length > 0 ? (
                              mod.topics.map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => {
                                    setCurrentLesson({ moduleId: mod.id, topicId: t.id, title: t.title });
                                  }}
                                  className="w-full text-left flex items-start gap-3 p-2 rounded hover:bg-blue-50 transition-colors group"
                                >
                                  <div className="mt-1 w-3 h-3 rounded-full border border-gray-300 group-hover:border-blue-500 transition-colors" />
                                  <div>
                                    <div className="text-sm font-medium group-hover:text-blue-600 transition-colors">{t.title}</div>
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
        )}
      </div>

      <div className="mt-4 flex gap-3 items-center flex-wrap">
        {/* Mobile Modules Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-700">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#094CA4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm">Modules</span>
        </button>

        {/* Tab buttons */}
        {(['Overview', 'Resources', 'Reviews', 'Quizzes', 'Certificate'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${tab === t ? 'text-white shadow-md' : 'bg-white border-2 border-gray-200 hover:border-gray-300'}`}
            style={tab === t ? { backgroundColor: '#094CA4' } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Mobile Overlay Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">Course Modules</h3>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modules"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="overflow-auto flex-1 p-4">
              <div className="space-y-3">
                {(course.modules || []).map((mod, modIdx) => {
                  const expanded = expandedModules[modIdx] ?? false;
                  return (
                    <div key={mod.id} className="bg-white rounded-lg border">
                      <button
                        onClick={() => setExpandedModules(prev => ({ ...prev, [modIdx]: !prev[modIdx] }))}
                        className="w-full flex items-center justify-between p-3 rounded-t-lg bg-[#fbf7f2] hover:bg-[#f5f1ec] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold text-gray-700">{modIdx + 1}.</div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900">{mod.title}</div>
                            <div className="text-xs text-gray-500">{mod.lectures} lessons</div>
                          </div>
                        </div>
                        <div className="text-gray-500">{expanded ? '▾' : '▸'}</div>
                      </button>

                      <div className={`transition-all duration-200 overflow-hidden ${expanded ? 'max-h-[800px]' : 'max-h-0'}`}>
                        <div className="p-3 space-y-2">
                          {mod.topics && mod.topics.length > 0 ? (
                            mod.topics.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => {
                                  setCurrentLesson({ moduleId: mod.id, topicId: t.id, title: t.title });
                                  setSidebarOpen(false); // Close on mobile after selection
                                }}
                                className="w-full text-left flex items-start gap-3 p-2 rounded hover:bg-blue-50 transition-colors group"
                              >
                                <div className="mt-1 w-3 h-3 rounded-full border border-gray-300 group-hover:border-blue-500 transition-colors" />
                                <div>
                                  <div className="text-sm font-medium group-hover:text-blue-600 transition-colors">{t.title}</div>
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
      )}

      <div className="mt-6 grid grid-cols-1 gap-6">
        <div>
          {tab === 'Overview' && (
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {course.modules?.length || 0} Modules
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {course.durationHours ? `${course.durationHours} hours` : 'Self-paced'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {course.level || 'All levels'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">About this course</h4>
                  <p className="text-gray-700 leading-relaxed">{course.description}</p>
                </div>

                {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What you&apos;ll learn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((outcome: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5" style={{ color: '#094CA4' }}>
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {course.instructorName && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#094CA4' }}>
                        {course.instructorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{course.instructorName}</p>
                        <p className="text-sm text-gray-600">Course Instructor</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'Resources' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Resources</h3>
                <button
                  onClick={downloadResourcesPdf}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: '#094CA4' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download All as PDF
                </button>
              </div>

              <div className="space-y-3">
                {aggregatedResources.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 text-gray-400">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-600 font-medium">No resources available for this course yet.</p>
                  </div>
                )}
                {aggregatedResources.map((r, idx) => (
                  <div key={idx} className="group bg-white rounded-2xl border-2 border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* File Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: '#094CA4' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 3v6a1 1 0 001 1h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{r.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="truncate">{r.source}</span>
                        </div>
                        {r.size && (
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{r.size}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Download Button */}
                      <div className="flex-shrink-0">
                        {r.file ? (
                          <button
                            onClick={() => downloadResource(r.file, r.title)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-xl text-sm font-medium hover:bg-blue-100 hover:border-blue-400 transition-all group-hover:scale-105"
                            style={{ color: '#094CA4' }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Download
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-xl text-sm text-gray-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            No file
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'Reviews' && (
            <div>
              {/* Rating Overview Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Reviews</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-4xl font-bold text-gray-900">{course.rating}</span>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FDB022" stroke="#FDB022" strokeWidth="1"/>
                        </svg>
                      </div>
                      <span className="text-gray-600">({course.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Rating Breakdown */}
                  <div className="space-y-2 min-w-[300px]">
                    {ratingBreakdown.map(({ star, percentage }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-12">{star} star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${percentage}%`, backgroundColor: '#10b981' }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-12 text-right">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 mb-8">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#094CA4' }}>
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path 
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                                    fill={star <= review.rating ? "#FDB022" : "#E5E7EB"} 
                                    stroke={star <= review.rating ? "#FDB022" : "#E5E7EB"} 
                                    strokeWidth="1"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.text}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          likedReviews.has(review.id)
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill={likedReviews.has(review.id) ? 'currentColor' : 'none'}
                          />
                        </svg>
                        {likedReviews.has(review.id) ? 'Liked' : 'Like'}
                      </button>
                      <button
                        onClick={() => handleReplyClick(review.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === review.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleSubmitReply(review.id)}
                            className="px-4 py-2 rounded-lg font-medium text-sm text-white transition-all"
                            style={{ backgroundColor: '#094CA4' }}
                          >
                            Submit Reply
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Reply from instructor */}
                    {review.instructorReply && (
                      <div className="mt-4 ml-0 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#094CA4' }}>
                            {course.instructorName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 text-sm">{course.instructorName}</p>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Instructor</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{review.instructorReply}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* User's reply */}
                    {userReplies[review.id] && (
                      <div className="mt-4 ml-0 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-green-600">
                            Y
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 text-sm">You</p>
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Your Reply</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{userReplies[review.id]}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Leave a Review Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave a Review</h3>
                
                {/* Rating Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={handleStarLeave}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                            fill={star <= (hoverRating || userRating) ? "#FDB022" : "#E5E7EB"} 
                            stroke={star <= (hoverRating || userRating) ? "#FDB022" : "#D1D5DB"} 
                            strokeWidth="1"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Your Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
                    placeholder="Share your experience with this course..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="px-6 py-3 text-white rounded-xl font-medium shadow-md hover:opacity-90 transition"
                  style={{ backgroundColor: '#094CA4' }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}

          {tab === 'Quizzes' && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quizzes</h3>
              {quizzes.length === 0 ? (
                <div className="text-gray-600">No quizzes available for this course yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizzes.map((quiz) => (
                    <Link
                      key={quiz.id}
                      href={`/learner/course/${course.id}/quiz/${quiz.id}`}
                      className="block bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      style={{ borderColor: 'inherit' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#094CA4'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ backgroundColor: '#094CA4' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-900 group-hover:transition mb-1" style={{ color: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.color = '#094CA4'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                            {quiz.title}
                          </h4>
                          {quiz.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11H15M9 15H12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {quiz.questions.length} questions
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                          ~{Math.ceil(quiz.questions.length * 1.5)} min
                        </span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all" style={{ color: '#094CA4' }}>
                        Start Quiz
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'Certificate' && (
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
                <p className="text-gray-600">Congratulations on completing this course!</p>
              </div>

              {/* Certificate Preview Card - Landscape Orientation */}
              <div className="bg-gradient-to-br from-white via-blue-50/30 to-amber-50/20 rounded-3xl shadow-2xl border-8 border-double px-20 py-12 mb-8 relative overflow-hidden mx-auto" style={{ borderColor: '#094CA4', maxWidth: '1200px', aspectRatio: '1.414/1' }}>
                {/* Ornamental Corner Decorations */}
                <div className="absolute top-0 left-0 w-24 h-24">
                  <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 rounded-tl-3xl opacity-30" style={{ borderColor: '#FDB022' }}></div>
                  <div className="absolute top-1.5 left-1.5 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl opacity-20" style={{ borderColor: '#094CA4' }}></div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 rounded-tr-3xl opacity-30" style={{ borderColor: '#FDB022' }}></div>
                  <div className="absolute top-1.5 right-1.5 w-12 h-12 border-t-2 border-r-2 rounded-tr-2xl opacity-20" style={{ borderColor: '#094CA4' }}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24">
                  <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 rounded-bl-3xl opacity-30" style={{ borderColor: '#FDB022' }}></div>
                  <div className="absolute bottom-1.5 left-1.5 w-12 h-12 border-b-2 border-l-2 rounded-bl-2xl opacity-20" style={{ borderColor: '#094CA4' }}></div>
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24">
                  <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 rounded-br-3xl opacity-30" style={{ borderColor: '#FDB022' }}></div>
                  <div className="absolute bottom-1.5 right-1.5 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl opacity-20" style={{ borderColor: '#094CA4' }}></div>
                </div>
                
                {/* Certificate Content */}
                <div className="relative z-10 text-center h-full flex flex-col justify-between">
                  {/* Header with Logo */}
                  <div className="mb-4">
                    <h1 className="text-4xl font-serif font-bold mb-1 tracking-tight" style={{ color: '#094CA4', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>SkillScribe</h1>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                      <p className="text-xs text-gray-600 tracking-[0.3em] uppercase font-semibold">Learning Platform</p>
                      <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="mb-4">
                    <div className="inline-block mb-3">
                      <h2 className="text-2xl font-serif italic text-gray-700 mb-1">Certificate of Completion</h2>
                      <div className="h-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                    </div>
                  </div>

                  {/* Recipient Info */}
                  <div className="mb-4 px-8">
                    <p className="text-base text-gray-600 mb-3 font-light italic">This is to certify that</p>
                    <div className="relative inline-block mb-3">
                      <h2 className="text-3xl font-bold text-gray-900 px-6 py-1" style={{ fontFamily: 'Georgia, serif' }}>Your Name</h2>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    </div>
                    <p className="text-base text-gray-600 mb-3 font-light italic">has successfully completed</p>
                    <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-4 mx-auto max-w-3xl border-2 border-blue-200 shadow-inner">
                      <h3 className="text-xl font-bold leading-tight" style={{ color: '#094CA4' }}>{course.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 italic">with outstanding dedication and achievement</p>
                  </div>

                  {/* Signatures and Badge */}
                  <div className="flex items-end justify-between px-12 mb-4">
                    <div className="text-center flex-1">
                      <div className="w-32 h-0.5 bg-gray-400 mb-2 mx-auto"></div>
                      <p className="text-xs text-gray-600 font-semibold mb-0.5">Date of Completion</p>
                      <p className="font-bold text-gray-900 text-sm">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-center flex-1">
                      <div className="w-32 h-0.5 bg-gray-400 mb-2 mx-auto"></div>
                      <p className="text-xs text-gray-600 font-semibold mb-0.5">Instructor Signature</p>
                      <p className="font-bold text-gray-900 text-sm">{course.instructorName}</p>
                    </div>
                  </div>

                  {/* Footer with Certificate ID */}
                  <div className="pt-4 border-t-2 border-dashed border-gray-300 pb-2">
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">Certificate ID:</span>
                        <span className="font-mono">{certificateId}</span>
                      </div>
                      <div className="h-3 w-px bg-gray-300"></div>
                      <div className="flex items-center gap-1.5">
                        <span>Verify at: <span className="font-semibold">skillscribe.com/verify</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={downloadCertificate}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
                  style={{ backgroundColor: '#094CA4' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Certificate
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9V2H18V9M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Print Certificate
                </button>
              </div>

              {/* Share Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Share Your Achievement</h3>
                <p className="text-gray-600 text-center mb-6">Let others know about your accomplishment!</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button
                    onClick={() => shareCertificate('linkedin')}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#0A66C2' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={() => shareCertificate('twitter')}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-black transition-all hover:opacity-90"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => shareCertificate('copy')}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-white text-gray-900 hover:bg-gray-50 transition-all border-2 border-gray-200"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0685 9.05885 10.3533 9.00763C9.63816 8.95641 8.92037 9.0596 8.24861 9.31018C7.57685 9.56077 6.96684 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">About Your Certificate</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>This certificate verifies that you have successfully completed the course requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Share your certificate on LinkedIn, Twitter, or add it to your resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Each certificate includes a unique ID for verification purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-0.5">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Download and print your certificate anytime from your account</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

