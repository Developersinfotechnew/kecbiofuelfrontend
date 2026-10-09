export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// Host without the trailing /api — used to build full URLs for uploaded thumbnails.
export const API_HOST = API_URL.replace(/\/api\/?$/, "");

const TOKEN_KEY = "adminToken";

export const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAdminToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Turns a video's stored thumbnail.url ("/uploads/thumbnails/x.jpg") into a
// full, directly-loadable URL. Leaves already-absolute URLs untouched.
export const resolveThumbnailUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_HOST}${url}`;
};

// fetch() wrapper that attaches the admin Bearer token and throws a readable
// Error on non-2xx responses. Pass a FormData body for file uploads (don't
// set Content-Type yourself — the browser sets the multipart boundary).
export async function adminFetch(path, { method = "GET", body, isForm = false } = {}) {
  const token = getAdminToken();
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}
