"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileJson, Loader2, Plus, Trash2 } from "lucide-react";
import { adminFetch } from "../../admin/utils/adminAuth";
import {
  applyProjectJson, emptyImage, projectToForm, projectToPayload, emptyProject, slugify, todayInput,
} from "../../admin/utils/formUtils";
import { Card, Field, TextArea, TextInput, Toggle, btnGhost, btnPrimary, inputCls } from "./ui";
import { FormHeader } from "./kit";
import ImageSetField from "./ImageSetField";
import SectionsEditor from "./SectionsEditor";
import SeoFields from "./SeoFields";
import JsonImportModal from "./JsonImportModal";

const JSON_PLACEHOLDER = `{
  "title": "Panipat 8 TPD CBG Project",
  "section": "active",
  "client": "...", "location": "Panipat", "state": "Haryana",
  "capacity": "8 TPD", "scope": "PMC + EPC", "stage": "Civil Work",
  "progress": 25, "startDate": "2026-08-21",
  "summary": "...", "description": "...",
  "highlights": ["...", "..."],
  "hero": { "badge": "Active Project", "title": "...", "subtitle": "...", "tags": ["PMC + EPC"] },
  "heroBanner": { "desktop": "/gallery/a.jpeg", "mobile": "/gallery/a-m.jpeg" },
  "updates": [ { "date": "2026-09-01", "title": "...", "description": "...", "image": { "desktop": "..." } } ],
  "seo": { "metaTitle": "...", "metaDescription": "..." }
}`;

const dateInput = "date";

