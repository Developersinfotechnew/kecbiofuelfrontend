"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { adminFetch, resolveThumbnailUrl } from "../../admin/utils/adminAuth";
import { FormHeader } from "./kit";
import { btnPrimary } from "./ui";

const emptySeo = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  focusKeyword: "",
  canonicalUrl: "",
  robots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "video.other",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  structuredData: "",
};

function toFormState(video, videoType) {
  if (!video) {
    return {
      title: "",
      slug: "",
      youtubeUrl: "",
      description: "",
      shortDescription: "",
      category: "General",
      videoType,
      duration: "",
      status: "draft",
      isFeatured: false,
      order: 0,
      tags: "",
      thumbnailAlt: "",
      seo: { ...emptySeo },
    };
  }
  return {
    title: video.title || "",
    slug: video.slug || "",
    youtubeUrl: video.youtubeUrl || "",
    description: video.description || "",
    shortDescription: video.shortDescription || "",
    category: video.category || "General",
    videoType: video.videoType === "short" ? "short" : "video",
    duration: video.duration || "",
    status: video.status || "draft",
    isFeatured: !!video.isFeatured,
    order: video.order || 0,
    tags: (video.tags || []).join(", "),
    thumbnailAlt: video.thumbnail?.altText || "",
    seo: {
      ...emptySeo,
      ...(video.seo || {}),
      metaKeywords: (video.seo?.metaKeywords || []).join(", "),
    },
  };
}

const inputClass =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all";
const labelClass = "block text-sm font-semibold text-[#12201c] mb-1";

