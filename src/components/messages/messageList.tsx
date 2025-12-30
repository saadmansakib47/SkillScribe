"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, FileText, Download, Smile, Shield } from "lucide-react";
import { Message } from "./types";

interface Props {
  messages: Message[];
  onAddReaction: (messageId: number, emoji: string) => void;
  isUserBlocked?: boolean;
}

export default function MessageList({ messages, onAddReaction, isUserBlocked }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showReactionPicker, setShowReactionPicker] = useState<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  const availableReactions = [
    { emoji: "👍", label: "Like" },
    { emoji: "❤️", label: "Love" },
    { emoji: "😂", label: "Haha" },
    { emoji: "😮", label: "Wow" },
    { emoji: "😢", label: "Sad" },
    { emoji: "🎉", label: "Celebrate" },
  ];

  const handleReaction = (messageId: number, emoji: string) => {
    onAddReaction(messageId, emoji);
    setShowReactionPicker(null);
  };

  // Count reactions
  const getReactionCounts = (reactions?: string[]) => {
    if (!reactions || reactions.length === 0) return {};

    return reactions.reduce((acc, emoji) => {
      acc[emoji] = (acc[emoji] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isMe = message.sender === "me";
          const isSystem = message.sender === "system";
          const showAvatar = index === 0 || messages[index - 1].sender !== message.sender;
          const reactionCounts = getReactionCounts(message.reactions);

          // System message rendering
          if (isSystem) {
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-center my-4"
              >
                <div className="bg-red-100 text-red-700 px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm">
                  <Shield className="w-4 h-4" />
                  {message.text}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar for "them" */}
              {!isMe && (
                <div className="flex-shrink-0">
                  {showAvatar ? (
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8" />
                  )}
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col relative group`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl px-4 py-3 shadow-sm relative ${isMe
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                    }`}
                >
                  {/* Message Text */}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.03 }}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${isMe
                            ? "bg-blue-500 hover:bg-blue-400"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                          <FileText className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs flex-1 truncate">{attachment}</span>
                          <Download className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp and Status */}
                  <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                    <span
                      className={`text-xs ${isMe ? "text-blue-100" : "text-gray-500"}`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                    {isMe && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCheck className="w-3.5 h-3.5 text-blue-100" />
                      </motion.div>
                    )}
                  </div>

                  {/* React Button (appears on hover) - Disabled if blocked */}
                  {!isUserBlocked && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute ${isMe ? "-left-8" : "-right-8"} top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg`}
                      onClick={() => setShowReactionPicker(showReactionPicker === message.id ? null : message.id)}
                    >
                      <Smile className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  )}

                  {/* Reaction Picker */}
                  <AnimatePresence>
                    {showReactionPicker === message.id && !isUserBlocked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className={`absolute ${isMe ? "left-0" : "right-0"} top-full mt-2 bg-white border border-gray-200 rounded-full shadow-lg p-2 flex gap-1 z-10`}
                      >
                        {availableReactions.map((reaction) => (
                          <motion.button
                            key={reaction.emoji}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                            className="text-xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                            title={reaction.label}
                          >
                            {reaction.emoji}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Display Reactions */}
                {Object.keys(reactionCounts).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex gap-1 mt-1 flex-wrap ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {Object.entries(reactionCounts).map(([emoji, count]) => (
                      <motion.div
                        key={emoji}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-0.5 shadow-sm"
                      >
                        <span className="text-sm">{emoji}</span>
                        <span className="text-xs text-gray-600 font-medium">{count}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Spacer for "me" messages */}
              {isMe && <div className="w-8" />}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />

      {/* Empty state */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full text-gray-400"
        >
          <div className="text-6xl mb-4">💬</div>
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </motion.div>
      )}
    </div>
  );
}