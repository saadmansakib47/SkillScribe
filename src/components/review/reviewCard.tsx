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
      whileHover={{ y: -2, boxShadow: "0 8px 15px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
      className="relative bg-white border border-gray-300 rounded-[12px] p-5 shadow-sm overflow-hidden"
    >
      {/* Creative border glow effect */}
      <div className="absolute inset-0 rounded-[12px] border border-transparent bg-gradient-to-r from-blue-200/50 via-transparent to-blue-200/50 [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-[1px] pointer-events-none"></div>

      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={review.avatar} alt={review.userName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "text-blue-600 fill-blue-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Review text */}
          <p className="text-black mt-3 text-sm leading-relaxed">
            {review.text}
          </p>

          {/* Instructor Reply */}
          {review.instructorReply && (
            <div className="relative bg-blue-50 text-sm text-gray-700 p-3 mt-3 rounded-[10px] border-l-4 border-blue-500">
              <p>
                <span className="font-bold text-gray-600">Your Reply</span>
                <br />
                {review.instructorReply}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 mt-3 text-sm text-gray-600">
            {/* Reply Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setShowReply((p) => !p)}
            >
              <MessageSquare className="w-4 h-4" /> Reply
            </motion.button>

            {/* Report Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 transition-colors ${
                reported
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }`}
              onClick={() => setReported(true)}
            >
              <Flag className="w-4 h-4" /> {reported ? "Reported" : "Report"}
            </motion.button>

            {/* Hide Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-700 transition-colors"
              onClick={() => setHidden(true)}
            >
              <EyeOff className="w-4 h-4" /> Hide
            </motion.button>
          </div>

          {/* Reply Input with slide-down animation */}
          {showReply && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
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
