"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Droid Sans']">
            <div className="flex w-[900px] bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Left Side */}
                <div className="w-1/2 relative bg-[#f9f9f9]">
                    <Image
                        src="/Asset/login_signup.png"
                        alt="Sign up illustration"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Right Side */}
                <div className="w-1/2 px-10 py-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2 font-['Raleway']">
                        Welcome To SkillScribe
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        To log into your account enter your email and password
                    </p>

                    <form className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-[8px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 rounded-[8px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <a
                                href="/auth/forgotpassword"
                                className="text-sm text-blue-600 hover:underline float-right mt-1"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded-[8px] font-semibold hover:bg-blue-800 transition-colors"
                        >
                            Login
                        </button>

                        {/* Remember me */}
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-5">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-3 text-gray-500 text-sm">Or</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Google Login */}
                    <button className="w-full border border-gray-300 rounded-[8px] py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                        <FcGoogle size={20} />
                        Continue with Google
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{" "}
                        <a href="/auth/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
