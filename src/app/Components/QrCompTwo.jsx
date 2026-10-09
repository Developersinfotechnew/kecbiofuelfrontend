"use client";
import React from "react";

const QrCompTwo = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-green-50 via-green-100 to-green-400 text-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-400 text-gray-800 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Section - Core Vision */}
              <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-emerald-900/80 text-white relative overflow-hidden border-r border-slate-700/50">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-orange-500 to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-orange-500 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs font-semibold text-orange-400 tracking-wider uppercase">
                      Our Foundation
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                    About Our <span className="text-orange-500">Core Vision</span>
                  </h2>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                    KEC stands at the intersection of{" "}
                    <span className="text-emerald-400 font-semibold">agriculture</span>,{" "}
                    <span className="text-orange-400 font-semibold">innovation</span>, and{" "}
                    <span className="text-emerald-400 font-semibold">sustainability</span>{" "}
                    — creating value for farmers, investors, and the environment.
                  </p>

                  <div className="mt-8 pt-8 border-t border-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                          </svg>
                          KEC – Energizing Farms, Empowering Farmers
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base italic">
                          Because India's green future begins with its soil. 🌾✨
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Contact Info */}
              <div className="p-8 sm:p-12 bg-slate-900/40 backdrop-blur-sm">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-6">
                    Get In Touch
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Contact Information
                  </h3>
                  <p className="text-slate-400">We'd love to hear from you</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Phone Numbers */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Phone Numbers</h4>
                        <div className="space-y-1 text-slate-400">
                          <p className="text-sm">+91 93197 19115</p>
                          <p className="text-sm">+91 92893 00184</p>
                          <p className="text-sm">+91 82879 33634</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500/50 hover:bg-slate-800/70 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Website</h4>
                        <a 
                          href="http://www.kecbiofuel.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-orange-400 hover:text-orange-300 font-medium underline underline-offset-2"
                        >
                          www.kecbiofuel.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Office Address</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          429, 4th Floor, Amsal Chamber 2,<br />
                          Metro Station Gate No.3,<br />
                          Bikaji Cama Place, New Delhi-110066
                        </p>
                      </div>
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

export default QrCompTwo;