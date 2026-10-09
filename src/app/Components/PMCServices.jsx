import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Cog, Users, TrendingUp, Shield, Award } from 'lucide-react';

const PMCServices = () => {
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

  const services = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "EPC SERVICES",
      description: "Complete Engineering, Procurement, and Construction solutions for renewable energy projects."
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "TURNKEY SOLUTIONS",
      description: "End-to-end project delivery from concept to commissioning with comprehensive support."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "OPERATIONAL & MAINTENANCE SOLUTIONS",
      description: "Long-term operational support and maintenance services for optimal plant performance."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "DEVELOPER OF CBG PARK",
      description: "Strategic development and establishment of Compressed Bio-Gas parks across India."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "JOINT VENTURE & PPP",
      description: "Public-Private Partnership models for sustainable and scalable project development."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "ALLIED SERVICES",
      description: "Comprehensive support services including financial assistance and technical consultation."
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Assessment",
      description: "Project feasibility and technical assessment",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      number: "2",
      title: "Development",
      description: "Detailed project planning and development",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      number: "3",
      title: "Execution",
      description: "Project implementation and construction",
      bgColor: "bg-purple-100",
      textColor: "text-purple-500"
    },
    {
      number: "4",
      title: "Commercialization",
      description: "Market establishment and operations",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-800 ease-out"
            data-id="header"
            style={{
              opacity: isVisible.header ? 1 : 0,
              transform: isVisible.header ? 'translateY(0)' : 'translateY(-30px)'
            }}
          >
             <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                PMC <span className='text-green-600'>Services</span>
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
            className="text-lg text-gray-400 max-w-3xl mx-auto transition-all duration-700"
            data-id="subtitle"
            style={{
              opacity: isVisible.subtitle ? 1 : 0,
              transform: isVisible.subtitle ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '400ms'
            }}
          >
            We facilitate PMC & EPC services as technical assistance and financial approach 
            to all prospective promoters, providing End-to-End solutions for plant setup
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border-t-4 border-green-600"
              data-id={`service-${index}`}
              style={{
                opacity: isVisible[`service-${index}`] ? 1 : 0,
                transform: isVisible[`service-${index}`] 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(40px) scale(0.95)',
                transition: 'all 0.7s ease-out',
                transitionDelay: `${600 + index * 100}ms`
              }}
            >
              <div 
                className="text-green-600 mb-4 transition-all duration-600"
                style={{
                  opacity: isVisible[`service-${index}`] ? 1 : 0,
                  transform: isVisible[`service-${index}`] ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
                  transitionDelay: `${700 + index * 100}ms`
                }}
              >
                {service.icon}
              </div>
              <h3 
                className="text-xl font-semibold text-gray-800 mb-3 transition-all duration-600"
                style={{
                  opacity: isVisible[`service-${index}`] ? 1 : 0,
                  transform: isVisible[`service-${index}`] ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${800 + index * 100}ms`
                }}
              >
                {service.title}
              </h3>
              <p 
                className="text-gray-500 text-[15px] leading-relaxed font-sans text-justify transition-all duration-600"
                style={{
                  opacity: isVisible[`service-${index}`] ? 1 : 0,
                  transform: isVisible[`service-${index}`] ? 'translateY(0)' : 'translateY(15px)',
                  transitionDelay: `${900 + index * 100}ms`
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Flow Section */}
        <div 
          className="bg-white rounded-xl p-8 shadow-lg transition-all duration-800 ease-out"
          data-id="process"
          style={{
            opacity: isVisible.process ? 1 : 0,
            transform: isVisible.process ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)'
          }}
        >
          <h3 
            className="text-3xl font-semibold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text mb-10 text-center transition-all duration-700"
            style={{
              opacity: isVisible.process ? 1 : 0,
              transform: isVisible.process ? 'translateY(0)' : 'translateY(-20px)',
              transitionDelay: '200ms'
            }}
          >
            Our Project Management Process
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="text-center transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible.process ? 1 : 0,
                  transform: isVisible.process ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                  transitionDelay: `${400 + index * 150}ms`
                }}
              >
                <div 
                  className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-600`}
                  style={{
                    opacity: isVisible.process ? 1 : 0,
                    transform: isVisible.process ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
                    transitionDelay: `${500 + index * 150}ms`
                  }}
                >
                  <span className={`text-2xl font-bold ${step.textColor}`}>{step.number}</span>
                </div>
                <h4 
                  className="font-semibold text-gray-800 mb-2 transition-all duration-600"
                  style={{
                    opacity: isVisible.process ? 1 : 0,
                    transform: isVisible.process ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${600 + index * 150}ms`
                  }}
                >
                  {step.title}
                </h4>
                <p 
                  className="text-sm text-gray-500 font-sans transition-all duration-600"
                  style={{
                    opacity: isVisible.process ? 1 : 0,
                    transform: isVisible.process ? 'translateY(0)' : 'translateY(10px)',
                    transitionDelay: `${700 + index * 150}ms`
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PMCServices;