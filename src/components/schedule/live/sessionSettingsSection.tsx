"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SessionSettingsSection() {
  const [autoRecord, setAutoRecord] = useState(true);
  const [enableChat, setEnableChat] = useState(true);
  const [qaSession, setQaSession] = useState(true);

  return (
    <div className="bg-white border border-gray-300 rounded-[8px] p-5 mb-8">
      <h2 className="text-blue-700 font-semibold underline mb-4">Session Settings</h2>

      <div className="space-y-4">
        {/* Auto Recording */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Automatic Recording</p>
            <p className="text-xs text-gray-500">Save session for later viewing</p>
          </div>
          <Switch checked={autoRecord} onCheckedChange={setAutoRecord} />
        </div>

        {/* Enable Chat */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Enable Chat</p>
            <p className="text-xs text-gray-500">Allow participants to chat during session</p>
          </div>
          <Switch checked={enableChat} onCheckedChange={setEnableChat} />
        </div>

        {/* Q&A */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Q&A Session</p>
            <p className="text-xs text-gray-500">Enable question and answer feature</p>
          </div>
          <Switch checked={qaSession} onCheckedChange={setQaSession} />
        </div>
      </div>
    </div>
  );
}
