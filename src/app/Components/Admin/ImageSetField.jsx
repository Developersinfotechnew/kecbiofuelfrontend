"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Monitor, Smartphone, Trash2 } from "lucide-react";
import { adminFetch } from "../../admin/utils/adminAuth";
import { resolveMedia } from "../../lib/api";
import { inputCls } from "./ui";

// One slot: preview + upload button + "or paste URL" box.
function Slot({ icon: Icon, label, hint, value, onChange }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await adminFetch("/uploads", { method: "POST", body, isForm: true });
      onChange(res.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const src = resolveMedia(value);

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-4 h-4 text-green-700" />
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-xs text-gray-400">· {hint}</span>
      </div>

      <div
        className={`relative rounded-xl border-2 border-dashed ${
          src ? "border-gray-200" : "border-gray-200 hover:border-green-400"
        } bg-gray-50 overflow-hidden`}
      >
        {src ? (
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full max-h-48 object-contain bg-white" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/95 border border-gray-200 text-red-500 hover:bg-red-50 flex items-center justify-center shadow-sm"
              aria-label="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="w-full py-8 flex flex-col items-center gap-1.5 text-gray-500 hover:text-green-700 transition-colors"
          >
            {busy ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
            <span className="text-sm font-medium">{busy ? "Uploading..." : "Click to upload"}</span>
            <span className="text-xs text-gray-400">JPG, PNG, WEBP · max 8 MB</span>
          </button>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files?.[0])} />

      <div className="flex gap-2 mt-2">
        <input
          className={`${inputCls} !py-2 !text-xs`}
          placeholder="…or paste image URL / path (e.g. /images/blog1.jpg)"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        {src && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="shrink-0 text-xs font-semibold text-green-700 border border-green-200 bg-green-50 hover:bg-green-100 rounded-xl px-3"
          >
            {busy ? "…" : "Replace"}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}

/**
 * value = { desktop, mobile, alt }
 * Mobile is optional - the site falls back to the desktop image when it is empty.
 */
export default function ImageSetField({ value, onChange, desktopHint = "1200×630", mobileHint = "800×800", showAlt = true }) {
  const v = value || { desktop: "", mobile: "", alt: "" };
  const set = (patch) => onChange({ ...v, ...patch });

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-4">
        <Slot icon={Monitor} label="Desktop" hint={desktopHint} value={v.desktop} onChange={(x) => set({ desktop: x })} />
        <Slot icon={Smartphone} label="Mobile" hint={mobileHint} value={v.mobile} onChange={(x) => set({ mobile: x })} />
      </div>
      {showAlt && (
        <input
          className={inputCls}
          placeholder="Alt text (describe the image - good for SEO & accessibility)"
          value={v.alt || ""}
          onChange={(e) => set({ alt: e.target.value })}
        />
      )}
    </div>
  );
}
