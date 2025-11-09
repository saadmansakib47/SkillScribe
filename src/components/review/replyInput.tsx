import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReplyInput({ onClose }: { onClose: () => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="mt-3 ml-12 bg-gray-50 p-3 rounded-md border border-gray-200">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write your reply..."
        className="w-full text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex gap-2 justify-end mt-2">
        <Button
          variant="outline"
          className="border-gray-400 text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            setValue("");
            onClose();
          }}
        >
          Reply
        </Button>
      </div>
    </div>
  );
}
