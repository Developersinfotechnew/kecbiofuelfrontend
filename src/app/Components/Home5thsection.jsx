'use client';

import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';

const Home5thsection = () => {
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

  return (
    <div ref={sectionRef} className="relative w-full h-[400px] overflow-hidden">
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7),
                        0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(34, 197, 94, 0),
                        0 0 0 30px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0),
                        0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5),
                        0 0 40px rgba(34, 197, 94, 0.3);
          }
          50% { 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.8),
                        0 0 60px rgba(34, 197, 94, 0.5);
          }
        }
        .animate-kenburns {
          animation: kenburns 20s ease-in-out infinite alternate;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        .animate-slide-in-down {
          animation: slideInDown 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.8) 0%,
            rgba(255,255,255,1) 50%,
            rgba(255,255,255,0.8) 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 animate-kenburns">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/home5thsection.jpg')"
          }}
        />
      </div>

      {/* Animated particles/orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400/60 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-green-300/50 rounded-full animate-float delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-float delay-400"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-green-400/50 rounded-full animate-float delay-300"></div>
        <div className="absolute top-1/3 right-10 w-2 h-2 bg-white/40 rounded-full animate-float delay-500"></div>
      </div>

      {/* Dark overlay with fade-in */}
      <div className={`absolute inset-0 bg-black/50 z-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div>
          {/* Play Button with pulse rings */}
          <div className={`flex justify-center mb-6 items-center ${isVisible ? 'animate-scale-in delay-200' : 'opacity-0'}`}>
            <div className="relative">
              {/* Outer pulsing rings */}
              <div className="absolute inset-0 rounded-full animate-pulse-ring"></div>
              
              {/* Play button */}
              <Link   href="https://www.youtube.com/@KisanExperienceCentre" target="_blank">
              <button className="relative w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 animate-glow group">
                <Play className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform duration-300" fill="white" />
              </button>
              </Link>
            </div>
          </div>

          {/* Heading with slide animation */}
          <h2 className={`text-white text-xl md:text-4xl lg:text-5xl font-bold mb-4 ${isVisible ? 'animate-slide-in-down delay-300' : 'opacity-0'}`}>
            Biofuel Innovation{' '}
            <span className="text-green-400 shimmer-text inline-block">
              for a Greener Tomorrow
            </span>
          </h2>

          {/* Description with slide up animation */}
          <p className={`text-gray-200 max-w-2xl mx-auto text-sm md:text-base font-sans leading-relaxed ${isVisible ? 'animate-slide-in-up delay-500' : 'opacity-0'}`}>
            Advancing clean energy through sustainable biofuels that reduce emissions, empower rural economies,
            and support a circular future for all.
          </p>

          {/* Decorative line underneath */}
          <div className={`mt-6 flex justify-center ${isVisible ? 'animate-slide-in-up delay-600' : 'opacity-0'}`}>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
    </div>
  );
};

export default Home5thsection;