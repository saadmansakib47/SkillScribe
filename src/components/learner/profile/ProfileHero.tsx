import Image from 'next/image';
import Link from 'next/link';
import { Edit2, Flame, Clock } from 'lucide-react';

interface ProfileHeroProps {
  learnerId: number;
  name: string;
  bio: string;
  avatar: string;
  learningStreak: number;
  weeklyHours: number;
}

export default function ProfileHero({
  learnerId,
  name,
  bio,
  avatar,
  learningStreak,
  weeklyHours
}: ProfileHeroProps) {
  return (
    <div className="bg-gradient-to-r from-[#094CA4] to-[#1E88E5] rounded-2xl p-8 mb-6 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
              <Image
                src={avatar}
                alt={name}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            {learningStreak >= 3 && (
              <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1.5 shadow-lg">
                <Flame className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {name.split(' ')[0]}!</h1>
            <p className="text-blue-100 mb-2">{bio}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
                <Flame className="h-4 w-4" />
                {learningStreak} day streak
              </span>
              <span className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4" />
                {weeklyHours}h this week
              </span>
            </div>
          </div>
        </div>
        <Link 
          href={`/learner/profile/${learnerId}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-white text-[#094CA4] rounded-xl hover:bg-blue-50 transition-all font-semibold text-sm shadow-lg hover:shadow-xl border-2 border-white hover:border-blue-100"
        >
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
