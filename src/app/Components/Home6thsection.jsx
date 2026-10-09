'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { FiPlay, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const Home6thsection = () => {
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
    <section ref={sectionRef} className={`bg-[#f6fcf6] py-16 px-4 lg:mb-1 mb-24 ${isVisible ? 'in-view' : ''}`}>
      <style>{`
        .animate-tag,
        .animate-heading,
        .animate-description,
        .animate-feature-1,
        .animate-feature-2,
        .animate-feature-3,
        .animate-buttons,
        .animate-top-image,
        .animate-bottom-image {
          opacity: 0;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes slideInRotate {
          from {
            opacity: 0;
            transform: translateY(20px) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes floatImage {
          0%, 100% {
            transform: translateY(0);
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

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          }
        }

        .in-view .animate-tag {
          animation: fadeInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .in-view .animate-heading {
          animation: fadeInLeft 0.8s ease-out 0.2s forwards;
          opacity: 0;
          background-size: 200% auto;
          animation: fadeInLeft 0.8s ease-out 0.2s forwards, shimmer 3s linear infinite;
        }

        .in-view .animate-description {
          animation: fadeInLeft 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .in-view .animate-feature-1 {
          animation: fadeInLeft 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }

        .in-view .animate-feature-2 {
          animation: fadeInLeft 0.6s ease-out 0.7s forwards;
          opacity: 0;
        }

        .in-view .animate-feature-3 {
          animation: fadeInLeft 0.6s ease-out 0.9s forwards;
          opacity: 0;
        }

        .in-view .animate-buttons {
          animation: fadeInUp 0.8s ease-out 1.1s forwards;
          opacity: 0;
        }

        .in-view .animate-top-image {
          animation: fadeInRight 0.8s ease-out 0.4s forwards, floatImage 4s ease-in-out 1.2s infinite;
          opacity: 0;
        }

        .in-view .animate-bottom-image {
          animation: slideInRotate 0.9s ease-out 0.6s forwards, pulse 3s ease-in-out 1.5s infinite, borderGlow 3s ease-in-out 1.5s infinite;
          opacity: 0;
        }

        .btn-support {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-support::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .btn-support:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-support:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(22, 163, 74, 0.4);
        }

        .play-btn {
          transition: all 0.3s ease;
        }

        .play-btn:hover {
          transform: scale(1.1) rotate(90deg);
        }

        .play-btn-parent:hover .play-text {
          color: #166534;
          transform: translateX(5px);
        }

        .play-text {
          transition: all 0.3s ease;
        }

        .image-hover {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .image-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .check-icon-animate {
          transition: all 0.3s ease;
        }

        .animate-feature-1:hover .check-icon-animate,
        .animate-feature-2:hover .check-icon-animate,
        .animate-feature-3:hover .check-icon-animate {
          transform: scale(1.2) rotate(360deg);
          color: #059669;
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center lg:w-[80%] w-[90%] mx-auto">

        {/* LEFT CONTENT */}
        <div>
          {/* Tag */}
          {/* <span className="inline-block bg-white text-green-700 border border-green-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            GLOBAL SUSTAINABILITY
          </span> */}
          <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-green-100 mb-4 sm:mb-4 animate-tag">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">GLOBAL SUSTAINABILITY</span>
            <div className="w-6 sm:w-8 h-px bg-green-300"></div>
          </div>

          {/* Heading */}
          {/* <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 ">
            Advancing Self-Sustainable Global Goals Through Biofuels
          </h2> */}
          <h2 className="text-3xl lg:text-[37px] font-bold text-green-800 leading-tight text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text animate-heading">
            Advancing Self-Sustainable <br /> <span className="text-green-600">Global Goals Through Biofuels
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-700 mb-6  text-justify animate-description">
            Biofuels, especially Bio-CBG, are a key enabler of a sustainable energy ecosystem. Produced from agricultural residue, organic waste, and renewable biomass, they significantly lower greenhouse gas emissions while reducing dependency on fossil fuels.
          </p>

          {/* Features */}
          <ul className="space-y-3 text-gray-700 mb-8 text-[14.4px]">
            <li className="flex items-start animate-feature-1">
              <FiCheckCircle className="text-green-600 mt-1 mr-2 font-sans check-icon-animate" />
              Accelerates the transition to clean energy and supports UN SDGs like Affordable & Clean Energy and Climate Action.
            </li>
            <li className="flex items-start animate-feature-2">
              <FiCheckCircle className="text-green-600 mt-1 mr-2 font-sans check-icon-animate" />
              Boosts rural economy through job creation and local feedstock cultivation.
            </li>
            <li className="flex items-start animate-feature-3">
              <FiCheckCircle className="text-green-600 mt-1 mr-2 check-icon-animate" />
              Enhances energy security by reducing reliance on fossil fuel imports.
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 animate-buttons">
            <Link
              href="/whyinvestincbgwithkecagritech"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md btn-support"
            >
              <FiDollarSign className="text-xl" />
              <span className="text-sm font-semibold">SUPPORT THE MISSION</span>
            </Link>

            <Link
              href="https://www.youtube.com/@KisanExperienceCentre" target="_blank">
            <button className="flex items-center gap-2 text-green-800 font-semibold hover:underline play-btn-parent">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center play-btn">
                <FiPlay />
              </div>
              <span className="text-sm play-text">WATCH IMPACT VIDEO</span>
            </button>
            </Link>
        </div>
      </div>

      {/* RIGHT SIDE IMAGES PLACEHOLDER */}
      <div className="relative">
        {/* Top Image */}
        <div className="w-full h-[280px] rounded-lg overflow-hidden shadow-lg mb-4 bg-gray-300 image-hover animate-top-image">
          <Image
            src="/images/biofuel2.png"
            alt="Charging Car"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Right Image */}
        <div className="w-72 h-56 rounded-lg overflow-hidden shadow-md absolute bottom-0 right-0 top-55 bg-gray-200 border-2 border-white image-hover animate-bottom-image">
          <Image
            src="/images/homeglobal2nd.jpg"
            alt="Charging Car"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
    </section >
  );
};

export default Home6thsection;