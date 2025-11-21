"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI learning assistant. I can help you decide which courses to take, answer questions about learning paths, or provide study tips. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call your AI API endpoint
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();

      if (!data.message) {
        throw new Error('No message in response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble right now. Let me help you another way:\n\n📚 **Browse Courses**: Visit our [All Courses](/learner/allcourses) page\n🎯 **My Learning**: Check your [dashboard](/learner/my-learning/1)\n💬 **Community**: Join our [forum](/learner/community)\n📧 **Support**: [Contact us](/contact)\n\nPlease try asking your question again!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Which courses should I start with?",
    "How do I choose a learning path?",
    "What are the most popular courses?",
    "Can you recommend courses for beginners?",
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#094CA4] to-[#0d6fd9] text-white rounded-full shadow-2xl flex items-center justify-center group"
            aria-label="Open AI Assistant"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Sparkles className="h-7 w-7" />
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-xl"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.85,
              borderRadius: "50%"
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              borderRadius: "1rem",
              transition: {
                type: "spring",
                stiffness: 160,
                damping: 20,
                mass: 0.8
              }
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.85,
              borderRadius: "50%",
              transition: { duration: 0.25 }
            }}
            className={`fixed z-50 ${isMinimized
                ? "bottom-6 right-6 w-80"
                : "bottom-6 right-6 w-96 h-[600px] sm:w-[400px] sm:h-[650px]"
              }`}
            style={{ overflow: "hidden" }}
          >
            {/* Inner container with smooth height animation */}
            <motion.div
              layout
              transition={{
                layout: {
                  type: "spring",
                  bounce: 0.35,
                  duration: 0.45
                }
              }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-full"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#094CA4] to-[#0d6fd9] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Assistant</h3>
                    <p className="text-xs text-blue-100">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Minimized State */}
              {isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 text-center"
                >
                  <p className="text-sm text-gray-600">Click to expand chat</p>
                </motion.div>
              )}

              {/* Chat Content */}
              {!isMinimized && (
                <motion.div
                  layout
                  className="flex flex-col h-full"
                  transition={{ layout: { duration: 0.45, type: "spring" } }}
                >
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                              ? "bg-[#094CA4] text-white rounded-br-sm"
                              : "bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-sm"
                            }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                          <span
                            className={`text-xs mt-1 block ${message.role === "user"
                                ? "text-blue-200"
                                : "text-gray-400"
                              }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-200">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-3 border-t bg-white"
                    >
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        Quick Questions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickQuestions.map((question, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickQuestion(question)}
                            className="text-xs px-3 py-1.5 bg-blue-50 text-[#094CA4] rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2 items-end">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask me anything..."
                        rows={1}
                        className="flex-1 resize-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-transparent outline-none text-sm max-h-32"
                        disabled={isLoading}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="p-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        aria-label="Send message"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

}
