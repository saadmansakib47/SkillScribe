"use client";

import { Search, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Conversation } from "./types";
import { useState } from "react";

interface Props {
  conversations: Conversation[];
  selectedChat: number | null;
  onSelect: (id: number) => void;
}

export default function ConversationList({
  conversations,
  selectedChat,
  onSelect,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredConversations.length > 0 ? (
          <div className="space-y-1">
            {filteredConversations.map((conv, index) => (
              <motion.button
                key={conv.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(conv.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all relative
                  ${selectedChat === conv.id
                    ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                    : "hover:bg-gray-50 border-2 border-transparent"
                  }
                `}
              >
                {/* Avatar with online indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {conv.unread && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold truncate ${conv.unread ? "text-gray-900" : "text-gray-700"
                      }`}>
                      {conv.name}
                    </p>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${conv.unread ? "text-gray-700 font-medium" : "text-gray-500"
                    }`}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {conv.unread && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    1
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-gray-400"
          >
            <Search className="w-12 h-12 mb-3" />
            <p className="text-sm">No conversations found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}