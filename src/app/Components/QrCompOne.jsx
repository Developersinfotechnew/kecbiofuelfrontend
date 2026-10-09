"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Sparkles, CheckCircle2, TrendingUp, Lightbulb, ArrowRight, Phone, Users, Leaf } from 'lucide-react';

const QrCompOne = () => {
  const [activeSection, setActiveSection] = useState(null);
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

  const services = [
    { icon: Sparkles, label: "CBG Park Development" },
    { icon: TrendingUp, label: "Project Management" },
    { icon: Leaf, label: "Sustainable Solutions" },
    { icon: CheckCircle2, label: "EPC Services" }
  ];

  const stats = [
    { icon: "📅", value: "2020", label: "Founded" },
    { icon: "⚡", value: "500GW", label: "Clean Energy Goal" },
    { icon: "🏭", value: "5000+", label: "CBG Plants Target" },
    { icon: "⭐", value: "First", label: "CBG Park in India" }
  ];

  const projectImages = [
    {
      url: "/images/pmc5.jpeg",
      label: "CBG PARK DEVELOPMENT"
    },
    {
      url: "/images/pmc15.jpeg",
      label: "PROJECT MANAGEMENT"
    },
    {
      url: "/images/pmc12.jpeg",
      label: "SUSTAINABLE SOLUTIONS"
    },
    {
      url: "/images/pmc14.jpeg",
      label: "EPC SERVICES"
    },

  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-20 bg-gradient-to-br from-green-50 via-green-100 to-green-400 text-gray-900 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm shadow-sm">
                <span className="text-emerald-600 text-xs sm:text-sm font-semibold tracking-wider uppercase">Renewable Energy Revolution</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[55px] font-bold leading-tight ">
                <span className="text-slate-900/70">
                  KEC AGRITECH
                </span>
                <br />
                <div className="flex text-center items-center gap-4">
                  <span className="text-emerald-600">
                    PVT. LTD
                  </span>
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-100"></div>
                </div>


              </h1>

            </div>

            {/* Subtitle */}
            <div className="text-lg sm:text-xl font-semibold text-slate-500">
              ABOUT THE COMPANY
            </div>

            {/* Description Box */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl text-justify">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                KEC Agritech Pvt. Ltd. is one of India's fastest-growing renewable energy enterprises, revolutionizing how the nation produces and consumes energy. Founded in October 2020, KEC is driven by a mission to convert{' '}
                <span className="text-emerald-400 font-semibold">agricultural waste into clean fuel</span>,{' '}
                <span className="text-emerald-400 font-semibold">income, and opportunity</span>. As India moves toward 500 GW of clean energy and 5000+ CBG plants by 2030 under the SATAT initiative, KEC aims to be a key force in this transformation—combining{' '}
                <span className="text-emerald-400 font-semibold">technology, sustainability, and profitability</span>.
                <br /><br />
                KEC is building an ecosystem where farmers, entrepreneurs, and investors collaborate to create an{' '}
                <span className="text-emerald-400 font-semibold">energy-secure and waste-free India</span>, driving sustainable growth across rural communities.
              </p>
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 group shadow-lg hover:shadow-emerald-500/50">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700/50 text-slate-100 hover:bg-slate-800/90 hover:border-emerald-500/50 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg">
                <Phone className="w-5 h-5" />
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Column - Images Grid */}
          <div className="relative">
            {/* Main Grid Container */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - Large Image */}
              <div className="relative rounded-2xl overflow-hidden h-64 group shadow-2xl border border-slate-700/30">
                <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg">
                  <span className="text-emerald-400 text-xs font-semibold">{projectImages[0].label}</span>
                </div>
                <Image
                  src={projectImages[0].url}
                  alt="Project 1"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Top Right - Large Image */}
              <div className="relative rounded-2xl overflow-hidden h-64 group shadow-2xl border border-slate-700/30">
                <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg">
                  <span className="text-emerald-400 text-xs font-semibold">{projectImages[1].label}</span>
                </div>
                <Image
                  src={projectImages[1].url}
                  alt="Project 2"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Middle Left - Medium Image */}
              <div className="relative rounded-2xl overflow-hidden h-56 group shadow-2xl border border-slate-700/30">
                <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg">
                  <span className="text-emerald-400 text-xs font-semibold">{projectImages[2].label}</span>
                </div>
                <Image
                  src={projectImages[2].url}
                  alt="Project 3"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

              </div>

              {/* Bottom Left - Medium Image */}
              <div className="relative rounded-2xl overflow-hidden h-56 group shadow-2xl border border-slate-700/30">
                <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg">
                  <span className="text-emerald-400 text-xs font-semibold">{projectImages[3].label}</span>
                </div>
                <Image
                  src={projectImages[3].url}
                  alt="Project 4"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Bottom Right - Medium Image */}
              {/* <div className="relative rounded-2xl overflow-hidden h-48 group shadow-2xl border border-slate-700/30">
                <Image
                  src={projectImages[2].url}
                  alt="Project 5"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div> */}
            </div>

            {/* Service Cards Grid - Below Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/90 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-emerald-500/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors border border-emerald-500/30">
                    <service.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-slate-100 font-medium text-sm">{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCompOne;