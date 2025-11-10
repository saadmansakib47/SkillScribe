"use client";

import { MessageSquare, Flag, EyeOff, Star } from "lucide-react";
import ReplyInput from "@/components/review/replyInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }: { review: any }) {
  const [showReply, setShowReply] = useState(false);

  const initials = review.userName
    ? review.userName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-[12px] p-5 shadow-sm"
    >
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
                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Review text */}
          <p className="text-gray-700 mt-3 text-sm leading-relaxed">{review.text}</p>

          {/* Instructor Reply */}
          {review.instructorReply && (
            <div className="bg-blue-50 text-sm text-gray-700 p-3 mt-3 rounded-md border border-blue-100">
              <p>
                <strong>Your Reply: </strong>
                {review.instructorReply}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 mt-3 text-sm text-gray-600">
            <button
              className="flex items-center gap-1 hover:text-blue-600"
              onClick={() => setShowReply((p) => !p)}
            >
              <MessageSquare className="w-4 h-4" /> Reply
            </button>
            <button className="flex items-center gap-1 hover:text-red-600">
              <Flag className="w-4 h-4" /> Report
            </button>
            <button className="flex items-center gap-1 hover:text-gray-700">
              <EyeOff className="w-4 h-4" /> Hide
            </button>
          </div>

          {showReply && <ReplyInput onClose={() => setShowReply(false)} />}
        </div>
      </div>
    </motion.div>
  );
}
