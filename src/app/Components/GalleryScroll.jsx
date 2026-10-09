"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, Award, Star, Calendar, ArrowRight } from 'lucide-react';

const ModernGallery = ({ 
  title = "ACHIEVEMENTS", 
  titleColor = "from-emerald-400 to-cyan-400", 
  subtitle = "& AWARDS", 
  subtitleColor = "from-orange-400 to-pink-400", 
  icon = "🏆",
  data = [
    {
      id: 1,
      title: "Innovation Excellence Award",
      subtitle: "Tech Leadership 2024",
      category: "Innovation",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1603415526960-f9e1264de6b1?auto=format&fit=crop&w=1600&q=80",
      description: "Recognized for groundbreaking contributions to artificial intelligence and machine learning technologies that transformed industry standards.",
      impact: "500K+ users affected",
      year: "2024"
    },
    {
      id: 2,
      title: "Best Digital Solution",
      subtitle: "Global Tech Summit",
      category: "Technology",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1581090700227-1e8f2f96c536?auto=format&fit=crop&w=1600&q=80",
      description: "Awarded for developing cutting-edge digital solutions that revolutionized user experience across multiple platforms.",
      impact: "1M+ downloads",
      year: "2024"
    },
    {
      id: 3,
      title: "Sustainability Champion",
      subtitle: "Green Innovation Awards",
      category: "Environment",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80",
      description: "Honored for creating eco-friendly technology solutions that reduced carbon footprint by 40% across operations.",
      impact: "40% carbon reduction",
      year: "2024"
    }
  ],
  backgroundColor = "from-slate-900 via-purple-900 to-slate-900"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, isHovered, data.length]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">No achievements to display</div>
      </div>
    );
  }

  const currentItem = data[currentIndex];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundColor} relative overflow-hidden`}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-white/10 animate-pulse"
              style={{ animationDelay: `${i * 0.01}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16 relative">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-emerald-400">
              {title}<br />{subtitle}
            </h2>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
              <span className="text-6xl animate-bounce">{icon}</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/50"></div>
            </div>
          </div>

          <div 
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    width={800}
                    height={600}
                    className="w-full h-96 lg:h-[600px] object-cover transition-all duration-1000"
                    style={{
                      transform: `translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`
                    }}
                  />

                  {/* Navigation */}
                  <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={prevSlide} className="bg-white/20 rounded-full p-4 hover:scale-110">
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={nextSlide} className="bg-white/20 rounded-full p-4 hover:scale-110">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{currentItem.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-yellow px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {currentItem.impact}
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-black/50 text-white px-4 py-2 rounded-full text-lg font-bold">
                      {currentItem.year}
                    </div>
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center mt-8 space-x-3">
                  {data.map((item, index) => (
                    <button key={index} onClick={() => goToSlide(index)}>
                      <div className={`w-4 h-4 rounded-full ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-md scale-125'
                          : 'bg-white/30 hover:bg-white/50'
                      } transition-all duration-300`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:pl-12 space-y-8">
                <h3 className="text-4xl lg:text-5xl font-black text-orange-400">{currentItem.title}</h3>
                <p className="text-2xl text-emerald-400 font-bold">{currentItem.subtitle}</p>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{currentItem.date}</span>
                </div>
                <p className="text-gray-300 text-lg">{currentItem.description}</p>
                <button className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
                  <span className="flex items-center space-x-2">
                    <span>EXPLORE MORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-2">
                    {data.map((_, index) => (
                      <div key={index} className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-10 bg-gradient-to-r from-emerald-400 to-cyan-400' 
                          : 'w-3 bg-white/20'
                      }`} />
                    ))}
                  </div>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
                  >
                    {isAutoPlay ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default ModernGallery;
