'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { fetchBlogs } from '@/app/lib/blogs';
import ResponsiveImage from '@/app/Components/ResponsiveImage';
import Navbar from '@/app/Components/Navbar';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });


export default function BlogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogData, setBlogData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Blogs come from the admin panel (API) with the old static posts as fallback.
  useEffect(() => {
    fetchBlogs().then((list) => { setBlogData(list); setLoaded(true); });
  }, []);

  const categories = ['All', ...new Set(blogData.map(blog => blog.category))];

  const filteredBlogs = selectedCategory === 'All'
    ? blogData
    : blogData.filter(blog => blog.category === selectedCategory);

  const featuredBlogs = [...blogData]
  .filter(blog => blog.featured)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const regularBlogs = [...filteredBlogs]
  .filter(blog => !blog.featured)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Modern Hero Section - Alternative Design */}
      <div className="relative lg:mt-4 mt-8 lg:h-[500px] h-[500px] overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/blogbanner.jpg"
            alt="Blog Banner"
            width={800}
            height={600}
            className="w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 md:py-32">
            <div className="max-w-4xl">
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-green-500/20 backdrop-blur-xl rounded-full border border-white/20 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Latest Insights</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl gap-4 font-black mb-6 leading-none">
                <span className=" text-white drop-shadow-2xl">Our</span>
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-green-400 bg-clip-text text-transparent ml-4">
                  Blog
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-2xl drop-shadow-lg">
                Discover insights on renewable energy, sustainable agriculture, and India's clean energy revolution
              </p>

              {/* Stats/Features */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 backdrop-blur-xl flex items-center justify-center border border-orange-500/30">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Bio CBG</div>
                    <div className="text-gray-300 text-sm">Future of Power</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 backdrop-blur-xl flex items-center justify-center border border-green-500/30">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Agriculture</div>
                    <div className="text-gray-300 text-sm">Sustainable Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 backdrop-blur-xl flex items-center justify-center border border-blue-500/30">
                    <span className="text-2xl">🇮🇳</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Clean India</div>
                    <div className="text-gray-300 text-sm">Green Revolution</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>

      {!loaded && <LazyLoader />}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'All' && featuredBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold">
              <span className="text-orange-500">Featured</span>{' '}
              <span className="text-green-600">Articles</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredBlogs.map(blog => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}>
              <article
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <ResponsiveImage
                    src={blog.thumbnail || blog.image}
                    mobileSrc={blog.thumbnailMobile || blog.imageMobile}
                    alt={blog.thumbnailAlt || blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{blog.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="flex items-center gap-2 text-white px-2 py-1 rounded-lg font-semibold hover:gap-3 transition-all bg-green-600"
                    >
                      Read More <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {selectedCategory !== 'All' && (
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-gray-900">{selectedCategory}</span>
            <span className="text-gray-400 text-2xl ml-2">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {(selectedCategory === 'All' ? regularBlogs : filteredBlogs).map(blog => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <ResponsiveImage
                    src={blog.thumbnail || blog.image}
                    mobileSrc={blog.thumbnailMobile || blog.imageMobile}
                    alt={blog.thumbnailAlt || blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{blog.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="flex items-center gap-2 text-white px-2 py-1 rounded-lg bg-green-600 font-semibold text-md hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}