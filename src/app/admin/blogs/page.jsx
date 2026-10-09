"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, CheckCircle2, PencilLine, Pencil, Trash2 } from "lucide-react";
import { adminFetch } from "../utils/adminAuth";
import { resolveMedia, formatDate } from "../../lib/api";
import {
  PageHeader, CtaLink, StatGrid, StatCard, SearchBox, Segmented, StatusPill, IconLink, IconBtn,
  DataTable, rowCls, cellCls, Spinner, ErrorBanner, EmptyState,
} from "../../Components/Admin/kit";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    adminFetch("/blogs/admin/all?limit=100")
      .then((res) => setBlogs(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const togglePublish = async (b) => {
    setBusyId(b._id);
    try {
      const status = b.status === "published" ? "draft" : "published";
      await adminFetch(`/blogs/${b._id}/status`, { method: "PATCH", body: { status } });
      setBlogs((list) => list.map((x) => (x._id === b._id ? { ...x, status } : x)));
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (b) => {
    if (!confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
    setBusyId(b._id);
    try {
      await adminFetch(`/blogs/${b._id}`, { method: "DELETE" });
      setBlogs((list) => list.filter((x) => x._id !== b._id));
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const shown = useMemo(
    () =>
      blogs.filter(
        (b) =>
          (filter === "all" || b.status === filter) &&
          `${b.title} ${b.slug} ${b.category}`.toLowerCase().includes(q.toLowerCase())
      ),
    [blogs, q, filter]
  );

  const published = blogs.filter((b) => b.status === "published").length;

  return (
    <div>
      <PageHeader
        title="Blogs"
        subtitle="Manage articles, images and SEO"
        action={<CtaLink href="/admin/blogs/new">New Blog</CtaLink>}
      />

      <StatGrid>
        <StatCard label="Total" value={blogs.length} tone="dark" icon={<FileText className="w-5 h-5" />} />
        <StatCard label="Published" value={published} tone="green" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard label="Drafts" value={blogs.length - published} tone="orange" icon={<PencilLine className="w-5 h-5" />} />
      </StatGrid>

      <div className="flex flex-wrap gap-3 mb-5">
        <SearchBox value={q} onChange={setQ} placeholder="Search title, slug, category…" />
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[["all", "All"], ["published", "Published"], ["draft", "Draft"]]}
        />
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : shown.length === 0 ? (
        <EmptyState
          title={blogs.length ? "No blogs match your search" : "No blogs in the database yet"}
          hint={
            !blogs.length ? (
              <>Add one, or import your existing posts with <code className="px-1.5 py-0.5 rounded bg-slate-100 text-[#0e6b55]">node scripts/seedFromJson.js blogs</code></>
            ) : "Try a different keyword or filter."
          }
          action={!blogs.length && <CtaLink href="/admin/blogs/new">New Blog</CtaLink>}
        />
      ) : (
        <DataTable columns={["Blog", "Category", "Date", "Views", "Status", ["Actions", "right"]]}>
          {shown.map((b) => {
            const thumb = resolveMedia(b.thumbnail?.desktop || b.heroBanner?.desktop);
            return (
              <tr key={b._id} className={rowCls}>
                <td className={cellCls}>
                  <div className="flex items-center gap-3.5 min-w-[280px]">
                    <div className="w-16 h-12 rounded-xl bg-slate-100 ring-1 ring-slate-200/70 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#12201c] line-clamp-1">
                        {b.title} {b.featured && <span className="text-orange-500">★</span>}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">/blogs/{b.slug}</p>
                    </div>
                  </div>
                </td>
                <td className={cellCls}>
                  {b.category && <span className="text-xs font-semibold text-[#0e6b55] bg-[#0e6b55]/10 px-2.5 py-1 rounded-full">{b.category}</span>}
                </td>
                <td className={`${cellCls} whitespace-nowrap`}>{formatDate(b.date)}</td>
                <td className={`${cellCls} tabular-nums`}>{b.views ?? 0}</td>
                <td className={cellCls}>
                  <StatusPill
                    as="button"
                    status={b.status}
                    onClick={() => togglePublish(b)}
                    disabled={busyId === b._id}
                    title="Click to toggle"
                  />
                </td>
                <td className={cellCls}>
                  <div className="flex justify-end gap-0.5">
                    {b.status === "published" && (
                      <IconLink external href={`/blogs/${b.slug}`} label="View"><Eye className="w-4 h-4" /></IconLink>
                    )}
                    <IconLink href={`/admin/blogs/${b._id}/edit`} label="Edit" tone="green"><Pencil className="w-4 h-4" /></IconLink>
                    <IconBtn label="Delete" tone="red" onClick={() => remove(b)} disabled={busyId === b._id}><Trash2 className="w-4 h-4" /></IconBtn>
                  </div>
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}
