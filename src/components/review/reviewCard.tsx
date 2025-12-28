// src/components/review/reviewCard.tsx
"use client";

import { MessageSquare, Flag, EyeOff, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { motion } from "framer-motion";
import ReplyInputBox from "@/components/review/replyInputBox";

export default function ReviewCard({ review }: { review: any }) {
  const [showReply, setShowReply] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reported, setReported] = useState(false);

  const initials = review.userName
    ? review.userName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "?";

  if (hidden) return null; // Hide the card completely if hidden

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12 border border-gray-100">
          <AvatarImage src={review.avatar} alt={review.userName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-900 text-base">{review.userName}</h4>
              <p className="text-xs text-gray-500 mt-0.5">Web Development</p>
            </div>
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating
                  ? "text-blue-600 fill-blue-400"
                  : "text-gray-200 fill-gray-100" // Image shows empty stars as gray
                  }`}
                strokeWidth={1.5}
              />
            ))}
          </div>

          {/* Review text */}
          <p className="text-gray-700 mt-3 text-sm leading-relaxed">
            {review.text}
          </p>

          {/* Instructor Reply */}
          {review.instructorReply && (
            <div className="bg-[#E9F3FF] border-l-[6px] border-[#094CA4] rounded-r-md p-4 mt-4">
              <p className="text-sm">
                <span className="text-gray-500 block text-xs mb-1">Your Reply</span>
                <span className="text-gray-900 font-medium">{review.instructorReply}</span>
              </p>
            </div>
          )}

          {/* Separator */}
          <div className="border-t border-gray-100 my-4"></div>

          {/* Action buttons */}
          <div className="flex gap-6 text-sm font-medium">
            {/* Reply Button */}
            <button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setShowReply((p) => !p)}
            >
              <MessageSquare className="w-4 h-4" /> Reply
            </button>

            {/* Report Button */}
            <button
              className={`flex items-center gap-2 transition-colors ${reported
                ? "text-red-600"
                : "text-gray-500 hover:text-gray-900"
                }`}
              onClick={() => setReported(true)}
            >
              <Flag className="w-4 h-4" /> {reported ? "Reported" : "Report"}
            </button>

            {/* Hide Button */}
            <button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setHidden(true)}
            >
              <EyeOff className="w-4 h-4" /> Hide
            </button>
          </div>

          {/* Reply Input with slide-down animation */}
          {showReply && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <ReplyInputBox
                onClose={() => setShowReply(false)}
                onSubmit={(reply) =>
                  console.log("Reply submitted:", reply)
                }
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
