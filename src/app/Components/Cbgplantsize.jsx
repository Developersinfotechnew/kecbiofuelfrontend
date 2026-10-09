import React, { useState, useEffect, useRef } from 'react';
import { 
  Factory, 
  Zap, 
  Leaf, 
  TrendingUp, 
  Award,
  Settings,
  BarChart3,
  Gauge
} from 'lucide-react';

const Cbgplantsize = () => {
  const [hoveredPlant, setHoveredPlant] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [capacityCounts, setCapacityCounts] = useState([0, 0, 0, 0, 0]);
  const sectionRef = useRef(null);

  const plantSizes = [
    {
      id: 1,
      capacity: "12",
      unit: "TPD",
      color: "from-blue-600 to-indigo-700",
      bgColor: "from-blue-50 to-indigo-100",
      icon: Factory
    },
    {
      id: 2,
      capacity: "7.2",
      unit: "TPD",
      color: "from-emerald-600 to-teal-700",
      bgColor: "from-emerald-50 to-teal-100",
      icon: TrendingUp
    },
    {
      id: 3,
      capacity: "4.8",
      unit: "TPD",
      color: "from-purple-600 to-pink-700",
      bgColor: "from-purple-50 to-pink-100",
      icon: Settings
    },
    {
      id: 4,
      capacity: "2.4",
      unit: "TPD",
      color: "from-orange-600 to-red-700",
      bgColor: "from-orange-50 to-red-100",
      icon: BarChart3
    },
    {
      id: 5,
      capacity: "2",
      unit: "TPD",
      color: "from-teal-600 to-cyan-700",
      bgColor: "from-teal-50 to-cyan-100",
      icon: Gauge
    }
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
      // Animate cards appearing
      plantSizes.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 150);
      });

      // Animate counters
      const targetValues = [12, 7.2, 4.8, 2.4, 2];
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCapacityCounts(targetValues.map(val => {
          const current = val * easeOut;
          return val % 1 === 0 ? Math.floor(current) : parseFloat(current.toFixed(1));
        }));

        if (step >= steps) {
          clearInterval(interval);
          setCapacityCounts(targetValues);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
           
          </div>
          <div className='flex justify-center gap-4'>
<div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-6 transition-all duration-300">
              <Factory className="w-8 h-8 text-white" />
            </div>
             <h2 className="text-3xl sm:text-4xl lg:text-[55px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                   CBG <span className='text-green-600'>Plant Sizes</span>
              </h2>
          </div>
           
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
            Choose from our range of Compressed Biogas (CBG) plants designed for different scales and applications.
          </p>
          <div className={`flex flex-wrap justify-center gap-4 text-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">100% Sustainable</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">High Efficiency</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-gray-700">Proven Technology</span>
            </div>
          </div>
        </div>

        {/* Plant Size Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {plantSizes.map((plant, index) => (
            <div
              key={plant.id}
              className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:scale-110 cursor-pointer ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${800 + index * 150}ms` }}
              onMouseEnter={() => setHoveredPlant(plant.id)}
              onMouseLeave={() => setHoveredPlant(null)}
            >
              {/* Header with Gradient */}
              <div className={`relative bg-gradient-to-br ${plant.color} p-8 text-white overflow-hidden h-48 flex flex-col items-center justify-center`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                     radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10 text-center">
                  <plant.icon className="w-16 h-16 text-white/90 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <div className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300 group-hover:scale-110">
                    {visibleCards.includes(index) ? capacityCounts[index] : 0}
                  </div>
                  <div className="text-lg font-medium opacity-90">{plant.unit}</div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500 animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700 animate-float-delayed"></div>
              </div>

              {/* Bottom Section */}
              <div className={`bg-gradient-to-br ${plant.bgColor} p-6 h-24 flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-tl`}>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">Tons Per Day</div>
                  <div className="text-sm text-gray-600 mt-1">Production Capacity</div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredPlant === plant.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none transition-all duration-300 animate-pulse-subtle"></div>
              )}

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-300 delay-100"></div>
            </div>
          ))}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-gradient-text {
          animation: gradient-text 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Cbgplantsize;