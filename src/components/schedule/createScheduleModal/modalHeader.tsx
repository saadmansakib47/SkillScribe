import { X } from "lucide-react";

export default function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-transform hover:scale-105 active:scale-95"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
