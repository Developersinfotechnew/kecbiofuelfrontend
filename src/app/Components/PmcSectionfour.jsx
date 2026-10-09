import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const PmcSectionFour = () => {
  const images = [
    {
      id: 1,
      src: "/images/pmc13.jpg",
      alt: "Industrial Water Treatment Facility",
      category: "Treatment Plants",
      tag: "ETP"
    },
    {
      id: 2,
      src: "/images/pmc14.jpg",
      alt: "Modern Industrial Equipment",
      category: "Processing Units",
      tag: "Biogas"
    },
    {
      id: 3,
      src: "/images/pmc15.jpg",
      alt: "Sewage Treatment Infrastructure",
      category: "Infrastructure",
      tag: "STP"
    },
    {
      id: 4,
      src: "/images/pmc16.jpg",
      alt: "Advanced Treatment Systems",
      category: "Advanced Systems",
      tag: "Upgrade"
    }
  ];

  const services = [
    {
      icon: "🔄",
      title: "Plant Revamping",
      desc: "Complete system overhaul",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "⚡",
      title: "Performance Boost",
      desc: "Efficiency optimization",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🛠️",
      title: "System Upgrade",
      desc: "State-of-the-art solutions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📊",
      title: "Process Analysis",
      desc: "Data-driven improvements",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/2 w-64 h-px bg-green-400"></div>
          <div className="absolute top-1/2 left-1/4 w-px h-32 bg-green-400"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-px bg-blue-400"></div>
        </div>

        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-20 text-2xl text-green-400/20 animate-float">🔬</div>
        <div className="absolute bottom-32 right-16 text-xl text-blue-400/20 animate-float delay-500">⚙️</div>
        <div className="absolute top-2/3 left-8 text-lg text-purple-400/20 animate-float delay-1000">🧪</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Section - Image Gallery */}
          <div className="relative">

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-green-500/25 transition-all duration-700 transform hover:-translate-y-5 ${index % 2 === 0 ? 'mt-0 hover:-rotate-2' : 'mt-8 lg:mt-12 hover:rotate-2'
                    }`}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  {/* Image Container with Multiple Overlays */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="w-full h-44 sm:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Dark Base Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Color Accent Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-blue-500/0 group-hover:from-green-500/30 group-hover:via-emerald-500/20 group-hover:to-blue-500/30 transition-all duration-700"></div>

                    {/* Tech Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Floating Category Tag */}
                  <div className="absolute top-4 left-4 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                    <div className="bg-black/90 backdrop-blur-sm text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-400/50">
                      {image.tag}
                    </div>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3">
                      <p className="text-white text-sm font-semibold text-center">{image.category}</p>
                    </div>
                  </div>

                  {/* Glow Border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-400/50 transition-all duration-500"></div>

                  {/* Laser Scan Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 delay-300"></div>
                </div>
              ))}
            </div>

            {/* 3D Floating Element */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl opacity-30 animate-spin" style={{ animationDuration: '20s' }}></div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-8">

            {/* Header Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-400/30">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
                </div>
                <span className="text-green-400 text-sm font-bold tracking-wider uppercase">
                  Specialized Solutions
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent block">
                  IMPROVE / REVAMPING / UPGRADING
                </span>
                <span className="text-white/90 text-xl sm:text-2xl lg:text-xl font-light block mt-2">
                  EXISTING BIOGAS PLANTS, ETP & STP
                </span>
              </h1>

              {/* Animated Progress Bar */}
              {/* <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div> */}
            </div>

            {/* Description Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -left-1 top-8 bottom-8 w-1 bg-gradient-to-b from-green-400 via-emerald-400 to-green-500 rounded-full"></div>

                <p className="text-gray-300 text-lg leading-relaxed pl-6 text-justify">
                  We specialise in improving, revamping, and upgrading existing biogas plants,
                  <span className="text-green-400 font-bold"> Effluent Treatment Plants (ETP)</span>, and
                  <span className="text-blue-400 font-bold"> Sewage Treatment Plants (STP)</span>.
                  Our team of experts is highly experienced and skilled in identifying the areas that require
                  enhancement and implementing <span className="text-emerald-400 font-bold">state-of-the-art solutions</span> to
                  optimize the performance of these facilities.
                </p>

                {/* Floating Accent */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-ping"></div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      {service.icon}
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">{service.title}</h3>
                    <p className="text-gray-400 text-xs font-sans">{service.desc}</p>
                  </div>

                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="space-y-6 pt-6">
              {/* Main CTA */}
              <Link href="/contact">
                <button className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 mb-4 text-black font-bold text-lg bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-2xl hover:from-green-300 hover:via-emerald-300 hover:to-green-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50">
                  <span className="relative z-10">Get Expert Consultation</span>
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>

                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </button>
              </Link>

              {/* Secondary Actions */}
              <div className="flex flex-wrap gap-3">
                <Link href="/cbgdownload">
                  <button className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-300 group">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Download Brochure</span>
                  </button>
                </Link>
                <Link
                  href="https://www.youtube.com/@KisanExperienceCentre"
                  target="_blank"
                >
                  <button className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-semibold">Watch Demo</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Achievement Banner */}
        <div className="mt-20 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl border border-green-400/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Plants Upgraded", icon: "🏭", color: "text-green-400" },
              { value: "95%", label: "Efficiency Gain", icon: "📈", color: "text-blue-400" },
              { value: "Zero", label: "Downtime", icon: "⚡", color: "text-yellow-400" },
              { value: "24/7", label: "Monitoring", icon: "👁️", color: "text-purple-400" }
            ].map((stat, index) => (
              <div key={index} className="group space-y-3 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
                <div className={`w-12 h-1 ${stat.color.replace('text-', 'bg-')} rounded-full mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PmcSectionFour;