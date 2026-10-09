// Form defaults + JSON-import helpers shared by the Blog and Project admin forms.

export const emptyImage = () => ({ desktop: "", mobile: "", alt: "" });

export const emptySeo = () => ({
  metaTitle: "",
  metaDescription: "",
  primaryKeywords: [],
  secondaryKeywords: [],
  focusKeyword: "",
  canonicalUrl: "",
  robots: "index, follow",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  structuredData: "",
});

export const todayInput = () => new Date().toISOString().slice(0, 10);

export const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const emptyBlog = () => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "KEC Biofuel Team",
  authorBio: "",
  date: todayInput(),
  readTime: "",
  tags: [],
  featured: false,
  status: "draft",
  heroBanner: emptyImage(),
  thumbnail: emptyImage(),
  introImage: emptyImage(),
  sections: [],
  seo: emptySeo(),
});

export const emptyProject = () => ({
  title: "",
  slug: "",
  section: "active",
  client: "",
  location: "",
  state: "",
  capacity: "",
  scope: "",
  technology: "",
  stage: "",
  progress: 0,
  startDate: "",
  expectedCompletion: "",
  onboardedDate: "",
  summary: "",
  description: "",
  highlightsText: "",
  heroBadge: "",
  heroTitle: "",
  heroSubtitle: "",
  heroTagsText: "",
  details: [],
  sections: [],
  updates: [],
  gallery: [],
  heroBanner: emptyImage(),
  thumbnail: emptyImage(),
  order: 0,
  featured: false,
  status: "draft",
  seo: { ...emptySeo(), ogType: "website" },
});

// ---------- JSON -> form helpers (accept old static shape and new shape) ----------
const has = (o, k) => o && Object.prototype.hasOwnProperty.call(o, k);
const str = (v) => (v === undefined || v === null ? "" : String(v));

export const toImage = (v) => {
  if (!v) return emptyImage();
  if (typeof v === "string") return { desktop: v, mobile: "", alt: "" };
  return {
    desktop: str(v.desktop || v.url || v.src || v.image),
    mobile: str(v.mobile || v.mobileUrl || v.mobileImage),
    alt: str(v.alt || v.altText),
  };
};

const toList = (v) => {
  if (Array.isArray(v)) return v.map((x) => str(x).trim()).filter(Boolean);
  if (typeof v === "string") return v.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
};

export const toDateInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

const seoFromJson = (seo) => {
  const out = {};
  const copy = (to, ...from) => {
    for (const k of from) if (has(seo, k)) return void (out[to] = str(seo[k]));
  };
  copy("metaTitle", "metaTitle", "title");
  copy("metaDescription", "metaDescription", "description");
  copy("focusKeyword", "focusKeyword");
  copy("canonicalUrl", "canonicalUrl", "canonical");
  copy("robots", "robots");
  copy("ogTitle", "ogTitle");
  copy("ogDescription", "ogDescription");
  copy("ogImage", "ogImage");
  copy("ogType", "ogType");
  copy("twitterCard", "twitterCard");
  copy("twitterTitle", "twitterTitle");
  copy("twitterDescription", "twitterDescription");
  copy("twitterImage", "twitterImage");
  if (has(seo, "structuredData")) {
    out.structuredData =
      typeof seo.structuredData === "string" ? seo.structuredData : JSON.stringify(seo.structuredData, null, 2);
  }
  if (has(seo, "primaryKeywords")) out.primaryKeywords = toList(seo.primaryKeywords);
  else if (has(seo, "metaKeywords")) out.primaryKeywords = toList(seo.metaKeywords);
  if (has(seo, "secondaryKeywords")) out.secondaryKeywords = toList(seo.secondaryKeywords);
  return out;
};

const sectionsFromJson = (list) =>
  (Array.isArray(list) ? list : []).map((s) => ({
    subheading: str(s.subheading || s.heading || s.title),
    content: str(s.content),
    image: toImage(s.image),
  }));

