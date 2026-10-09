import React from 'react';

const StatisticsSection = () => {
  const stats = [
    {
      number: "110+",
      label: "Countries Served",
      description: "Global reach in project delivery",
      icon: "🌍"
    },
    {
      number: "₹1M+",
      label: "Project Value",
      description: "Managing multi-million dollar projects",
      icon: "💰"
    },
    {
      number: "20+",
      label: "Years Experience",
      description: "Trusted expertise in the industry",
      icon: "⭐"
    },
    {
      number: "₹10 Cr",
      label: "CFA Limit",
      description: "Maximum Central Financial Assistance",
      icon: "🏆"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10 w-[88%] mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-1">
              <span className="text-sm font-medium text-white/90">Our Achievement</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold mb-1 text-white leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-green-200">Impact</span>
            </h2>
            <p className="text-base font-bold font-sans text-white/80 max-w-2xl mx-auto leading-relaxed">
              Delivering excellence across India and beyond with measurable results
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-900/20">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Number */}
                  <div className="text-5xl font-bold mb-3 text-white group-hover:text-yellow-200 transition-colors duration-300">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-lg font-semibold mb-2 text-white/95">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm font-sans text-white/70 leading-relaxed">
                    {stat.description}
                  </div>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-green-300 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom accent */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/80">Trusted by organizations worldwide</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default StatisticsSection;