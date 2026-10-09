'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Bookmark,
  Share2Icon
} from 'lucide-react';
import Navbar from '@/app/Components/Navbar';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const BlogReviews = dynamic(() => import('@/app/Components/BlogReviews'), { ssr: false, loading: () => <LazyLoader /> });
const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });



export default function BlogDetailScreen({ blog, relatedBlogs }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(156);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = async () => {
    if (isLoadingLike) return;
    setLiked(!liked);
    setLikes(prev => liked ? Math.max(0, prev - 1) : prev + 1);
  };

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : '';
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(blog?.title || 'Interesting article');

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
    setShareOpen(false);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank', 'width=600,height=400');
    setShareOpen(false);
  };

  const handleLinkedInShare = () => {
    if (shareUrl.includes('localhost') || shareUrl.includes('127.0.0.1')) {
      alert('LinkedIn sharing works best on deployed sites. Link copied instead.');
      handleCopyLink();
      setShareOpen(false);
      return;
    }
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=600');
    setShareOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title || '',
          text: blog?.excerpt || blog?.content?.substring(0, 150) || '',
          url: shareUrl,
        });
        setShareOpen(false);
      } catch (err) {
        console.log('Native share failed or cancelled', err);
      }
    }
  };

  // Fallback mock data if blog prop is missing
  const displayBlog = blog || {
    slug: 'sample-blog',
    title: "In CBG, 'Sasta' Is Not Smart — 'Sabse Achha' Is Sustainable",
    category: 'Bio CBG',
    author: 'Tech Blog Team',
    date: '2024-12-20',
    readTime: '5 min read',
    views: 1250,
    likes: likes,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop',
    excerpt: 'India is embracing a decisive shift in its energy narrative. Clean fuels are no longer viewed merely as alternatives, but as experimental solutions for a sustainable future.',
    content: 'India is embarking on a transformative journey in energy sustainability, with Compressed Bio Gas (CBG) leading the charge. This revolutionary fuel source represents not just an alternative, but a fundamental shift in how we approach energy production and consumption.',
    sections: [
      {
        subheading: 'The Rise of Bio-CBG in India',
        content: "India's commitment to renewable energy has catalyzed the growth of Bio-CBG infrastructure across the nation.\n\nThe technology offers multiple benefits: reducing greenhouse gas emissions, providing farmers with additional income streams, and decreasing dependence on fossil fuels.",
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop'
      },
      {
        subheading: 'Economic and Environmental Impact',
        content: 'The economic implications of CBG adoption extend beyond energy production. Rural communities benefit from new employment opportunities.\n\nEnvironmental benefits include significant reductions in methane emissions from organic waste.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop'
      }
    ]
  };

  const displayRelatedBlogs = relatedBlogs || [
    {
      id: 1,
      slug: 'solar-power',
      title: 'The Future of Solar Energy in Rural India',
      excerpt: 'Exploring how solar power is transforming rural communities.',
      category: 'Solar Energy',
      readTime: '4 min read',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      slug: 'sustainable-farming',
      title: 'Sustainable Farming Practices for Climate Change',
      excerpt: 'How modern agriculture can combat climate challenges.',
      category: 'Agriculture',
      readTime: '6 min read',
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      slug: 'wind-energy',
      title: 'Wind Energy: The Silent Revolution',
      excerpt: 'Discover how wind turbines are changing the energy landscape.',
      category: 'Renewable Energy',
      readTime: '5 min read',
      thumbnail: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-green-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[550px] overflow-hidden mt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-20 sm:-left-40 w-48 sm:w-80 h-48 sm:h-80 bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 -right-20 sm:-right-40 w-56 sm:w-96 h-56 sm:h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-16 sm:-bottom-32 left-1/3 w-56 sm:w-96 h-56 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="absolute inset-0">
          <Image
            src={displayBlog.image}
            alt={displayBlog.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-green-600/20"></div>
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 w-full">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all group"
            >
              <ArrowLeft size={14} className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm font-medium">Back to Blog</span>
            </a>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <span className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white/15 backdrop-blur-xl border border-white/20 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:bg-white/25 transition-all">
                  {displayBlog.category}
                </span>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="p-2 sm:p-2.5 bg-white/15 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/25 transition-all"
                >
                  <Bookmark
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] text-white"
                    fill={bookmarked ? 'white' : 'none'}
                  />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight sm:leading-[1.1] tracking-tight mb-4 sm:mb-6 lg:mb-8 lg:max-w-[800px]">
                {displayBlog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-xs sm:text-sm truncate">{displayBlog.author}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-xs sm:text-sm">
                  <Calendar size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{new Date(displayBlog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-xs sm:text-sm">
                  <Clock size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>{displayBlog.readTime}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-xs sm:text-sm">
                  <Eye size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{displayBlog.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 sm:h-20 lg:h-24">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#wave-gradient)" />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
                <stop offset="0%" stopColor="rgb(251 246 242)" />
                <stop offset="50%" stopColor="rgb(254 243 232)" />
                <stop offset="100%" stopColor="rgb(240 253 244)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100">

              {/* Main intro content */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                  {displayBlog.content}
                </p>
              </div>

              {/* ✅ Intro Image — renders only when introImage field exists on this blog */}
              {displayBlog.introImage && (
                <div className="mb-8 sm:mb-10 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={displayBlog.introImage}
                    alt={displayBlog.title}
                    width={800}
                    height={600}
                    className="w-full h-[220px] sm:h-[320px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Sections */}
              {displayBlog.sections?.map((section, index) => (
                <div key={index} className="mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-4 border-gradient-to-r from-orange-500 to-green-600">
                    {section.subheading}
                  </h2>
                  {section.image && (
                    <div className="mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={section.image}
                        alt={section.subheading}
                        width={800}
                        height={600}
                        className="w-full h-48 sm:h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4 text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Engagement / Share Section */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                      <div className="shrink-0">
                        <h1 className="bg-gradient-to-r from-orange-500 to-green-600 text-white py-2 rounded-lg px-3 text-sm sm:text-base font-medium">
                          <Share2Icon size={15} className="inline-block mr-2" />
                          Share Article
                        </h1>
                      </div>

                      <div className="w-full overflow-x-auto">
                        <div className="bg-white/60 backdrop-blur-3xl rounded-xl sm:rounded-2xl shadow-lg px-3 sm:px-4 py-2 sm:py-3 border border-gray-100 min-w-max">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <button
                              onClick={handleFacebookShare}
                              className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all"
                              title="Facebook"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Facebook size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                              </div>
                              <span className="text-gray-700 font-medium text-[10px] sm:text-xs whitespace-nowrap">Facebook</span>
                            </button>

                            <button
                              onClick={handleTwitterShare}
                              className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all"
                              title="Twitter"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Twitter size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                              </div>
                              <span className="text-gray-700 font-medium text-[10px] sm:text-xs whitespace-nowrap">Twitter</span>
                            </button>

                            <button
                              onClick={handleLinkedInShare}
                              className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all"
                              title="LinkedIn"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                              </div>
                              <span className="text-gray-700 font-medium text-[10px] sm:text-xs whitespace-nowrap">LinkedIn</span>
                            </button>

                            <button
                              onClick={handleCopyLink}
                              className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-all"
                              title="Copy Link"
                            >
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${copied ? 'bg-green-600' : 'bg-gray-600'}`}>
                                {copied ? <Check size={16} className="sm:w-[18px] sm:h-[18px] text-white" /> : <Link2 size={16} className="sm:w-[18px] sm:h-[18px] text-white" />}
                              </div>
                              <span className="text-gray-700 font-medium text-[10px] sm:text-xs whitespace-nowrap">
                                {copied ? 'Copied!' : 'Copy'}
                              </span>
                            </button>

                            {typeof navigator !== 'undefined' && navigator.share && (
                              <button
                                onClick={handleNativeShare}
                                className="group flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 hover:bg-orange-50 rounded-lg sm:rounded-xl transition-all border-l border-gray-200 pl-2 sm:pl-3 ml-1"
                                title="More Options"
                              >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Share2 size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                                </div>
                                <span className="text-gray-700 font-medium text-[10px] sm:text-xs whitespace-nowrap">More</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <BlogReviews blogSlug={displayBlog.slug} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-green-500 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">About Author</h3>
                    <p className="text-xs sm:text-sm text-orange-600 font-semibold truncate">{displayBlog.author}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Expert in renewable energy and sustainable agriculture
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-green-500 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 text-white">
                <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Article Stats</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm font-medium">Views</span>
                    <span className="font-bold text-base sm:text-lg">{displayBlog.views}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm font-medium">Likes</span>
                    <span className="font-bold text-base sm:text-lg">{likes}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm font-medium">Read Time</span>
                    <span className="font-bold text-base sm:text-lg">{displayBlog.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {displayRelatedBlogs.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayRelatedBlogs.map((relatedBlog) => (
                <a
                  key={relatedBlog.id || relatedBlog.slug}
                  href={`/blogs/${relatedBlog.slug}`}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div className="h-40 sm:h-48 overflow-hidden relative">
                    <Image
                      src={relatedBlog.thumbnail || relatedBlog.image}
                      alt={relatedBlog.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/90 backdrop-blur-sm text-orange-600 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
                      <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>{relatedBlog.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}