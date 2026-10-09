import React, { useEffect, useRef, useState } from 'react';

const OurBackground = () => {
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
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div 
          className="text-center mb-12 transition-all duration-1000 ease-out"
          data-id="header"
          style={{
            opacity: isVisible.header ? 1 : 0,
            transform: isVisible.header ? 'translateY(0)' : 'translateY(-30px)'
          }}
        >
            <h2 className="text-3xl sm:text-4xl text-center lg:text-[50px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Our <span className='text-green-600'>Background</span>
              </h2>
          <div 
            className="w-24 h-1 bg-green-600 mx-auto mb-6 transition-all duration-1000 ease-out"
            style={{
              width: isVisible.header ? '96px' : '0px'
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div 
              className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-600 transition-all duration-700 ease-out"
              data-id="card1"
              style={{
                opacity: isVisible.card1 ? 1 : 0,
                transform: isVisible.card1 ? 'translateX(0)' : 'translateX(-50px)'
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Leading PMC & EPC Company in India
              </h3>
              <p className="text-gray-600 leading-relaxed font-sans text-sm text-justify">
              KEC is one of India's leading PMC & EPC company specializing in Project Assessment, project development, Project Execution, Project Management, Commercialization & market establishment for final products. Building upon the initial description, here are more details and specific points about KEC Agritech, derived from available information. 
              </p>
            </div>

            <div 
              className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600 transition-all duration-700 ease-out"
              data-id="card2"
              style={{
                opacity: isVisible.card2 ? 1 : 0,
                transform: isVisible.card2 ? 'translateX(0)' : 'translateX(-50px)',
                transitionDelay: '150ms'
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Multi-Million Dollar Projects
              </h3>
              <p className="text-gray-600 leading-relaxed font-sans text-sm text-justify">
                Managing projects worth more than million dollars across India. We provide 
                End-to-End solutions on various business models such as Turnkey, BOOT, 
                and RESCO in leading industries.
              </p>
            </div>
          </div>

          {/* Industries Section */}
          <div 
            className="bg-white rounded-xl p-8 shadow-lg transition-all duration-700 ease-out"
            data-id="industries"
            style={{
              opacity: isVisible.industries ? 1 : 0,
              transform: isVisible.industries ? 'translateX(0)' : 'translateX(50px)'
            }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Industries We Serve
            </h3>
            
            <div className="space-y-4 font-sans text-sm">
              {[
                { color: 'bg-green-500', text: 'Renewable Energy & Biofuels' },
                { color: 'bg-blue-500', text: 'Bio-CNG, H2O, Ethanol 1G & 2G' },
                { color: 'bg-yellow-500', text: 'Solar Energy & Electric Charging Stations' },
                { color: 'bg-purple-500', text: 'Food Processing & Dairy Farming' },
                { color: 'bg-red-500', text: 'Water Treatment Plants' },
                { color: 'bg-indigo-500', text: 'Warehouses & Cold Storage' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-500 ease-out"
                  style={{
                    opacity: isVisible.industries ? 1 : 0,
                    transform: isVisible.industries ? 'translateX(0)' : 'translateX(30px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '2020', label: 'Founded', color: 'text-green-600' },
            { value: '225+ Contracts', label: 'EPC, PMC, O & M', color: 'text-blue-600' },
            { value: '5000 Cr+', label: 'CBG Plant Order Value', color: 'text-purple-600' },
            { value: '10000Cr+', label: 'MOU Value', color: 'text-orange-600' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg text-center transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl"
              data-id={`stat${index}`}
              style={{
                opacity: isVisible[`stat${index}`] ? 1 : 0,
                transform: isVisible[`stat${index}`] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-500 font-sans">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBackground;