"use client";

import { useEffect, useState } from "react";
import { ArrowRightLeft, Eye, Pencil, Trash2 } from "lucide-react";
import { adminFetch } from "../utils/adminAuth";
import { formatDate } from "../../lib/api";
import {
  PageHeader, CtaLink, Segmented, StatusPill, IconLink, IconBtn,
  DataTable, rowCls, cellCls, Spinner, ErrorBanner, EmptyState,
} from "../../Components/Admin/kit";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [tab, setTab] = useState("active");

  useEffect(() => {
    adminFetch("/projects/admin/all?limit=100")
      .then((res) => setProjects(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const run = async (id, fn) => {
    setBusyId(id);
    try {
      await fn();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const togglePublish = (p) =>
    run(p._id, async () => {
      const status = p.status === "published" ? "draft" : "published";
      await adminFetch(`/projects/${p._id}/status`, { method: "PATCH", body: { status } });
      setProjects((l) => l.map((x) => (x._id === p._id ? { ...x, status } : x)));
    });

  const moveSection = (p) =>
    run(p._id, async () => {
      const section = p.section === "active" ? "onboarded" : "active";
      await adminFetch(`/projects/${p._id}/section`, { method: "PATCH", body: { section } });
      setProjects((l) => l.map((x) => (x._id === p._id ? { ...x, section } : x)));
    });

  const remove = (p) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    run(p._id, async () => {
      await adminFetch(`/projects/${p._id}`, { method: "DELETE" });
      setProjects((l) => l.filter((x) => x._id !== p._id));
    });
  };

  const count = (s) => projects.filter((p) => p.section === s).length;
  const shown = projects.filter((p) => p.section === tab);

  return (
    <div>
      <PageHeader
        title="Project Management"
        subtitle="Active & onboarded projects shown on the website"
        action={<CtaLink href="/admin/projects/new">New Project</CtaLink>}
      />

      <div className="mb-5">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[["active", "Active Projects", count("active")], ["onboarded", "Onboarded Projects", count("onboarded")]]}
        />
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : shown.length === 0 ? (
        <EmptyState
          title={`No ${tab} projects yet`}
          hint="Projects you add will appear here and on the public website once published."
          action={<CtaLink href="/admin/projects/new">Add a project</CtaLink>}
        />
      ) : (
        <DataTable columns={["Project", "Location", "Capacity", "Scope", "Stage", "Start", "Status", ["Actions", "right"]]}>
          {shown.map((p) => (
            <tr key={p._id} className={rowCls}>
              <td className={`${cellCls} min-w-[220px]`}>
                <p className="font-semibold text-[#12201c]">{p.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">/projectmanagement/{p.slug}</p>
              </td>
              <td className={cellCls}>{[p.location, p.state].filter(Boolean).join(", ")}</td>
              <td className={`${cellCls} whitespace-nowrap font-semibold text-[#12201c]`}>{p.capacity}</td>
              <td className={cellCls}>
                {p.scope && <span className="text-xs font-semibold text-[#0e6b55] bg-[#0e6b55]/10 px-2.5 py-1 rounded-full whitespace-nowrap">{p.scope}</span>}
              </td>
              <td className={cellCls}>{p.stage}</td>
              <td className={`${cellCls} whitespace-nowrap`}>{formatDate(p.startDate)}</td>
              <td className={cellCls}>
                <StatusPill as="button" status={p.status} onClick={() => togglePublish(p)} disabled={busyId === p._id} title="Click to toggle" />
              </td>
              <td className={cellCls}>
                <div className="flex justify-end gap-0.5">
                  <IconBtn
                    label={p.section === "active" ? "Move to Onboarded" : "Move to Active"}
                    onClick={() => moveSection(p)}
                    disabled={busyId === p._id}
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </IconBtn>
                  {p.status === "published" && (
                    <IconLink external href={`/projectmanagement/${p.slug}`} label="View"><Eye className="w-4 h-4" /></IconLink>
                  )}
                  <IconLink href={`/admin/projects/${p._id}/edit`} label="Edit" tone="green"><Pencil className="w-4 h-4" /></IconLink>
                  <IconBtn label="Delete" tone="red" onClick={() => remove(p)} disabled={busyId === p._id}><Trash2 className="w-4 h-4" /></IconBtn>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
