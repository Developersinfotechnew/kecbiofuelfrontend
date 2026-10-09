import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "lucide-react";

const mobileStyles = `
  @media (max-width: 639px) {
    .banner-wrapper {
      width: 100%;
      height: 240px;        /* ← change mobile banner height here */
      margin-top: 64px;
    }
    .banner-slide {
      height: 250px;        /* ← must match banner-wrapper height */
      width: 100vw;         /* ← full viewport width */
      marginTop: 10;              
    }
    .banner-btn-prev { left: 8px; }
    .banner-btn-next { right: 8px; }
    .banner-btn-icon {
      width: 28px;
      height: 28px;
    }
    .banner-chevron {
      width: 16px;
      height: 16px;
    }
    .banner-dots { bottom: 8px; gap: 6px; }
    .banner-dot {
      width: 8px;
      height: 8px;
    }
  }
`;

const HomeBannerSlider = () => {
  const slides = [
    {
      id: 1,
      desktopImage: "/home/Herobanner11.png",
      mobileImage: "/home/homebanner11mobile.png",
      title: "Sustainable Future with Bio CBG",
      description: "Innovating green energy solutions for a cleaner tomorrow.",
    },
    {
      id: 2,
      desktopImage: "/images/biofuelbanner3.png",
      mobileImage: "/images/biofuelbanner3.png",
      title: "Renewable Energy Revolution",
      description: "Empowering communities with renewable biofuels.",
    },
    {
      id: 3,
      desktopImage: "/images/biofuelbanner4.png",
      mobileImage: "/images/biofuelbanner4.png",
      title: "Clean Energy, Bright Future",
      description: "Reducing carbon footprint with innovative technology.",
    },
    {
      id: 4,
      desktopImage: "/images/biofuelbanner2.png",
      mobileImage: "/images/biofuelbanner2.png",
      title: "Clean Energy, Bright Future",
      description: "Reducing carbon footprint with innovative technology.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <>
      <style>{mobileStyles}</style>
      {/* Desktop height controlled by Tailwind only — mobile height by CSS only */}
      <div className="banner-wrapper relative w-full md:h-[400px] lg:h-[480px] overflow-hidden mt-24">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            // Desktop: h-full. Mobile: .banner-slide CSS overrides height & width
            <div key={slide.id} className="banner-slide w-full flex-shrink-0 relative h-full">
              {/* Desktop / tablet image */}
              <Image
                src={slide.desktopImage}
                alt={slide.title}
                fill
                className="object-cover object-center hidden md:block"
                priority
              />
              {/* Mobile-only image */}
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                fill
                className="object-cover object-center block md:hidden"
                priority
              />
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="banner-btn-prev absolute left-5 top-1/2 -translate-y-1/2 z-20"
        >
          <div className="banner-btn-icon w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-md flex items-center justify-center border border-white/20">
            <ChevronLeft className="banner-chevron w-5 h-5 text-white" />
          </div>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="banner-btn-next absolute right-5 top-1/2 -translate-y-1/2 z-20"
        >
          <div className="banner-btn-icon w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-md flex items-center justify-center border border-white/20">
            <ChevronRight className="banner-chevron w-5 h-5 text-white" />
          </div>
        </button>

        {/* Dots */}
        <div className="banner-dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`banner-dot rounded-full transition-all duration-300 ${currentIndex === index
                ? "w-3 h-3 bg-white scale-125"
                : "w-3 h-3 bg-gray-400 hover:bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeBannerSlider;