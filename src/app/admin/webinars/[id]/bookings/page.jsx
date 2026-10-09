"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, CheckCircle2, Clock, XCircle, IndianRupee } from "lucide-react";
import { adminFetch } from "../../../utils/adminAuth";
import {
  PageHeader, GhostBtn, StatGrid, StatCard, Segmented, StatusPill,
  DataTable, rowCls, cellCls, Spinner, ErrorBanner, EmptyState,
} from "../../../../Components/Admin/kit";

const FILTERS = [["confirmed", "Confirmed"], ["pending", "Pending payment"], ["failed", "Failed"], ["all", "All"]];
const fmt = (iso) => new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default function WebinarBookingsPage() {
  const { id } = useParams();
  const [filter, setFilter] = useState("confirmed");
  const [rows, setRows] = useState(null);
  const [webinar, setWebinar] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setRows(null);
    adminFetch(`/webinars/admin/${id}/bookings?status=${filter}`)
      .then((r) => { setRows(r.data); setWebinar(r.webinar); setStats(r.stats); })
      .catch((e) => setError(e.message));
  }, [id, filter]);

  const exportCsv = () => {
    const head = ["Name", "Email", "Phone", "Organization", "Amount", "Status", "Razorpay Payment ID", "Booked at"];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = rows.map((r) => [r.name, r.email, r.phone, r.organization, r.amount, r.status, r.razorpayPaymentId, new Date(r.createdAt).toISOString()].map(esc).join(","));
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${webinar?.slug || "webinar"}-bookings.csv`;
    a.click();
  };

  return (
    <div>
      <PageHeader
        back={{ href: "/admin/webinars", label: "Back to webinars" }}
        title={webinar?.title || "Registrations"}
        subtitle={webinar && `${fmt(webinar.startsAt)} IST · ${webinar.price > 0 ? `₹${webinar.price}` : "Free"}`}
        action={
          rows?.length > 0 && (
            <GhostBtn onClick={exportCsv}><Download className="w-4 h-4" /> Export CSV</GhostBtn>
          )
        }
      />

      {stats && (
        <StatGrid cols={4}>
          <StatCard label="Confirmed" value={stats.confirmed} tone="green" icon={<CheckCircle2 className="w-5 h-5" />} />
          <StatCard label="Pending" value={stats.pending} tone="orange" icon={<Clock className="w-5 h-5" />} />
          <StatCard label="Failed" value={stats.failed} tone="red" icon={<XCircle className="w-5 h-5" />} />
          <StatCard label="Revenue" value={`₹${stats.revenue.toLocaleString("en-IN")}`} tone="dark" icon={<IndianRupee className="w-5 h-5" />} />
        </StatGrid>
      )}

      <div className="mb-5 overflow-x-auto">
        <Segmented value={filter} onChange={setFilter} options={FILTERS} />
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {rows === null && !error ? (
        <Spinner />
      ) : rows?.length === 0 ? (
        <EmptyState title="No bookings in this view" hint="Switch the filter above to see other registrations." />
      ) : rows ? (
        <DataTable columns={["Name", "Email", "Phone", "Organization", "Amount", "Status", "Payment ID", "Booked"]}>
          {rows.map((r) => (
            <tr key={r._id} className={rowCls}>
              <td className={`${cellCls} font-semibold text-[#12201c] whitespace-nowrap`}>{r.name}</td>
              <td className={cellCls}>{r.email}</td>
              <td className={`${cellCls} whitespace-nowrap tabular-nums`}>{r.phone}</td>
              <td className={cellCls}>{r.organization || "—"}</td>
              <td className={`${cellCls} font-semibold text-[#12201c]`}>{r.amount > 0 ? `₹${r.amount}` : "Free"}</td>
              <td className={cellCls}><StatusPill status={r.status} /></td>
              <td className={`${cellCls} text-xs font-mono text-slate-500`}>{r.razorpayPaymentId || "—"}</td>
              <td className={`${cellCls} whitespace-nowrap text-slate-500`}>{fmt(r.createdAt)}</td>
            </tr>
          ))}
        </DataTable>
      ) : null}
    </div>
  );
}
