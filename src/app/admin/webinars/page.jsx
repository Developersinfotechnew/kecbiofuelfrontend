"use client";

import { useEffect, useState } from "react";
import { Video, Radio, IndianRupee } from "lucide-react";
import { adminFetch } from "../utils/adminAuth";
import {
  PageHeader, CtaLink, StatGrid, StatCard, StatusPill, TextAction,
  DataTable, rowCls, cellCls, Spinner, ErrorBanner, EmptyState,
} from "../../Components/Admin/kit";

const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default function AdminWebinarsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    adminFetch("/webinars/admin/all")
      .then((r) => setItems(r.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (w, status) => {
    setBusyId(w._id);
    try {
      await adminFetch(`/webinars/${w._id}/status`, { method: "PATCH", body: { status } });
      setItems((xs) => xs.map((x) => (x._id === w._id ? { ...x, status } : x)));
    } catch (e) {
      alert(e.message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (w) => {
    if (!confirm(`Delete "${w.title}"?`)) return;
    setBusyId(w._id);
    try {
      await adminFetch(`/webinars/${w._id}`, { method: "DELETE" });
      setItems((xs) => xs.filter((x) => x._id !== w._id));
    } catch (e) {
      alert(e.message);
    } finally {
      setBusyId(null);
    }
  };

  const upcoming = items.filter((w) => w.status === "published" && new Date(w.startsAt) > new Date()).length;
  const revenue = items.reduce((s, w) => s + (w.revenue || 0), 0);

  return (
    <div>
      <PageHeader
        title="Webinars & Online Meetings"
        subtitle="Schedule sessions shown on the public booking calendar"
        action={<CtaLink href="/admin/webinars/new">Add Webinar</CtaLink>}
      />

      <StatGrid>
        <StatCard label="Total" value={items.length} tone="dark" icon={<Video className="w-5 h-5" />} />
        <StatCard label="Upcoming live" value={upcoming} tone="green" icon={<Radio className="w-5 h-5" />} />
        <StatCard label="Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} tone="orange" icon={<IndianRupee className="w-5 h-5" />} />
      </StatGrid>

      <ErrorBanner>{error}</ErrorBanner>

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState
          title="No webinars yet"
          hint="Create a session and it will show up on the public booking calendar."
          action={<CtaLink href="/admin/webinars/new">Add your first webinar</CtaLink>}
        />
      ) : (
        <DataTable columns={["Title", "When (IST)", "Price", "Booked", "Status", ["Actions", "right"]]}>
          {items.map((w) => {
            const pct = w.capacity > 0 ? Math.min(100, Math.round((w.bookingsCount / w.capacity) * 100)) : null;
            return (
              <tr key={w._id} className={rowCls}>
                <td className={`${cellCls} min-w-[200px]`}>
                  <p className="font-semibold text-[#12201c]">{w.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">/{w.slug}</p>
                </td>
                <td className={`${cellCls} whitespace-nowrap`}>{fmt(w.startsAt)}</td>
                <td className={`${cellCls} font-semibold text-[#12201c]`}>{w.price > 0 ? `₹${w.price}` : "Free"}</td>
                <td className={`${cellCls} min-w-[110px]`}>
                  <p className="tabular-nums text-[#12201c] font-semibold">
                    {w.bookingsCount}
                    {w.capacity > 0 && <span className="text-slate-400 font-medium"> / {w.capacity}</span>}
                  </p>
                  {pct !== null && (
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 90 ? "bg-orange-500" : "bg-green-600"}`} style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </td>
                <td className={cellCls}><StatusPill status={w.status} /></td>
                <td className={cellCls}>
                  <div className="flex justify-end gap-0.5 flex-wrap">
                    <TextAction tone="green" href={`/admin/webinars/${w._id}/bookings`}>Bookings</TextAction>
                    <TextAction
                      disabled={busyId === w._id}
                      onClick={() => setStatus(w, w.status === "published" ? "draft" : "published")}
                    >
                      {w.status === "published" ? "Unpublish" : "Publish"}
                    </TextAction>
                    {w.status !== "cancelled" && (
                      <TextAction tone="orange" disabled={busyId === w._id} onClick={() => confirm("Cancel this webinar?") && setStatus(w, "cancelled")}>
                        Cancel
                      </TextAction>
                    )}
                    <TextAction tone="green" href={`/admin/webinars/${w._id}/edit`}>Edit</TextAction>
                    <TextAction tone="red" disabled={busyId === w._id} onClick={() => remove(w)}>Delete</TextAction>
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