export default function VideoForm({ mode, video, videoType = "video" }) {
  const router = useRouter();
  const [form, setForm] = useState(() => toFormState(video, videoType));
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(resolveThumbnailUrl(video?.thumbnail?.url));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setSeo = (key, value) => setForm((f) => ({ ...f, seo: { ...f.seo, [key]: value } }));

  const onThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "create" && !thumbnailFile) {
      setError("Thumbnail image is required");
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      if (form.slug) fd.append("slug", form.slug);
      fd.append("youtubeUrl", form.youtubeUrl);
      fd.append("description", form.description);
      fd.append("shortDescription", form.shortDescription);
      fd.append("category", form.category);
      fd.append("videoType", form.videoType);
      fd.append("duration", form.duration);
      fd.append("status", form.status);
      fd.append("isFeatured", String(form.isFeatured));
      fd.append("order", String(form.order || 0));
      fd.append("tags", form.tags);
      fd.append("thumbnailAlt", form.thumbnailAlt);
      fd.append(
        "seo",
        JSON.stringify({
          ...form.seo,
          metaKeywords: form.seo.metaKeywords,
        })
      );
      if (thumbnailFile) fd.append("thumbnail", thumbnailFile);

      if (mode === "create") {
        await adminFetch("/videos", { method: "POST", body: fd, isForm: true });
      } else {
        await adminFetch(`/videos/${video._id}`, { method: "PUT", body: fd, isForm: true });
      }
      router.push("/admin/videos");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl pb-10">
      <FormHeader
        back={{ href: videoType === "short" ? "/admin/shorts" : "/admin/videos", label: "Cancel" }}
        title={mode === "create" ? (videoType === "short" ? "Add Short" : "Add YouTube Video") : (videoType === "short" ? "Edit Short" : "Edit Video")}
        subtitle={videoType === "short" ? "YouTube Shorts shown on the website" : "YouTube videos shown on the website"}
      >
        <button type="submit" disabled={saving} className={btnPrimary}>
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Saving..." : mode === "create" ? `Add ${videoType === "short" ? "Short" : "Video"}` : "Save changes"}
        </button>
      </FormHeader>

      <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Basic details */}
      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#12201c]">Video Details</h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>
            Slug <span className="text-slate-400">(auto-generated from title if left blank)</span>
          </label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="e.g. kec-cbg-plant-tour"
          />
        </div>

        <div>
          <label className={labelClass}>YouTube URL *</label>
          <input
            className={inputClass}
            required
            value={form.youtubeUrl}
            onChange={(e) => set("youtubeUrl", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <input
              className={inputClass}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Duration</label>
            <input
              className={inputClass}
              placeholder="e.g. 12:45"
              value={form.duration}
              onChange={(e) => set("duration", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            className={inputClass}
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="cbg, biogas, kec"
          />
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <textarea
            className={inputClass}
            rows={2}
            maxLength={300}
            value={form.shortDescription}
            onChange={(e) => set("shortDescription", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Order</label>
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => set("order", e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 pb-2 text-sm font-semibold text-[#12201c]">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="w-4 h-4"
            />
            Featured
          </label>
        </div>
      </section>

      {/* Thumbnail */}
      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#12201c]">Thumbnail</h2>
        {preview && (
          <img src={preview} alt="thumbnail preview" className="w-64 aspect-video object-cover rounded-lg border" />
        )}
        <input type="file" accept="image/*" onChange={onThumbnailChange} className="text-sm" />
        <div>
          <label className={labelClass}>Thumbnail Alt Text</label>
          <input
            className={inputClass}
            value={form.thumbnailAlt}
            onChange={(e) => set("thumbnailAlt", e.target.value)}
          />
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-4">
        <button
          type="button"
          onClick={() => setShowSeo((s) => !s)}
          className="text-lg font-bold text-[#12201c] flex items-center gap-2"
        >
          SEO & Metadata {showSeo ? "▾" : "▸"}
        </button>

        {showSeo && (
          <div className="space-y-4 pt-2">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input
                className={inputClass}
                maxLength={70}
                value={form.seo.metaTitle}
                onChange={(e) => setSeo("metaTitle", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                className={inputClass}
                rows={2}
                maxLength={160}
                value={form.seo.metaDescription}
                onChange={(e) => setSeo("metaDescription", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Meta Keywords (comma separated)</label>
              <input
                className={inputClass}
                value={form.seo.metaKeywords}
                onChange={(e) => setSeo("metaKeywords", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Focus Keyword</label>
                <input
                  className={inputClass}
                  value={form.seo.focusKeyword}
                  onChange={(e) => setSeo("focusKeyword", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Canonical URL</label>
                <input
                  className={inputClass}
                  value={form.seo.canonicalUrl}
                  onChange={(e) => setSeo("canonicalUrl", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Robots</label>
              <input
                className={inputClass}
                value={form.seo.robots}
                onChange={(e) => setSeo("robots", e.target.value)}
              />
            </div>

            <hr className="border-slate-100" />
            <p className="text-sm font-semibold text-slate-600">Open Graph (Facebook / LinkedIn / WhatsApp)</p>
            <div>
              <label className={labelClass}>OG Title</label>
              <input className={inputClass} value={form.seo.ogTitle} onChange={(e) => setSeo("ogTitle", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>OG Description</label>
              <textarea className={inputClass} rows={2} value={form.seo.ogDescription} onChange={(e) => setSeo("ogDescription", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>OG Image URL</label>
              <input className={inputClass} value={form.seo.ogImage} onChange={(e) => setSeo("ogImage", e.target.value)} />
            </div>

            <hr className="border-slate-100" />
            <p className="text-sm font-semibold text-slate-600">Twitter / X Card</p>
            <div>
              <label className={labelClass}>Twitter Title</label>
              <input className={inputClass} value={form.seo.twitterTitle} onChange={(e) => setSeo("twitterTitle", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Twitter Description</label>
              <textarea className={inputClass} rows={2} value={form.seo.twitterDescription} onChange={(e) => setSeo("twitterDescription", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Twitter Image URL</label>
              <input className={inputClass} value={form.seo.twitterImage} onChange={(e) => setSeo("twitterImage", e.target.value)} />
            </div>

            <hr className="border-slate-100" />
            <div>
              <label className={labelClass}>Structured Data (raw JSON-LD, optional)</label>
              <textarea
                className={`${inputClass} font-mono`}
                rows={4}
                value={form.seo.structuredData}
                onChange={(e) => setSeo("structuredData", e.target.value)}
              />
            </div>
          </div>
        )}
      </section>

      </div>
    </form>
  );
}