"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-['Droid Sans'] flex flex-col justify-center items-center py-16">
      {/* Top centered heading */}
      <h1 className="text-2xl md:text-3xl font-bold font-['Raleway'] mb-12 text-center">
        How Can We Help You?
      </h1>

      {/* Two-column layout */}
      <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left side */}
        <div className="md:w-1/2">
          <p className="text-gray-700 mb-8 leading-relaxed text-justify md:text-left">
            If you have any questions, please do not hesitate to reach us out at
            our email, phone, or office. You can also fill out the form and we
            will get back to you as soon as possible.
          </p>

          <ul className="space-y-6 text-gray-800">
            <li className="flex items-start gap-3">
              <Phone className="text-blue-700 w-5 h-5 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>01876458908</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="text-blue-700 w-5 h-5 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p>info@skillscribe.com</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="text-blue-700 w-5 h-5 mt-1" />
              <div>
                <p className="font-semibold">Address</p>
                <p>
                  4/5, Block A, Gulshan 1
                  <br />
                  Dhaka
                </p>
              </div>
            </li>
          </ul>

          <button className="mt-10 bg-blue-700 text-white font-normal px-6 py-2 rounded-[15px] hover:bg-blue-800 transition-colors">
            Submit Form
          </button>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 border-2 border-blue-700 rounded-[10px] bg-[#FAF9F6] p-6 shadow-sm">
          <h2 className="text-sm text-gray-600 mb-4">
            Fill up the form with your queries
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Message
              </label>
              <textarea
                className="w-full border border-black rounded-md px-3 py-2 h-28 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
