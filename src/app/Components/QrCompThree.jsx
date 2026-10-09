"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Lightbulb, Sprout, Sparkles, Leaf } from 'lucide-react';

const QcompThree = () => {
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 sm:py-28 bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
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
        {/* Enhanced Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative px-8 py-3 bg-white/90 backdrop-blur-md border-2 border-emerald-400/50 rounded-full shadow-lg">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                OUR VISION
                <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Enhanced Image */}
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
              <Image
                src="/images/bannernew2.png"
                alt="KEC Vision"
                width={800}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent"></div>
              
              {/* Floating badge on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-emerald-200/50 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-emerald-900 font-bold text-sm">Sustainable Agriculture</p>
                    <p className="text-emerald-700 text-xs">Building Tomorrow's Farms Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Content */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
            
            <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-10 sm:p-12 border border-cyan-500/30 shadow-2xl">
              {/* Decorative corner accents */}
          
              
              <div className="relative">
                <h3 className="text-3xl sm:text-[34px] font-black text-emerald-400 mb-8 flex items-center gap-3">
                  <div className="p-3 bg-emerald-400 rounded-2xl shadow-lg">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  About Our Core Vision
                </h3>
                
                <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-6 font-light">
                  KEC stands at the intersection of{' '}
                  <span className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-bold">
                    agriculture, innovation, and sustainability
                  </span>{' '}
                  — creating value for farmers, investors, and the environment.
                </p>

                {/* Enhanced highlight box */}
                <div className="relative group/box">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-40 group-hover/box:opacity-60 transition-opacity duration-300"></div>
                  
                  <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/40 shadow-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg flex-shrink-0">
                        <Sprout className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text font-black text-xl sm:text-2xl leading-tight">
                        KEC – Energizing Farms, Empowering Farmers
                      </p>
                    </div>
                    <p className="text-slate-300 text-base sm:text-lg font-light pl-16">
                      Because India's green future begins with its soil. 🌱🌾
                    </p>
                    
                    {/* Decorative line */}
                    <div className="mt-6 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default QcompThree;