"use client";

import { MoreVertical } from "lucide-react";

interface Props {
  name: string;
  avatar: string;
  status?: string;
}

export default function ChatHeader({ name, avatar, status = "Online" }: Props) {
  return (
    <div className="p-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-gray-500">{status}</p>
        </div>
      </div>

      <MoreVertical className="w-5 h-5 text-gray-500" />
    </div>
  );
}