// Merge pasted blog JSON over the current form. Only keys present are applied.
export function applyBlogJson(current, json) {
  const next = { ...current };
  ["title", "slug", "excerpt", "category", "author", "authorBio", "readTime"].forEach((k) => {
    if (has(json, k)) next[k] = str(json[k]);
  });
  if (has(json, "content")) next.content = str(json.content);
  if (has(json, "date")) next.date = toDateInput(json.date);
  if (has(json, "tags")) next.tags = toList(json.tags);
  if (has(json, "featured")) next.featured = json.featured === true || json.featured === "true";
  if (has(json, "status")) next.status = json.status === "published" ? "published" : "draft";

  if (has(json, "heroBanner")) next.heroBanner = toImage(json.heroBanner);
  else if (has(json, "image")) next.heroBanner = toImage(json.image);
  if (has(json, "thumbnail")) next.thumbnail = toImage(json.thumbnail);
  if (has(json, "introImage")) next.introImage = toImage(json.introImage);
  if (has(json, "sections")) next.sections = sectionsFromJson(json.sections);
  if (has(json, "seo") && json.seo) next.seo = { ...current.seo, ...seoFromJson(json.seo) };
  return next;
}

export function applyProjectJson(current, json) {
  const next = { ...current };
  [
    "title", "slug", "client", "location", "state", "capacity", "scope",
    "technology", "stage", "summary",
  ].forEach((k) => {
    if (has(json, k)) next[k] = str(json[k]);
  });
  if (has(json, "section")) next.section = json.section === "onboarded" ? "onboarded" : "active";
  if (has(json, "description")) next.description = str(json.description);
  if (has(json, "progress")) next.progress = Math.min(100, Math.max(0, Number(json.progress) || 0));
  if (has(json, "order")) next.order = Number(json.order) || 0;
  if (has(json, "featured")) next.featured = json.featured === true || json.featured === "true";
  if (has(json, "status")) next.status = json.status === "published" ? "published" : "draft";
  ["startDate", "expectedCompletion", "onboardedDate"].forEach((k) => {
    if (has(json, k)) next[k] = toDateInput(json[k]);
  });
  if (json.hero && typeof json.hero === "object") {
    if (has(json.hero, "badge")) next.heroBadge = str(json.hero.badge);
    if (has(json.hero, "title")) next.heroTitle = str(json.hero.title);
    if (has(json.hero, "subtitle")) next.heroSubtitle = str(json.hero.subtitle);
    if (has(json.hero, "tags")) next.heroTagsText = toList(json.hero.tags).join(", ");
  }
  if (has(json, "highlights")) next.highlightsText = toList(json.highlights).join("\n");
  if (Array.isArray(json.details)) {
    next.details = json.details.map((d) => ({ label: str(d.label), value: str(d.value) }));
  }
  if (has(json, "heroBanner")) next.heroBanner = toImage(json.heroBanner);
  else if (has(json, "image")) next.heroBanner = toImage(json.image);
  if (has(json, "thumbnail")) next.thumbnail = toImage(json.thumbnail);
  if (Array.isArray(json.gallery)) next.gallery = json.gallery.map(toImage);
  if (has(json, "sections")) next.sections = sectionsFromJson(json.sections);
  if (Array.isArray(json.updates)) {
    next.updates = json.updates.map((u) => ({
      date: toDateInput(u.date) || todayInput(),
      title: str(u.title),
      description: str(u.description),
      image: toImage(u.image),
    }));
  }
  if (has(json, "seo") && json.seo) next.seo = { ...current.seo, ...seoFromJson(json.seo) };
  return next;
}

// API document -> form state (edit pages).
export function blogToForm(doc) {
  return applyBlogJson(emptyBlog(), { ...doc, date: doc.date, status: doc.status });
}

export function projectToForm(doc) {
  return applyProjectJson(emptyProject(), doc);
}

// Form state -> request body.
export function projectToPayload(form) {
  const { highlightsText, heroBadge, heroTitle, heroSubtitle, heroTagsText, ...rest } = form;
  return {
    ...rest,
    hero: {
      badge: heroBadge,
      title: heroTitle,
      subtitle: heroSubtitle,
      tags: (heroTagsText || "").split(",").map((t) => t.trim()).filter(Boolean),
    },
    highlights: (highlightsText || "").split("\n").map((l) => l.trim()).filter(Boolean),
    startDate: form.startDate || null,
    expectedCompletion: form.expectedCompletion || null,
    onboardedDate: form.onboardedDate || null,
  };
}