"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, KeyRound } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Droid Sans']">
      <div className="flex w-[900px] bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left side illustration */}
        <div className="w-1/2 relative bg-[#f9f9f9]">
          <Image
            src="/Asset/login_signup.png"
            alt="Forgot password illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side */}
        <div className="w-1/2 px-12 py-28 flex flex-col justify-center">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-2 font-['Raleway']">
                Forgot Password?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter your registered email address. We’ll send you a 6-digit verification code to reset your password.
              </p>

              <form className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm mb-1">Email Address</label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-2.5 text-gray-500"
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-[8px] pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Send Code */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-700 text-white py-2 rounded-[8px] font-semibold hover:bg-blue-800 transition-colors"
                >
                  Send Code
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Remembered password?{" "}
                <a href="/auth/signin" className="text-blue-600 hover:underline">
                  back to Sign In
                </a>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2 font-['Raleway']">
                Verify & Reset
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter the 6-digit code we’ve sent to your email and choose your new password.
              </p>

              <form className="space-y-5">
                {/* Verification Code */}
                <div>
                  <label className="block text-sm mb-1">Verification Code</label>
                  <div className="relative">
                    <KeyRound
                      size={18}
                      className="absolute left-3 top-2.5 text-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="w-full border border-gray-300 rounded-[8px] pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-blue-600 text-sm hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm mb-1">New Password</label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-2.5 text-gray-500"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full border border-gray-300 rounded-[8px] pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-2.5 text-gray-500"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      className="w-full border border-gray-300 rounded-[8px] pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-[8px] font-semibold hover:bg-blue-800 transition-colors"
                >
                  Reset Password
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Back to{" "}
                <a href="/auth/signin" className="text-blue-600 hover:underline">
                  Sign In
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
