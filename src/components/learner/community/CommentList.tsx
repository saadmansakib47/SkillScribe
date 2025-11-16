import Image from 'next/image';
import { Comment, formatTimeAgo } from '../../../lib/posts';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) return null;

  return (
    <div className="space-y-3">
      {comments.map(comment => (
        <div key={comment.id} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
            <Image
              src={comment.authorAvatar}
              alt={comment.authorName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-sm text-gray-900">{comment.authorName}</p>
              <span className="text-xs text-gray-400" suppressHydrationWarning>
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
