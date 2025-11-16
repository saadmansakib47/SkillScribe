// File: components/instructor/InstructorNotFound.tsx
'use client';
import Link from 'next/link';
export default function InstructorNotFound() {
    return (
        <div className="min-h-screen bg-[#FAF7F3] py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Instructor Not Found</h1>
                    <p className="text-gray-600 mb-6">We couldn't find that instructor.</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-[#094CA4] text-white rounded-lg">Go Home</Link>
                </div>
            </div>
        </div>
    );
}