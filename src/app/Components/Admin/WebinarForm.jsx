"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "../../admin/utils/adminAuth";
import { Loader2 } from "lucide-react";
import { Card, Field, TextInput, TextArea, Toggle, btnPrimary, btnGhost, inputCls } from "./ui";
import { FormHeader } from "./kit";

// ISO (UTC) -> value for <input type="datetime-local"> in the admin's local time
const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function WebinarForm({ mode = "create", webinar }) {
  const router = useRouter();
  const [f, setF] = useState({
    title: webinar?.title || "",
    slug: webinar?.slug || "",
    description: webinar?.description || "",
    host: webinar?.host || "",
    bannerUrl: webinar?.bannerUrl || "",
    startsAt: toLocalInput(webinar?.startsAt),
    durationMins: webinar?.durationMins ?? 60,
    meetingPlatform: webinar?.meetingPlatform || "Zoom",
    meetingLink: webinar?.meetingLink || "",
    price: webinar?.price ?? 0,
    capacity: webinar?.capacity ?? 0,
    published: webinar ? webinar.status === "published" : false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!f.title.trim() || !f.startsAt) return setError("Title and start date/time are required");
    if (f.published && !f.meetingLink.trim()) return setError("Add the meeting link before publishing");
    setSaving(true);
    try {
      const body = {
        ...f,
        startsAt: new Date(f.startsAt).toISOString(), // local -> UTC
        status: webinar?.status === "cancelled" && !f.published ? "cancelled" : f.published ? "published" : "draft",
      };
      delete body.published;
      if (mode === "edit") await adminFetch(`/webinars/${webinar._id}`, { method: "PUT", body });
      else await adminFetch("/webinars", { method: "POST", body });
      router.push("/admin/webinars");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-4xl pb-10">
      <FormHeader
        back={{ href: "/admin/webinars", label: "Cancel" }}
        title={mode === "edit" ? "Edit Webinar" : "Add Webinar / Online Meeting"}
        subtitle={mode === "edit" ? webinar?.title : "Schedule a session for the public booking calendar"}
      >
        <button disabled={saving} className={btnPrimary}>
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? "Saving..." : mode === "edit" ? "Save changes" : "Add Webinar"}
        </button>
      </FormHeader>

      <div className="space-y-5">
      {error && <div className="text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <Card title="Details">
        <div className="grid gap-4">
          <Field label="Title *"><TextInput value={f.title} onChange={set("title")} placeholder="CBG Plant Economics 101" /></Field>
          <Field label="Slug" hint="Optional. Auto-generated from title."><TextInput value={f.slug} onChange={set("slug")} /></Field>
          <Field label="Description"><TextArea rows={5} value={f.description} onChange={set("description")} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Host / Speaker"><TextInput value={f.host} onChange={set("host")} /></Field>
            <Field label="Banner image URL" hint="Optional"><TextInput value={f.bannerUrl} onChange={set("bannerUrl")} placeholder="https://..." /></Field>
          </div>
        </div>
      </Card>

      <Card title="Schedule" subtitle="Time is entered in your local time zone and shown to visitors in IST.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Start date & time *">
            <input type="datetime-local" className={inputCls} value={f.startsAt} onChange={(e) => set("startsAt")(e.target.value)} />
          </Field>
          <Field label="Duration (minutes)">
            <input type="number" min="5" className={inputCls} value={f.durationMins} onChange={(e) => set("durationMins")(e.target.value)} />
          </Field>
        </div>
      </Card>

      <Card title="Meeting link" subtitle="Hidden from the public. Shown only to registered attendees after payment.">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Platform">
            <select className={inputCls} value={f.meetingPlatform} onChange={(e) => set("meetingPlatform")(e.target.value)}>
              {["Zoom", "Google Meet", "Microsoft Teams", "Other"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Link" className="sm:col-span-2"><TextInput value={f.meetingLink} onChange={set("meetingLink")} placeholder="https://zoom.us/j/..." /></Field>
        </div>
      </Card>

      <Card title="Pricing & seats">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Price (₹)" hint="0 = free webinar (no payment step)">
            <input type="number" min="0" className={inputCls} value={f.price} onChange={(e) => set("price")(e.target.value)} />
          </Field>
          <Field label="Seat limit" hint="0 = unlimited">
            <input type="number" min="0" className={inputCls} value={f.capacity} onChange={(e) => set("capacity")(e.target.value)} />
          </Field>
        </div>
      </Card>

      <Card title="Visibility">
        <Toggle checked={f.published} onChange={set("published")} label="Published (visible on website calendar)" />
      </Card>
      </div>
    </form>
  );
}
