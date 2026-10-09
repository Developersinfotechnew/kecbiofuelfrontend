const BlogComments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    loadComments();
  }, [blogId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/comments/blog/${blogId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      const rawComments = data.comments || [];

      // Filter only valid comments with proper _id
      const validComments = rawComments.filter(c => 
        c && 
        c._id && 
        typeof c._id === 'string' && 
        c._id.length === 24 && 
        /^[0-9a-fA-F]{24}$/.test(c._id)
      );

      console.log('Raw comments from API:', rawComments.length);
      console.log('Valid comments after filter:', validComments.length);
      console.log('First valid comment ID (if any):', validComments[0]?._id || 'none');

      setComments(validComments);
    } catch (error) {
      console.error('Error loading comments:', error);
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!newComment.trim()) {
      setError('Please write a comment');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          blogId,
          content: newComment.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const data = await response.json();
      setComments([data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId) => {
    if (!commentId) {
      console.warn('Like clicked but commentId is missing');
      return;
    }

    console.log('Like clicked for comment ID:', commentId);

    try {
      const response = await fetch(`${API_URL}/comments/${commentId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to like comment');
      }

      const data = await response.json();

      if (data.success) {
        setComments(prev =>
          prev.map(c =>
            c._id === commentId
              ? { ...c, likes: data.likes, hasLiked: data.hasLiked }
              : c
          )
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!commentId) {
      console.warn('Delete clicked but commentId is missing');
      return;
    }

    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setComments(comments.filter(c => c._id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment');
      setTimeout(() => setError(null), 3000);
    }
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
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-4">
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={loadComments}
      />

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Comments</h2>
            <p className="text-gray-600 text-sm">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {user ? 'Leave a Comment' : 'Login to Comment'}
        </h3>
        
        {!user && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You need to be logged in to post comments</p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <LogIn size={20} />
              <span>Login to Comment</span>
            </button>
          </div>
        )}

        {user && (
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this article..."
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Post Comment</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">
              {comments.length === 0 && !isLoading ? 'No comments yet' : 'No valid comments found'}
            </p>
            <p className="text-gray-500 text-sm mt-2">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
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
                        {comment.user?.name || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {user && comment.user?._id === user._id && (
                      <button
                        onClick={() => handleDelete(comment._id)}
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      comment.hasLiked
                        ? 'bg-orange-100 text-orange-600 border border-orange-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    title={comment.hasLiked ? 'Unlike' : 'Like'}
                  >
                    <ThumbsUp 
                      size={16} 
                      className={comment.hasLiked ? 'fill-current' : ''} 
                    />
                    <span>{comment.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};