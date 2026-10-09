import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye, X, Play, Pause } from 'lucide-react';
import CtaSection from './CtaSection';

const CbgGlimpse = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Reveal section when it scrolls into view
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

  // Sample photos - replace with your actual photos
  const photos = [
    {
      id: 1,
      src: "/images/glimpse1.jpeg",
      title: "Campus Architecture"
    },
    {
      id: 2,
      src: "/images/glimpse2.jpeg",
      title: "Modern Library"
    },
    {
      id: 3,
      src: "/images/glimpse3.jpeg",
      title: "Conference Hall"
    },
    {
      id: 4,
      src: "/images/glimpse4.jpeg",
      title: "Student Life"
    },
    {
      id: 5,
      src: "/images/glimpse5.jpeg",
      title: "Tech Innovation"
    },
    {
      id: 6,
      src: "/images/glimpse6.jpeg",
      title: "Sports Excellence"
    },
    {
      id: 7,
      src: "/images/glimpse7.jpeg",
      title: "Green Campus"
    },
    {
      id: 8,
      src: "/images/glimpse8.jpeg",
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
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-green-900 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .animate-header {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animate-header-subtitle {
          animation: fadeInDown 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-controls {
          animation: fadeInUp 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-thumbnails {
          animation: fadeInUp 1s ease-out 0.7s forwards;
          opacity: 0;
        }

        .animate-cta {
          animation: scaleIn 1s ease-out 0.9s forwards;
          opacity: 0;
        }

        .nav-button {
          animation: slideInLeft 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .nav-button-right {
          animation: slideInRight 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .gradient-text-animated {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }

        .modal-content {
          animation: modalFadeIn 0.3s ease-out forwards;
        }

        .button-ripple {
          position: relative;
          overflow: hidden;
        }

        .button-ripple::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button-ripple:hover::before {
          width: 300px;
          height: 300px;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .thumbnail-item {
          transition: all 0.3s ease;
        }

        .thumbnail-item:hover {
          transform: scale(1.15) rotate(2deg);
        }

        .arrow-bounce {
          animation: float 2s ease-in-out infinite;
        }

        .dot-pulse {
          transition: all 0.3s ease;
        }

        .dot-pulse:hover {
          transform: scale(1.5);
        }
      `}</style>

      {/* Header */}
      <div className="relative z-10 text-center mt-16 animate-header">
        <h1 className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-gray-300 mb-4 gradient-text-animated">
          CBG Glimpse
        </h1>
        <p className="text-gray-400 text-lg animate-header-subtitle">Experience the beauty of our campus</p>
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
                className="absolute transition-all duration-700 ease-in-out cursor-pointer group hover-lift"
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
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 pulse-animation">
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
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-200 hover:scale-110 nav-button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 text-white transition-all duration-200 hover:scale-110 nav-button-right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-8 mb-16 animate-controls">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 dot-pulse ${index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white transition-all duration-200 hover:scale-105"
        >
          {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm">{isAutoPlay ? 'Pause' : 'Play'}</span>
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="relative px-4 pb-16 animate-thumbnails">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 justify-center overflow-x-auto scrollbar-hide pb-4">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 thumbnail-item ${index === currentSlide
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
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors duration-200 z-10 hover:scale-110 hover:rotate-90"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] modal-content">
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
      
    </div>
  );
};

export default CbgGlimpse;