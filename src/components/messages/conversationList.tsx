"use client";

import { Search } from "lucide-react";
import { Conversation } from "./types";

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
  return (
    <div className="w-80 border-r bg-white p-4 flex flex-col">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
        <input
          placeholder="Search messages"
          className="w-full px-10 py-2 border rounded-full focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`flex items-center gap-3 p-3 rounded-lg text-left transition
              ${selectedChat === conv.id ? "bg-blue-50" : "hover:bg-gray-100"}
            `}
          >
            <img src={conv.avatar} className="w-10 h-10 rounded-full" />

            <div className="flex-1">
              <p className="font-semibold">{conv.name}</p>
              <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
            </div>

            <div className="text-xs text-gray-400">{conv.timestamp}</div>

            {conv.unread && (
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
