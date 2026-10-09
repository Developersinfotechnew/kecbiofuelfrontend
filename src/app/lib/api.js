// Shared helpers for talking to the KEC backend from public pages (server or client).
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const API_HOST = API_URL.replace(/\/api\/?$/, "");

// Admin-uploaded files live on the API host ("/uploads/..."). Images that are
// part of the website's own /public folder ("/images/...") stay relative.
export const resolveMedia = (url) => {
  if (!url) return "";
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/uploads/")) return `${API_HOST}${url}`;
  return url;
};

// GET json. Returns null on any failure so pages can fall back gracefully.
export async function apiGet(path, { revalidate = 60 } = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export const formatDate = (value, opts = { year: "numeric", month: "short", day: "numeric" }) => {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", opts);
};
