"use client";

import { resolveThumb, formatCount } from "@/app/Components/VideoCard";

// Lightning-bolt "Shorts" icon, matches YouTube's mark.
function ShortsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M9.593 3.084c.35-.157.759-.11 1.062.12l7.5 5.75a1 1 0 0 1 0 1.588l-7.5 5.856a1 1 0 0 1-1.62-.79V4.02c0-.386.207-.742.558-.936Z" />
    </svg>
  );
}

/**
 * A horizontal shelf of vertical "Shorts"-style cards, same visual language
 * as real YouTube's Shorts row. Reused wherever a Shorts shelf is needed.
 */
export default function ShortsRow({ videos = [], onPlay }) {
  if (!videos.length) return null;

  return (
    <section className="py-2">
      <div className="flex items-center gap-2 mb-4">
        <ShortsIcon className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-bold text-gray-900">Shorts</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
        {videos.map((video) => (
          <div
            key={video._id}
            onClick={() => onPlay(video.youtubeVideoId)}
            className="shrink-0 w-[42%] sm:w-[28%] lg:w-[17%] snap-start cursor-pointer group"
          >
            <div className="relative w-full aspect-[9/13] bg-black rounded-xl overflow-hidden">
              <img
                src={resolveThumb(video.thumbnail?.url)}
                alt={video.thumbnail?.altText || video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-snug line-clamp-2 drop-shadow">
                {video.title}
              </p>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">{formatCount(video.views)} views</p>
          </div>
        ))}
      </div>
    </section>
  );
}
