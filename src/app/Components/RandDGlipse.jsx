import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye, X, Play, Pause } from 'lucide-react';

const RandDGlimpse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Sample photos - replace with your actual photos
  const photos = [
    {
      id: 1,
      src: "/images/glimpse9.jpeg",
      title: "Campus Architecture"
    },
    {
      id: 2,
      src: "/images/glimpse10.jpeg",
      title: "Modern Library"
    },
    {
      id: 3,
      src: "/images/glimpse11.jpeg",
      title: "Conference Hall"
    },
    {
      id: 4,
      src: "/images/glimpse12.jpeg",
      title: "Student Life"
    },
    {
      id: 5,
      src: "/images/glimpse17.jpeg",
      title: "Tech Innovation"
    },
    {
      id: 6,
      src: "/images/glimpse14.jpeg",
      title: "Sports Excellence"
    },
    {
      id: 7,
      src: "/images/glimpse15.jpeg",
      title: "Green Campus"
    },
    {
      id: 8,
      src: "/images/glimpse16.jpeg",
      title: "Research Labs"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % photos.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, photos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const openModal = (photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = -1; i <= 3; i++) {
      const index = (currentSlide + i + photos.length) % photos.length;
      slides.push({ ...photos[index], position: i });
    }
    return slides;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-green-900 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 text-center mt-16">
        <h1 className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-gray-300 mb-4">
          R & D Glimpse
        </h1>
        <p className="text-gray-400 text-lg">Experience the beauty of our campus</p>
      </div>

      {/* Main Slider */}
      <div className="relative h-96 md:h-[500px] mb-16">
        <div className="absolute inset-0 flex items-center justify-center">
          {getVisibleSlides().map((photo, idx) => {
            const { position } = photo;
            
            // Calculate transform and styling based on position
            let transform = '';
            let zIndex = 0;
            let opacity = 0;
            let scale = 0.8;
            
            if (position === 0) {
              // Main slide
              transform = 'translateX(0)';
              zIndex = 30;
              opacity = 1;
              scale = 1;
            } else if (position === 1) {
              // Right slide
              transform = 'translateX(320px) rotateY(-45deg)';
              zIndex = 20;
              opacity = 0.7;
              scale = 0.85;
            } else if (position === -1) {
              // Left slide
              transform = 'translateX(-320px) rotateY(45deg)';
              zIndex = 20;
              opacity = 0.7;
              scale = 0.85;
            } else if (position === 2) {
              // Far right
              transform = 'translateX(500px) rotateY(-60deg)';
              zIndex = 10;
              opacity = 0.4;
              scale = 0.7;
            }
            
            return (
              <div
                key={`${photo.id}-${idx}`}
                className="absolute transition-all duration-700 ease-in-out cursor-pointer group"
                style={{
                  transform: `${transform} scale(${scale})`,
                  zIndex,
                  opacity,
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => position === 0 ? openModal(photo) : goToSlide((currentSlide + position + photos.length) % photos.length)}
              >
                <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay only on main slide */}
                  {position === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <h3 className="text-white text-2xl font-bold">
                          {photo.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-8 mb-16">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white transition-all duration-200"
        >
          {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm">{isAutoPlay ? 'Pause' : 'Play'}</span>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="relative px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 justify-center overflow-x-auto scrollbar-hide pb-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentSlide
                    ? 'ring-2 ring-white scale-110'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-lg">
              <h3 className="text-white text-3xl font-bold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
          {/* Call-to-Action Section */}
        <div className="mt-1 text-center ">
          <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-400 backdrop-blur-xl border border-green-400/30 p-12 shadow-2xl relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Ready to Build Your 
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> CBG Empire?</span>
              </h2>
              
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Join the renewable energy revolution with our comprehensive CBG park solutions. 
                From concept to commissioning, we'll guide you every step of the way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 text-black font-bold text-lg bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-2xl hover:from-green-300 hover:via-emerald-300 hover:to-green-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50">
                  <span>Start Your CBG Project</span>
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                
                <button className="group inline-flex items-center justify-center px-8 py-5 text-green-600 font-bold bg-transparent border-2 border-green-400/50 rounded-2xl hover:bg-green-400/10 hover:border-green-400 transition-all duration-300">
                  <svg className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default RandDGlimpse;