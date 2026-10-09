import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Beaker, Leaf, Factory, Zap, BarChart3, Settings, Wrench, Building } from 'lucide-react';

const RandDSectionTwo = () => {
  const [activeTab, setActiveTab] = useState('equipment');
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

  const equipment = [
    {
      name: "Floating Drum-Type Biogas Digester",
      capacity: "1 m³",
      material: "High-density polyethylene (HDPE)",
      features: ["Integrated floating gas holder", "Inlet/outlet ports", "Gas outlet nozzle", "Telescopic support"]
    },
    {
      name: "Methane Gas Analyser",
      capacity: "1 Unit",
      material: "Digital monitoring system",
      features: ["Real-time CH₄ concentration monitoring", "Gas quality assessment", "System efficiency tracking"]
    },
    {
      name: "Heat Exchanger Unit",
      capacity: "100 liters",
      material: "SS 304 grade coil",
      features: ["Feedstock preheating", "Temperature optimization", "Enhanced digestion efficiency"]
    },
    {
      name: "Biogas Booster Pump",
      capacity: "20 W",
      material: "Industrial grade",
      features: ["Gas pressure enhancement", "Distribution to appliances", "Reliable performance"]
    }
  ];

  const utilityRequirements = [
    { item: "Cow Dung", quantity: "400 kg", purpose: "Initial feedstock" },
    { item: "Potable Water", quantity: "500 liters", purpose: "Dilution and slurry preparation" },
    { item: "Power Supply", quantity: "10 KW (3 Phase)", purpose: "Electrical connection" },
    { item: "Manpower", quantity: "4-6 personnel", purpose: "Installation and operation" }
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className='flex justify-center items-center gap-4'>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl text-center lg:text-[40px] font-bold text-gray-900 leading-tight py-6 mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Equipment & <span className='text-green-600'>Infrastructure</span>
            </h2>
          </div>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            State-of-the-art equipment inventory for our Bulandshahr biogas R&D unit,
            designed for optimal research and development outcomes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-xl border border-green-100">
            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'equipment'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                }`}
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Equipment Inventory
            </button>
            <button
              onClick={() => setActiveTab('utilities')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'utilities'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                  : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                }`}
            >
              <Factory className="w-5 h-5 inline mr-2" />
              Utility Requirements
            </button>
          </div>
        </div>

        {/* Equipment Tab Content */}
        {activeTab === 'equipment' && (
          <div className="grid md:grid-cols-2 gap-8">
            {equipment.map((item, index) => (
              <div key={index} className="bg-white backdrop-blur-sm rounded-xl shadow-xl p-8 hover:shadow-2xl hover:bg-white transition-all duration-300 border border-green-100 hover:border-green-200">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-green-700 mb-4">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
                        Capacity: {item.capacity}
                      </span>
                      <span className="bg-green-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                        {item.material}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700 font-sans">
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-900 to-black-500 rounded-full mr-3 shadow-sm"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Utilities Tab Content */}
        {activeTab === 'utilities' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Utility & Feedstock Requirements
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {utilityRequirements.map((req, index) => (
                <div key={index} className="border-2 border-green-200 rounded-lg p-6 hover:bg-green-50/70 hover:border-green-300 transition-all duration-200 bg-gradient-to-br from-white to-green-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-green-800">{req.item}</h4>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {req.quantity}
                    </span>
                  </div>
                  <p className="text-green-700 font-sans">{req.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-200/30 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default RandDSectionTwo;