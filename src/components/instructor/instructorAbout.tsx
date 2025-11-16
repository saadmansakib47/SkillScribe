// File: components/instructor/InstructorAbout.tsx
'use client';


type Props = { instructor: import('../../lib/instructors').Instructor };


export default function InstructorAbout({ instructor }: Props) {
    const joined = instructor.joinedDate ? new Date(instructor.joinedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
            <p className="text-sm text-gray-700 mb-4">{instructor.bio}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{instructor.location}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">{joined}</p>
                </div>
            </div>
        </div>
    );
}