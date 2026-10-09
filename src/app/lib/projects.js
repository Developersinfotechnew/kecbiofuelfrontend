import { apiGet, resolveMedia } from "./api";

const asSet = (v) => (typeof v === "string" ? { desktop: v } : v || {});

const pickImage = (v, fallbackAlt = "") => {
  const s = asSet(v);
  return { src: resolveMedia(s.desktop), mobileSrc: resolveMedia(s.mobile), alt: s.alt || fallbackAlt };
};

export function normalizeProject(raw) {
  return {
    id: raw._id || raw.id || raw.slug,
    title: raw.title || "",
    slug: raw.slug,
    section: raw.section === "onboarded" ? "onboarded" : "active",
    client: raw.client || "",
    location: raw.location || "",
    state: raw.state || "",
    capacity: raw.capacity || "",
    scope: raw.scope || "",
    technology: raw.technology || "",
    stage: raw.stage || "",
    progress: Number(raw.progress) || 0,
    startDate: raw.startDate || null,
    expectedCompletion: raw.expectedCompletion || null,
    onboardedDate: raw.onboardedDate || null,
    summary: raw.summary || "",
    description: raw.description || "",
    highlights: raw.highlights || [],
    details: raw.details || [],
    hero: {
      badge: raw.hero?.badge || "",
      title: raw.hero?.title || "",
      subtitle: raw.hero?.subtitle || "",
      tags: raw.hero?.tags || [],
    },
    heroBanner: pickImage(raw.heroBanner, raw.title),
    thumbnail: pickImage(raw.thumbnail ?? raw.heroBanner, raw.title),
    gallery: (raw.gallery || []).map((g) => pickImage(g, raw.title)).filter((g) => g.src || g.mobileSrc),
    sections: (raw.sections || []).map((s) => ({
      subheading: s.subheading || "",
      content: s.content || "",
      image: pickImage(s.image, s.subheading),
    })),
    updates: (raw.updates || [])
      .map((u) => ({
        date: u.date,
        title: u.title || "",
        description: u.description || "",
        image: pickImage(u.image, u.title),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
    seo: raw.seo || null,
  };
}

export async function fetchProjects() {
  const res = await apiGet("/projects?limit=100");
  return (res?.data || []).map(normalizeProject);
}

export async function fetchProjectBySlug(slug) {
  const res = await apiGet(`/projects/slug/${encodeURIComponent(slug)}`);
  return res?.data ? normalizeProject(res.data) : null;
}