"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate logout - clear any stored data
    if (typeof window !== 'undefined') {
      // Clear any localStorage items if you're storing user preferences
      // localStorage.clear(); // Uncomment if needed
      
      // Redirect to home after a brief moment
      const timer = setTimeout(() => {
        router.push('/');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF7F3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogOut className="h-10 w-10 text-[#094CA4]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Logging out...</h1>
        <p className="text-gray-600">Thank you for using SkillScribe!</p>
        <div className="mt-6">
          <div className="w-12 h-12 border-4 border-[#094CA4] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
