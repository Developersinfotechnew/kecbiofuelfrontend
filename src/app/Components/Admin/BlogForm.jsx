"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileJson, Loader2 } from "lucide-react";
import { adminFetch } from "../../admin/utils/adminAuth";
import { applyBlogJson, blogToForm, emptyBlog, slugify } from "../../admin/utils/formUtils";
import { Card, Field, TagInput, TextArea, TextInput, Toggle, btnGhost, btnGreen, btnPrimary, inputCls } from "./ui";
import { FormHeader } from "./kit";
import ImageSetField from "./ImageSetField";
import SectionsEditor from "./SectionsEditor";
import SeoFields from "./SeoFields";
import JsonImportModal from "./JsonImportModal";

const JSON_PLACEHOLDER = `{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "...",
  "category": "CBG",
  "date": "2026-08-21",
  "heroBanner": { "desktop": "/images/a.jpg", "mobile": "/images/a-m.jpg" },
  "thumbnail":  { "desktop": "/images/t.jpg", "mobile": "/images/t-m.jpg" },
  "sections": [ { "subheading": "...", "content": "...", "image": { "desktop": "..." } } ],
  "seo": { "metaTitle": "...", "metaDescription": "..." }
}`;

export default function BlogForm({ initial }) {
  const router = useRouter();
  const editing = Boolean(initial?._id);
  const [form, setForm] = useState(() => (editing ? blogToForm(initial) : emptyBlog()));
  const [slugTouched, setSlugTouched] = useState(editing);
  const [showImport, setShowImport] = useState(false);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onTitle = (title) => {
    // keep slug in sync with title until the admin edits the slug by hand
    set(slugTouched ? { title } : { title, slug: slugify(title) });
  };

  const importJson = (json) => {
    setForm((f) => applyBlogJson(f, json));
    if (json.slug) setSlugTouched(true);
  };

  const save = async (status) => {
    setError("");
    if (!form.title.trim()) {
      setError("Title is required");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaving(status);
    try {
      const body = { ...form, status, slug: form.slug || slugify(form.title) };
      if (editing) await adminFetch(`/blogs/${initial._id}`, { method: "PUT", body });
      else await adminFetch("/blogs", { method: "POST", body });
      router.push("/admin/blogs");
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving("");
    }
  };

  return (
    <div className="max-w-5xl pb-10">
      <FormHeader
        back={{ href: "/admin/blogs", label: "Cancel" }}
        title={editing ? "Edit Blog" : "New Blog"}
        subtitle={editing ? `/blogs/${initial.slug}` : "Fill the form, or import everything from JSON"}
      >
        <button type="button" onClick={() => setShowImport(true)} className={btnGhost}>
          <FileJson className="w-4 h-4" /> Import from JSON
        </button>
        <button type="button" disabled={!!saving} onClick={() => save("draft")} className={btnGhost}>
          {saving === "draft" && <Loader2 className="w-4 h-4 animate-spin" />} Save as draft
        </button>
        <button type="button" disabled={!!saving} onClick={() => save("published")} className={btnPrimary}>
          {saving === "published" && <Loader2 className="w-4 h-4 animate-spin" />}
          {editing && form.status === "published" ? "Update & publish" : "Publish"}
        </button>
      </FormHeader>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">{error}</div>
      )}

      <div className="space-y-6">
        <Card title="Basic details">
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Title *" className="md:col-span-2">
              <TextInput value={form.title} onChange={onTitle} placeholder="Blog title" />
            </Field>
            <Field label="Excerpt" hint="Short summary - shown on cards and as the first paragraph (drop-cap)" className="md:col-span-2">
              <TextArea rows={3} value={form.excerpt} onChange={(v) => set({ excerpt: v })} />
            </Field>
            <Field label="Intro content" hint="Blank line = new paragraph" className="md:col-span-2">
              <TextArea rows={7} value={form.content} onChange={(v) => set({ content: v })} />
            </Field>
            <Field label="Category">
              <TextInput value={form.category} onChange={(v) => set({ category: v })} placeholder="CBG, Energy, Policy…" />
            </Field>
            <Field label="Read time">
              <TextInput value={form.readTime} onChange={(v) => set({ readTime: v })} placeholder="6 min read" />
            </Field>
            <Field label="Author">
              <TextInput value={form.author} onChange={(v) => set({ author: v })} />
            </Field>
            <Field label="Author tagline">
              <TextInput value={form.authorBio} onChange={(v) => set({ authorBio: v })} placeholder="Leading sustainable energy solutions" />
            </Field>
            <Field label="Publish date">
              <input type="date" className={inputCls} value={form.date} onChange={(e) => set({ date: e.target.value })} />
            </Field>
            <Field label="Tags (shown as #hashtags)">
              <TagInput value={form.tags} onChange={(v) => set({ tags: v })} />
            </Field>
          </div>
        </Card>

        <Card title="Hero banner" subtitle="Large image at the top of the blog page">
          <ImageSetField value={form.heroBanner} onChange={(v) => set({ heroBanner: v })} desktopHint="1200×800" mobileHint="800×600" />
        </Card>

        <Card title="Thumbnail" subtitle="Small image on the blog listing cards and “Related articles”">
          <ImageSetField value={form.thumbnail} onChange={(v) => set({ thumbnail: v })} desktopHint="800×600" mobileHint="600×450" />
        </Card>

        <Card title="Intro image (optional)" subtitle="Appears right after the intro content, before the sections">
          <ImageSetField value={form.introImage} onChange={(v) => set({ introImage: v })} desktopHint="1200×700" mobileHint="800×600" />
        </Card>

        <SectionsEditor sections={form.sections} onChange={(sections) => set({ sections })} />

        <SeoFields
          slug={form.slug}
          onSlug={(v) => { setSlugTouched(true); set({ slug: v }); }}
          onSlugBlur={() => set({ slug: slugify(form.slug) })}
          seo={form.seo}
          onSeo={(seo) => set({ seo })}
          basePath="/blogs"
          fallbackTitle={form.title}
          fallbackDesc={form.excerpt}
        />

        <Card title="Visibility">
          <Toggle checked={form.featured} onChange={(v) => set({ featured: v })} label="Featured article (shown in the Featured section)" />
        </Card>
      </div>

      {showImport && (
        <JsonImportModal
          title="Import Blog from JSON"
          placeholder={JSON_PLACEHOLDER}
          onImport={importJson}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
}
