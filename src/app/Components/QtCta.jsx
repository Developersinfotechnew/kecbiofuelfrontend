import React from 'react';
import { Phone, Mail, MapPin, Globe, Rocket, Sparkles, ArrowRight } from 'lucide-react';

const QrCta = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Call Us',
      values: ['+91 93197 19115', '+91 92893 00184', '+91 82879 33634'],
      href: 'tel:+919319719115',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Globe,
      label: 'Visit Website',
      values: ['www.kecbiofuel.com'],
      href: 'https://www.kecbiofuel.com',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      icon: Mail,
      label: 'Email Us',
      values: ['info@kecbiofuel.com'],
      href: 'mailto:info@kecbiofuel.com',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      values: ['KEC Agritech Headquarters', 'New Delhi, India'],
      href: '#',
      gradient: 'from-teal-400 to-emerald-500'
    }
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-300/30 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-tr-full"></div>
              
              <div className="relative p-8 sm:p-12 lg:p-16">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-emerald-300/10 backdrop-blur-sm border border-emerald-300/30 rounded-full px-6 py-3 mb-6">
                    <Rocket className="w-5 h-5 text-emerald-300 animate-pulse" />
                    <span className="text-emerald-300 font-bold text-sm tracking-wider uppercase">Join the Revolution</span>
                    <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
                    <span className="text-white">Join the </span>
                    <span className="text-emerald-400">Green Revolution.</span>
                    <br />
                    <span className="text-white">Partner with </span>
                    <span className="text-emerald-400">KEC Today.</span>
                  </h2>
                  
                  <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                    Let's build a cleaner, profitable, and sustainable tomorrow — together. 🌱
                  </p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {contactInfo.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="relative group/card">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover/card:opacity-40 transition-opacity duration-300"></div>
                        
                        <a 
                          href={item.href}
                          className="relative block bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-300/50 transition-all duration-300 hover:-translate-y-1 h-full"
                        >
                          <div className={`inline-flex p-3 bg-emerald-500  rounded-xl mb-4 shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <h3 className="text-white font-bold text-lg mb-3">
                            {item.label}
                          </h3>
                          
                          <div className="space-y-1">
                            {item.values.map((value, valueIdx) => (
                              <p key={valueIdx} className="text-slate-300 text-sm leading-relaxed">
                                {value}
                              </p>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2 text-emerald-300 text-sm font-semibold opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <span>Connect</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action */}
                <div className="text-center">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-emerald-300/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500 rounded-full animate-pulse">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-lg">Ready to get started?</p>
                        <p className="text-slate-300 text-sm">Transform waste into wealth today</p>
                      </div>
                    </div>
                    
                    <button className="relative group/btn px-8 py-4 bg-emerald-500 rounded-xl font-bold text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                      <span className="relative z-10 flex items-center gap-2">
                        Get In Touch
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* India Flag Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-600 text-sm">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-semibold">Proudly serving India's green energy mission</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCta;