import Image from 'next/image';
import { Post, PostCategory, formatTimeAgo } from '../../../lib/posts';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  showComments: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onToggleComments: () => void;
  commentSection?: React.ReactNode;
}

const getCategoryColor = (category: PostCategory) => {
  switch (category) {
    case 'Discussion':
      return 'bg-blue-100 text-blue-700';
    case 'Question':
      return 'bg-purple-100 text-purple-700';
    case 'Announcement':
      return 'bg-green-100 text-green-700';
    case 'Resources':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function PostCard({
  post,
  isLiked,
  isSaved,
  showComments,
  onToggleLike,
  onToggleSave,
  onToggleComments,
  commentSection
}: PostCardProps) {
  const likesCount = post.likes + (isLiked ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
          <Image
            src={post.authorAvatar}
            alt={post.authorName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-gray-900">{post.authorName}</p>
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">{post.authorRole}</p>
          <p className="text-xs text-gray-400 mt-1" suppressHydrationWarning>
            {formatTimeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-4 leading-relaxed font-medium">{post.content}</p>

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-100">
        <button
          onClick={onToggleLike}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-semibold"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
          <span className="text-sm">{likesCount}</span>
        </button>

        <button
          onClick={onToggleComments}
          className="flex items-center gap-2 text-gray-600 hover:text-[#094CA4] transition-colors font-semibold"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">{post.comments.length}</span>
        </button>

        <button
          onClick={onToggleSave}
          className="flex items-center gap-2 text-gray-600 hover:text-[#094CA4] transition-colors ml-auto font-semibold"
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-[#094CA4] text-[#094CA4]' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && commentSection}
    </div>
  );
}
