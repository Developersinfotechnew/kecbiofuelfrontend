'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight, Building2, Calendar, Check, ChevronDown, Cpu, Factory, Flag, Layers, MapPin, Search, X, Zap,
} from 'lucide-react';
import Navbar from '@/app/Components/Navbar';
import { formatDate } from '@/app/lib/api';

const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false });

// Image shown in the page hero. Change this path to swap the picture.
const HERO_IMAGE = '/images/pmc6.jpeg';

const TABS = [
  { key: 'active', label: 'Active projects' },
  { key: 'onboarded', label: 'Onboarded projects' },
];

const ring =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500';

const place = (p) => [p.location, p.state].filter(Boolean).join(', ');

function Chip({ children, tone = 'green' }) {
  const tones = {
    green: 'bg-green-50 text-green-900 border-green-200',
    orange: 'bg-orange-50 text-orange-800 border-orange-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

// Redesigned details: timeline + stat tiles (replaces old striped table).
function DetailsTable({ p, isActive }) {
  const v = Math.max(0, Math.min(100, Number(p.progress) || 0));
  const endLabel = isActive ? 'Expected completion' : 'Onboarded on';
  const endDate = isActive ? p.expectedCompletion : p.onboardedDate || p.startDate;

  const stats = [
    [Zap, 'Capacity', p.capacity],
    [Layers, 'Scope', p.scope],
    [Cpu, 'Technology', p.technology],
    [Flag, 'Current stage', p.stage],
  ].filter(([, , val]) => val);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-gray-200 p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
          <span>Project timeline</span>
          {isActive && <span className="text-green-800 font-extrabold text-sm">{v}% complete</span>}
        </div>
        <div className="mt-3 relative h-2.5 rounded-full bg-green-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-700"
            style={{ width: `${isActive ? v : 100}%` }}
          />
          {isActive && (
            <span
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-green-700 shadow"
              style={{ left: `${v}%` }}
            />
          )}
        </div>
        <div className="mt-3 flex items-start justify-between gap-4 text-xs">
          <div>
            <p className="text-gray-600">Start date</p>
            <p className="font-bold text-gray-900 text-sm">{formatDate(p.startDate)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">{endLabel}</p>
            <p className="font-bold text-gray-900 text-sm">{formatDate(endDate)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(([Icon, label, val]) => (
          <div key={label} className="rounded-2xl bg-white border border-gray-200 p-3.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
              <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5" />
              </span>
              {label}
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 leading-snug">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, isOpen, onToggle, isActive }) {
  const [imgBad, setImgBad] = useState(false);
  const panelId = `project-panel-${p.id}`;
  const { src, mobileSrc, alt } = p.thumbnail || {};
  const mainImg = src || mobileSrc;

  // progress ring maths
  const v = Math.max(0, Math.min(100, Number(p.progress) || 0));
  const R = 26;
  const C = 2 * Math.PI * R;

  return (
    <article
      className={`group bg-white rounded-3xl border overflow-hidden transition-all duration-300 ${isOpen
        ? 'border-green-500/60 shadow-xl shadow-green-900/10'
        : 'border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-green-300'
        }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`w-full text-left flex items-center gap-3 sm:gap-5 p-3 sm:p-4 ${ring}`}
      >
        {/* Thumbnail with fallback (no broken-image alt text) */}
        <div className="w-24 h-24 sm:w-36 sm:h-28 lg:w-44 lg:h-32 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-green-100 via-green-50 to-orange-50 ring-1 ring-green-900/5">
          {mainImg && !imgBad ? (
            <picture>
              {mobileSrc && <source media="(max-width: 639px)" srcSet={mobileSrc} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImg}
                alt={alt || p.title}
                loading="lazy"
                onError={() => setImgBad(true)}
                className="w-full h-full object-cover"
              />
            </picture>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-700/60">
              <Factory className="w-9 h-9" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {p.scope && <Chip tone="orange">{p.scope}</Chip>}
            {isActive && p.stage && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-800">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-600" />
                </span>
                {p.stage}
              </span>
            )}
            {!isActive && (p.onboardedDate || p.startDate) && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-800">
                <Calendar className="w-3.5 h-3.5" /> {formatDate(p.onboardedDate || p.startDate)}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2">{p.title}</h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-700">
            {place(p) && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-600" /> {place(p)}
              </span>
            )}
            {p.capacity && (
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-600" /> {p.capacity}
              </span>
            )}
          </div>
        </div>

        {/* Progress ring (desktop/tablet) */}
        {isActive && (
          <div
            className="hidden sm:block relative w-[60px] h-[60px] shrink-0"
            role="progressbar"
            aria-valuenow={v}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <svg width="60" height="60" className="-rotate-90">
              <circle cx="30" cy="30" r={R} fill="none" strokeWidth="6" className="stroke-green-100" />
              <circle
                cx="30" cy="30" r={R} fill="none" strokeWidth="6" strokeLinecap="round"
                className="stroke-green-600 transition-all duration-700"
                strokeDasharray={C}
                strokeDashoffset={C - (C * v) / 100}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-green-900">
              {v}%
            </span>
          </div>
        )}

        <span
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
            ? 'bg-green-700 border-green-700 text-white rotate-180'
            : 'bg-white border-gray-300 text-green-800 group-hover:border-green-500'
            }`}
        >
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>

      {/* Expandable panel (grid-rows trick = smooth height animation) */}
      <div
        id={panelId}
        role="region"
        className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-100 bg-gradient-to-b from-green-50/70 to-white p-4 sm:p-6">
            <div className="grid lg:grid-cols-5 gap-5 lg:gap-8">
              <div className="lg:col-span-3">
                <DetailsTable p={p} isActive={isActive} />
              </div>

              <div className="lg:col-span-2 flex flex-col">
                {p.client && (
                  <div className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 p-3.5">
                    <span className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600">Client</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{p.client}</p>
                    </div>
                  </div>
                )}

                {p.summary && <p className="mt-4 text-sm sm:text-[15px] text-gray-800 leading-relaxed">{p.summary}</p>}

                {p.highlights.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {p.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/projectmanagement/${p.slug}`}
                  className={`mt-5 lg:mt-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-600/25 transition ${ring}`}
                >
                  View project updates <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectManagementScreen({ projects = [] }) {
  const [tab, setTab] = useState('active');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null); // one project open at a time
  const [heroOk, setHeroOk] = useState(true);

  const counts = useMemo(
    () => ({
      active: projects.filter((p) => p.section === 'active').length,
      onboarded: projects.filter((p) => p.section === 'onboarded').length,
    }),
    [projects]
  );

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        p.section === tab &&
        (!term || `${p.title} ${p.client} ${p.location} ${p.state} ${p.scope}`.toLowerCase().includes(term))
    );
  }, [projects, tab, q]);

  const isActive = tab === 'active';

  const switchTab = (key) => {
    setTab(key);
    setOpenId(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f4]">
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#0b2e22] pt-28 sm:pt-32 pb-16 sm:pb-20"
        style={{
          backgroundImage:
            'radial-gradient(600px circle at 100% 0%, rgba(249,115,22,0.28), transparent 60%), radial-gradient(500px circle at 0% 100%, rgba(34,197,94,0.22), transparent 60%)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Project management and updates
            </h1>
            <p className="mt-4 max-w-xl text-green-50/85 text-sm sm:text-base leading-relaxed">
              Follow every KEC Biofuel CBG project, from active execution to newly onboarded plants. Tap a project to see
              its details.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                ['Active projects', counts.active, 'bg-orange-500'],
                ['Onboarded projects', counts.onboarded, 'bg-green-400'],
              ].map(([label, n, dot]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.08] border border-white/15 px-4 py-3"
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                  <p className="text-3xl font-extrabold text-white leading-none">{n}</p>
                  <p className="text-sm text-green-50/85 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {heroOk && (
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] border-2 border-orange-400/50 translate-x-3 translate-y-3 hidden sm:block" />
              <div className="relative h-48 sm:h-60 lg:h-72 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/20 bg-green-950/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HERO_IMAGE}
                  alt="KEC Biofuel CBG project"
                  className="w-full h-full object-cover"
                  onError={() => setHeroOk(false)}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tabs + search (overlaps hero) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-green-900/10 border border-gray-200 p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="inline-flex bg-green-50 rounded-full p-1 w-full md:w-auto" role="tablist">
            {TABS.map((t) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => switchTab(t.key)}
                  className={`flex-1 md:flex-none px-3 sm:px-6 py-2.5 rounded-full text-sm font-bold transition ${ring} ${on ? 'bg-green-700 text-white shadow' : 'text-green-900 hover:bg-green-100'
                    }`}
                >
                  {t.label}
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${on ? 'bg-orange-500 text-white' : 'bg-white text-green-900'
                      }`}
                  >
                    {counts[t.key]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative md:w-80">
            <Search className="w-4 h-4 text-gray-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search project, client, location..."
              aria-label="Search projects"
              className="w-full bg-white border border-gray-300 rounded-full pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-600 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/15"
            />
            {q && (
              <button
                onClick={() => setQ('')}
                aria-label="Clear search"
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-gray-700 hover:bg-gray-100 flex items-center justify-center ${ring}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isActive ? 'Active projects' : 'Onboarded projects'}
          </h2>
          <p className="text-sm font-medium text-gray-700">{rows.length} shown</p>
        </div>

        {rows.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-16 px-4 text-center">
            <p className="font-semibold text-gray-900">
              {q ? 'No projects match your search' : `No ${tab} projects to show yet`}
            </p>
            {q && (
              <>
                <p className="text-sm text-gray-700 mt-1">Try a different name, client or location.</p>
                <button
                  onClick={() => setQ('')}
                  className={`mt-4 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition ${ring}`}
                >
                  Clear search
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((p) => (
              <ProjectCard
                key={p.id}
                p={p}
                isActive={isActive}
                isOpen={openId === p.id}
                onToggle={() => setOpenId(openId === p.id ? null : p.id)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}