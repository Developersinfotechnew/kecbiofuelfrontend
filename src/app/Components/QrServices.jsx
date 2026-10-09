import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Lightbulb, Building, Wrench, TrendingUp, Map, IndianRupee, CheckCircle2, Sparkles } from 'lucide-react';

const QrServices = () => {
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
    {
      icon: Lightbulb,
      title: 'Project Management & Feasibility',
      image: '/images/qr1.jpg',
      stats: [
        { label: 'Feasibility Studies Completed', value: '20+', desc: 'for large-scale CBG projects' },
        { label: 'Ongoing PMC Projects', value: '74+', desc: 'under Project Management Consultancy' },
        { label: 'Geographic Reach', value: '42 Districts', desc: 'across 14 states in India' },
      ],
      gradient: 'from-emerald-300 to-teal-300',
      iconBg: 'bg-emerald-300/10',
      iconColor: 'text-emerald-300',
      borderColor: 'border-emerald-300/30',
      hoverBorder: 'hover:border-emerald-300/50',
    },
    {
      icon: Wrench,
      title: 'Engineering, Procurement & Construction (EPC)',
      image: '/images/bannernew14.jpg',
      stats: [
        { label: 'CBG Projects Nationwide', value: '74+', desc: 'managing end-to-end execution' },
        { label: 'Total Project Value', value: '₹1200 Cr+', desc: 'investment across projects' },
        { label: 'Infrastructure Building', value: 'Scalable', desc: 'efficient & profitable CBG production' },
      ],
      gradient: 'from-emerald-300 to-teal-300',
      iconBg: 'bg-teal-300/10',
      iconColor: 'text-teal-300',
      borderColor: 'border-teal-300/30',
      hoverBorder: 'hover:border-teal-300/50',
    },
    {
      icon: Building,
      title: 'CBG Plant Setup – PMC & EPC Expertise',
      image:  "/images/pmc10.jpeg",
      description: 'From concept to commissioning — KEC Agritech provides complete Project Management Consultancy (PMC) and Engineering, Procurement & Construction (EPC) services for individual CBG plants.',
      features: [
        'End-to-end support',
        'Technical excellence',
        'Sustainable profitability',
        'Complete investor support',
      ],
      gradient: 'from-emerald-300 to-teal-300',
      iconBg: 'bg-emerald-300/10',
      iconColor: 'text-emerald-300',
      borderColor: 'border-emerald-300/30',
      hoverBorder: 'hover:border-emerald-300/50',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-16 bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-emerald-300/20 border border-emerald-300/30 rounded-full text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-2">
              OUR SERVICES
            </span>
            <div className='mx-auto flex justify-center mb-2 font-sans items-center text-center'>
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-tight ">
              <div className='flex text-center items-center gap-4'>
                <span className="text-slate-900/70">
                  Our
                </span>
                     <span className="text-emerald-600">
                  Services
                </span>
                {/* <div className="w-6 h-1 bg-gradient-to-r from-emerald-500 to-green-100 mt-2"></div> */}
              </div>
           
            </h1>
          </div>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Comprehensive solutions for CBG project development, management, and execution
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-8 mb-16">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`group bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl border ${service.borderColor} ${service.hoverBorder} overflow-hidden transition-all duration-500 hover:shadow-emerald-500/20 hover:scale-[1.01]`}
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image Section - Takes 2 columns - Order changes based on index */}
                  <div className={`lg:col-span-2 relative overflow-hidden ${idx === 1 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mix-blend-overlay z-10"></div>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={800}
                      height={600}
                      className="w-full max-h-[400px] object-cover min-h-[300px] lg:min-h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Floating Icon */}
                    <div className={`absolute bottom-6 z-30 ${idx === 1 ? 'right-6' : 'left-6'}`}>
                      <div className={`${service.iconBg} backdrop-blur-md rounded-2xl p-4 shadow-2xl border ${service.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className={`w-10 h-10 ${service.iconColor}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Takes 3 columns - Order changes based on index */}
                  <div className={`lg:col-span-3 p-8 sm:p-12 ${idx === 1 ? 'lg:order-1' : ''}`}>
                    <div className="mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-slate-300 text-base leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {service.stats && (
                      <div className="grid sm:grid-cols-3 gap-4">
                        {service.stats.map((stat, statIdx) => (
                          <div
                            key={statIdx}
                            className="relative group/item"
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur opacity-20 group-hover/item:opacity-40 transition-opacity"></div>
                            <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-emerald-300/50 hover:bg-slate-800/70 transition-all duration-300"
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-emerald-300 mt-1 flex-shrink-0" />
                              <p className="text-sm font-semibold text-slate-300 leading-tight">
                                {stat.label}
                              </p>
                            </div>
                            <p className={`text-3xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-1`}>
                              {stat.value}
                            </p>
                            <p className="text-xs text-slate-400">{stat.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {service.features && (
                      <div className="grid sm:grid-cols-2 gap-3 mt-6">
                        {service.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="relative group/item">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur opacity-20 group-hover/item:opacity-40 transition-opacity"></div>
                            <div
                            className="relative bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 hover:border-emerald-300/50 hover:bg-slate-800/70 transition-all duration-300 flex items-center gap-3"
                          >
                            <div className={`${service.iconBg} rounded-full p-2 transition-colors`}>
                              <CheckCircle2 className={`w-5 h-5 ${service.iconColor}`} />
                            </div>
                            <span className="text-slate-100 font-medium text-sm">{feature}</span>
                          </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-300/30 overflow-hidden ">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative overflow-hidden lg:order-2 h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 mix-blend-overlay z-10 h-[200px]"></div>
                <Image
                  alt="Sustainable Energy Future"
                  width={800}
                  height={600}
                  className="w-full object-cover h-full"
                />
             
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-10 relative lg:order-1">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent"></div>
                </div>

                <div className=" relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                    Shaping India's <span className="text-emerald-400">Sustainable Energy</span> Future
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-300 to-teal-300 mb-6"></div>
                </div>
                
                <div className="relative z-10 text-justify">
                  <p className="text-base leading-relaxed mb-4 text-slate-300 text-justify">
                    KEC is building an ecosystem where farmers, entrepreneurs, and investors join hands to create an energy-secure, waste-free India. Through its <span className="font-bold text-emerald-300">CBG Plants</span> and <span className="font-bold text-teal-300">CBG Parks</span>, KEC transforms agricultural residue into renewable fuel and opportunity — helping India meet its clean energy and farmer income goals, while driving sustainable growth across rural communities.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 ">
                    <div className="text-center">
                      <div className="bg-emerald-300/10 backdrop-blur-sm border border-emerald-300/30 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-2 hover:bg-emerald-300/20 transition-colors">
                        <Map className="w-8 h-8 text-emerald-300" />
                      </div>
                      <p className="font-semibold text-sm text-white">Energy-Secure</p>
                      <p className="text-xs text-slate-400">India</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-teal-300/10 backdrop-blur-sm border border-teal-300/30 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-2 hover:bg-teal-300/20 transition-colors">
                        <Lightbulb className="w-8 h-8 text-teal-300" />
                      </div>
                      <p className="font-semibold text-sm text-white">Waste-Free</p>
                      <p className="text-xs text-slate-400">Environment</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-emerald-300/10 backdrop-blur-sm border border-emerald-300/30 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-2 hover:bg-emerald-300/20 transition-colors">
                        <IndianRupee className="w-8 h-8 text-emerald-300" />
                      </div>
                      <p className="font-semibold text-sm text-white">Farmer Income</p>
                      <p className="text-xs text-slate-400">Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrServices;