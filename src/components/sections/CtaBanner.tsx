export default function CtaBanner() {
  return (
    <section className="bg-[#FAF7F3] py-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Ready to start your new learning journey?
        </h2>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/auth/signin"
            className="inline-flex items-center justify-center bg-[#0b4ca6] text-white py-3 px-7 rounded-[8px] border-2 border-black shadow-sm font-medium transition-colors duration-150 ease-in-out hover:bg-[#083a8a] hover:border-[#052a62] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
          >
            Sign Up Now
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center bg-white text-black py-3 px-7 rounded-[8px] border border-black font-medium transition-colors duration-150 ease-in-out hover:bg-[#90B2DE] hover:border-[#90B2DE] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90B2DE]"
          >
            Browse Free Courses
          </a>
        </div>
      </div>
    </section>
  );
}
