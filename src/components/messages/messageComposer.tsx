"use client";

import { Paperclip, Smile, Send } from "lucide-react";

interface Props {
  onSend: (msg: string) => void;
}

export default function MessageComposer({ onSend }: Props) {
  return (
    <div className="p-4 bg-white border-t flex items-center gap-3">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Paperclip className="w-5 h-5" />
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Smile className="w-5 h-5" />
      </button>

      <input
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
      />

      <button className="p-3 bg-[#0d6fd9] rounded-lg text-white hover:opacity-90">
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
