"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminFetch } from "../../utils/adminAuth";
import {
  PageHeader, SearchBox, SelectBox, StatusPill,
  DataTable, rowCls, cellCls, Spinner, ErrorBanner, EmptyState,
} from "../../../Components/Admin/kit";

const fmt = (iso) => new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "?";

export default function AllBookingsPage() {
  const [rows, setRows] = useState(null);
  const [webinars, setWebinars] = useState([]);
  const [webinar, setWebinar] = useState("");
  const [status, setStatus] = useState("confirmed");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch("/webinars/admin/all").then((r) => setWebinars(r.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setQ(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setRows(null);
    const qs = new URLSearchParams({ status, ...(webinar && { webinar }), ...(q && { search: q }) });
    adminFetch(`/webinars/admin/bookings/all?${qs}`).then((r) => setRows(r.data)).catch((e) => setError(e.message));
  }, [webinar, status, q]);

  return (
    <div>
      <PageHeader
        title="All Webinar Bookings"
        subtitle="Every registration across webinars. Filter by webinar, status, or search."
      />

      <div className="flex gap-3 flex-wrap mb-5">
        <SelectBox value={webinar} onChange={(e) => setWebinar(e.target.value)}>
          <option value="">All webinars</option>
          {webinars.map((w) => <option key={w._id} value={w._id}>{w.title}</option>)}
        </SelectBox>
        <SelectBox value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="all">All</option>
        </SelectBox>
        <SearchBox value={search} onChange={setSearch} placeholder="Search name / email / phone" />
      </div>

      <ErrorBanner>{error}</ErrorBanner>

      {rows === null && !error ? (
        <Spinner />
      ) : rows?.length === 0 ? (
        <EmptyState title="No bookings found" hint="Try another webinar, status or search term." />
      ) : rows ? (
        <DataTable columns={["Webinar", "Name", "Email", "Phone", "Amount", "Status", "Booked"]}>
          {rows.map((r) => (
            <tr key={r._id} className={rowCls}>
              <td className={cellCls}>
                {r.webinar ? (
                  <Link className="text-[#0e6b55] font-semibold hover:text-green-600 hover:underline underline-offset-2" href={`/admin/webinars/${r.webinar._id}/bookings`}>
                    {r.webinar.title}
                  </Link>
                ) : "—"}
              </td>
              <td className={cellCls}>
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-[#12201c] text-green-50 text-[11px] font-bold flex items-center justify-center">
                    {initials(r.name)}
                  </span>
                  <span className="font-semibold text-[#12201c] whitespace-nowrap">{r.name}</span>
                </div>
              </td>
              <td className={cellCls}>{r.email}</td>
              <td className={`${cellCls} whitespace-nowrap tabular-nums`}>{r.phone}</td>
              <td className={`${cellCls} font-semibold text-[#12201c]`}>{r.amount > 0 ? `₹${r.amount}` : "Free"}</td>
              <td className={cellCls}><StatusPill status={r.status} /></td>
              <td className={`${cellCls} whitespace-nowrap text-slate-500`}>{fmt(r.createdAt)}</td>
            </tr>
          ))}
        </DataTable>
      ) : null}
    </div>
  );
}
