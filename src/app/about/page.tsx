"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-['Droid Sans'] flex flex-col items-center py-16 px-6">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold font-['Raleway'] text-blue-700 text-center mb-8">
        Welcome to where possibilities begin
      </h1>

      {/* Centered Image */}
      <div className="relative w-full max-w-3xl h-64 md:h-80 mb-10">
        <Image
          src="/Asset/about us 2.png"
          alt="About illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Paragraph */}
      <p className="max-w-2xl text-center text-gray-1000 leading-relaxed mb-16 text-[15px] md:text-base">
        At SkillScribe, we believe that learning should be accessible, engaging,
        and empowering for everyone. Our platform offers a wide range of
        high-quality online courses to help learners develop real-world skills
        and advance their personal and professional growth. Whether you’re
        exploring new technologies, building career-ready expertise, or
        pursuing your passions, SkillScribe connects you with expert instructors
        and interactive learning experiences that make education flexible and
        effective. We’re on a mission to make lifelong learning
        possible. Anytime, anywhere.
      </p>

      {/* 3 Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <div className="rounded-[8px] shadow-md overflow-hidden border border-gray-400">
          <div className="bg-blue-800 text-white text-center py-4 font-semibold text-lg">
            Our Mission
          </div>
          <div className="bg-white text-gray-700 text-center px-6 py-6 leading-relaxed text-sm md:text-base">
            To enable everyone to learn real-world skills and achieve their goals
            anytime, anyplace with high-quality learning.
          </div>
        </div>

        {/* Vision */}
        <div className="rounded-[8px] shadow-md overflow-hidden border border-gray-400">
          <div className="bg-blue-800 text-white text-center py-4 font-semibold text-lg">
            Our Vision
          </div>
          <div className="bg-white text-gray-700 text-center px-6 py-6 leading-relaxed text-sm md:text-base">
            To lead global online education through lifelong learning and
            innovation.
          </div>
        </div>

        {/* Values */}
        <div className="rounded-[8px] shadow-md overflow-hidden border border-gray-400">
          <div className="bg-blue-800 text-white text-center py-4 font-semibold text-lg">
            Our Values
          </div>
          <div className="bg-white text-gray-700 text-center px-6 py-6 leading-relaxed text-sm md:text-base">
            We empower learners through accessible, excellent, and creative
            education.
          </div>
        </div>
      </div>
    </main>
  );
}
