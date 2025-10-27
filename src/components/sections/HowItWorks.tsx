import { FaClipboardList, FaChalkboardTeacher, FaTachometerAlt, FaAward } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <section className="py-16 bg-[#FAF7F3]">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
        <p className="mt-2 text-2xl text-black">
          Your journey to mastery in 4 simple steps
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-4">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-black">
            <div className="mb-4">
              <FaClipboardList className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">1. Choose Your Path</h3>
            <p className="mt-4 text-black">
              Pick from hundreds of curated courses
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-black">
            <div className="mb-4">
              <FaChalkboardTeacher className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">2. Learn from Experts</h3>
            <p className="mt-4 text-black">
              High-quality content from industry instructors
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-black ">
            <div className="mb-4">
              <FaTachometerAlt className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">3. Track Progress</h3>
            <p className="mt-4 text-black">
              Gamified achievements and AI guidance
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-black ">
            <div className="mb-4">
              <FaAward className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">4. Earn Certificates</h3>
            <p className="mt-4 text-black">
              Showcase your skills online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
