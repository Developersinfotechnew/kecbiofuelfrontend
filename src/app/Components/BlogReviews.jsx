'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, ThumbsUp, Trash2 } from 'lucide-react';
import { AuthModal } from '@/app/Components/AuthModal';

// Get API URL from environment variable and remove trailing slash
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export default function BlogReviews({ blogSlug, blogId: propBlogId }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth state
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingComment, setPendingComment] = useState(null);

  // Use blogId from props or blogSlug as fallback
  const blogId = propBlogId || blogSlug;

  // Load user and comments on mount
  useEffect(() => {
    checkAuthStatus();
    loadComments();
  }, [blogSlug]);

  // Auto-submit comment after successful login
  useEffect(() => {
    if (user && pendingComment) {
      submitCommentToAPI(pendingComment);
      setPendingComment(null);
    }
  }, [user, pendingComment]);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (blogSlug) {
        const response = await fetch(`${API_URL}/api/comments/blog/${blogSlug}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        } else {
          setComments([]);
        }
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const submitCommentToAPI = async (commentText) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          blogId: blogId,  // Using blogId (either from props or blogSlug)
          content: commentText.trim(),
          userId: user.id,
          userName: user.name || user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post comment');
      }

      // Add new comment to list
      setComments([data.comment, ...comments]);
      setNewComment('');
      
      // Show success message (optional)
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to post comment. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitComment = async () => {
    // Validate comment content first
    if (!newComment.trim()) {
      setError('Please write a comment');
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Check if user is logged in
    if (!user) {
      // Store the comment to post after login
      setPendingComment(newComment.trim());
      setIsAuthModalOpen(true);
      return;
    }

    // User is logged in, submit directly
    await submitCommentToAPI(newComment.trim());
  };

  const handleLike = async (commentId) => {
    console.log('Liking comment:', commentId);

    if (!commentId) {
      console.warn('Comment ID is missing');
      return;
    }

    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/comments/${commentId}/like`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like comment');
      }

      const data = await response.json();

      // ✅ CORRECT STATE UPDATE
      setComments(prev =>
        prev.map(c =>
          c._id === commentId
            ? { ...c, likes: data.likes, hasLiked: data.hasLiked }
            : c
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setComments(comments.filter(c => c.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setNewComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      ref={sectionRef}
      className="max-w-4xl mx-auto mt-16 relative transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
          <MessageCircle size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Reviews & Comments
          </h2>
          <p className="text-gray-600 text-sm">
            {comments.length} {comments.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Comment Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 mb-8 relative">
        {user ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Leave a Comment</h3>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
              >
                Logout
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 rounded-lg">
              <User size={16} className="text-orange-600" />
              <span className="text-sm text-orange-900">
                Logged in as <strong>{user.email}</strong>
              </span>
            </div>
          </>
        ) : (
          <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Comment</h3>
        )}

        <div className="space-y-4">
          <div>
            <textarea
              id="comment-textarea"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? 'Share your thoughts about this article...' : 'Write your comment... (You\'ll be asked to sign in)'}
              rows="4"
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none disabled:bg-gray-50 disabled:text-gray-500 relative z-10"
            />
          </div>

          <button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>{user ? 'Post Comment' : 'Sign In & Post'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4 relative">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No comments yet</p>
            <p className="text-gray-500 text-sm mt-2">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-green-500 flex items-center justify-center flex-shrink-0">
                  <User size={24} className="text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {comment.userName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {user && user.id === comment.userId && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete comment"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    {comment.content}
                  </p>

                  <button
                    onClick={() => handleLike(comment._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 rounded-lg transition-colors font-medium text-sm"
                  >
                    <ThumbsUp size={16} />
                    <span>{comment.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingComment(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}