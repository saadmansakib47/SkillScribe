"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import CourseModules from '../../../../../components/course/CourseModules';
import type { Course } from '../../../../../lib/courses';
import { getQuizzesForCourse } from '../../../../../lib/quizzes';
import { getReviewsForCourse, type Review } from '../../../../../lib/reviews';

type Props = { course: Course };

export default function PlayerClient({ course }: Props) {
  const [tab, setTab] = useState<'Overview' | 'Resources' | 'Reviews' | 'Quizzes' | 'Certificate'>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Review state
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [userSubmittedReviews, setUserSubmittedReviews] = useState<Review[]>([]);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [userReplies, setUserReplies] = useState<Record<number, string>>({});

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
        </div>

        {/* modules opener at top-right of player */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden lg:flex absolute right-2 top-2 z-50 bg-white border rounded-md px-3 py-2 items-center gap-2 shadow-md"
          aria-label="Open course modules"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-700">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#094CA4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium">Modules</span>
        </button>
      </div>

      <div className="mt-4 flex gap-3 items-center">
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

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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

