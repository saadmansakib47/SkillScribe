import { X } from "lucide-react";
import { Message } from "@/lib/admin/chatbotData";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  learnerName: string;
  course: string;
}

export default function ChatModal({ isOpen, onClose, messages, learnerName, course }: ChatModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Chat Transcript</h2>
            <p className="text-sm text-gray-600 mt-1">
              {learnerName} • {course}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "learner" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] ${
                  message.sender === "learner"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                } rounded-2xl px-4 py-3`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "learner" ? "text-blue-100" : "text-gray-600"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
