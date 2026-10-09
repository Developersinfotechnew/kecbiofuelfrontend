import { blogData as staticBlogs } from "@/app/data/blogData";
import { apiGet, resolveMedia } from "./api";

// After you run the seed script you can set NEXT_PUBLIC_BLOG_STATIC_FALLBACK=false
// so deleted/unpublished blogs no longer reappear from the old static file.
const STATIC_FALLBACK = process.env.NEXT_PUBLIC_BLOG_STATIC_FALLBACK !== "false";

const asSet = (v) => (typeof v === "string" ? { desktop: v } : v || {});

// Accepts an API document OR an old static blogData entry and returns ONE shape
// that all public blog components use.
export function normalizeBlog(raw) {
  const hero = asSet(raw.heroBanner ?? raw.image);
  const thumb = asSet(raw.thumbnail);
  const intro = asSet(raw.introImage);

  const heroDesktop = resolveMedia(hero.desktop);
  const thumbDesktop = resolveMedia(thumb.desktop);

  return {
    id: raw._id || raw.id || raw.slug,
    fromApi: Boolean(raw._id),
    title: raw.title || "",
    slug: raw.slug,
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    category: raw.category || "General",
    author: raw.author || "KEC Biofuel Team",
    authorBio: raw.authorBio || "",
    date: raw.date,
    readTime: raw.readTime || "",
    views: raw.views ?? 0,
    likes: raw.likes ?? 0,
    featured: Boolean(raw.featured),
    tags: raw.tags || [],

    image: heroDesktop,
    imageMobile: resolveMedia(hero.mobile),
    imageAlt: hero.alt || raw.title,

    thumbnail: thumbDesktop || heroDesktop,
    thumbnailMobile: thumbDesktop ? resolveMedia(thumb.mobile) : resolveMedia(thumb.mobile) || resolveMedia(hero.mobile),
    thumbnailAlt: thumb.alt || hero.alt || raw.title,

    introImage: resolveMedia(intro.desktop),
    introImageMobile: resolveMedia(intro.mobile),
    introImageAlt: intro.alt || raw.title,

    sections: (raw.sections || []).map((s) => {
      const img = asSet(s.image);
      return {
        subheading: s.subheading || "",
        content: s.content || "",
        image: resolveMedia(img.desktop),
        imageMobile: resolveMedia(img.mobile),
        imageAlt: img.alt || s.subheading,
      };
    }),

    seo: raw.seo || null,
  };
}

const staticList = () => staticBlogs.map(normalizeBlog);

// Published blogs: API first, then static ones whose slug the API doesn't have.
export async function fetchBlogs({ limit = 100 } = {}) {
  const res = await apiGet(`/blogs?limit=${limit}`);
  const fromApi = (res?.data || []).map(normalizeBlog);
  if (!STATIC_FALLBACK) return fromApi;
  const slugs = new Set(fromApi.map((b) => b.slug));
  return [...fromApi, ...staticList().filter((b) => !slugs.has(b.slug))];
}

export async function fetchBlogBySlug(slug) {
  const res = await apiGet(`/blogs/slug/${encodeURIComponent(slug)}`);
  if (res?.data) return normalizeBlog(res.data);
  if (!STATIC_FALLBACK) return null;
  const found = staticBlogs.find((b) => b.slug === slug);
  return found ? normalizeBlog(found) : null;
}

export async function fetchRelatedBlogs(slug, limit = 3) {
  const all = await fetchBlogs({ limit: 12 });
  return all.filter((b) => b.slug !== slug).slice(0, limit);
}
