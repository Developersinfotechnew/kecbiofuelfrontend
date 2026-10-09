'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sprout, Blend, FlaskConical, Wind, Flame, Zap, MonitorSmartphone,
  BrainCircuit, ArrowUpRight, Gauge, Layers, SlidersHorizontal, Activity, Waves,
} from 'lucide-react';

import TechnologyModal from './TechnologyModal';
import { TECH_STACK } from '@/app/data/technologyStackData';

/* KEC Biofuel palette: deep green cards, amber/orange accent on light mint. */
const GREEN = '#14532D';
const AMBER = '#D97706';

const TECHNOLOGIES = [
  { icon: Sprout, title: 'FeedSecure™', body: 'Feedstock planning and supply-chain continuity framework.' },
  { icon: Blend, title: 'SmartMix™', body: 'Optimized substrate blending and input balancing architecture.' },
  { icon: FlaskConical, title: 'HydroReact™', body: 'Digestion process integration and reaction-stage management.' },
  { icon: MonitorSmartphone, title: 'DigiDigest™', body: 'Digital digestion monitoring and operational visibility layer.' },
  { icon: Flame, title: 'BioHeat™', body: 'Heat recovery and thermal utilization framework.' },
  { icon: Zap, title: 'EnergySync™', body: 'Utility synchronization across gas, power, and process systems.' },
  { icon: Gauge, title: 'SmartPower™', body: 'Power optimization and electrical load coordination.' },
  { icon: Wind, title: 'MethaPure™', body: 'Gas upgrading and methane purification process layer.' },
  { icon: Layers, title: 'SmartCascade™', body: 'Multi-stage process and utility cascade coordination.' },
  { icon: SlidersHorizontal, title: 'InfraCore™', body: 'Core infrastructure planning and integration framework.' },
  { icon: MonitorSmartphone, title: 'SmartControl™', body: 'Centralized control architecture for plant operations.' },
  { icon: BrainCircuit, title: 'ProcessSense™', body: 'Process analytics, diagnostics, and performance intelligence.' },
  { icon: Activity, title: 'PlantVision™', body: 'Real-time visualization and plant-wide operational dashboard.' },
  { icon: Waves, title: 'BioFlow IQ™', body: 'Flow intelligence, performance insights, and optimization layer.' },
];

export default function TechnologyStack() {
  const [active, setActive] = useState(null);
  const openByTitle = (t) => setActive(TECHNOLOGIES.find((x) => x.title === t) || null);

  return (
    <section
      id="technology-stack"
      className="relative overflow-hidden bg-gradient-to-b from-white via-green-50 to-green-100 px-4 py-16 sm:px-6 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-green-300/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center space-x-3 rounded-full border border-green-100 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700 sm:text-sm">
                KEC Technology &amp; Process Stack
              </span>
            </div>
            <h2 className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-3xl font-bold leading-tight text-transparent lg:text-[45px]">
              KEC Integrated <span className="text-green-600">CBG Technology Stack</span>
            </h2>
            <p className="mt-4 text-justify text-[15px] leading-relaxed text-gray-700">
              KEC&apos;s process architecture is being developed around a modular infrastructure
              framework designed for monitoring, synchronization, process optimization, and
              operational visibility.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:bg-green-700"
          >
            Talk to our team
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGIES.map(({ icon: Icon, title, body }, i) => (
            <button
              key={title}
              type="button"
              aria-haspopup="dialog"
              aria-label={`Open ${title} details`}
              onClick={() => setActive(TECHNOLOGIES[i])}
              className="group relative h-full cursor-pointer overflow-hidden rounded-2xl p-7 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCFCE7',
                boxShadow: '0 20px 40px -24px rgba(20,83,45,0.35), 0 4px 12px -6px rgba(20,83,45,0.12)',
              }}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${GREEN}, ${AMBER})` }}
              />
              <Icon
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-green-600 opacity-[0.07] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
                strokeWidth={1}
              />
              <span
                className="relative grid h-12 w-12 place-items-center rounded-xl"
                style={{
                  background: `linear-gradient(150deg, #F59E0B 0%, #EA580C 100%)`,
                  boxShadow: '0 12px 22px -8px rgba(234,88,12,0.6), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <Icon className="h-[21px] w-[21px] text-white" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 text-[16.5px] font-semibold leading-snug text-green-800">{title}</h3>
              <p className="relative mt-2.5 text-justify text-[14.5px] leading-relaxed text-gray-600">{body}</p>
              <span className="relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-600">
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border-l-4 border-amber-500 bg-green-900/5 px-6 py-5">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-green-800">
            Technology Positioning Note
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">
            The above modules represent KEC&apos;s branded infrastructure and process framework
            being developed for integrated CBG ecosystem deployment.
          </p>
        </div>
      </div>

      {active && (
        <TechnologyModal
          tech={active}
          data={TECH_STACK[active.title]}
          onClose={() => setActive(null)}
          onSelect={openByTitle}
        />
      )}
    </section>
  );
}
