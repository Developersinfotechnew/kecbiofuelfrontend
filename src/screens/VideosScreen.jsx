"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/app/Components/Navbar";
import VideoCard, { VideoCardSkeleton } from "@/app/Components/VideoCard";
import ShortsRow from "@/app/Components/ShortsRow";
import { Search, X, Clapperboard, Youtube } from "lucide-react";
import Link from "next/link";

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import("@/app/Components/Footer"), {
  ssr: false,
  loading: () => <LazyLoader />,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function YoutubeLogo({ className }) {
  return (
    <svg viewBox="0 0 28 20" className={className}>
      <rect width="28" height="20" rx="6" fill="#FF0000" />
      <path d="M12 6v8l7-4-7-4z" fill="#fff" />
    </svg>
  );
}

export default function VideosScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/videos?limit=200&sort=-order,-publishedAt`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setVideos(json.data || []);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  // Shorts get pulled out into their own shelf; everything else is a normal video.
  const shortsVideos = useMemo(() => videos.filter((v) => v.videoType === "short"), [videos]);
  const regularVideos = useMemo(() => videos.filter((v) => v.videoType !== "short"), [videos]);

  const categories = useMemo(() => {
    const seen = [];
    regularVideos.forEach((v) => {
      const c = v.category || "General";
      if (!seen.includes(c)) seen.push(c);
    });
    return seen;
  }, [regularVideos]);

  const grouped = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c] = regularVideos.filter((v) => (v.category || "General") === c);
    });
    return map;
  }, [regularVideos, categories]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim().toLowerCase();
    return regularVideos.filter(
      (v) =>
        v.title?.toLowerCase().includes(q) ||
        v.shortDescription?.toLowerCase().includes(q) ||
        (v.category || "").toLowerCase().includes(q)
    );
  }, [regularVideos, query]);

  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setQuery("");
  };

  const showEmpty = !loading && videos.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* spacer for fixed navbar height — scrolls away normally */}
      <div className="pt-24 lg:pt-28" />

      {/* YouTube-style top bar: page title + search, sits right under the navbar */}
      <div className="sticky top-[60px] z-10 bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3">
            <h1 className="text-lg font-semibold text-gray-900 shrink-0 flex items-center gap-2">
              <YoutubeLogo className="w-7 h-5" />
              KEC Biofuel Videos
            </h1>
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 pr-9 py-2 rounded-full border border-gray-300 text-sm outline-none focus:border-green-500 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {!loading && (
              <span className="text-xs text-gray-400 shrink-0 hidden sm:inline">
                {videos.length} video{videos.length !== 1 ? "s" : ""}
              </span>
            )}
            <Link
              href="https://www.youtube.com/@Kecbiofuel?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              <YoutubeLogo className="w-5 h-3.5" />
              Subscribe
            </Link>
          </div>

          {/* Category chip row - like YouTube's "All / Podcasts / ..." filter pills */}
          {!query && categories.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 items-start">
            {Array.from({ length: 8 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        )}

        {showEmpty && (
          <div className="text-center py-24">
            <Clapperboard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No videos published yet. Check back soon.</p>
          </div>
        )}

        {!loading && query.trim() && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
            </h2>
            {searchResults.length === 0 ? (
              <p className="text-gray-500">No videos match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 items-start">
                {searchResults.map((v) => (
                  <VideoCard key={v._id} video={v} onPlay={setPlaying} />
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && !query.trim() && activeCategory === "All" && regularVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 items-start">
            {regularVideos.map((v) => (
              <VideoCard key={v._id} video={v} onPlay={setPlaying} />
            ))}
          </div>
        )}

        {!loading && !query.trim() && activeCategory === "All" && (
          <ShortsRow videos={shortsVideos} onPlay={setPlaying} />
        )}

        {!loading && !query.trim() && activeCategory !== "All" && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 items-start">
              {(grouped[activeCategory] || []).map((v) => (
                <VideoCard key={v._id} video={v} onPlay={setPlaying} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Player modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white/90 hover:text-white"
            onClick={() => setPlaying(null)}
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}