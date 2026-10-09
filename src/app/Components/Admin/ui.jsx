"use client";

import { useState } from "react";
import { X } from "lucide-react";

export const inputCls =
  "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-[#12201c] outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all placeholder:text-slate-400";

export function Card({ title, subtitle, action, children }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(18,32,28,0.04),0_8px_24px_-12px_rgba(18,32,28,0.10)] p-5 sm:p-6">
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-bold text-[#12201c]">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, hint, counter, children, className = "" }) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-semibold text-[#12201c]">{label}</label>
        {counter}
      </div>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1.5">{hint}</p>}
    </div>
  );
}

// "42 / 70" counter that turns orange when over the recommended length.
export function Counter({ value = "", max }) {
  const over = value.length > max;
  return (
    <span className={`text-xs font-medium ${over ? "text-orange-600" : "text-slate-400"}`}>
      {value.length} / {max}
    </span>
  );
}

export function TextInput({ value, onChange, ...rest }) {
  return <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest} />;
}

export function TextArea({ value, onChange, rows = 4, ...rest }) {
  return (
    <textarea
      className={`${inputCls} resize-y`}
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
      <span
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-green-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
      <span className="text-sm font-medium text-[#12201c]">{label}</span>
    </label>
  );
}

// Type a keyword, press Enter or comma to add it as a chip.
export function TagInput({ value = [], onChange, placeholder = "Type and press Enter" }) {
  const [draft, setDraft] = useState("");

  const add = (raw) => {
    const items = raw.split(",").map((t) => t.trim()).filter(Boolean);
    if (!items.length) return;
    const merged = [...value];
    items.forEach((t) => {
      if (!merged.includes(t)) merged.push(t);
    });
    onChange(merged);
    setDraft("");
  };

  return (
    <div className="border border-slate-200 rounded-xl px-2.5 py-2 bg-white focus-within:border-green-600 focus-within:ring-4 focus-within:ring-green-600/10 transition-all">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-green-50 text-[#0e6b55] border border-green-100 text-xs font-medium pl-2.5 pr-1.5 py-1 rounded-full"
          >
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={() => add(draft)}
          placeholder={value.length ? "" : placeholder}
          className="flex-1 min-w-[140px] text-sm outline-none py-1 px-1 bg-transparent placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all";
export const btnGreen =
  "inline-flex items-center justify-center gap-1.5 bg-[#0e6b55] hover:bg-[#12201c] disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors";
export const btnGhost =
  "inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#12201c] font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors";
