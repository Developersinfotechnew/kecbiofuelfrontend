"use client";

import { useEffect, useState } from "react";
import VideoCard, { VideoCardSkeleton } from "@/app/Components/VideoCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function YoutubeVideosRow() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/videos?limit=12&sort=-order,-publishedAt`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setVideos(json.data || []);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && videos.length === 0) return null;

  return (
    <section className="w-full py-16 bg-gradient-to-br from-slate-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl lg:text-[42px] font-bold leading-tight text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
            Our <span className="text-green-600">YouTube Videos</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Watch our latest videos on CBG plants, biofuel technology and sustainable energy solutions
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth items-start [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
          {(loading ? Array.from({ length: 4 }) : videos).map((video, i) => (
            <div key={video?._id || i} className="shrink-0 w-[85%] sm:w-[45%] lg:w-[23%] snap-start">
              {loading ? <VideoCardSkeleton /> : <VideoCard video={video} onPlay={setPlaying} />}
            </div>
          ))}
        </div>
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <div className="w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${playing}?autoplay=1`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white text-3xl leading-none"
            onClick={() => setPlaying(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}