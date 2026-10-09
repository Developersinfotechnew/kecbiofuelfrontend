"use client";
import Link from "next/link";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from "react";

const Home2ndsection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Array of images for the slider
  const sliderImages = [
    {
      src: "/images/homeonesection1.jpg",
      alt: "Environmental Sustainability"
    },
    {
      src: "/images/homeonesection4.jpg",
      alt: "Bio-Fuel Production"
    },
    {
      src: "/images/homeonesection3.jpg",
      alt: "Green Energy Solutions"
    }
  ];

  // Trigger animations when section scrolls into view
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

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Image Slider */}
          <div className={`relative flex items-center justify-center min-h-[600px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative w-full max-w-lg">
              {/* Main Slider Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {sliderImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className={`w-full h-[450px] object-cover transition-transform duration-[6000ms] ease-out ${
                          index === currentSlide ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      {/* Shimmer effect on active slide */}
                      {index === currentSlide && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-black/70">
                  {currentSlide + 1} / {sliderImages.length}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 relative ${currentSlide === index
                      ? 'w-3 h-3 bg-green-500 rounded-full scale-125'
                      : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-110'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {currentSlide === index && (
                      <span className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center space-x-2 text-green-600 font-bold uppercase text-sm tracking-wide">
                <span className="animate-bounce">🌿</span>
                <span>About KEC Bio-Fuel,</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight block text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text animate-gradient">
                Eco-Smart Future <br />
                <span className="text-green-600">with Bio CBG</span>
              </h2>
            </div>

            {/* Benefit 1 - Economic Impact */}
            <div className={`flex items-start space-x-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-200 hover:scale-110 hover:rotate-12">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 transition-colors duration-300 hover:text-green-600">
                  Economic Impact
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-sans text-justify font-semibold">
                  Core expertise in PMC, EPC, Technology Transfer and renewable energy projects in Bio-CNG, Bio-Diesel, and Ethanol. Signed MoU with Uttarakhand , UP , Tripura , Assam , MP Government for ₹5000 Cr +  under PPP in FY 2024–25. Over CBG  Project of 74+ @1154 Cr + PMC , EPC & Technology Transfer  contracts across India.
                  Established JV Company with Uttrakhand Govt . HEMU - Harit Energy Mission Uttrakhand under ( PPP Model )
                </p>
              </div>
            </div>

            {/* Benefit 2 - Green Expansion */}
            <div className={`flex items-start space-x-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-200 hover:scale-110 hover:rotate-12">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 transition-colors duration-300 hover:text-green-600">
                  Green Expansion
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-sans text-justify font-semibold">
                  A Unique Platform for CBG Project - Asia's First CBG Park
                  # Launched First CBG Park , Bulandshahr , UP. 
                  <br />Establishing 15 CBG Parks in UP, Uttarakhand, Assam, Karnataka , Madhya Pradesh , Rajasthan , Gujarat , Chattisgarh and planning expansion into MP, Gujarat, and North East.
                  Under CBG Park , Aims to build 150+ CBG plants by FY 2026–27 under a unified national platform.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/about" passHref>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-base font-semibold font-sans flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <span>More About</span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Home2ndsection;