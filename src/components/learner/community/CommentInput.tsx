import Image from 'next/image';
import { Send } from 'lucide-react';

interface CommentInputProps {
  currentUser: {
    name: string;
    avatar: string;
  };
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function CommentInput({ currentUser, value, onChange, onSubmit }: CommentInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] text-sm font-medium transition-all"
        />
        <button
          onClick={onSubmit}
          disabled={!value?.trim()}
          className="p-2.5 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
