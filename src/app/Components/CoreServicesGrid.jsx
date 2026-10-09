import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle, Zap, Leaf, Droplets, Factory, Recycle, Sparkles } from 'lucide-react';

const CoreServicesGrid = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Renewable Energy",
      description: "Bio-CNG, H2O, Ethanol 1G & 2G, LNG & H2O, Bio-Diesel solutions",
      features: ["Bio-CNG Plants", "Ethanol Production", "Bio-Diesel Manufacturing", "Solar Energy Systems"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-teal-50",
      shadowColor: "shadow-green-200",
      cardBg: "bg-gradient-to-br from-green-50 to-emerald-100"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Electric Solutions",
      description: "EV charging stations and electric vehicle infrastructure",
      features: ["EV Charging Stations", "Electric Vehicle Solutions", "Grid Integration", "Smart Charging Systems"],
      gradient: "from-green-600 to-teal-500",
      bgGradient: "from-green-50 to-teal-50",
      shadowColor: "shadow-green-300",
      cardBg: "bg-gradient-to-br from-green-100 to-teal-50"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Water Treatment",
      description: "Comprehensive water treatment solutions for various applications",
      features: ["Drinking Water Treatment", "Industrial Effluent Treatment", "Sewage Treatment Plants", "Hydroponics Systems"],
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      shadowColor: "shadow-teal-200",
      cardBg: "bg-gradient-to-br from-teal-50 to-cyan-100"
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Food Processing",
      description: "Advanced food processing and dairy farming solutions",
      features: ["Milk Processing", "Dairy Farming", "Food Manufacturing", "Organic Fertilizer"],
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      shadowColor: "shadow-emerald-200",
      cardBg: "bg-gradient-to-br from-emerald-50 to-green-100"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Project Models",
      description: "Flexible business models for project implementation",
      features: ["Turnkey Solutions", "BOOT Model", "RESCO Model", "EPC Services"],
      gradient: "from-lime-500 to-green-500",
      bgGradient: "from-lime-50 to-green-50",
      shadowColor: "shadow-lime-200",
      cardBg: "bg-gradient-to-br from-lime-50 to-green-100"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Sustainable Solutions",
      description: "Comprehensive environmental and sustainability consulting services",
      features: ["Environmental Impact Assessment", "Carbon Footprint Analysis", "Sustainability Consulting", "Green Building Solutions"],
      gradient: "from-green-700 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      shadowColor: "shadow-green-300",
      cardBg: "bg-gradient-to-br from-green-100 to-emerald-50"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden ">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 ">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(148,163,184,0.1) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full opacity-60 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-60 animate-pulse delay-2000"></div>

      <div className="relative container mx-auto px-4 w-[85%]">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block ">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl shadow-lg shadow-slate-300/50 mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
              Core Services
            </h2>
            
            <p className="text-sm font-bold text-slate-600 max-w-3xl mx-auto leading-relaxed">
              End-to-end solutions across multiple industries and business models
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative bg-gray-100 shadow-6xl border-xl border-white/500 backdrop-blur-sm p-8 rounded-3xl border border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  hoveredCard === index ? 'scale-105 shadow-2xl' : ''
                } ${service.shadowColor} hover:shadow-xl`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enhanced Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Icon Container */}
                <div className={`relative mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                  {service.title}
                </h3>
                1
                {/* <p className="text-slate-600 font-semibold leading-relaxed mb-6 group-hover:text-slate-700 transition-colors text-sm w-[70%] ">
                  {service.description}
                </p> */}
                
                {/* Features List */}
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700 group-hover:text-slate-800 transition-colors font-sans">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
                
                {/* Bottom Border Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`}></div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-800 text-white font-semibold rounded-full shadow-lg shadow-slate-300/50 hover:shadow-slate-400/50 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Explore All Services</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServicesGrid;