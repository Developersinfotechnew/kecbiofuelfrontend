"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award, Trophy, Star } from 'lucide-react';

const GalleryScrollContent = ({
  awards = null,
  data = [
    {
      id: 1,
      title: "Innovation Excellence Award",
      subtitle: "Best Digital Product 2024",
      date: "December 2024",
      description: "Recognized for outstanding innovation in digital product design and user experience. This award celebrates our commitment to pushing boundaries and creating solutions that truly make a difference in users' lives.",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975cd27?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Design Leadership Award",
      subtitle: "UI/UX Excellence",
      date: "November 2024",
      description: "Awarded for exceptional leadership in design thinking and creating user-centered experiences that set new industry standards. This recognition reflects our dedication to crafting intuitive and beautiful interfaces.",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Technology Pioneer",
      subtitle: "Innovation Summit",
      date: "October 2024",
      description: "Honored as a technology pioneer for breakthrough achievements in modern web development and cutting-edge solutions that drive the industry forward.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
    }
  ],
  sectionTitle = "ACHIEVEMENTS",
  sectionSubtitle = "AWARDS",
  sectionIcon = <Trophy className="w-8 h-8" />
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [activeAward, setActiveAward] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const activeData = awards ? awards[activeAward].data : data;
  const currentItem = activeData[currentIndex];

  const handlePrev = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? activeData.length - 1 : prev - 1
      );
      setIsChanging(false);
    }, 300);
  };

  const handleNext = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === activeData.length - 1 ? 0 : prev + 1
      );
      setIsChanging(false);
    }, 300);
  };

  const handleItemChange = (index) => {
    if (index !== currentIndex) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsChanging(false);
      }, 300);
    }
  };

  const handleAwardTabChange = (index) => {
    if (index !== activeAward) {
      setIsChanging(true);
      setTimeout(() => {
        setActiveAward(index);
        setCurrentIndex(0);
        setIsChanging(false);
      }, 300);
    }
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideScale {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out forwards; }
        .animate-slideScale { animation: slideScale 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .content-fade-out { opacity: 0; transform: translateX(-20px); transition: all 0.3s ease-out; }
        .content-fade-in { opacity: 1; transform: translateX(0); transition: all 0.5s ease-out; }
        .image-fade-out { opacity: 0; transform: scale(1.1); transition: all 0.3s ease-out; }
        .image-fade-in { opacity: 1; transform: scale(1); transition: all 0.5s ease-out; }

        .award-tab-active {
          background: linear-gradient(135deg, #16a34a, #059669);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(22, 163, 74, 0.35);
          transform: translateY(-2px);
        }
        .award-tab-inactive {
          background: #ffffff;
          color: #475569;
          border: 2px solid #e2e8f0;
        }
        .award-tab-inactive:hover {
          border-color: #16a34a;
          color: #16a34a;
          transform: translateY(-2px);
        }
        .award-tab-btn {
          transition: all 0.3s ease;
          border-radius: 50px;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-green-50/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.03),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`text-center mb-8 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-3 border border-white/20 shadow-lg animate-float">
            <div className="text-green-600 animate-pulse-custom">
              {sectionIcon}
            </div>
            <span className="text-sm font-semibold text-slate-600 tracking-wider uppercase ml-2">
              Recognition
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:px-[150px] lg:text-[50px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
            {sectionTitle} <span className='text-green-600'> & {sectionSubtitle}</span>
          </h2>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Celebrating milestones and recognitions that define our journey of excellence
          </p>

          {/* Award Category Toggle Buttons */}
          {awards && awards.length > 1 && (
            <div className={`flex flex-wrap justify-center gap-4 mt-2 mb-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {awards.map((award, index) => (
                <button
                  key={index}
                  onClick={() => handleAwardTabChange(index)}
                  className={`award-tab-btn ${index === activeAward ? 'award-tab-active' : 'award-tab-inactive'}`}
                >
                  {index === activeAward && (
                    <span className="mr-2">🏆</span>
                  )}
                  {award.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Card */}
        <div className={`relative ${isVisible ? 'animate-slideScale' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/5 border border-white/20 overflow-hidden">
            <div className="flex flex-col xl:flex-row">

              {/* Left Side – Image */}
              <div className="xl:w-3/5 relative group">
                <div className="relative w-full h-auto overflow-hidden">
                  {currentItem.image?.endsWith(".mp4") ? (
                    <video
                      src={currentItem.image}
                      controls
                      autoPlay
                      loop
                      className={`w-full h-auto block transition-all duration-700 group-hover:scale-105 ${isChanging ? 'image-fade-out' : 'image-fade-in'}`}
                    />
                  ) : (
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      width={800}
                      height={600}
                      className={`w-full h-auto block transition-all duration-700 group-hover:scale-105 ${isChanging ? 'image-fade-out' : 'image-fade-in'}`}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-x-1 border border-white/20"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:translate-x-1 border border-white/20"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  </button>

                  {/* Progress Dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {activeData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 h-3 bg-white shadow-lg' : 'w-3 h-3 bg-white/60 hover:bg-white/90 hover:scale-110'}`}
                      />
                    ))}
                  </div>

                  {/* Award Badge */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full p-3 shadow-xl animate-pulse-custom">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Right Side – Content */}
              <div className="xl:w-2/5 px-8 py-4 flex flex-col justify-center">
                <div className={`space-y-6 ${isChanging ? 'content-fade-out' : 'content-fade-in'}`}>
                  {/* Date Badge */}
                  <div className="inline-flex items-center font-sans font-semibold gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-full px-4 py-2 text-sm font-medium text-green-500 w-fit">
                    <Star className="w-4 h-4 animate-pulse-custom" />
                    {currentItem.date}
                  </div>

                  <div>
                    <h3 className="text-3xl xl:text-4xl font-bold text-slate-800 mb-3 leading-tight">
                      {currentItem.title}
                    </h3>
                    <h4 className="text-xl font-semibold text-[#F58220] bg-clip-text mb-6">
                      {currentItem.subtitle}
                    </h4>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-lg text-justify">
                    {currentItem.description}
                  </p>

                  <Link href="https://www.linkedin.com/company/kisanexperiencecentre/">
                    <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-1 hover:scale-105">
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tab Selector */}
          {activeData.length > 1 && (
            <div className={`mt-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-2">
                <div className="flex justify-center flex-wrap gap-2">
                  {activeData.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemChange(index)}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${index === currentIndex ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105' : 'text-slate-600 hover:text-slate-800 hover:bg-white/70 border border-transparent hover:border-white/40 hover:scale-105'}`}
                    >
                      <span className="relative z-10 truncate max-w-48 block">
                        {item.title}
                      </span>
                      {index === currentIndex && (
                        <span className="absolute inset-0 animate-shimmer"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryScrollContent;