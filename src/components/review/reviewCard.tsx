import { MessageSquare, Flag, EyeOff, Star } from "lucide-react";
import ReplyInput from "@/components/review/replyInput";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewCard({ review }: { review: any }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-300 rounded-lg p-4"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full border"
        />
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">{review.name}</h4>
              <p className="text-xs text-gray-500">{review.course}</p>
            </div>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>

          {/* Stars */}
          <div className="flex mt-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Message */}
          <p className="text-sm text-gray-700 mt-2">{review.comment}</p>

          {/* Reply (Instructor’s reply) */}
          {review.reply && (
            <div className="bg-blue-50 text-sm text-gray-700 p-3 mt-3 rounded-md border border-blue-100">
              <p>
                <strong>Your Reply: </strong>
                {review.reply}
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

          {/* Reply input (nested level) */}
          {showReply && <ReplyInput onClose={() => setShowReply(false)} />}
        </div>
      </div>
    </motion.div>
  );
}
