"use client";

import { Card, Counter, Field, TagInput, TextArea, TextInput, inputCls } from "./ui";
import ImageSetField from "./ImageSetField";

const SITE = "https://www.kecbiofuel.com";

/**
 * Full SEO card: slug, meta title/description, keywords, canonical, robots,
 * Open Graph, Twitter and JSON-LD. `basePath` is "/blogs" or "/projectmanagement".
 */
export default function SeoFields({ slug, onSlug, onSlugBlur, seo, onSeo, basePath, fallbackTitle, fallbackDesc }) {
  const set = (patch) => onSeo({ ...seo, ...patch });
  const title = seo.metaTitle || fallbackTitle || "Page title";
  const desc = seo.metaDescription || fallbackDesc || "Meta description appears here.";

  return (
    <Card title="SEO & Metadata" subtitle="Controls Google results and social share previews">
      <div className="space-y-5">
        <Field label="URL slug" hint={`Final URL: ${SITE}${basePath}/${slug || "your-slug"}`}>
          <div className="flex items-stretch">
            <span className="px-3 flex items-center text-xs text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl">
              {basePath}/
            </span>
            <input
              className={`${inputCls} !rounded-l-none`}
              value={slug}
              onChange={(e) => onSlug(e.target.value)}
              onBlur={onSlugBlur}
              placeholder="auto-generated-from-title"
            />
          </div>
        </Field>

        {/* Google preview */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Google preview</p>
          <p className="text-xs text-gray-600 truncate">
            {SITE.replace("https://", "")} › {basePath.replace("/", "")} › {slug || "your-slug"}
          </p>
          <p className="text-lg text-blue-700 leading-snug line-clamp-1">{title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
        </div>

        <Field label="Meta title" counter={<Counter value={seo.metaTitle || ""} max={60} />} hint="Ideal: up to 60 characters">
          <TextInput value={seo.metaTitle} onChange={(v) => set({ metaTitle: v })} placeholder={fallbackTitle} />
        </Field>

        <Field label="Meta description" counter={<Counter value={seo.metaDescription || ""} max={160} />} hint="Ideal: 120–160 characters">
          <TextArea rows={3} value={seo.metaDescription} onChange={(v) => set({ metaDescription: v })} placeholder={fallbackDesc} />
        </Field>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Primary keywords">
            <TagInput value={seo.primaryKeywords} onChange={(v) => set({ primaryKeywords: v })} />
          </Field>
          <Field label="Secondary keywords">
            <TagInput value={seo.secondaryKeywords} onChange={(v) => set({ secondaryKeywords: v })} />
          </Field>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Field label="Focus keyword">
            <TextInput value={seo.focusKeyword} onChange={(v) => set({ focusKeyword: v })} />
          </Field>
          <Field label="Canonical URL" hint="Leave empty to use the page URL">
            <TextInput value={seo.canonicalUrl} onChange={(v) => set({ canonicalUrl: v })} placeholder="https://…" />
          </Field>
          <Field label="Robots">
            <select className={inputCls} value={seo.robots || "index, follow"} onChange={(e) => set({ robots: e.target.value })}>
              <option>index, follow</option>
              <option>noindex, follow</option>
              <option>index, nofollow</option>
              <option>noindex, nofollow</option>
            </select>
          </Field>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Open Graph (Facebook · LinkedIn · WhatsApp)</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="OG title">
              <TextInput value={seo.ogTitle} onChange={(v) => set({ ogTitle: v })} placeholder="Defaults to the page title" />
            </Field>
            <Field label="OG type">
              <select className={inputCls} value={seo.ogType || "article"} onChange={(e) => set({ ogType: e.target.value })}>
                <option value="article">article</option>
                <option value="website">website</option>
              </select>
            </Field>
            <Field label="OG description" className="md:col-span-2">
              <TextArea rows={2} value={seo.ogDescription} onChange={(v) => set({ ogDescription: v })} />
            </Field>
            <Field label="OG image URL" hint="Empty = hero banner is used (1200×630 recommended)" className="md:col-span-2">
              <TextInput value={seo.ogImage} onChange={(v) => set({ ogImage: v })} placeholder="/images/share.jpg or https://…" />
            </Field>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Twitter / X card</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Card type">
              <select className={inputCls} value={seo.twitterCard || "summary_large_image"} onChange={(e) => set({ twitterCard: e.target.value })}>
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </Field>
            <Field label="Twitter title">
              <TextInput value={seo.twitterTitle} onChange={(v) => set({ twitterTitle: v })} />
            </Field>
            <Field label="Twitter description">
              <TextInput value={seo.twitterDescription} onChange={(v) => set({ twitterDescription: v })} />
            </Field>
            <Field label="Twitter image URL">
              <TextInput value={seo.twitterImage} onChange={(v) => set({ twitterImage: v })} />
            </Field>
          </div>
        </div>

        <Field label="Structured data (JSON-LD)" hint="Optional. Paste a schema.org JSON object. Empty = a default Article schema is generated.">
          <textarea
            className={`${inputCls} font-mono text-xs resize-y`}
            rows={5}
            spellCheck={false}
            value={seo.structuredData || ""}
            onChange={(e) => set({ structuredData: e.target.value })}
            placeholder='{ "@context": "https://schema.org", "@type": "Article" }'
          />
        </Field>
      </div>
    </Card>
  );
}
