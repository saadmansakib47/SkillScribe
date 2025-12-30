"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ReportSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReportSuccessModal({ isOpen, onClose }: ReportSuccessModalProps) {
    // Auto-close after 3 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
                    >
                        {/* Success Icon */}
                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Conversation Reported
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Thank you for helping us maintain a safe community. We'll review this conversation promptly.
                            </p>

                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}