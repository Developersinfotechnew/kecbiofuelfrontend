import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const PmcSectionThree = () => {
  const images = [
    {
      id: 1,
      src: "/images/pmc3.jpeg",
      alt: "Industrial Worker with Safety Equipment",
      category: "Safety Operations"
    },
    {
      id: 2,
      src: "/images/pmc4.jpeg",
      alt: "Construction Safety Management",
      category: "Project Management"
    },
    {
      id: 3,
      src: "/images/pmc14.jpeg",
      alt: "Technical Maintenance Work",
      category: "Technical Services"
    },
    {
      id: 4,
      src: "/images/pmc10.jpeg",
      alt: "Construction Site Operations",
      category: "Site Operations"
    }
  ];

  const keyFeatures = [
    { icon: "🔧", title: "Equipment Management", color: "from-blue-400 to-blue-600" },
    { icon: "📊", title: "Performance Monitoring", color: "from-purple-400 to-purple-600" },
    { icon: "⚡", title: "System Optimization", color: "from-yellow-400 to-orange-500" },
    { icon: "🛡️", title: "Safety Protocols", color: "from-red-400 to-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 right-20 text-2xl text-green-400/30 animate-float">⚙️</div>
        <div className="absolute bottom-32 left-16 text-xl text-blue-400/30 animate-float delay-500">🔩</div>
        <div className="absolute top-1/2 right-8 text-lg text-yellow-400/30 animate-float delay-1000">⚡</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Section - Content */}
          <div className="space-y-8 order-2 lg:order-1">
            
            {/* Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-green-500/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
                  Professional Services
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  OPERATION & MAINTENANCE
                </span>
                <br />
                <span className="text-white/90 text-2xl sm:text-3xl lg:text-4xl font-light">
                  OF PROJECT
                </span>
              </h1>
              
              {/* Animated Underline */}
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="absolute -left-1 top-8 bottom-8 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                
                <p className="text-gray-300 text-lg leading-relaxed pl-6 text-justify">
                  The operation and maintenance of projects play a crucial role in ensuring their 
                  <span className="text-green-400 font-semibold"> long-term success and functionality</span>. 
                  It involves the continuous monitoring, management, and upkeep of various aspects such as 
                  equipment, infrastructure, systems, and processes. Effective operation and maintenance practices are 
                  essential for maximizing the <span className="text-emerald-400 font-semibold">performance, efficiency, and reliability</span> of projects.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
               <Link href="/whyinvestincbgwithkecagritech">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 text-black font-bold bg-gradient-to-r from-green-400 to-emerald-500 rounded-full hover:from-green-300 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25">
                <span>Start Your Project</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              </Link>
                <Link href="/contact">
              <button className="group inline-flex items-center justify-center px-8 py-4 text-green-400 font-semibold bg-transparent border-2 border-green-400/50 rounded-full hover:bg-green-400/10 hover:border-green-400 transition-all duration-300">
                <svg className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Contact Us</span>
              </button>
              </Link>
            </div>
          </div>

          {/* Right Section - Image Gallery */}
          <div className="relative order-1 lg:order-2">
            
            {/* Main Gallery Container */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-green-500/20 transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 ${
                      index % 2 === 0 ? 'mt-0' : 'mt-12'
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-125 transition-transform duration-1000"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                      
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 via-transparent to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 transform -translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-green-400/30">
                        {image.category}
                      </div>
                    </div>
                    
                    {/* Bottom Glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    {/* Scan Line Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                ))}
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 shadow-2xl">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Monitoring
                  </div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-300"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-700"></div>
                  </div>
                </div>
              </div>

              {/* Tech Pattern Overlay */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Bottom Features Bar */}
        <div className="mt-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "99.9%", label: "Uptime", icon: "📈" },
              { value: "24/7", label: "Support", icon: "🛟" },
              { value: "100+", label: "Projects", icon: "🏗️" },
              { value: "15+", label: "Years Exp", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="group text-center space-y-3 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PmcSectionThree;