"use client";

import { useState, KeyboardEvent, ChangeEvent, useRef } from "react";
import { Send, Paperclip, X, FileText, Image as ImageIcon, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageComposerProps {
  onSend: (message: string, attachments?: File[]) => void;
}

export default function MessageComposer({ onSend }: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showEmojiHint, setShowEmojiHint] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message.trim(), attachments);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const quickEmojis = ["👍", "❤️", "😊", "😂", "🎉", "👏"];

  return (
    <div className="border-t bg-white p-4 shadow-lg">
      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex flex-wrap gap-2"
          >
            {attachments.map((file, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm border border-blue-200"
              >
                {getFileIcon(file)}
                <span className="max-w-[150px] truncate">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Emoji Bar */}
      <AnimatePresence>
        {showEmojiHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 flex gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            {quickEmojis.map((emoji, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMessage((prev) => prev + emoji)}
                className="text-2xl hover:bg-white p-1 rounded transition-colors"
              >
                {emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Attachment Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAttachmentClick}
          className="flex-shrink-0 p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Attach files"
        >
          <Paperclip className="h-5 w-5" />
        </motion.button>

        {/* Emoji Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowEmojiHint(!showEmojiHint)}
          className={`flex-shrink-0 p-2.5 rounded-lg transition-colors ${showEmojiHint
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
          title="Add emoji"
        >
          <Smile className="h-5 w-5" />
        </motion.button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            style={{
              minHeight: "44px",
              maxHeight: "120px",
              overflow: "auto",
            }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {message.length > 0 && `${message.length} chars`}
          </div>
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: message.trim() || attachments.length > 0 ? 1.05 : 1 }}
          whileTap={{ scale: message.trim() || attachments.length > 0 ? 0.95 : 1 }}
          onClick={handleSend}
          disabled={!message.trim() && attachments.length === 0}
          className={`flex-shrink-0 p-3 rounded-xl transition-all ${message.trim() || attachments.length > 0
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Hint Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-gray-400 mt-2 text-center"
      >
        Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">Shift+Enter</kbd> for new line
      </motion.p>
    </div>
  );
}