import Image from 'next/image';
import { PostCategory } from '../../../lib/posts';

interface PostCreationCardProps {
  currentUser: {
    id: number;
    name: string;
    avatar: string;
  };
  postContent: string;
  onPostContentChange: (content: string) => void;
  selectedCategory: PostCategory;
  onCategoryChange: (category: PostCategory) => void;
  onPublish: () => void;
}

const categories: PostCategory[] = ['Discussion', 'Question', 'Announcement', 'Resources'];

export default function PostCreationCard({
  currentUser,
  postContent,
  onPostContentChange,
  selectedCategory,
  onCategoryChange,
  onPublish
}: PostCreationCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-8 mb-6">
      <div className="flex gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200">
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-3">
            <p className="font-bold text-gray-900 text-lg">{currentUser.name}</p>
            <p className="text-sm text-gray-500">Share with the community</p>
          </div>
          <textarea
            value={postContent}
            onChange={(e) => onPostContentChange(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, ask a question, or start a discussion..."
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#094CA4] focus:border-[#094CA4] focus:bg-white resize-none text-gray-700 placeholder-gray-400 transition-all font-medium"
            rows={4}
          />
          
          {/* Category Selection and Post Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Select Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-[#094CA4] text-white shadow-md'
                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#094CA4] hover:text-[#094CA4]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={onPublish}
              disabled={!postContent.trim()}
              className="px-8 py-3 bg-[#094CA4] text-white rounded-xl hover:bg-[#073a85] transition-all font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
