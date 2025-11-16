import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { Comment } from '../../../lib/posts';

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  currentUser: {
    name: string;
    avatar: string;
  };
  commentValue: string;
  onCommentChange: (value: string) => void;
  onCommentSubmit: () => void;
}

export default function CommentSection({
  postId,
  comments,
  currentUser,
  commentValue,
  onCommentChange,
  onCommentSubmit
}: CommentSectionProps) {
  return (
    <div className="mt-4 pt-4 border-t-2 border-gray-100">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="mb-4">
          <CommentList comments={comments} />
        </div>
      )}

      {/* Add Comment Input */}
      <CommentInput
        currentUser={currentUser}
        value={commentValue}
        onChange={onCommentChange}
        onSubmit={onCommentSubmit}
      />
    </div>
  );
}
