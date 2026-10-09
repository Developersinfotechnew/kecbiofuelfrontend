"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch, resolveThumbnailUrl } from "../utils/adminAuth";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/videos/admin/all?limit=100");
      setVideos((res.data || []).filter((v) => v.videoType !== "short"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublish = async (video) => {
    setBusyId(video._id);
    try {
      const newStatus = video.status === "published" ? "draft" : "published";
      await adminFetch(`/videos/${video._id}/status`, {
        method: "PATCH",
        body: { status: newStatus },
      });
      setVideos((vs) => vs.map((v) => (v._id === video._id ? { ...v, status: newStatus } : v)));
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (video) => {
    if (!confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    setBusyId(video._id);
    try {
      await adminFetch(`/videos/${video._id}`, { method: "DELETE" });
      setVideos((vs) => vs.filter((v) => v._id !== video._id));
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const publishedCount = videos.filter((v) => v.status === "published").length;
  const featuredCount = videos.filter((v) => v.isFeatured).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">YouTube Videos</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage videos shown on your public site</p>
        </div>
        <Link
          href="/admin/videos/new"
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-sm shadow-orange-500/30 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Add Video</span>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500">Total Videos</p>
          <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500">Published</p>
          <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-500">Featured</p>
          <p className="text-2xl font-bold text-amber-600">{featuredCount}</p>
        </div>
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <p className="text-gray-500">No videos yet.</p>
          <Link href="/admin/videos/new" className="text-green-600 font-semibold text-sm hover:underline mt-1 inline-block">
            + Add your first video
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {videos.map((v) => (
            <div
              key={v._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={resolveThumbnailUrl(v.thumbnail?.url)}
                  alt={v.thumbnail?.altText || v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span
                    className={
                      v.status === "published"
                        ? "text-[11px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm bg-green-500/90 text-white"
                        : "text-[11px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm bg-gray-700/80 text-white"
                    }
                  >
                    {v.status === "published" ? "● Published" : "Draft"}
                  </span>
                  {v.isFeatured && (
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-amber-400/95 text-amber-900">
                      ★ Featured
                    </span>
                  )}
                  {v.videoType === "short" && (
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-red-500/90 text-white">
                      ⚡ Short
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                  {v.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 truncate">/{v.slug}</p>

                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>{v.views} views</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 font-medium text-gray-600">
                    {v.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button
                    disabled={busyId === v._id}
                    onClick={() => togglePublish(v)}
                    className="flex-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg py-1.5 disabled:opacity-50 transition-colors"
                  >
                    {v.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <Link
                    href={`/admin/videos/${v._id}/edit`}
                    className="flex-1 text-center text-xs font-semibold text-orange-600 hover:bg-orange-50 rounded-lg py-1.5 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    disabled={busyId === v._id}
                    onClick={() => remove(v)}
                    className="flex-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg py-1.5 disabled:opacity-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}