'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import Navbar from '@/app/Components/Navbar';
import ResponsiveImage from '@/app/Components/ResponsiveImage';
import { formatDate } from '@/app/lib/api';

const Footer = dynamic(() => import('@/app/Components/Footer'), { ssr: false });

export default function ProjectDetailClient({ project: p }) {
  const isActive = p.section === 'active';
  const hasHero = p.heroBanner.src || p.heroBanner.mobileSrc;
  const heroTags = p.hero.tags.length ? p.hero.tags : [p.scope].filter(Boolean);
  const heroSubtitle = p.hero.subtitle || p.summary;

  const snapshot = [
    ['Client', p.client],
    ['Location', [p.location, p.state].filter(Boolean).join(', ')],
    ['Capacity', p.capacity],
    ['Scope of work', p.scope],
    ['Technology', p.technology],
    ['Current stage', p.stage],
    ['Start date', formatDate(p.startDate)],
    isActive
      ? ['Expected completion', formatDate(p.expectedCompletion)]
      : ['Onboarded on', formatDate(p.onboardedDate)],
    ...p.details.map((d) => [d.label, d.value]),
  ].filter(([, v]) => v);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero - text from p.hero (admin editable), image from p.heroBanner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-800">
        <div className="absolute -top-24 -right-16 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -left-16 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8 sm:pb-12 grid gap-6 lg:gap-12 items-center ${
            hasHero ? 'lg:grid-cols-2' : ''
          }`}
        >
          <div>
            <Link
              href="/projectmanagement"
              className="inline-flex items-center gap-1.5 text-green-100 hover:text-white text-sm font-medium mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> All projects
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs sm:text-sm font-semibold">
                {p.hero.badge || (isActive ? 'Active Project' : 'Onboarded Project')}
              </span>
              {heroTags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{p.hero.title || p.title}</h1>
            {heroSubtitle && (
              <p className="mt-3 max-w-2xl text-green-50/90 text-sm sm:text-base leading-relaxed line-clamp-3">{heroSubtitle}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-green-50 text-sm">
              {(p.location || p.state) && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-300" /> {[p.location, p.state].filter(Boolean).join(', ')}
                </span>
              )}
              {p.startDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-orange-300" /> Started {formatDate(p.startDate)}
                </span>
              )}
            </div>
          </div>

          {hasHero && (
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] border-2 border-orange-400/40 translate-x-2 translate-y-2 hidden sm:block" />
              <div className="relative h-44 sm:h-56 lg:h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/20 bg-green-950/40">
                <ResponsiveImage
                  src={p.heroBanner.src}
                  mobileSrc={p.heroBanner.mobileSrc}
                  alt={p.heroBanner.alt || p.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {isActive && (
                  <div className="absolute left-3 right-3 bottom-3 rounded-xl bg-white/90 backdrop-blur px-3.5 py-2">
                    <div className="flex justify-between text-xs font-semibold text-green-900 mb-1">
                      <span>{p.stage || 'Progress'}</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-12 order-2 lg:order-1">
          {p.description && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">About the project</h2>
              <div className="text-[15px] sm:text-[17px] text-gray-700 leading-relaxed whitespace-pre-line">{p.description}</div>
            </div>
          )}

          {p.highlights.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {p.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.sections.map((s, i) => (
            <div key={i}>
              {s.subheading && <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{s.subheading}</h2>}
              {(s.image.src || s.image.mobileSrc) && (
                <div className="mb-5 rounded-xl overflow-hidden">
                  <ResponsiveImage
                    src={s.image.src}
                    mobileSrc={s.image.mobileSrc}
                    alt={s.image.alt || s.subheading}
                    className="w-full h-[220px] sm:h-[320px] lg:h-[400px] object-cover"
                  />
                </div>
              )}
              <div className="text-[15px] sm:text-[17px] text-gray-700 leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}

          {/* Project updates timeline */}
          {p.updates.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                <span className="text-orange-500">Project</span> <span className="text-green-700">Updates</span>
              </h2>
              <ol className="relative border-l-2 border-green-200 ml-2 space-y-10">
                {p.updates.map((u, i) => (
                  <li key={i} className="pl-6 sm:pl-8 relative">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white" />
                    <p className="text-xs sm:text-sm font-semibold text-green-700">{formatDate(u.date)}</p>
                    {u.title && <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{u.title}</h3>}
                    {u.description && (
                      <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line">{u.description}</p>
                    )}
                    {(u.image.src || u.image.mobileSrc) && (
                      <div className="mt-4 rounded-xl overflow-hidden shadow-md">
                        <ResponsiveImage
                          src={u.image.src}
                          mobileSrc={u.image.mobileSrc}
                          alt={u.image.alt || u.title}
                          className="w-full max-h-[420px] object-cover"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {p.gallery.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">
                <span className="text-orange-500">Photo</span> <span className="text-green-700">Gallery</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {p.gallery.map((g, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-green-100">
                    <ResponsiveImage
                      src={g.src}
                      mobileSrc={g.mobileSrc}
                      alt={g.alt || p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Snapshot sidebar */}
        <aside className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-28 bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">
            <div className="bg-green-700 px-5 py-3.5">
              <h2 className="text-white font-bold">Project snapshot</h2>
            </div>
            {isActive && (
              <div className="px-5 pt-5">
                <div className="flex justify-between text-sm font-semibold text-green-800 mb-1.5">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            )}
            <dl className="p-5 divide-y divide-green-50">
              {snapshot.map(([k, v], i) => (
                <div key={i} className="flex justify-between gap-4 py-2.5 text-sm">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-semibold text-gray-900 text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="px-5 pb-5">
              <Link
                href="/contact"
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Discuss a project
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}