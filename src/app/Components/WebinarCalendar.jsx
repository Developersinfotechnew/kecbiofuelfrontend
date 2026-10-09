"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL } from "../lib/api";

const TZ = "Asia/Kolkata";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// yyyy-mm-dd of an instant, in IST (so calendar cells match the times we show)
const istKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: TZ });
const istTime = (d) => new Date(d).toLocaleTimeString("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
const istLong = (d) =>
  new Date(d).toLocaleDateString("en-IN", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" });
const istShort = (d) =>
  new Date(d).toLocaleDateString("en-IN", { timeZone: TZ, weekday: "short", day: "numeric", month: "short" });

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

async function api(path, opts) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
    body: opts?.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

/* ---------- small ui bits ---------- */

const Svg = ({ d, className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const ICON = {
  left: "M15 18l-6-6 6-6",
  right: "M9 18l6-6-6-6",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  video: "M15 10l5-3v10l-5-3M3 6h12v12H3z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  close: "M18 6L6 18M6 6l12 12",
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

function PriceTag({ price, dark }) {
  if (!(price > 0))
    return <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${dark ? "bg-green-400/20 text-green-200" : "bg-green-100 text-green-800"}`}>Free</span>;
  return <span className={`text-lg font-extrabold ${dark ? "text-white" : "text-gray-900"}`}>₹{price.toLocaleString("en-IN")}</span>;
}

function Seats({ w, dark }) {
  if (w.seatsLeft === null) return null;
  const low = w.seatsLeft <= 5 && !w.isFull;
  const cls = low ? (dark ? "text-orange-300" : "text-orange-700") : dark ? "text-green-100/70" : "text-gray-600";
  return <span className={`text-xs font-medium ${cls}`}>{w.isFull ? "Sold out" : `${w.seatsLeft} seats left`}</span>;
}

function BookButton({ w, onBook, className = "" }) {
  return (
    <button
      disabled={w.isFull}
      onClick={() => onBook(w)}
      className={`bg-orange-600 hover:bg-orange-700 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-600 disabled:active:scale-100 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition ${focusRing} ${className}`}
    >
      {w.isFull ? "Full" : "Book slot"}
    </button>
  );
}

function SessionCard({ w, onBook, showDate, featured }) {
  return (
    <div className={`rounded-2xl p-4 ${featured ? "bg-[#0b2e22] text-white" : "bg-white border border-gray-200"}`}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {featured && <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full">Next up</span>}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${featured ? "text-green-200" : "text-green-800"}`}>
          <Svg d={ICON.clock} className="w-3.5 h-3.5" />
          {showDate && `${istShort(w.startsAt)}, `}
          {istTime(w.startsAt)} · {w.durationMins} min
        </span>
      </div>

      <p className="font-bold mt-2 leading-snug text-[15px]">{w.title}</p>

      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs ${featured ? "text-green-100/75" : "text-gray-600"}`}>
        {w.host && (
          <span className="inline-flex items-center gap-1">
            <Svg d={ICON.user} className="w-3.5 h-3.5" /> {w.host}
          </span>
        )}
        {w.meetingPlatform && (
          <span className="inline-flex items-center gap-1">
            <Svg d={ICON.video} className="w-3.5 h-3.5" /> {w.meetingPlatform}
          </span>
        )}
      </div>

      {w.description && <p className={`text-sm mt-2 line-clamp-3 ${featured ? "text-green-50/80" : "text-gray-700"}`}>{w.description}</p>}

      <div className="flex items-end justify-between gap-3 mt-4">
        <div className="flex flex-col gap-1">
          <PriceTag price={w.price} dark={featured} />
          <Seats w={w} dark={featured} />
        </div>
        <BookButton w={w} onBook={onBook} />
      </div>
    </div>
  );
}

/* ---------- main ---------- */

export default function WebinarCalendar() {
  const today = new Date();
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [booking, setBooking] = useState(null); // webinar being booked
  const [view, setView] = useState("calendar"); // calendar | list

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // fetch a month plus padding so IST/UTC edges never drop a session
      const from = new Date(Date.UTC(cursor.y, cursor.m, 1) - 24 * 3600 * 1000);
      const to = new Date(Date.UTC(cursor.y, cursor.m + 1, 1) + 24 * 3600 * 1000);
      const q = `?from=${from.toISOString()}&to=${to.toISOString()}`;
      // /webinars default 'from' = now, so past days in a month simply show nothing
      const r = await api(`/webinars${q}`);
      setItems(r.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [cursor]);

  useEffect(() => {
    load();
  }, [load]);

  const byDay = useMemo(() => {
    const map = {};
    items.forEach((w) => {
      const k = istKey(w.startsAt);
      (map[k] ||= []).push(w);
    });
    return map;
  }, [items]);

  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1).getDay();
    const total = new Date(cursor.y, cursor.m + 1, 0).getDate();
    const arr = Array(first).fill(null);
    for (let d = 1; d <= total; d++) {
      const key = `${cursor.y}-${String(cursor.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      arr.push({ d, key });
    }
    return arr;
  }, [cursor]);

  const todayKey = istKey(today);
  const monthLabel = new Date(cursor.y, cursor.m, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const shift = (n) => {
    setSelectedDay(null);
    setCursor((c) => {
      const d = new Date(c.y, c.m + n, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };
  const goToday = () => {
    setSelectedDay(null);
    setCursor({ y: today.getFullYear(), m: today.getMonth() });
  };

  const dayList = selectedDay ? byDay[selectedDay] || [] : [];

  const tabCls = (on) =>
    `px-5 py-2 rounded-full text-sm font-semibold transition ${focusRing} ${on ? "bg-green-700 text-white shadow" : "text-gray-700 hover:bg-gray-100"}`;
  const navBtn = `w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition ${focusRing}`;

  const MonthBar = ({ withToday }) => (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">{monthLabel}</h2>
      <div className="flex items-center gap-2">
        {withToday && (
          <button onClick={goToday} className={`text-sm font-semibold text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-full transition ${focusRing}`}>
            Today
          </button>
        )}
        <button onClick={() => shift(-1)} className={navBtn} aria-label="Previous month"><Svg d={ICON.left} className="w-5 h-5" /></button>
        <button onClick={() => shift(1)} className={navBtn} aria-label="Next month"><Svg d={ICON.right} className="w-5 h-5" /></button>
      </div>
    </div>
  );

  return (
    <div>
      {/* View switch */}
      <div className="flex justify-center gap-1 mb-6 bg-white border border-gray-200 rounded-full p-1 w-fit mx-auto shadow-sm">
        <button className={tabCls(view === "calendar")} onClick={() => setView("calendar")}>Calendar</button>
        <button className={tabCls(view === "list")} onClick={() => setView("list")}>Schedule list</button>
      </div>

      {view === "list" ? (
        <div className="max-w-3xl mx-auto">
          <MonthBar />
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-28 rounded-2xl bg-white border border-gray-200 animate-pulse" />)}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="font-semibold text-gray-800">No upcoming webinars this month</p>
              <p className="text-sm text-gray-600 mt-1">Try the next month.</p>
              <button onClick={() => shift(1)} className={`mt-4 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition ${focusRing}`}>
                View next month
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((w) => (
                <div key={w._id} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="sm:w-28 shrink-0 text-center bg-[#0b2e22] rounded-2xl py-3">
                    <p className="text-xs font-bold text-orange-300">{new Date(w.startsAt).toLocaleDateString("en-IN", { timeZone: TZ, month: "short" })}</p>
                    <p className="text-3xl font-extrabold text-white leading-none my-0.5">{new Date(w.startsAt).toLocaleDateString("en-IN", { timeZone: TZ, day: "numeric" })}</p>
                    <p className="text-xs text-green-100/80">{istTime(w.startsAt)} IST</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-lg leading-snug">{w.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{w.host && `by ${w.host} · `}{w.durationMins} min · {w.meetingPlatform}</p>
                    {w.description && <p className="text-sm text-gray-700 mt-1.5 line-clamp-2">{w.description}</p>}
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <div className="flex flex-col sm:items-end gap-1">
                      <PriceTag price={w.price} />
                      <Seats w={w} />
                    </div>
                    <BookButton w={w} onBook={setBooking} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-7">
            <MonthBar withToday />

            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 mb-2">
              {DAYS.map((d) => <div key={d}>{d}</div>)}
            </div>

            <div className={`grid grid-cols-7 gap-1.5 sm:gap-2 transition-opacity ${loading ? "opacity-50" : ""}`}>
              {cells.map((c, i) => {
                if (!c) return <div key={`e${i}`} />;
                const evs = byDay[c.key] || [];
                const has = evs.length > 0;
                const isToday = c.key === todayKey;
                const sel = c.key === selectedDay;
                const past = c.key < todayKey;

                // one text colour per state, so classes never fight each other
                let cls = `relative aspect-square sm:aspect-[4/3] rounded-xl text-sm flex flex-col items-center justify-center gap-1 transition ${focusRing} `;
                if (sel) cls += "bg-green-700 text-white font-bold shadow-md";
                else if (has) cls += "bg-green-50 text-green-900 font-bold border border-green-300 hover:bg-green-100 hover:-translate-y-0.5 cursor-pointer";
                else if (past) cls += "text-gray-500 font-medium cursor-default";
                else cls += "text-gray-800 font-medium cursor-default";
                if (isToday) cls += " ring-2 ring-orange-500 ring-offset-2";

                return (
                  <button
                    key={c.key}
                    disabled={!has}
                    onClick={() => setSelectedDay(c.key)}
                    aria-label={`${c.d} ${monthLabel}${has ? `, ${evs.length} webinar${evs.length > 1 ? "s" : ""}` : ""}${isToday ? ", today" : ""}`}
                    className={cls}
                  >
                    {c.d}
                    {has && (
                      <span className={`text-[10px] font-bold leading-none px-1.5 py-1 rounded-full text-white ${sel ? "bg-orange-500" : "bg-orange-600"}`}>
                        {evs.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-700">
              <span className="inline-flex items-center gap-2"><i className="w-3.5 h-3.5 rounded bg-green-100 border border-green-400" /> Webinar scheduled</span>
              <span className="inline-flex items-center gap-2"><i className="w-3.5 h-3.5 rounded ring-2 ring-orange-500" /> Today</span>
              <span className="inline-flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-orange-600" /> Sessions that day</span>
              <span className="sm:ml-auto font-medium">All times in IST</span>
            </div>
          </div>

          {/* Side panel */}
          <aside className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-extrabold text-gray-900 text-lg leading-snug">
                {selectedDay ? istLong(`${selectedDay}T12:00:00+05:30`) : "Upcoming sessions"}
              </h3>
              {selectedDay && (
                <button onClick={() => setSelectedDay(null)} className={`shrink-0 text-xs font-semibold text-orange-700 hover:bg-orange-50 px-2.5 py-1.5 rounded-full ${focusRing}`}>
                  Show all
                </button>
              )}
            </div>
            {(() => {
              const list = selectedDay ? dayList : items.slice(0, 5);
              if (loading && !list.length)
                return <div className="space-y-3">{[0, 1].map((i) => <div key={i} className="h-36 rounded-2xl bg-gray-100 animate-pulse" />)}</div>;
              if (!list.length)
                return (
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-2xl p-4">
                    No webinars here yet. Pick a green day on the calendar or check next month.
                  </p>
                );
              return (
                <div className="space-y-3">
                  {list.map((w, i) => (
                    <SessionCard key={w._id} w={w} onBook={setBooking} showDate={!selectedDay} featured={!selectedDay && i === 0} />
                  ))}
                </div>
              );
            })()}
          </aside>
        </div>
      )}

      {booking && <BookingModal webinar={booking} onClose={() => { setBooking(null); load(); }} />}
    </div>
  );
}

/* ---------- booking modal ---------- */

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  );
}

function BookingModal({ webinar: w, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const [step, setStep] = useState("form"); // form | processing | done
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const done = (data) => {
    setResult(data);
    setStep("done");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setStep("processing");
    try {
      const r = await api(`/webinars/${w._id}/book`, { method: "POST", body: form });
      if (r.free) return done({ ...r.data, meetingPlatform: w.meetingPlatform, durationMins: w.durationMins });

      // TEST MODE (backend has no Razorpay keys): fake the payment step
      if (r.data.mock) {
        const yes = window.confirm(`TEST MODE\nSimulate payment of ₹${(r.data.amount / 100).toLocaleString("en-IN")}?`);
        if (!yes) return setStep("form");
        const v = await api("/webinars/verify-payment", {
          method: "POST",
          body: { bookingId: r.data.bookingId, razorpay_order_id: r.data.orderId, razorpay_payment_id: `pay_TEST_${Date.now()}`, razorpay_signature: "test" },
        });
        return done(v.data);
      }

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load payment gateway. Check your connection.");
      const { bookingId, orderId, amount, currency, keyId } = r.data;

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "KEC Biofuel",
        description: w.title,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#16a34a" },
        handler: async (resp) => {
          try {
            const v = await api("/webinars/verify-payment", { method: "POST", body: { bookingId, ...resp } });
            done(v.data);
          } catch (err) {
            setError(err.message);
            setStep("form");
          }
        },
        modal: { ondismiss: () => setStep((s) => (s === "processing" ? "form" : s)) },
      });
      rzp.on("payment.failed", (resp) => {
        setError(resp?.error?.description || "Payment failed. Please try again.");
        setStep("form");
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
      setStep("form");
    }
  };

  const input =
    "w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/15";

  return (
    <div className="fixed inset-0 z-[100] bg-[#06150f]/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={step === "processing" ? undefined : onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {step === "done" ? (
          <div className="text-center p-7">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center">
              <Svg d="M5 13l4 4L19 7" className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold mt-4 text-gray-900">You&apos;re registered!</h3>
            <p className="text-sm text-gray-700 mt-1">{result.title}</p>
            <p className="inline-block text-sm font-semibold text-green-900 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mt-3">
              {istLong(result.startsAt)} · {istTime(result.startsAt)} IST
            </p>
            {result.meetingLink && (
              <a href={result.meetingLink} target="_blank" rel="noopener noreferrer" className={`block mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition ${focusRing}`}>
                Join link ({result.meetingPlatform || "Meeting"})
              </a>
            )}
            <p className="text-xs text-gray-600 mt-3">Save this link. Booking ID: <span className="font-bold text-gray-800">{String(result.bookingId).slice(-8).toUpperCase()}</span></p>
            <button onClick={onClose} className={`mt-4 text-sm font-semibold text-gray-700 hover:underline ${focusRing}`}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="relative bg-[#0b2e22] text-white p-6 rounded-t-3xl" style={{ backgroundImage: "radial-gradient(300px circle at 100% 0%, rgba(249,115,22,0.3), transparent 60%)" }}>
              <button
                type="button"
                onClick={onClose}
                disabled={step === "processing"}
                aria-label="Close"
                className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center ${focusRing}`}
              >
                <Svg d={ICON.close} className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold leading-snug pr-10">{w.title}</h3>
              <p className="text-sm text-green-100/80 mt-1.5">
                {istLong(w.startsAt)} · {istTime(w.startsAt)} IST · {w.durationMins} min
              </p>
            </div>

            <div className="p-6 space-y-3.5">
              {error && <div role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">{error}</div>}
              <Field label="Full name *"><input required className={input} placeholder="Your name" value={form.name} onChange={set("name")} /></Field>
              <Field label="Email *"><input required type="email" className={input} placeholder="you@example.com" value={form.email} onChange={set("email")} /></Field>
              <Field label="Phone *"><input required type="tel" className={input} placeholder="10-digit mobile number" value={form.phone} onChange={set("phone")} /></Field>
              <Field label="Organization (optional)"><input className={input} placeholder="Company or institute" value={form.organization} onChange={set("organization")} /></Field>

              <button disabled={step === "processing"} className={`w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition ${focusRing}`}>
                {step === "processing" ? "Please wait..." : w.price > 0 ? `Pay ₹${w.price.toLocaleString("en-IN")} & register` : "Register (free)"}
              </button>
              {w.price > 0 && <p className="text-xs text-gray-600 text-center">Secure payment via Razorpay (UPI, cards, netbanking).</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}