export default function ProjectForm({ initial }) {
  const router = useRouter();
  const editing = Boolean(initial?._id);
  const [form, setForm] = useState(() => (editing ? projectToForm(initial) : emptyProject()));
  const [slugTouched, setSlugTouched] = useState(editing);
  const [showImport, setShowImport] = useState(false);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const onTitle = (title) => set(slugTouched ? { title } : { title, slug: slugify(title) });

  const importJson = (json) => {
    setForm((f) => applyProjectJson(f, json));
    if (json.slug) setSlugTouched(true);
  };

  const updateAt = (key, i, patch) =>
    set({ [key]: form[key].map((item, idx) => (idx === i ? { ...item, ...patch } : item)) });
  const removeAt = (key, i) => set({ [key]: form[key].filter((_, idx) => idx !== i) });

  const save = async (status) => {
    setError("");
    if (!form.title.trim()) {
      setError("Project name is required");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaving(status);
    try {
      const body = { ...projectToPayload(form), status, slug: form.slug || slugify(form.title) };
      if (editing) await adminFetch(`/projects/${initial._id}`, { method: "PUT", body });
      else await adminFetch("/projects", { method: "POST", body });
      router.push("/admin/projects");
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSaving("");
    }
  };

  const isOnboarded = form.section === "onboarded";

  return (
    <div className="max-w-5xl pb-10">
      <FormHeader
        back={{ href: "/admin/projects", label: "Cancel" }}
        title={editing ? "Edit Project" : "New Project"}
        subtitle={editing ? `/projectmanagement/${initial.slug}` : "Fill the form, or import everything from JSON"}
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
        <Card title="Project table details" subtitle="These fields fill the table row on the Project Management page">
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Project name *" className="md:col-span-2">
              <TextInput value={form.title} onChange={onTitle} placeholder="e.g. Panipat 8 TPD CBG Project" />
            </Field>

            <Field label="Shown under">
              <div className="grid grid-cols-2 gap-2">
                {[["active", "Active Projects"], ["onboarded", "Onboarded Projects"]].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => set({ section: val })}
                    className={`px-3 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      form.section === val
                        ? "bg-green-600 border-green-600 text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-green-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Display order" hint="Smaller number shows first">
              <input type="number" className={inputCls} value={form.order} onChange={(e) => set({ order: Number(e.target.value) })} />
            </Field>

            <Field label="Client"><TextInput value={form.client} onChange={(v) => set({ client: v })} /></Field>
            <Field label="Scope of work"><TextInput value={form.scope} onChange={(v) => set({ scope: v })} placeholder="PMC / EPC / PMC + EPC" /></Field>
            <Field label="Location (city / district)"><TextInput value={form.location} onChange={(v) => set({ location: v })} /></Field>
            <Field label="State"><TextInput value={form.state} onChange={(v) => set({ state: v })} /></Field>
            <Field label="Capacity"><TextInput value={form.capacity} onChange={(v) => set({ capacity: v })} placeholder="8 TPD" /></Field>
            <Field label="Technology / type"><TextInput value={form.technology} onChange={(v) => set({ technology: v })} placeholder="Compressed Biogas (CBG)" /></Field>
            <Field label="Current stage"><TextInput value={form.stage} onChange={(v) => set({ stage: v })} placeholder="Civil work, Commissioning…" /></Field>
            <Field label={`Progress — ${form.progress}%`}>
              <input
                type="range" min="0" max="100" value={form.progress}
                onChange={(e) => set({ progress: Number(e.target.value) })}
                className="w-full accent-green-600 mt-2"
              />
            </Field>
            <Field label="Start date"><input type={dateInput} className={inputCls} value={form.startDate} onChange={(e) => set({ startDate: e.target.value })} /></Field>
            {isOnboarded ? (
              <Field label="Onboarded on"><input type={dateInput} className={inputCls} value={form.onboardedDate} onChange={(e) => set({ onboardedDate: e.target.value })} /></Field>
            ) : (
              <Field label="Expected completion"><input type={dateInput} className={inputCls} value={form.expectedCompletion} onChange={(e) => set({ expectedCompletion: e.target.value })} /></Field>
            )}
          </div>
        </Card>

        <Card title="Project page content" subtitle="Shown on the project's own page">
          <div className="space-y-5">
            <Field label="Summary" hint="One or two lines - also used on mobile cards">
              <TextArea rows={2} value={form.summary} onChange={(v) => set({ summary: v })} />
            </Field>
            <Field label="Description" hint="Blank line = new paragraph">
              <TextArea rows={7} value={form.description} onChange={(v) => set({ description: v })} />
            </Field>
            <Field label="Highlights" hint="One per line">
              <TextArea rows={4} value={form.highlightsText} onChange={(v) => set({ highlightsText: v })} />
            </Field>

            <Field label="Extra details (label / value)" hint="Shown in the “Project snapshot” box in addition to the table fields">
              <div className="space-y-2">
                {form.details.map((d, i) => (
                  <div key={i} className="flex gap-2">
                    <input className={inputCls} placeholder="Label" value={d.label} onChange={(e) => updateAt("details", i, { label: e.target.value })} />
                    <input className={inputCls} placeholder="Value" value={d.value} onChange={(e) => updateAt("details", i, { value: e.target.value })} />
                    <button type="button" onClick={() => removeAt("details", i)} className="shrink-0 w-10 rounded-xl text-red-500 hover:bg-red-50 flex items-center justify-center" aria-label="Remove row">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => set({ details: [...form.details, { label: "", value: "" }] })} className={btnGhost}>
                  <Plus className="w-4 h-4" /> Add row
                </button>
              </div>
            </Field>
          </div>
        </Card>

        <Card title="Hero section" subtitle="Top of the project page - text and image. Leave a text field blank to use the default">
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Badge" hint={`Default: ${isOnboarded ? "Onboarded Project" : "Active Project"}`}>
                <TextInput value={form.heroBadge} onChange={(v) => set({ heroBadge: v })} placeholder="Active Project" />
              </Field>
              <Field label="Tags" hint="Comma separated. Default: scope of work">
                <TextInput value={form.heroTagsText} onChange={(v) => set({ heroTagsText: v })} placeholder="PMC + EPC, CBG" />
              </Field>
              <Field label="Heading" hint="Default: project name" className="md:col-span-2">
                <TextInput value={form.heroTitle} onChange={(v) => set({ heroTitle: v })} placeholder={form.title || "Project heading"} />
              </Field>
              <Field label="Sub-heading" hint="Default: summary" className="md:col-span-2">
                <TextArea rows={2} value={form.heroSubtitle} onChange={(v) => set({ heroSubtitle: v })} placeholder={form.summary || "Short line under the heading"} />
              </Field>
            </div>
            <Field label="Hero image" hint="Shown beside the heading. Mobile image is optional">
              <ImageSetField value={form.heroBanner} onChange={(v) => set({ heroBanner: v })} desktopHint="1200×900" mobileHint="800×600" />
            </Field>
          </div>
        </Card>
        <Card title="Thumbnail" subtitle="Small image in the table / cards">
          <ImageSetField value={form.thumbnail} onChange={(v) => set({ thumbnail: v })} desktopHint="400×300" mobileHint="400×300" />
        </Card>

        <Card
          title="Project updates"
          subtitle="Timeline entries (newest first on the site)"
          action={
            <button type="button" className={btnGhost}
              onClick={() => set({ updates: [{ date: todayInput(), title: "", description: "", image: emptyImage() }, ...form.updates] })}>
              <Plus className="w-4 h-4" /> Add update
            </button>
          }
        >
          {form.updates.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">No updates yet.</p>
          ) : (
            <div className="space-y-4">
              {form.updates.map((u, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-4">
                  <div className="flex gap-3 items-end">
                    <Field label="Date" className="w-44 shrink-0">
                      <input type={dateInput} className={inputCls} value={u.date} onChange={(e) => updateAt("updates", i, { date: e.target.value })} />
                    </Field>
                    <Field label="Update title" className="flex-1">
                      <TextInput value={u.title} onChange={(v) => updateAt("updates", i, { title: v })} />
                    </Field>
                    <button type="button" onClick={() => removeAt("updates", i)} className="mb-0.5 shrink-0 w-10 h-10 rounded-xl text-red-500 hover:bg-red-50 flex items-center justify-center" aria-label="Remove update">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Field label="Description">
                    <TextArea rows={3} value={u.description} onChange={(v) => updateAt("updates", i, { description: v })} />
                  </Field>
                  <Field label="Image (optional)">
                    <ImageSetField value={u.image} onChange={(v) => updateAt("updates", i, { image: v })} desktopHint="1200×800" mobileHint="800×600" />
                  </Field>
                </div>
              ))}
            </div>
          )}
        </Card>

        <SectionsEditor sections={form.sections} onChange={(sections) => set({ sections })} />

        <Card
          title="Photo gallery"
          subtitle="Extra project photos"
          action={
            <button type="button" className={btnGhost} onClick={() => set({ gallery: [...form.gallery, emptyImage()] })}>
              <Plus className="w-4 h-4" /> Add photo
            </button>
          }
        >
          {form.gallery.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl">No photos yet.</p>
          ) : (
            <div className="space-y-4">
              {form.gallery.map((g, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-green-800">Photo {i + 1}</span>
                    <button type="button" onClick={() => removeAt("gallery", i)} className="text-red-500 hover:bg-red-50 rounded-lg w-8 h-8 flex items-center justify-center" aria-label="Remove photo">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <ImageSetField value={g} onChange={(v) => set({ gallery: form.gallery.map((x, idx) => (idx === i ? v : x)) })} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <SeoFields
          slug={form.slug}
          onSlug={(v) => { setSlugTouched(true); set({ slug: v }); }}
          onSlugBlur={() => set({ slug: slugify(form.slug) })}
          seo={form.seo}
          onSeo={(seo) => set({ seo })}
          basePath="/projectmanagement"
          fallbackTitle={form.title}
          fallbackDesc={form.summary}
        />

        <Card title="Visibility">
          <Toggle checked={form.featured} onChange={(v) => set({ featured: v })} label="Featured project" />
        </Card>
      </div>

      {showImport && (
        <JsonImportModal
          title="Import Project from JSON"
          placeholder={JSON_PLACEHOLDER}
          onImport={importJson}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
}