'use client';
import { useParams } from 'next/navigation';
import { getInstructorById, getCoursesForInstructor } from '../../../../lib/instructors';
import InstructorHero from '../../../../components/instructor/instructorHero';
import InstructorStats from '../../../../components/instructor/instructorStats'; 
import InstructorCoursesGrid from '../../../../components/instructor/instructorCoursesGrid';
import InstructorAbout from '../../../../components/instructor/instructorAbout'; 
import InstructorSocialLinks from '../../../../components/instructor/instructorSocialLinks'; 
import InstructorNotFound from '../../../../components/instructor/instructorNotFound'; 
import { useState } from 'react';
import ActivityBoard, { generateActivityData } from '../../../../components/instructor/activityBoard';

export default function InstructorProfilePage() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const instructor = getInstructorById(id);

    const [tab, setTab] = useState<'overview' | 'courses' | 'about'>('overview');

    if (!instructor) return <InstructorNotFound />;

    const courses = getCoursesForInstructor(instructor.id);

    // Example flat activity data (replace with real instructor activity)
    const flatActivityData = generateActivityData(90); // last 90 days

    return (
        <div className="min-h-screen bg-[#FAF7F3] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <InstructorHero instructor={instructor} />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button onClick={() => setTab('overview')} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === 'overview' ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>Overview</button>
                        <button onClick={() => setTab('courses')} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === 'courses' ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>Courses</button>
                        <button onClick={() => setTab('about')} className={`flex-1 px-6 py-4 text-sm font-semibold ${tab === 'about' ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>About</button>
                    </div>
                </div>

                {tab === 'overview' && (
                    <>
                        <InstructorStats instructor={instructor} />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <InstructorCoursesGrid courses={courses} />
                                
                                {/* GitHub-style activity board */}
                                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity</h3>
                                    <ActivityBoard data={flatActivityData} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <InstructorAbout instructor={instructor} />
                                <InstructorSocialLinks social={instructor.social} />
                            </div>
                        </div>
                    </>
                )}

                {tab === 'courses' && (
                    <div className="space-y-6">
                        <InstructorCoursesGrid courses={courses} />
                    </div>
                )}

                {tab === 'about' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <InstructorAbout instructor={instructor} />
                        </div>
                        <div>
                            <InstructorSocialLinks social={instructor.social} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
