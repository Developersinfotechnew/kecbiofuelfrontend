import React, { useState } from "react";
import { ArrowRight, CheckCircle, Zap, Factory, Building2, Target, Users, Award } from 'lucide-react';

const PMCServicesSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const pmcFeatures = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Project Inception to Completion",
      description: "Complete supervision and management of construction projects from start to finish",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Expert Supervision",
      description: "Experienced professionals providing independent consultation and project direction",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Construction Sector Focus",
      description: "Specialized expertise in construction and infrastructure development",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "End-to-End Solutions",
      description: "Comprehensive project management covering all phases and requirements",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-2000"></div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-block mb-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/25 mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-2">
              KEC Services
            </h2>
            
            <div className="relative">
              {/* <p className="text-2xl text-blue-200 mb-6 font-light">Project Management Consultancy</p> */}
              {/* <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div> */}
            </div>
            
            <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed mt-2 font-sans">
              PMC is crucial to the construction sector. This provides a strong foundation for the expertise 
              provided by independent companies or individuals who gain the knowledge and experience. 
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pmcFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/20 cursor-pointer ${
                  activeCard === index ? 'scale-105 bg-white/20' : ''
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Icon Container */}
                <div className={`relative mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 font-sans leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-blue-400" />
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Learn More About Our Services</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PMCServicesSection;