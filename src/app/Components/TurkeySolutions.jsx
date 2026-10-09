import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const TurkeySolutions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const sectionRef = useRef(null);

  const features = [
    "Bio-CNG, Bio-Diesel & Ethanol Plants",
    "CBG Parks Development & Setup", 
    "PMC & EPC Services",
    "BOOT & RESCO Business Models",
    "Operational & Maintenance Solutions",
    "Joint Venture & PPP Partnerships"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      features.forEach((_, index) => {
        setTimeout(() => {
          setCheckedItems(prev => [...prev, index]);
        }, index * 150);
      });
    }
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16" ref={sectionRef}>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Content and Image */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className={`text-3xl font-bold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                  <span className="inline-block animate-gradient-text">Turnkey Solutions</span>
                </h3>
                <div className="space-y-4 mb-2">
                  {features.slice(0, 6).map((feature, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 leading-tight transition-all duration-500 hover:translate-x-2 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle 
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-500 ${
                          checkedItems.includes(index) 
                            ? 'text-green-500 scale-100 rotate-0' 
                            : 'text-gray-300 scale-0 -rotate-180'
                        }`}
                      />
                      <span className="text-gray-500 font-sans font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image below content */}
              <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group">
                  <Image
                    src="/images/turnkeythree.jpg"
                    alt="Solutions Overview"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <span className="text-gray-800 text-sm font-semibold">Solutions Overview</span>
                  </div>
                </div>
              </div>
            </div>
                        
            {/* Right Side - Vertical Stack Layout */}
            <div className="p-8 md:p-12 bg-gradient-to-br from-green-50 to-blue-50">
              <div className="space-y-4 h-full min-h-[500px] flex flex-col">
                <div 
                  className={`flex-1 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 relative group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <Image
                    src="/images/turnkeyone.jpeg"
                    alt="Main Facility"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <span className="text-gray-800 text-sm font-semibold">Main Facility</span>
                  </div>
                </div>
                <div 
                  className={`flex-1 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 relative group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                >
                  <Image
                    src="/images/turnkeytwo.jpeg"
                    alt="Control Systems"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <span className="text-gray-800 text-sm font-semibold">Control Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <style jsx>{`
        @keyframes gradient-text {
          0%, 100% {
            background-size: 200% 200%;
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-text {
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default TurkeySolutions;