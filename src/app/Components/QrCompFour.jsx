"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { TrendingUp, Shield, Sprout, DollarSign, FileCheck, Gift, CheckCircle2, Sparkles } from 'lucide-react';

const QrCompFour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: TrendingUp, label: 'Break-even:', value: '3–4 Years' },
    { icon: DollarSign, label: 'ROI:', value: '40–45% YoY' },
    { icon: FileCheck, label: 'Loan Facility:', value: 'Up to 70%' },
    { icon: Gift, label: 'Subsidy:', value: '40–60% (State-specific)' },
    { icon: Shield, label: 'Assured 15-Year Buyback:', value: 'IOCL | BPCL | HPCL | GAIL' },
    { icon: Sprout, label: 'Additional Income:', value: 'Carbon Credits + Tax Benefits + Agri Input Products Business' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-14 bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative px-8 py-3 bg-white/90 backdrop-blur-md border-2 border-emerald-400/50 rounded-full shadow-lg">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                INVESTMENT OPPORTUNITY
                <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className='mx-auto flex justify-center mb-10 font-sans'>
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-tight ">
              <div className='flex text-center items-center gap-4'>
                <span className="text-slate-900/70">
                  WHY INVEST
                </span>
                <div className="w-36 h-1 bg-gradient-to-r from-emerald-500 to-green-100"></div>
              </div>
              <div className="flex text-center items-center gap-4">
                <span className="text-emerald-600">
                  WITH KEC AGRITECH?
                </span>

              </div>
            </h1>
          </div>


          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Image Card - Spans 1 column */}
            <div className="lg:col-span-1">
              <div className="relative group h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 h-full">
                  <Image
                    src="/images/bannernew2.png"
                    alt="CBG Investment"
                    width={800}
                    height={600}
                    className="w-full h-full min-h-[400px] object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-emerald-200/50">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                        <Sprout className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-emerald-900 font-bold text-base">Smart Investment</p>
                        <p className="text-emerald-700 text-sm">Sustainable Returns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Section - Spans 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>

                <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-cyan-500/30 shadow-2xl h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-3xl"></div>

                  <div className="relative">
                    <h3 className="text-3xl sm:text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text mb-8 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-2xl shadow-lg">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      Highlights:
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {highlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="relative group/item">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-xl blur opacity-20 group-hover/item:opacity-40 transition-opacity"></div>

                            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-lg flex-shrink-0">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                                    <p className="text-slate-300 font-semibold text-sm">
                                      {item.label}
                                    </p>
                                  </div>
                                  <p className="text-base font-bold font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text leading-tight">
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative group/cta">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover/cta:opacity-60 transition-opacity duration-300"></div>

            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-2xl p-8 border border-emerald-400/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg">
                  <Sprout className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text mb-2">
                    KEC – Energizing Farms, Empowering Farmers
                  </p>
                  <p className="text-slate-300 text-base sm:text-lg">
                    Because India's green future begins with its soil. 🌱🌾
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCompFour;