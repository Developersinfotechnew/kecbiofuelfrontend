import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, Leaf, Droplets, Sun, Battery, Recycle } from 'lucide-react';

const Technologies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('[data-id]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const technologies = [
    {
      icon: <Leaf className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Bio-CNG Technology",
      description: "Advanced anaerobic digestion technology for converting organic waste into compressed bio-gas",
      features: ["High efficiency conversion", "Automated process control", "Environmental friendly"],
      color: "green"
    },
    {
      icon: <Droplets className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Bio-Diesel Production",
      description: "State-of-the-art transesterification process for producing high-quality biodiesel",
      features: ["Multiple feedstock compatibility", "High yield process", "Quality assurance"],
      color: "blue"
    },
    {
      icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Ethanol 1G & 2G",
      description: "Cutting-edge fermentation and distillation technology for ethanol production",
      features: ["First generation ethanol", "Second generation ethanol", "Energy efficient"],
      color: "purple"
    },
    {
      icon: <Sun className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Solar Energy Systems",
      description: "Advanced photovoltaic technology for renewable electricity generation",
      features: ["High efficiency panels", "Grid integration", "Smart monitoring"],
      color: "yellow"
    },
    {
      icon: <Battery className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "EV Charging Infrastructure",
      description: "Smart charging solutions for electric vehicles with multiple charging standards",
      features: ["Fast charging capability", "Smart grid integration", "User-friendly interface"],
      color: "indigo"
    },
    {
      icon: <Recycle className="w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Waste Treatment",
      description: "Advanced waste treatment and recycling technologies for sustainable operations",
      features: ["Water treatment plants", "Sewage treatment", "Industrial effluent treatment"],
      color: "red"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % technologies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + technologies.length) % technologies.length);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      green: "bg-green-100 text-green-600 border-green-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      red: "bg-red-100 text-red-600 border-red-200"
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 transition-all duration-800 ease-out"
            data-id="header"
            style={{
              opacity: isVisible.header ? 1 : 0,
              transform: isVisible.header ? 'translateY(0)' : 'translateY(-30px)'
            }}
          >
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Our <span className='text-green-600'>Technologies</span>
              </h2>
          </h2>
          <div 
            className="h-1 bg-green-600 mx-auto mb-2 transition-all duration-1000 ease-out"
            data-id="underline"
            style={{
              width: isVisible.underline ? '96px' : '0px',
              transitionDelay: '200ms'
            }}
          ></div>
          <p 
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-700"
            data-id="subtitle"
            style={{
              opacity: isVisible.subtitle ? 1 : 0,
              transform: isVisible.subtitle ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '400ms'
            }}
          >
            Cutting-edge technologies and innovative solutions driving the future of renewable energy and sustainable development
          </p>
        </div>

        {/* Technology Slider */}
        <div 
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-10 mx-2 sm:mx-4 transition-all duration-800 ease-out"
          data-id="slider"
          style={{
            opacity: isVisible.slider ? 1 : 0,
            transform: isVisible.slider ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)'
          }}
        >
          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 sm:gap-0 mb-6 sm:mb-8">
              
              {/* Left Button */}
              <button 
                onClick={prevSlide}
                className="self-center sm:self-auto p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-green-600" />
              </button>
              
              {/* Slide Content */}
              <div className="flex-1 text-center sm:text-left sm:mx-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 ${getColorClasses(technologies[currentSlide].color)} mb-4 sm:mb-6`}>
                  {technologies[currentSlide].icon}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text mb-3">
                  {technologies[currentSlide].title}
                </h3>
                
                <p className="text-gray-600 text-base sm:text-lg mb-5 leading-relaxed font-sans">
                  {technologies[currentSlide].description}
                </p>
                
                <div className="space-y-2">
                  {technologies[currentSlide].features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center sm:justify-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-500 font-sans text-sm sm:text-base font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Button */}
              <button 
                onClick={nextSlide}
                className="self-center sm:self-auto p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-green-600" />
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
              {technologies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Technology Grid Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                index === currentSlide ? 'ring-2 ring-green-600 transform scale-102 sm:scale-105' : 'hover:transform hover:-translate-y-1'
              }`}
              onClick={() => setCurrentSlide(index)}
              data-id={`tech-${index}`}
              style={{
                opacity: isVisible[`tech-${index}`] ? 1 : 0,
                transform: isVisible[`tech-${index}`] 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(30px) scale(0.95)',
                transition: 'all 0.6s ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${getColorClasses(tech.color)} mb-3 sm:mb-4`}>
                {React.cloneElement(tech.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                {tech.title}
              </h4>
              <p className="text-gray-500 text-sm font-sans">
                {tech.description.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>

        {/* Innovation Section */}
        <div 
          className="mt-12 sm:mt-16 bg-gradient-to-br from-green-200 via-green-200 to-green-400 rounded-2xl p-6 sm:p-8 md:p-12 text-center transition-all duration-800 ease-out"
          data-id="innovation"
          style={{
            opacity: isVisible.innovation ? 1 : 0,
            transform: isVisible.innovation ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)'
          }}
        >
          <h3 
            className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text transition-all duration-700"
            style={{
              opacity: isVisible.innovation ? 1 : 0,
              transform: isVisible.innovation ? 'translateY(0)' : 'translateY(-20px)',
              transitionDelay: '200ms'
            }}
          >
            Innovation Meets Sustainability
          </h3>
          <p 
            className="text-green-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto transition-all duration-700"
            style={{
              opacity: isVisible.innovation ? 1 : 0,
              transform: isVisible.innovation ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms'
            }}
          >
            Our advanced technologies are designed to maximize efficiency, minimize environmental impact, 
            and deliver sustainable solutions for a cleaner future.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { value: "98%", label: "Efficiency Rate" },
              { value: "50+", label: "Technology Patents" },
              { value: "24/7", label: "Technical Support" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="transition-all duration-700"
                style={{
                  opacity: isVisible.innovation ? 1 : 0,
                  transform: isVisible.innovation ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transitionDelay: `${500 + index * 150}ms`
                }}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 text-green-700">{stat.value}</div>
                <div className="text-green-700 font-sans text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;