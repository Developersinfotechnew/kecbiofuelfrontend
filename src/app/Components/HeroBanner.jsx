"use client"

import React, { useState, useEffect } from 'react';
import { Leaf, Wind, Sun, Zap } from 'lucide-react';

const HeroBanner = ({ backgroundImage, children, height = 'min-h-[590px]' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative ${height} w-full overflow-hidden`}>
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 " />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Dynamic gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Geometric shapes */}
       
      </div>

      {/* Main Content */}
      <div className="absolute z-10 flex items-center min-h-screen px-6 lg:px-12 top-10 left-2">
        <div className="max-w-7xl mx-auto w-full sm:mt-36 pb-36 sm:pb-0">
          {children}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgba(34, 197, 94, 0.1)"
          />
        </svg>
      </div>
    </div>
  );
};

// Example Usage Component showing how to use it with your content
const ExampleUsage = () => {
  return (
    <div className="space-y-8 ">
      {/* Your Blog Page Example */}
      <HeroBanner backgroundImage="/images/bannernew2.png">
        <div className="text-center">
          <div className="bg-black/20 rounded-xl px-8 py-6 max-w-lg mx-auto text-center shadow-2xl space-y-4">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Our <span className="text-green-400">Blog</span>
            </h1>

            {/* Decorative Line */}
            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>

            {/* Subtitle */}
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
              Shaping the future with sustainable energy innovations.
            </p>

            {/* CTA Button */}
            <button className="px-8 py-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group">
              <span className="flex items-center justify-center gap-2">
                Explore Our Vision
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>
        </div>
      </HeroBanner>

      {/* About Page Example */}
      <HeroBanner backgroundImage="/images/about.jpg" height="h-[600px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
              <Leaf className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium text-green-200">About Our Mission</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                Sustainable
              </span>
              <span className="block text-white">Energy</span>
              <span className="block text-green-300">Solutions</span>
            </h1>

            <p className="text-xl text-green-100 font-light leading-relaxed">
              Leading the renewable energy revolution with innovative technologies that power a cleaner future.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300">
                Learn More
              </button>
              <button className="px-8 py-4 border-2 border-green-300 text-green-300 rounded-full font-semibold hover:bg-green-300 hover:text-green-900 transition-all duration-300">
                Our Story
              </button>
            </div>
          </div>

          {/* Right Content - Energy Visualization */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-80 rounded-3xl bg-gradient-to-tr from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 p-8">
              {/* Wind Turbine Animation */}
              <div className="absolute bottom-16 left-12">
                <div className="w-2 h-20 bg-gray-300 mx-auto" />
                <div className="relative w-12 h-12 mx-auto -mt-6">
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                    {[0, 120, 240].map((rotation) => (
                      <div
                        key={rotation}
                        className="absolute w-6 h-0.5 bg-white origin-right"
                        style={{
                          transform: `rotate(${rotation}deg) translateX(-50%)`,
                          top: '50%',
                          left: '50%',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Solar Panel Animation */}
              <div className="absolute top-8 right-8 w-12 h-8 bg-blue-500 rounded opacity-80 animate-pulse" style={{ animationDuration: '2s' }}>
                <div className="grid grid-cols-3 gap-px h-full p-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-blue-600 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Central Energy Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroBanner>

      {/* Contact Page Example */}
      <HeroBanner backgroundImage="/images/contact.jpg" height="h-[500px]">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Get In <span className="text-green-400">Touch</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Ready to join the sustainable energy revolution? Let's discuss how we can power your future with clean, renewable solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Contact Us Today
              </button>
              <button className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </HeroBanner>
    </div>
  );
};

export default HeroBanner;