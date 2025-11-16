"use client";

import { useState } from 'react';
import { getCurrentLearner } from '../../../lib/learners';
import { POSTS, PostCategory, Post, Comment } from '../../../lib/posts';
import PostCreationCard from '@/components/learner/community/PostCreationCard';
import CategoryTabs from '@/components/learner/community/CategoryTabs';
import PostCard from '@/components/learner/community/PostCard';
import CommentSection from '@/components/learner/community/CommentSection';
import PageHeader from '@/components/learner/common/PageHeader';

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

  return (
    <div className="min-h-screen bg-[#FAF7F3] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Community" />

        {/* Create Post Card */}
        <PostCreationCard
          currentUser={currentUser}
          postContent={postContent}
          onPostContentChange={setPostContent}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onPublish={handlePost}
        />

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-12 text-center">
              <p className="text-gray-500 font-medium">No posts in this category yet. Be the first to post!</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={likedPosts.has(post.id)}
                isSaved={savedPosts.has(post.id)}
                showComments={showComments.has(post.id)}
                onToggleLike={() => toggleLike(post.id)}
                onToggleSave={() => toggleSave(post.id)}
                onToggleComments={() => toggleComments(post.id)}
                commentSection={
                  showComments.has(post.id) ? (
                    <CommentSection
                      postId={post.id}
                      comments={post.comments}
                      currentUser={currentUser}
                      commentValue={commentInputs[post.id] || ''}
                      onCommentChange={(value) => setCommentInputs(prev => ({ ...prev, [post.id]: value }))}
                      onCommentSubmit={() => handleComment(post.id)}
                    />
                  ) : undefined
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
