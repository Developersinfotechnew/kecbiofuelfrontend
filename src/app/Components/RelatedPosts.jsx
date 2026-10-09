import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';

const RelatedPosts = ({ currentPostId, blogPosts, formatDate }) => {
  // Get next 3 posts after the current post
  const getRelatedPosts = () => {
    const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
    
    // If current post is not found, return first 3 posts
    if (currentIndex === -1) {
      return blogPosts.slice(0, 3);
    }
    
    // Get next 3 posts (wrapping around if needed)
    const relatedPosts = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentIndex + i) % blogPosts.length;
      relatedPosts.push(blogPosts[nextIndex]);
    }
    
    return relatedPosts;
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 max-w-6xl mx-auto mb-8 px-8"
    >
      <h2 className="text-3xl font-extrabold text-orange-600 mb-8 tracking-tight border-b-2 border-green-500 pb-2">
        More Articles You Might Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ 
              y: -10, 
              scale: 1.03, 
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" 
            }}
            className="group"
          >
            <Link
              href={`/blogsingle?id=${post.id}&category=${post.category}`}
              className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-lg">
                  {post.category}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-orange-500" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPosts;