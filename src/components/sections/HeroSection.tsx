import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-28 md:py-32 lg:py-36 min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      style={{
        backgroundImage: "url('/Asset/landing page.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-12 flex items-center justify-end">
        <div className="text-left max-w-xl lg:max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl">
            Learn Anytime, <br /> Grow Every Day
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg">
            Join thousands of learners mastering new skills through <br /> expert-led
            video courses and personalized learning paths.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-start gap-4">
            <a
              href="/auth/signin"
              className="inline-flex items-center justify-center bg-[#0b4ca6] text-white py-3 px-7 rounded-[8px] shadow-sm font-medium transition-colors duration-150 ease-in-out hover:bg-[#083a8a] hover:border-[#052a62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
            >
              Start learning for free
            </a>
            <Link
              href="/learner/allcourses"
              className="inline-flex items-center justify-center bg-white text-black py-3 px-7 rounded-[8px] border border-black font-medium transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
