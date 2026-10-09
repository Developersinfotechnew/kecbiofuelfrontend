'use client';

import { useEffect, useState } from 'react';

const About3rdsection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, energy: 0, lives: 0 });
  const [envCounts, setEnvCounts] = useState({ co2: 0, efficiency: 0, countries: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);

        setCounts({
          projects: Math.floor(500 * easeOutQuad),
          energy: Math.floor(50 * easeOutQuad),
          lives: Math.floor(100 * easeOutQuad),
        });

        setEnvCounts({
          co2: Math.floor(15000 * easeOutQuad),
          efficiency: Math.floor(75 * easeOutQuad),
          countries: Math.floor(25 * easeOutQuad),
        });

        if (step >= steps) {
          clearInterval(interval);
          setCounts({ projects: 500, energy: 50, lives: 100 });
          setEnvCounts({ co2: 15000, efficiency: 75, countries: 25 });
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section id="stats-section" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 animate-bounce-subtle">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   Our Impact in{' '} <span className='text-green-600'>Numbers</span>
              </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transforming communities through sustainable energy solutions. Here's how we're making a difference across the globe.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Live Statistics</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ),
              count: `${counts.projects}+`,
              label: 'Projects Comissioned',
              note: 'Across 25+ countries worldwide',
              barColor: 'from-green-400 to-green-600',
              width: '85%',
            },
            {
              icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              ),
              count: `${counts.energy}MW`,
              label: 'Clean Energy Generated',
              note: 'Renewable power capacity',
              barColor: 'from-blue-400 to-blue-600',
              width: '75%',
            },
            {
              icon: (
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              ),
              count: `${counts.lives}K+`,
              label: 'Lives Impacted',
              note: 'People with access to clean energy',
              barColor: 'from-teal-400 to-teal-600',
              width: '90%',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-transform duration-300">{stat.icon}</div>
              </div>
              <div className="text-4xl font-bold text-gray-800 transition-all duration-300 hover:scale-110">{stat.count}</div>
              <div className="text-gray-600 text-base font-medium">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.note}</div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.barColor} transition-all duration-1000 animate-shimmer`}
                  style={{ width: isVisible ? stat.width : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Impact */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">Environmental Impact</h3>
            <p className="text-sm sm:text-base text-transparent bg-gradient-to-r from-amber-700 via-orange-500 to-amber-800 bg-clip-text animate-gradient">Contributing to a sustainable future</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-green-400">{envCounts.co2.toLocaleString()}T</div>
              <div className="text-gray-300 text-sm">CO₂ Emissions Reduced</div>
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-blue-400">{envCounts.efficiency}%</div>
              <div className="text-gray-300 text-sm">Energy Efficiency Increase</div>
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-2xl font-bold text-teal-400">{envCounts.countries}+</div>
              <div className="text-gray-300 text-sm">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default About3rdsection;