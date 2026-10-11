"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "../lib/api";

const TZ = "Asia/Kolkata";
const istDay = (d) => new Date(d).toLocaleDateString("en-IN", { timeZone: TZ, day: "numeric" });
const istMonth = (d) => new Date(d).toLocaleDateString("en-IN", { timeZone: TZ, month: "short" });
const istWeekday = (d) => new Date(d).toLocaleDateString("en-IN", { timeZone: TZ, weekday: "long" });
const istTime = (d) => new Date(d).toLocaleTimeString("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit" });

const Svg = ({ d, className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
    </svg>
);
const ICON = {
    clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    video: "M15 10l5-3v10l-5-3M3 6h12v12H3z",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    arrow: "M5 12h14M13 6l6 6-6 6",
};

const STEPS = [
    { icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", title: "Pick a date" },
    { icon: "M2 7h20v10H2zM2 11h20", title: "Pay securely" },
    { icon: "M15 10l5-3v10l-5-3M3 6h12v12H3z", title: "Join online" },
];

export default function WebinarsHome() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/webinars`)
            .then((r) => r.json())
            .then((json) => setItems((json.data || []).slice(0, 3)))
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="w-full py-16 bg-[#f4f8f4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="relative overflow-hidden rounded-3xl bg-[#0b2e22] text-white px-6 py-10 md:px-12 md:py-14"
                    style={{
                        backgroundImage:
                            "radial-gradient(600px circle at 100% 0%, rgba(249,115,22,0.28), transparent 60%), radial-gradient(500px circle at 0% 100%, rgba(34,197,94,0.22), transparent 60%)",
                    }}
                >
                    <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                        {/* Left: pitch + CTA */}
                        <div>
                            <span className="inline-block text-xs font-bold bg-orange-500 text-white px-3 py-1 rounded-full">
                                Live online sessions
                            </span>
                            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                                Webinars &amp; online meetings on CBG and clean energy
                            </h2>
                            <p className="mt-4 text-green-50/80 text-base md:text-lg leading-relaxed">
                                Learn biogas and compressed biogas straight from the KEC Biofuel team. Choose a session, register and join from anywhere.
                            </p>

                            <ul className="mt-6 flex flex-wrap gap-3">
                                {STEPS.map((s) => (
                                    <li key={s.title} className="flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/10 pl-2 pr-4 py-1.5 text-sm font-semibold">
                                        <span className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                                            <Svg d={s.icon} className="w-4 h-4" />
                                        </span>
                                        {s.title}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/webinars"
                                className="mt-8 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold px-6 py-3 rounded-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                            >
                                View all webinars
                                <Svg d={ICON.arrow} className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right: upcoming sessions */}
                        <div className="space-y-3">
                            {loading &&
                                Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="h-24 rounded-2xl bg-white/[0.07] animate-pulse" />
                                ))}

                            {!loading && items.length === 0 && (
                                <div className="rounded-2xl bg-white/[0.07] border border-white/10 p-6 text-center">
                                    <p className="font-bold">New sessions coming soon</p>
                                    <p className="text-sm text-green-50/70 mt-1">Check the webinars page for the calendar.</p>
                                </div>
                            )}

                            {!loading &&
                                items.map((w, i) => (
                                    <Link
                                        key={w._id || w.id || i}
                                        href="/webinars"
                                        className="flex gap-4 rounded-2xl bg-white text-gray-900 p-4 hover:shadow-xl hover:-translate-y-0.5 transition"
                                    >
                                        <div className="shrink-0 w-16 rounded-xl bg-green-100 text-green-800 flex flex-col items-center justify-center py-2">
                                            <span className="text-2xl font-extrabold leading-none">{istDay(w.startsAt)}</span>
                                            <span className="text-xs font-bold uppercase mt-1">{istMonth(w.startsAt)}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            {i === 0 && <span className="text-[11px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">Next up</span>}
                                            <p className="font-bold leading-snug mt-0.5 line-clamp-2">{w.title}</p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-600">
                                                <span className="inline-flex items-center gap-1">
                                                    <Svg d={ICON.clock} className="w-3.5 h-3.5" /> {istWeekday(w.startsAt)}, {istTime(w.startsAt)}
                                                </span>
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
                                        </div>
                                        <span className="self-center shrink-0 text-sm font-extrabold">
                                            {w.price > 0 ? `₹${w.price.toLocaleString("en-IN")}` : <span className="text-green-700">Free</span>}
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}