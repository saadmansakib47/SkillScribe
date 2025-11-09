"use client";

import { useState } from 'react';
import Image from 'next/image';
import { getCurrentLearner } from '../../../lib/learners';
import { POSTS, PostCategory, formatTimeAgo, Post, Comment } from '../../../lib/posts';
import { Heart, MessageCircle, Bookmark, Send } from 'lucide-react';

const categories: (PostCategory | 'All')[] = ['All', 'Discussion', 'Question', 'Announcement', 'Resources'];

export default function CommunityPage() {
  const currentUser = getCurrentLearner();
  const [posts, setPosts] = useState<Post[]>(POSTS);
  const [activeTab, setActiveTab] = useState<PostCategory | 'All'>('All');
  const [postContent, setPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>('Discussion');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [showComments, setShowComments] = useState<Set<number>>(new Set());
  const [nextPostId, setNextPostId] = useState(POSTS.length + 1);
  const [nextCommentId, setNextCommentId] = useState(100);

  const filteredPosts = activeTab === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  const handlePost = () => {
    if (postContent.trim()) {
      const newPost: Post = {
        id: nextPostId,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: `Student • ${currentUser.interests[0] || 'Learning'}`,
        category: selectedCategory,
        content: postContent.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        saves: 0,
      };

      // Add new post at the beginning
      setPosts(prev => [newPost, ...prev]);
      setNextPostId(prev => prev + 1);
      setPostContent('');
      
      // Switch to the category of the new post if not already there
      if (activeTab !== 'All' && activeTab !== selectedCategory) {
        setActiveTab(selectedCategory);
      }
    }
  };

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleComment = (postId: number) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      const newComment: Comment = {
        id: nextCommentId,
        postId: postId,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        content: comment.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      // Add comment to the post
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      }));

      setNextCommentId(prev => prev + 1);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

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

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Community</h1>

        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-1">{currentUser.name}</p>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts, ask a question or start a discussion..."
                className="w-full px-4 py-3 bg-[#FAF7F3] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#094CA4] focus:border-transparent resize-none text-gray-700 placeholder-gray-500"
                rows={4}
              />
              
              {/* Category Selection and Post Button */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  {(['Discussion', 'Question', 'Announcement', 'Resources'] as PostCategory[]).map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                        selectedCategory === category
                          ? 'bg-[#094CA4] text-white border-[#094CA4]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#094CA4]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  className="px-6 py-2.5 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === category
                    ? 'text-[#094CA4] border-b-2 border-[#094CA4] bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No posts in this category yet. Be the first to post!</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Post Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{post.authorName}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{post.authorRole}</p>
                    <p className="text-xs text-gray-400 mt-1" suppressHydrationWarning>{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-red-600 text-red-600' : ''}`}
                    />
                    <span className="text-sm font-medium">
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#094CA4] transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>

                  <button
                    onClick={() => toggleSave(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#094CA4] transition-colors ml-auto"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${savedPosts.has(post.id) ? 'fill-[#094CA4] text-[#094CA4]' : ''}`}
                    />
                  </button>
                </div>

                {/* Comments Section */}
                {showComments.has(post.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {/* Existing Comments */}
                    {post.comments.length > 0 && (
                      <div className="space-y-4 mb-4">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3 bg-gray-50 rounded-lg p-4">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={comment.authorAvatar}
                                alt={comment.authorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm text-gray-900">{comment.authorName}</p>
                                <span className="text-xs text-gray-400" suppressHydrationWarning>{formatTimeAgo(comment.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="flex gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                          placeholder="Write a comment..."
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-full focus:ring-2 focus:ring-[#094CA4] focus:border-transparent text-sm"
                        />
                        <button
                          onClick={() => handleComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="p-2 bg-[#094CA4] text-white rounded-full hover:bg-[#073a85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
