"use client";

import Link from "next/link";
import { Plus, Search, Inbox } from "lucide-react";

/* ------------------------------------------------------------------ *
 * Admin design kit — shared by every admin list page.
 * Palette (only your colours):
 *   dark green  #12201c  #22362f  #32493f  #0e6b55   (sidebar family)
 *   green       green-50/100/600/700                (primary / success)
 *   orange      orange-50/100/500/600/700           (CTA / draft / warn)
 *   neutrals    slate                               (text, borders, bg)
 * ------------------------------------------------------------------ */

export const surface =
  "bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(18,32,28,0.04),0_8px_24px_-12px_rgba(18,32,28,0.10)]";

/* ---------- Page header ---------- */
export function PageHeader({ title, subtitle, back, action }) {
  return (
    <div className="mb-7">
      {back && (
        <Link href={back.href} className="inline-flex items-center gap-1 text-xs font-semibold text-[#0e6b55] hover:text-[#12201c] mb-2 transition-colors">
          ← {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[26px] leading-8 font-bold tracking-tight text-[#12201c]">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

/* ---------- Primary CTA (orange) ---------- */
export function CtaLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all"
    >
      <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
      {children}
    </Link>
  );
}

export function GhostBtn({ children, ...rest }) {
  return (
    <button
      {...rest}
      className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#12201c] font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
    >
      {children}
    </button>
  );
}

/* ---------- Stat cards ---------- */
const tones = {
  dark:   { text: "text-[#12201c]",  chip: "bg-slate-100 text-[#12201c]",   bar: "bg-[#12201c]" },
  green:  { text: "text-green-600",  chip: "bg-green-50 text-green-600",    bar: "bg-green-600" },
  orange: { text: "text-orange-500", chip: "bg-orange-50 text-orange-500",  bar: "bg-orange-500" },
  red:    { text: "text-red-600",    chip: "bg-red-50 text-red-600",        bar: "bg-red-500" },
};

export function StatGrid({ cols = 3, children }) {
  const c = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return <div className={`grid grid-cols-1 ${c} gap-4 mb-7`}>{children}</div>;
}

export function StatCard({ label, value, tone = "dark", icon }) {
  const t = tones[tone] || tones.dark;
  return (
    <div className={`${surface} relative overflow-hidden px-5 py-4 flex items-center justify-between`}>
      <span className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${t.bar}`} />
      <div className="pl-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <p className={`text-[28px] leading-9 font-bold tracking-tight mt-0.5 ${t.text}`}>{value}</p>
      </div>
      {icon && <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.chip}`}>{icon}</span>}
    </div>
  );
}

/* ---------- Toolbar: search + segmented filter ---------- */
export const fieldCls =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-[#12201c] outline-none placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all";

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1 min-w-[220px]">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${fieldCls} pl-10`} />
    </div>
  );
}

export function SelectBox({ children, ...rest }) {
  return (
    <select
      {...rest}
      className={`${fieldCls} !w-auto pr-9 appearance-none cursor-pointer bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]`}
    >
      {children}
    </select>
  );
}

// options: [[value, label, count?], ...]
export function Segmented({ value, onChange, options }) {
  return (
    <div className="inline-flex bg-slate-100/80 border border-slate-200/70 rounded-xl p-1 gap-0.5">
      {options.map(([k, label, count]) => {
        const on = value === k;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              on ? "bg-[#0e6b55] text-white shadow-sm" : "text-slate-600 hover:text-[#12201c] hover:bg-white"
            }`}
          >
            {label}
            {count !== undefined && (
              <span className={`ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${on ? "bg-white/20 text-white" : "bg-white text-slate-500"}`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Status pill ---------- */
const pillTone = {
  published: "bg-green-50 text-green-700 ring-green-600/20",
  paid:      "bg-green-50 text-green-700 ring-green-600/20",
  free:      "bg-[#0e6b55]/10 text-[#0e6b55] ring-[#0e6b55]/20",
  draft:     "bg-orange-50 text-orange-700 ring-orange-500/20",
  pending:   "bg-orange-50 text-orange-700 ring-orange-500/20",
  cancelled: "bg-red-50 text-red-600 ring-red-500/20",
  failed:    "bg-red-50 text-red-600 ring-red-500/20",
};
const dotTone = {
  published: "bg-green-600", paid: "bg-green-600", free: "bg-[#0e6b55]",
  draft: "bg-orange-500", pending: "bg-orange-500", cancelled: "bg-red-500", failed: "bg-red-500",
};

export function StatusPill({ status, as: As = "span", ...rest }) {
  const cls = pillTone[status] || "bg-slate-100 text-slate-600 ring-slate-300/40";
  return (
    <As
      {...rest}
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full ring-1 ring-inset ${cls} ${
        As === "button" ? "cursor-pointer hover:brightness-95 disabled:opacity-60 transition" : ""
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotTone[status] || "bg-slate-400"}`} />
      {status}
    </As>
  );
}

/* ---------- Icon action buttons ---------- */
const iconTone = {
  neutral: "text-slate-500 hover:bg-slate-100 hover:text-[#12201c]",
  green:   "text-[#0e6b55] hover:bg-green-50",
  orange:  "text-orange-600 hover:bg-orange-50",
  red:     "text-red-500 hover:bg-red-50",
};
const iconBase = "w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-40";

export function IconLink({ href, label, tone = "neutral", external, children }) {
  const cls = `${iconBase} ${iconTone[tone]}`;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" title={label} aria-label={label} className={cls}>{children}</a>
  ) : (
    <Link href={href} title={label} aria-label={label} className={cls}>{children}</Link>
  );
}

export function IconBtn({ label, tone = "neutral", children, ...rest }) {
  return (
    <button {...rest} title={label} aria-label={label} className={`${iconBase} ${iconTone[tone]}`}>
      {children}
    </button>
  );
}

/* Text action (used in dense rows) */
const textTone = {
  neutral: "text-slate-600 hover:bg-slate-100",
  green:   "text-[#0e6b55] hover:bg-green-50",
  orange:  "text-orange-600 hover:bg-orange-50",
  red:     "text-red-600 hover:bg-red-50",
};
export function TextAction({ href, tone = "neutral", children, ...rest }) {
  const cls = `px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-40 ${textTone[tone]}`;
  return href ? <Link href={href} className={cls}>{children}</Link> : <button {...rest} className={cls}>{children}</button>;
}

/* ---------- Table ---------- */
export function DataTable({ columns, children }) {
  return (
    <div className={`${surface} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50/80 border-b border-slate-200/70">
              {columns.map((c) => {
                const [label, align] = Array.isArray(c) ? c : [c];
                return (
                  <th key={label} className={`px-5 py-3.5 font-semibold ${align === "right" ? "text-right" : ""}`}>{label}</th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export const rowCls = "group hover:bg-green-50/40 transition-colors";
export const cellCls = "px-5 py-4 text-slate-600 align-middle";

/* ---------- States ---------- */
export function Spinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-9 h-9 rounded-full border-[3px] border-green-600/20 border-t-green-600 animate-spin" />
    </div>
  );
}

export function ErrorBanner({ children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5 text-sm">
      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 translate-y-1" />
      {children}
    </div>
  );
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300/80 py-16 px-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-green-50 text-[#0e6b55] flex items-center justify-center mb-4">
        <Inbox className="w-6 h-6" />
      </div>
      <p className="font-semibold text-[#12201c]">{title}</p>
      {hint && <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ---------- Form page header: title left, actions right (same row) ---------- */
export function FormHeader({ title, subtitle, back, children }) {
  return <PageHeader title={title} subtitle={subtitle} back={back} action={<div className="flex flex-wrap items-center gap-2.5">{children}</div>} />;
}
