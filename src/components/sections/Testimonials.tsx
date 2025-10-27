import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#FAF7F3]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          What Our Learners Say
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Success stories from our community
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 ">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/Asset/sania mayra.jpeg"
                  alt="Sania Mirza"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#0b4ca6]">
                  Sania Mirza
                </p>
                <p className="text-sm text-gray-500 -mt-1">Web Developer</p>
              </div>
            </div>
            <p className="text-base text-black mb-6">
              &ldquo;SkillScribe has transformed my career. The courses are
              well-structured and the instructors are top-notch.&rdquo;
            </p>
            <p className="text-sm text-black">Posted on: 24 April, 2025</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/Asset/alex markel.png"
                  alt="Alex Markel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#0b4ca6]">
                  Alex Markel
                </p>
                <p className="text-sm text-gray-500 -mt-1">Designer</p>
              </div>
            </div>
            <p className="text-base text-black mb-6">
              &ldquo;I have learned more in 3 months here than in years of
              trying to self-teach. Highly recommended!&rdquo;
            </p>
            <p className="text-sm text-black">Posted on: 13 June, 2025</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/Asset/abdul hamid.jpeg"
                  alt="Abdul Hamid"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#0b4ca6]">
                  Abdul Hamid
                </p>
                <p className="text-sm text-gray-500 -mt-1">Marketing Manager</p>
              </div>
            </div>
            <p className="text-base text-black mb-6">
              &ldquo;The flexibility to learn at my own pace has been amazing.
              Great platform for busy professionals.&rdquo;
            </p>
            <p className="text-sm text-black">Posted on: 07 August, 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
