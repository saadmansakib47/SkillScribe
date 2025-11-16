// File: components/instructor/InstructorSocialLinks.tsx
'use client';


type Props = { social?: import('../../lib/instructors').SocialLinks };


export default function InstructorSocialLinks({ social }: Props) {
    if (!social) return null;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold mb-2">Connect</h3>
            <div className="flex items-center gap-3 text-sm">
                {social.website && <a href={social.website} className="underline">Website</a>}
                {social.twitter && <a href={social.twitter} className="underline">Twitter</a>}
                {social.linkedin && <a href={social.linkedin} className="underline">LinkedIn</a>}
                {social.facebook && <a href={social.facebook} className="underline">Facebook</a>}
            </div>
        </div>
    );
}