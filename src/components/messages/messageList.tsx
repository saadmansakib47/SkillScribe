"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, FileText, Download } from "lucide-react";
import { Message } from "./types";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isMe = message.sender === "me";
          const showAvatar = index === 0 || messages[index - 1].sender !== message.sender;

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

              {/* Message Bubble */}
              <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-2xl px-4 py-3 shadow-sm ${isMe
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
                      className={`text-xs ${isMe ? "text-blue-100" : "text-gray-500"
                        }`}
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
                </motion.div>
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