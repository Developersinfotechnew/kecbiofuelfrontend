"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_HOST = API_URL.replace(/\/api\/?$/, "");

export const resolveThumb = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_HOST}${url}`;
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "Today";
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} yr${years > 1 ? "s" : ""} ago`;
};

export const formatCount = (n) => {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
};

/**
 * Single source of truth for the video card. Used on homepage (YoutubeVideosRow)
 * and on /videos (VideosScreen). Change design once here, updates both places.
 */
export default function VideoCard({ video, onPlay, className = "" }) {
  return (
    <div
      className={`w-full bg-white shadow-lg hover:shadow-2xl rounded-xl overflow-hidden cursor-pointer group transition-shadow duration-300 ${className}`}
      onClick={() => onPlay(video.youtubeVideoId)}
    >
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden">
        <img
          src={resolveThumb(video.thumbnail?.url)}
          alt={video.thumbnail?.altText || video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

        <div className="absolute top-2 left-2 right-2 flex items-start gap-2">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow shrink-0 overflow-hidden p-1">
            <img src="/kec-logo.png" alt="KEC logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white text-xs font-bold leading-tight line-clamp-2 drop-shadow">
              {video.title}
            </h3>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-11 rounded-xl bg-red-600 flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {video.duration && (
          <span className="absolute top-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-1.5 bg-black/60">
          <div className="flex gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 17 20 12 15 7" />
              <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-[11px] font-medium">Watch on</span>
            <span className="flex items-center justify-center w-4 h-3 bg-red-600 rounded-sm">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="text-white text-[11px] font-bold">YouTube</span>
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden ml-1 p-0.5">
              <img src="/kec-logo.png" alt="KEC logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 px-3 flex gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-green-700 transition-colors duration-300">
            {video.shortDescription || video.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {formatCount(video.views)} views {video.publishedAt && `• ${timeAgo(video.publishedAt)}`}
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 shrink-0 mt-0.5">
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      </div>
    </div>
  );
}

export function VideoCardSkeleton({ className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="aspect-[4/3] bg-gray-200 rounded-xl animate-pulse" />
      <div className="h-3.5 bg-gray-200 rounded mt-3 w-full animate-pulse" />
      <div className="h-3.5 bg-gray-200 rounded mt-2 w-2/3 animate-pulse" />
    </div>
  );
}