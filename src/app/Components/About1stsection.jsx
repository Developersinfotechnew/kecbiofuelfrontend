import React, { useEffect, useRef, useState } from 'react';

const About1stsection = () => {
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

  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden" ref={sectionRef}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 border border-green-100"
            data-id="mission"
            style={{
              opacity: isVisible.mission ? 1 : 0,
              transform: isVisible.mission ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.95)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <div className="mb-4">
              <h2 
                className="text-4xl font-bold text-gray-800 mb-4 transition-all duration-700"
                style={{
                  opacity: isVisible.mission ? 1 : 0,
                  transform: isVisible.mission ? 'translateY(0)' : 'translateY(-20px)',
                  transitionDelay: '200ms'
                }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Our <span className='text-green-600'>Mission</span>
              </h2>
              </h2>
              <div 
                className="h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isVisible.mission ? '64px' : '0px',
                  transitionDelay: '400ms'
                }}
              ></div>
            </div>
            
            <p 
              className="text-gray-600 leading-relaxed mb-6 font-sans font-semibold text-justify transition-all duration-700"
              style={{
                opacity: isVisible.mission ? 1 : 0,
                transform: isVisible.mission ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '500ms'
              }}
            >
              At KEC Urban Experience Centre, we're pioneering the future of sustainable living through innovative renewable energy solutions. Our commitment to environmental stewardship drives us to create cutting-edge technologies that power communities while preserving our planet.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {[
                { emoji: '🌱', text: 'Sustainable Energy', bg: 'bg-green-100', text_color: 'text-green-800' },
                { emoji: '🔋', text: 'Innovation', bg: 'bg-blue-100', text_color: 'text-blue-800' },
                { emoji: '🌍', text: 'Environmental Care', bg: 'bg-teal-100', text_color: 'text-teal-800' }
              ].map((badge, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 ${badge.bg} ${badge.text_color} rounded-full text-sm font-medium transition-all duration-500`}
                  style={{
                    opacity: isVisible.mission ? 1 : 0,
                    transform: isVisible.mission ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                    transitionDelay: `${700 + index * 100}ms`
                  }}
                >
                  {badge.emoji} {badge.text}
                </span>
              ))}
            </div>
          </div>
          
          {/* Vision Card */}
          <div 
            className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300"
            data-id="vision"
            style={{
              opacity: isVisible.vision ? 1 : 0,
              transform: isVisible.vision ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <div className="mb-6">
              <h2 
                className="text-3xl font-bold mb-4 transition-all duration-700"
                style={{
                  opacity: isVisible.vision ? 1 : 0,
                  transform: isVisible.vision ? 'translateY(0)' : 'translateY(-20px)',
                  transitionDelay: '200ms'
                }}
              >
            
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Our <span className='text-green-100'>Vision</span>
              </h2>
              </h2>
              <div 
                className="h-1 bg-white bg-opacity-50 rounded-full mb-6 transition-all duration-1000 ease-out"
                style={{
                  width: isVisible.vision ? '64px' : '0px',
                  transitionDelay: '400ms'
                }}
              ></div>
            </div>
            
            <p 
              className="leading-relaxed mb-6 text-green-50 font-sans font-semibold text-justify transition-all duration-700"
              style={{
                opacity: isVisible.vision ? 1 : 0,
                transform: isVisible.vision ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '500ms'
              }}
            >
              To be the leading catalyst in India's renewable energy transformation, creating sustainable urban environments that harmonize technological advancement with ecological responsibility.
            </p>
            
            <div 
              className="flex items-center space-x-4 transition-all duration-700"
              style={{
                opacity: isVisible.vision ? 1 : 0,
                transform: isVisible.vision ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '700ms'
              }}
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Innovation First</h3>
                <p className="text-green-100 text-sm">Leading the renewable revolution</p>
              </div>
            </div>
          </div>
        </div>      
      </section>    
    </div>
  );
};

export default About1stsection;