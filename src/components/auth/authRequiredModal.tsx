"use client";

import { useRouter } from "next/navigation";


interface AuthRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <h3 className="text-xl font-bold mb-3 font-['Raleway']">Sign In Required</h3>
                <p className="text-gray-600 mb-6">
                    You need to be signed in to access this feature. Please log in or create an account to continue.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            onClose();
                            router.push("/auth/signin");
                        }}
                        className="flex-1 bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}