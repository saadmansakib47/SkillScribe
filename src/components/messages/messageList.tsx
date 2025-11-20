"use client";

import { Message } from "./types";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) 
{
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xs p-3 rounded-lg text-sm shadow-sm ${
            msg.sender === "me"
              ? "ml-auto bg-blue-50 border border-blue-200"
              : "mr-auto bg-gray-100"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
