"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function VideoSettingsSection() {
  const [allowComments, setAllowComments] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);
  const [allowChat, setAllowChat] = useState(true);

  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-6">
      <h2 className="text-blue-700 font-semibold underline mb-4">Video Settings</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Allow Comments</p>
            <p className="text-xs text-gray-500">Allow users to comment after viewing</p>
          </div>
          <Switch checked={allowComments} onCheckedChange={setAllowComments} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Allow Download</p>
            <p className="text-xs text-gray-500">Enable video download for enrolled users</p>
          </div>
          <Switch checked={allowDownload} onCheckedChange={setAllowDownload} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Allow Chat</p>
            <p className="text-xs text-gray-500">Allow participants to chat during session</p>
          </div>
          <Switch checked={allowChat} onCheckedChange={setAllowChat} />
        </div>
      </div>
    </div>
  );
}
