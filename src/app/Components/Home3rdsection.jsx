"use client";
import React, { useState, useEffect, useRef } from 'react';

const Home3rdsection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
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

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      id: 0,
      icon: "💯",
      title: "High Purity Output",
      description: "Our process ensures top-grade Bio-CNG, Bio-Diesel, and Ethanol with consistent calorific value and purity.",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 1,
      icon: "🔁",
      title: "Sustainable Process",
      description: "Leveraging waste-to-energy tech that minimizes emissions and supports circular economy goals.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: 2,
      icon: "🌍",
      title: "Nationwide Scalability",
      description: "74+ PMC, EPC, Technology Transfer, Operation & Maintenance. Launch First CBG Park, Bulandhshar in 2025 & Plant to Establishing 15 CBG Park till 2026-27.",
      color: "from-teal-400 to-green-500"
    },
    {
      id: 3,
      icon: "👷",
      title: "Farmer & Industry Friendly",
      description: "Enables rural empowerment through agri-waste buyback, local job creation & PPP-led development.",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-6 sm:py-10 bg-gradient-to-br from-green-50 via-green-100 to-green-400 overflow-hidden font-sans">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-slide-in-up { animation: slideInUp 0.6s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-6 w-24 h-24 sm:w-32 sm:h-32 bg-green-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-6 w-32 h-32 sm:w-48 sm:h-48 bg-emerald-200/15 rounded-full blur-3xl animate-pulse-slow delay-200"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-teal-200/10 rounded-full blur-3xl animate-pulse-slow delay-400"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-10 ${isVisible ? 'animate-slide-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-green-100 mb-4 sm:mb-6 animate-glow">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">Our Features</span>
            <div className="w-6 sm:w-8 h-px bg-green-300"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
            Key Features of <span className='text-green-600'>KEC Bio-Fuel</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w- mx-auto font-semibold">
            Powering a Green Revolution through innovative sustainable energy solutions
          </p>
        </div>

        {/* Main Features */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-6 items-center">

            {/* Left Features */}
            <div className="space-y-6 sm:space-y-8">
              {features.slice(0, 2).map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isVisible ? 'animate-slide-in-left' : 'opacity-0'
                  } ${index === 1 ? 'delay-200' : ''} ${
                    activeFeature === feature.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                >
                  <div className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'border-green-300 shadow-xl bg-white/90 animate-glow'
                      : 'border-gray-100 hover:border-green-200'
                  }`}>
                    {activeFeature === feature.id && (
                      <div className="absolute inset-0 shimmer-effect rounded-2xl pointer-events-none"></div>
                    )}
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                        activeFeature === feature.id ? 'scale-110 rotate-3 animate-float' : 'group-hover:scale-105'
                      }`}>
                        <span className="text-xl sm:text-2xl">{feature.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-base sm:text-lg font-bold mb-2 transition-colors duration-300 ${
                          activeFeature === feature.id ? 'text-green-700' : 'text-gray-900 group-hover:text-green-600'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-[14px] leading-relaxed text-justify font-inter">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Video */}
            <div className={`relative flex justify-center my-6 md:my-0 ${isVisible ? 'animate-scale-in delay-300' : 'opacity-0'}`}>
              <div className="relative group w-full max-w-sm sm:max-w-md">
                <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                <div className="relative bg-white/60 backdrop-blur-sm px-2 rounded-2xl sm:rounded-3xl shadow-xl border border-green-100/50">
                  <video
                    src="/images/home-section-two.mp4"
                    aria-label="Bio-Fuel Illustration"
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-contain transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg text-xs sm:text-sm font-semibold animate-glow">
                  225+ Plants Target till 2026-2027
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="space-y-6 sm:space-y-8">
              {features.slice(2, 4).map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group cursor-pointer transition-all duration-500 ${
                    isVisible ? 'animate-slide-in-right' : 'opacity-0'
                  } ${index === 1 ? 'delay-200' : ''} ${
                    activeFeature === feature.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                >
                  <div className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'border-green-300 shadow-xl bg-white/90 animate-glow'
                      : 'border-gray-100 hover:border-green-200'
                  }`}>
                    {activeFeature === feature.id && (
                      <div className="absolute inset-0 shimmer-effect rounded-2xl pointer-events-none"></div>
                    )}
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
                        activeFeature === feature.id ? 'scale-110 rotate-3 animate-float' : 'group-hover:scale-105'
                      }`}>
                        <span className="text-xl sm:text-2xl">{feature.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-base sm:text-lg font-bold mb-2 transition-colors duration-300 ${
                          activeFeature === feature.id ? 'text-green-700' : 'text-gray-900 group-hover:text-green-600'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-[14px] leading-relaxed text-justify font-inter">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className={`mt-16 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-green-100 ${
          isVisible ? 'animate-slide-in-up delay-400' : 'opacity-0'
        } hover:shadow-xl transition-shadow duration-300`}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-4 animate-float">🚀 Technology</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-dm">
              Our technology efficiently transforms biomass into valuable biofuels and sustainable energy sources like Bio-CBG, Bio-Diesel, Ethanol, Hydrogen, and Green Ammonia through advanced fermentation, gasification, and purification systems...
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-10 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-green-100 ${
          isVisible ? 'animate-slide-in-up delay-500' : 'opacity-0'
        } hover:shadow-xl transition-shadow duration-300`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: '74+', label: 'EPC, PMC, Tech Transfer' },
              { value: '1154+', label: 'CBG Plant Order Book' },
              { value: '16+', label: 'States Coverage' },
              { value: '2026-2027', label: 'Target Timeline' }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-xl sm:text-3xl font-bold text-green-700 mb-1 transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home3rdsection;