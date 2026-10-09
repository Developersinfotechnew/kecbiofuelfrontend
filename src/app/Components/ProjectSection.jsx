import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, Leaf, Zap, Recycle, Award, Github, ExternalLink, Play, Pause, BarChart3, Users, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

export default function ProjectSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image slider data
  const projectImages = [
    {
      src: '/images/pmc6.jpeg',
      title: 'Bio Fuel Production Facility',
      description: 'State-of-the-art facility for converting organic waste'
    },
    {
      src: '/images/homeonesection2.jpg',
      title: 'Conversion Process',
      description: 'Advanced biomass to fuel conversion technology'
    },
    {
      src: '/images/pmc1.jpeg',
      title: 'Quality Testing Lab',
      description: 'Comprehensive testing and quality assurance'
    }
  ];

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Renewable",
      description: "Sustainable bio fuel production from organic waste materials"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "High Efficiency",
      description: "Optimized conversion process achieving 85% energy efficiency"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Waste Reduction",
      description: "Converting 90% of organic waste into usable bio fuel"
    }
  ];

  const stats = [
    { label: "Energy Efficiency", value: "85%" },
    { label: "Waste Converted", value: "90%" },
    { label: "CO₂ Reduction", value: "75%" },
    { label: "Cost Savings", value: "40%" }
  ];

  const timeline = [
    { phase: "Research & Planning", duration: "2 months", status: "completed" },
    { phase: "Prototype Development", duration: "3 months", status: "completed" },
    { phase: "Testing & Optimization", duration: "2 months", status: "completed" },
    { phase: "Documentation", duration: "1 month", status: "completed" }
  ];

  // Slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden bg-gradient-to-r from-green-200 via-yellow-50 to-green-200">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .stagger-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .stagger-4 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .stagger-5 {
          animation-delay: 0.5s;
          opacity: 0;
        }

        .stagger-6 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-2 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 animate-float">
                <Award className="w-4 h-4 animate-pulse-custom" />
                <span className="text-sm text-gray-900 font-sans font-bold">Award Winning Project</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-none text-green-900">
                Sustainable
                <span className="block text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                  Bio Fuel
                </span>
                Revolution
              </h1>
              
              <p className="text-sm font-bold text-gray-600 leading-relaxed max-w-2xl text-justify">
                Converting organic waste into clean, renewable energy with 85% efficiency. 
                A breakthrough in sustainable fuel production that reduces carbon footprint by 75%.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                <button className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                  <span className="flex items-center space-x-2">
                    <span>View Demo</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                </Link>
              </div>
            </div>
            
            <div className={`relative ${isVisible ? 'animate-fadeInRight' : 'opacity-0'} stagger-1`}>
              <div className="relative bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-black/40 rounded-2xl relative overflow-hidden">
                  {!isPlaying ? (
                    // Video Thumbnail
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-blue-900/50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 hover:scale-105"
                        style={{ 
                          backgroundImage: `url('images/biofuelproject1.jpg')` 
                        }}
                      ></div>
                      
                      {/* Play Button */}
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="relative z-10 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-pulse-custom"
                      >
                        <Play className="w-8 h-8 ml-1 text-white" />
                      </button>
                      
                      {/* Thumbnail Info */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 transform transition-all duration-300 hover:translate-y-0 translate-y-2">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                          <h3 className="text-white font-semibold text-sm mb-1">Bio Fuel Production Process</h3>
                          <p className="text-gray-300 text-xs">Watch how we convert organic waste into clean energy</p>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs font-medium">3:45</span>
                      </div>
                    </div>
                  ) : (
                    // Video iframe
                    <div className="absolute inset-0">
                      <iframe
                        src="/images/videoproject.mp4"
                        title="Bio Fuel Project Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-2xl"
                      ></iframe>
                      
                      {/* Close button */}
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-300 z-10"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-2 pt-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slideDown' : 'opacity-0'} stagger-2`}>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Project <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Timeline</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            
            {timeline.map((phase, index) => (
              <div key={index} className={`relative flex items-center  ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-10 ${isVisible ? (index % 2 === 0 ? 'animate-fadeInLeft' : 'animate-fadeInRight') : 'opacity-0'} stagger-${index + 3}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">{phase.phase}</h3>
                    <p className="text-gray-700 font-sans mb-2 font-semibold">{phase.duration}</p>
                    <div className="inline-flex items-center space-x-2 text-sm text-green-400">
                      <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse-custom"></div>
                      <span className='text-gray-900 font-sans'>Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-slate-900 animate-pulse-custom"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with Image Slider */}
      <section id="results" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slideDown' : 'opacity-0'} stagger-4`}>
            <h2 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Project <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Results</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fadeInLeft' : 'opacity-0'} stagger-5`}>
              <div className="bg-white backdrop-blur-sm border shadow-3xl border-white/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">Technical Achievements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse-custom"></div>
                    <span className="text-gray-600 font-sans font-semibold">Developed efficient biomass conversion process</span>
                  </li>
                  <li className="flex items-start space-x-3 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse-custom"></div>
                    <span className="text-gray-600 font-sans font-semibold">Achieved 85% energy conversion efficiency</span>
                  </li>
                  <li className="flex items-start space-x-3 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse-custom"></div>
                    <span className="text-gray-600 font-sans font-semibold">Reduced production costs by 40%</span>
                  </li>
                  <li className="flex items-start space-x-3 transform transition-all duration-300 hover:translate-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse-custom"></div>
                    <span className="text-gray-600 font-sans font-semibold">Minimized carbon footprint by 75%</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">Environmental Impact</h3>
                <p className="text-gray-600 font-semibold leading-relaxed font-sans text-justify">
                  This bio fuel project successfully demonstrates how organic waste can be transformed into clean energy, 
                  contributing to a circular economy and reducing environmental pollution while providing sustainable fuel alternatives.
                </p>
              </div>
            </div>
            
            {/* Image Slider */}
            <div className={`relative ${isVisible ? 'animate-fadeInRight' : 'opacity-0'} stagger-5`}>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                
                <div className='h-[450px] w-full relative overflow-hidden rounded-lg'>
                  {/* Main Image Display */}
                  <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {projectImages.map((image, index) => (
                      <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <Image
                          src={image.src}
                          alt={image.title}
                          width={800}
                          height={600}
                          className='h-full w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105'
                        />
                        {/* Image overlay with info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 transform transition-all duration-300">
                          <h4 className="text-white font-bold text-lg mb-1">{image.title}</h4>
                          <p className="text-gray-300 text-sm">{image.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-x-1"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:translate-x-1"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-green-400 scale-125 animate-pulse-custom' 
                            : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Slide Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {currentSlide + 1} / {projectImages.length}
                    </span>
                  </div>
                </div>
                
              </div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}