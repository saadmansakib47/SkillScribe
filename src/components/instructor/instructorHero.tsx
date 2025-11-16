// File: components/instructor/InstructorHero.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Edit2 } from 'lucide-react';


type Props = {
    instructor: import('../../lib/instructors').Instructor;
};


export default function InstructorHero({ instructor }: Props) {
    return (
        <div className="bg-gradient-to-r from-[#094CA4] to-[#1E88E5] rounded-2xl p-8 mb-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                            <Image src={instructor.image} alt={instructor.name} width={112} height={112} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{instructor.name}</h1>
                        <p className="text-blue-100 mb-2 max-w-xl">{instructor.bio}</p>
                        <div className="flex items-center gap-3 text-sm">
                            {instructor.expertise.map((e) => (
                                <span key={e} className="px-3 py-1 rounded-full bg-white/20">{e}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`#courses`} className="flex items-center gap-2 px-6 py-3 bg-white text-[#094CA4] rounded-xl font-bold shadow hover:shadow-lg">
                        <Play className="h-5 w-5" /> View Courses
                    </Link>
                    <Link href={`/instructor/profile/${instructor.id}/edit`} className="flex items-center gap-2 px-4 py-2 border-2 border-white rounded-xl hover:bg-white/10">
                        <Edit2 className="h-4 w-4" /> Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}