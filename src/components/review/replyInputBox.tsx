"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ReplyInputBoxProps {
  onClose: () => void;
  onSubmit?: (reply: string) => void;
}

export default function ReplyInputBox({ onClose, onSubmit }: ReplyInputBoxProps) {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmit?.(replyText.trim());
      setReplyText("");
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3 bg-gray-50 border border-gray-200 rounded-[10px] p-3 shadow-sm"
    >
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        rows={3}
        placeholder="Write your reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Reply
        </button>
      </div>
    </motion.div>
  );
}
