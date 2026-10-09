import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Beaker, Leaf, Factory, Zap, BarChart3, Settings, Wrench, Building } from 'lucide-react';

const RandDSectionFour = () => {
  const [activeProcess, setActiveProcess] = useState(0);
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

  const processes = [
    {
      title: "Feedstock Preparation",
      icon: <Settings className="w-8 h-8" />,
      description: "Pre-processing and optimization of raw materials for consistent biogas yield",
      details: [
        "Mechanical chopping of Napier grass to reduce particle size",
        "Manual mixing of press mud, cow dung, and DAF sludge with mother liquor",
        "C/N ratio optimization based on volatile solids content",
        "Filtration to remove large debris and contaminants"
      ],
      color: "bg-blue-500"
    },
    {
      title: "Anaerobic Digestion",
      icon: <Beaker className="w-8 h-8" />,
      description: "Controlled biogas generation under mesophilic conditions",
      details: [
        "Floating-drum digesters operated at 33–37°C",
        "Continuous temperature monitoring with digital thermometers",
        "Methanogenic bacteria breakdown in oxygen-free environment",
        "Real-time gas volume monitoring using digital flow meters"
      ],
      color: "bg-green-500"
    },
    {
      title: "Gas Purification & CBG",
      icon: <Zap className="w-8 h-8" />,
      description: "Upgrading raw biogas to high-quality Compressed Biogas",
      details: [
        "H₂S removal using iron oxide filters",
        "Moisture separation through mechanical traps",
        "CO₂ separation via water scrubber or PSA unit",
        "95%+ methane concentration achievement"
      ],
      color: "bg-purple-500"
    },
    {
      title: "Digestate Management",
      icon: <Leaf className="w-8 h-8" />,
      description: "Zero-waste processing and circular economy implementation",
      details: [
        "Solid digestate separation using screw press",
        "Sun-drying for composting or vermicomposting",
        "Liquid digestate collection for organic fertilizer",
        "Complete circular bioeconomy contribution"
      ],
      color: "bg-emerald-500"
    }
  ];

  const keyFindings = [
    {
      metric: "Daily CBG Output",
      value: "15-20 m³/day",
      description: "High-quality compressed biogas production"
    },
    {
      metric: "Total Biogas Yield",
      value: "25-33 m³/day",
      description: "Raw biogas before purification"
    },
    {
      metric: "Temperature Range",
      value: "32°C–37°C",
      description: "Optimal mesophilic conditions maintained"
    },
    {
      metric: "Methane Concentration",
      value: "90-95%",
      description: "After purification and upgrading"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-r from-green-200 via-yellow-50 to-green-200 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Method Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl text-center lg:text-[45px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Research Methodology  <span className='text-green-600'>& Results</span>
            </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Our systematic approach to multi-feedstock biogas production with comprehensive 
            process optimization and performance analysis.
          </p>
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-500 mb-8 text-center">Process Flow</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  activeProcess === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveProcess(index)}
              >
                <div className={`${process.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4`}>
                  {process.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{process.description}</p>

                {/* Always show details */}
                <ul className="space-y-2">
                  {process.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-500 font-sans">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-xl shadow-lg p-8">
           <h2 className="text-3xl sm:text-4xl text-center lg:text-[40px] font-bold text-gray-900 leading-tight mb-2 py-4 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Key Research  <span className='text-green-600'>Findings & Discussion</span>
            </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyFindings.map((finding, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white mb-4">
                  <div className="text-2xl font-bold mb-2">{finding.value}</div>
                  <div className="text-sm opacity-90">{finding.metric}</div>
                </div>
                <p className="text-gray-600 text-sm">{finding.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 ">Research Conclusions</h4>
            <div className="space-y-4 text-gray-500 font-medium font-sans">
              <p>
                The integrated anaerobic digestion of multi-feedstocks demonstrates the viability of 
                hybrid input strategies for small-to-medium scale CBG production. The synergy between 
                high-carbon and high-nitrogen materials enabled optimized C/N ratios, contributing to 
                improved microbial activity.
              </p>
              <p>
                Gas yields per kg of volatile solids aligned with literature values, while the addition 
                of DAF sludge and mother liquor enhanced nutrient balance without inhibiting digestion. 
                The digestate produced showed high nutrient retention, supporting agricultural reuse.
              </p>
              <p>
                These findings support the scalability of decentralized biogas units using regionally 
                available biomass and waste streams, with potential for replication in rural and 
                peri-urban locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandDSectionFour;
