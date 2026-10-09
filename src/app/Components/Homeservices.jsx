'use client';

import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'PMC Services',
    description:
      'Comprehensive Project Management Consultancy for biofuel infrastructure – from feasibility to commissioning. We ensure timely execution and quality at every stage.',
    icon: '📝',
    link: '/services/pmc',
  },
  {
    title: 'EPC Solutions',
    description:
      'Turnkey Engineering, Procurement & Construction for Bio-CNG, Bio-Diesel, and Ethanol plants across India. From design to commissioning, we deliver end-to-end solutions.',
    icon: '🏗️',
    link: '/services/epc',
  },
  {
    title: 'PPP Projects',
    description:
      'Working with state governments under PPP mode, including ₹500 Cr MoU with Uttarakhand for bio-energy parks. We create sustainable public-private partnerships for clean energy.',
    icon: '🤝',
    link: '/services/ppp',
  },
  {
    title: 'Project Developer – CAPEX / OPEX',
    description:
      'Build, own, and operate biofuel projects under flexible models like CAPEX, OPEX, and RESCO partnerships. We offer complete project development and operational support.',
    icon: '⚙️',
    link: '/services/development',
  },
  {
    title: 'O&M Services',
    description:
      'Operation & Maintenance of biofuel, ETP/STP, and gas purification systems with efficiency-driven SLAs. We maximize plant performance, reliability, and uptime.',
    icon: '🔧',
    link: '/services/maintenance',
  },
  {
    title: 'Revamp & Upgrade',
    description:
      'Modernize outdated biogas, STP, or ETP plants with new tech, automation, and performance optimization. We improve efficiency while extending plant life.',
    icon: '🔄',
    link: '/services/upgradation',
  },
  {
    title: 'Hydrogen & Renewables',
    description:
      'Emerging solutions in hydrogen production, solar integration, and next-gen renewables for clean energy. We help businesses transition toward a cleaner energy future.',
    icon: '⚡',
    link: '/services/hydrogen',
  },
  {
    title: 'Tech Advisory & DPR',
    description:
      'Detailed Project Reports (DPR), techno-economic feasibility, and advisory for scalable green energy rollouts. We turn concepts into practical and investment-ready projects.',
    icon: '📊',
    link: '/services/advisory',
  },
];

const Homeservices = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 text-white py-16 px-4 sm:px-6 md:px-8 overflow-hidden">
      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.2); }
          50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.4); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-slide-in-down { animation: slideInDown 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover-effect:hover {
          transform: translateY(-12px) scale(1.03);
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-300/20 rounded-full blur-3xl animate-float delay-200"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-300/15 rounded-full blur-2xl animate-float delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center ${isVisible ? 'animate-slide-in-down' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-green-100 mb-4 sm:mb-4 animate-pulse-glow">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">BUILD WITH EASE</span>
            <div className="w-6 sm:w-8 h-px bg-green-300"></div>
          </div>
          <h2 className="text-3xl lg:text-[45px] font-bold text-green-800 leading-tight text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text animate-gradient-shift">
            Powerful <span className="text-green-600">Features</span>
          </h2>
        </div>

        {/* Scroll Buttons */}
        <div className={`flex justify-end mb-4 gap-2 ${isVisible ? 'animate-slide-in-right delay-200' : 'opacity-0'}`}>
          <button
            onClick={scrollLeft}
            className="text-orange-500 border-2 border-orange-500 px-4 py-2 font-bold rounded-lg hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 hover:shadow-lg active:scale-95"
            aria-label="Scroll left"
            type="button"
          >
            &#8592;
          </button>
          <button
            onClick={scrollRight}
            className="text-white text-transparent bg-orange-500  border-2 border- px-4 py-2 font-bold rounded-lg hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 hover:shadow-lg active:scale-95"
            aria-label="Scroll right"
            type="button"
          >
            &#8594;
          </button>
        </div>

        {/* Services Cards */}
        <div
          ref={scrollRef}
          className="
            flex flex-nowrap gap-6 overflow-x-auto overflow-y-hidden pb-4
            hide-scrollbar scroll-smooth touch-pan-x snap-x snap-mandatory
            overscroll-x-contain
          "
          role="region"
          aria-label="Services carousel"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                min-w-[250px] sm:min-w-[280px] lg:min-w-[300px]
                bg-white text-left text-black rounded-xl p-6 
                flex flex-col justify-between shadow-md hover:shadow-2xl 
                transition-all duration-300 snap-start
                card-hover-effect relative overflow-hidden
                ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shimmer effect on hover */}
              {hoveredCard === index && (
                <div className="absolute inset-0 shimmer-effect pointer-events-none"></div>
              )}

              {/* Card content */}
              <div>
                <div className={`text-4xl mb-4 inline-block ${hoveredCard === index ? 'animate-bounce-subtle' : ''} transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-700 transition-colors duration-300 hover:text-green-600">
                  {service.title}
                </h3>
                <p className="font-sans text-sm mb-2 text-justify text-gray-600">
                  {service.description}
                </p>
              </div>
              <Link href="/about">

                <button className=" bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold cta-button animate-fadeInUp" style={{ animationDelay: '0.6s', opacity: 100 }}>
                  LEARN MORE
                </button>
              </Link>

              {/* Hover gradient border effect */}
              <div className={`absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 ${hoveredCard === index ? 'border-green-400 shadow-lg shadow-green-200' : ''
                }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homeservices;