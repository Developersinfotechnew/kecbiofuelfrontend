import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Factory, CreditCard, Building, FileText, Zap, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const LatestDevelopments = () => {
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

  const developments = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Synchronization of CBG in CGD network",
      description: "Strategic integration of Compressed Bio Gas into existing City Gas Distribution infrastructure",
      status: "Active",
      date: "2024"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Fertilizer Control Order & Environmental Clearances",
      description: "Comprehensive regulatory framework ensuring environmental compliance",
      status: "Completed",
      date: "Q4 2023"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Priority Sector Lending for CBG Projects",
      description: "Enhanced financial accessibility through banking sector initiatives",
      status: "Active",
      date: "2024"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Loan Facilitation by Banks",
      description: "Streamlined lending processes for sustainable energy projects",
      status: "Ongoing",
      date: "2024"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Commercial Agreement (Version 1 and 2)",
      description: "Updated contractual frameworks for CBG project partnerships",
      status: "Updated",
      date: "2024"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Central Financial Assistance by MNRE",
      description: "Government funding support through renewable energy ministry",
      status: "Available",
      date: "2024"
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Commissioned Plants",
      description: "New production facilities enhancing national CBG capacity",
      status: "Operational",
      date: "2024"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Updated': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Available': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Operational': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-500 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              {/* <h1 className="sm:text-5xl text-4xl font-bold text-gray-800">Latest Developments</h1> */}
               <h2 className="text-3xl sm:text-4xl text-center lg:text-[44px] font-bold text-gray-900 leading-tight py-2  text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   Latest <span className='text-green-600'>Developments</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Pioneering advancements in biofuel technology and compressed bio gas infrastructure 
              driving India's sustainable energy transformation
            </p>
            <div className="flex items-center justify-center mt-8 space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: August 2024</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full font-sans"></div>
              <span>7 Key Initiatives</span>
            </div>
          </div>
        </div>

        {/* Developments Timeline */}
        <div className="space-y-6">
          {developments.map((development, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {development.icon}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                          {development.title}
                        </h3>
                        <div className="flex items-center space-x-3 ml-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium font-sans border ${getStatusColor(development.status)}`}>
                            {development.status}
                          </span>
                          <span className="text-sm text-gray-500 font-medium font-sans">{development.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {development.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full transition-all duration-1000 group-hover:w-full"
                            style={{ width: `${75 + (index * 3)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 font-sans">
                          {75 + (index * 3)}% Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="h-1 bg-gradient-to-r from-green-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center space-x-4">
              <Factory className="w-12 h-12 text-green-100" />
              <div>
                <h3 className="text-3xl font-bold">150+</h3>
                <p className="text-green-100">Active Projects</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center space-x-4">
              <Zap className="w-12 h-12 text-blue-100" />
              <div>
                <h3 className="text-3xl font-bold">₹5000Cr</h3>
                <p className="text-blue-100">Investment Committed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-12 h-12 text-purple-100" />
              <div>
                <h3 className="text-3xl font-bold">25%</h3>
                <p className="text-purple-100">Growth Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestDevelopments;