import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronRight,
  Beaker,
  Leaf,
  Factory,
  Zap,
} from 'lucide-react';

const RandDSectionOne = () => {
  const [expandedRow, setExpandedRow] = useState(null);
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

  const feedstocks = [
    {
      name: "Napier Grass",
      icon: <Leaf className="w-6 h-6" />,
      description: "High-yield, fast-growing energy crop with superior biogas potential",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      row: 0
    },
    {
      name: "Press Mud",
      icon: <Factory className="w-6 h-6" />,
      description: "Sugar industry by-product rich in organic matter for anaerobic digestion",
      color: "bg-gradient-to-br from-amber-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-100",
      row: 0
    },
    {
      name: "Cow Dung",
      icon: <Leaf className="w-6 h-6" />,
      description: "Traditional biomass source enhancing microbial activity",
      color: "bg-gradient-to-br from-emerald-400 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100",
      row: 0
    },
    {
      name: "Mother Liquor",
      icon: <Beaker className="w-6 h-6" />,
      description: "Nutrient-rich residual liquid supporting microbial balance",
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-100",
      row: 1
    },
    {
      name: "DAF Sludge",
      icon: <Factory className="w-6 h-6" />,
      description: "Organic-rich industrial residue contributing to higher gas yields",
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-100",
      row: 1
    }
  ];

  const handleCardClick = (row) => {
    setExpandedRow(expandedRow === row ? null : row);
  };

  const isRowExpanded = (row) => expandedRow === row;

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-teal-900/30"></div>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center">
             <h2 className="text-3xl sm:text-4xl lg:text-[55px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   KEC AGRITECH <span className='text-green-600'>PVT. LTD.</span>
              </h2>
            <p className="text-base sm:text-xl text-green-100 mb-2 sm:mb-4 font-semibold">
              R&D BULANDSHAHR / KEC TECHNICAL
            </p>
            <p className="text-sm sm:text-lg text-emerald-200 mb-6 sm:mb-8">
              July 22, 2021 - Biogas Research & Development Report
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 backdrop-blur-sm rounded-full px-6 sm:px-8 py-3 sm:py-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-0 sm:mr-2 mb-1 sm:mb-0" />
              Sustainable Innovation in Biomass-to-Biogas Conversion
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
            Research & Development Facility
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-500 max-w-4xl mx-auto leading-relaxed">
            KEC Agritech proudly operates its state-of-the-art R&D facility in Bulandshahar, Uttar Pradesh,
            dedicated to advancing sustainable and innovative solutions in renewable energy through
            Compressed Biogas (CBG) production.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-50 to-orange-200 p-4 sm:p-8 rounded-2xl shadow-3xl">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl lg:text-[55px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   Our Core <span className='text-green-600'>Solutions</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transforming waste into wealth through cutting-edge biotechnology and sustainable innovation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10">
              {/* Advanced Research Card */}
              <div className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src="/images/randnew3.jpg"
                    alt="Advanced Research Laboratory"
                    width={800}
                    height={600}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 sm:p-8 pt-8 sm:pt-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    Advanced Research
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px] text-justify font-sans">
                    State-of-the-art bioreactors, precision gas upgrading systems, and world-class analytical laboratories delivering unprecedented insights into biogas optimization and process excellence.
                  </p>
                </div>
              </div>

              {/* Circular Economy Card */}
              <div className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src="/images/randnew2.jpg"
                    alt="Circular Economy and Sustainability"
                    width={800}
                    height={600}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 sm:p-8 pt-8 sm:pt-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-green-600 transition-colors duration-300">
                    Circular Economy
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px] text-justify font-sans">
                    Revolutionary waste-to-wealth technologies transforming organic waste streams into premium renewable energy and high-quality biofertilizers.
                  </p>
                </div>
              </div>

              {/* Energy Self-Reliance Card */}
              <div className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src="/images/randnew1.jpg"
                    alt="Renewable Energy and Solar Power"
                    width={800}
                    height={600}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 sm:p-8 pt-8 sm:pt-12">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    Energy Self-Reliance
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px] text-justify font-sans">
                    Pioneering scalable clean energy solutions that drive India's sustainable future, creating energy independence through innovative biogas and renewable technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Feedstock Section */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-4 sm:p-8 border border-green-100 mt-10">
          
           <h2 className="text-3xl sm:text-4xl text-center lg:text-[40px] font-bold text-gray-900 leading-tight py-6 mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   Multi-Feedstock <span className='text-green-600'>Approach</span>
              </h2>

          {/* First Row */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {feedstocks.filter(feedstock => feedstock.row === 0).map((feedstock, index) => {
              const actualIndex = feedstocks.findIndex(f => f === feedstock);
              return (
                <div
                  key={actualIndex}
                  className={`${feedstock.bgColor} border-2 border-opacity-30 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => handleCardClick(0)}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`${feedstock.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white mr-3 sm:mr-4 shadow-md`}>
                      {feedstock.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800">{feedstock.name}</h4>
                    </div>
                    <div className="ml-2">
                      {isRowExpanded(0) ?
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> :
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      }
                    </div>
                  </div>
                  {isRowExpanded(0) && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 border-opacity-50">
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium font-sans">
                        {feedstock.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Second Row */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {feedstocks.filter(feedstock => feedstock.row === 1).map((feedstock, index) => {
              const actualIndex = feedstocks.findIndex(f => f === feedstock);
              return (
                <div
                  key={actualIndex}
                  className={`${feedstock.bgColor} border-2 border-opacity-30 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => handleCardClick(1)}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`${feedstock.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white mr-3 sm:mr-4 shadow-md`}>
                      {feedstock.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800">{feedstock.name}</h4>
                    </div>
                    <div className="ml-2">
                      {isRowExpanded(1) ?
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> :
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      }
                    </div>
                  </div>
                  {isRowExpanded(1) && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 border-opacity-50">
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium font-sans">
                        {feedstock.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandDSectionOne;
