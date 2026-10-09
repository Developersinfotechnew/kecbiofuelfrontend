import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Leaf, Zap, Recycle, TrendingUp, Shield, MapPin, Phone, Mail, ArrowRight, CheckCircle, Factory, Truck, Home, Building, FlaskConical, Gauge } from 'lucide-react';

const BiogasSection = () => {
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

    const processSteps = [
        {
            title: "Feedstock",
            items: ["Cattle Dung", "Agricultural Waste", "Municipal Waste", "Food Waste"],
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="20" width="12" height="32" rx="2" fill="#8B4513" />
                    <ellipse cx="14" cy="16" rx="6" ry="4" fill="#654321" />
                    <rect x="24" y="24" width="16" height="28" rx="2" fill="#228B22" />
                    <path d="M32 20 L28 24 L36 24 Z" fill="#32CD32" />
                    <rect x="44" y="28" width="12" height="24" rx="2" fill="#FF6B35" />
                    <ellipse cx="50" cy="24" rx="6" ry="4" fill="#FF8C42" />
                </svg>
            )
        },
        {
            title: "Anaerobic Digester",
            description: "Biogas production through anaerobic decomposition",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
                    <ellipse cx="32" cy="45" rx="24" ry="12" fill="#4A5568" />
                    <rect x="20" y="20" width="24" height="30" rx="12" fill="#2D3748" />
                    <rect x="28" y="12" width="8" height="16" fill="#718096" />
                    <circle cx="32" cy="35" r="8" fill="#38A169" opacity="0.7" />
                    <circle cx="28" cy="32" r="3" fill="#68D391" opacity="0.8" />
                    <circle cx="36" cy="38" r="4" fill="#48BB78" opacity="0.6" />
                </svg>
            )
        },
        {
            title: "Biogas",
            description: "Raw biogas containing ~60% methane, ~40% CO2",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
                    <rect x="20" y="28" width="24" height="28" rx="12" fill="#E2E8F0" />
                    <rect x="28" y="20" width="8" height="16" fill="#CBD5E0" />
                    <circle cx="32" cy="42" r="6" fill="#68D391" opacity="0.8" />
                    <text x="32" y="46" textAnchor="middle" className="text-xs font-bold" fill="#2F855A">CH₄</text>
                    <circle cx="26" cy="36" r="3" fill="#63B3ED" opacity="0.7" />
                    <circle cx="38" cy="38" r="3" fill="#63B3ED" opacity="0.7" />
                </svg>
            )
        },
        {
            title: "Purification",
            description: "CO2 removal to increase methane content >90%",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
                    <rect x="16" y="24" width="32" height="24" rx="4" fill="#4299E1" />
                    <rect x="20" y="28" width="24" height="16" rx="2" fill="#63B3ED" />
                    <circle cx="26" cy="36" r="3" fill="#68D391" />
                    <circle cx="32" cy="36" r="3" fill="#68D391" />
                    <circle cx="38" cy="36" r="3" fill="#68D391" />
                    <rect x="28" y="16" width="8" height="12" fill="#A0AEC0" />
                    <rect x="28" y="48" width="8" height="8" fill="#A0AEC0" />
                </svg>
            )
        },
        {
            title: "Compressor",
            description: "Compression at 250 bar for transportation",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
                    <rect x="12" y="20" width="40" height="24" rx="4" fill="#48BB78" />
                    <rect x="16" y="24" width="32" height="16" rx="2" fill="#68D391" />
                    <circle cx="24" cy="32" r="4" fill="#38A169" />
                    <circle cx="32" cy="32" r="4" fill="#38A169" />
                    <circle cx="40" cy="32" r="4" fill="#38A169" />
                    <rect x="28" y="12" width="8" height="12" fill="#A0AEC0" />
                    <rect x="28" y="44" width="8" height="8" fill="#A0AEC0" />
                    <text x="32" y="50" textAnchor="middle" className="text-xs font-bold" fill="#2F855A">250bar</text>
                </svg>
            )
        }
    ];

    const applications = [
        {
            title: "Domestic Customers",
            icon: <Home className="w-8 h-8" />,
            color: "from-green-400 to-green-600"
        },
        {
            title: "Industrial Customers",
            icon: <Factory className="w-8 h-8" />,
            color: "from-blue-400 to-blue-600"
        },
        {
            title: "CNG Vehicle Customers",
            icon: <Truck className="w-8 h-8" />,
            color: "from-purple-400 to-purple-600"
        },
        {
            title: "Commercial Customers",
            icon: <Building className="w-8 h-8" />,
            color: "from-orange-400 to-orange-600"
        }
    ];

    const purificationTechnologies = [
        "Pressure Swing Adsorption (PSA)",
        "Vacuum Swing Adsorption (VSA)",
        "Water Scrubbing",
        "Membrane Separation",
        "Chemical Scrubbing - Monoethylamine (MEA)"
    ];

    const standardsData = [
        { sNo: 1, characteristic: "Methane (CH4), minimum %", requirement: "90.0%" },
        { sNo: 2, characteristic: "Only Carbon Dioxide (CO2), maximum %", requirement: "4%" },
        { sNo: 3, characteristic: "Carbon Dioxide (CO2) + Nitrogen (N2) + Oxygen (O2), maximum %", requirement: "10%" },
        { sNo: 4, characteristic: "Oxygen (O2), maximum %", requirement: "0.5%" },
        { sNo: 5, characteristic: "Total sulphur (including H2S) mg/m3, maximum %", requirement: "20 mg/m3" },
        { sNo: 6, characteristic: "Moisture mg/m3, maximum %", requirement: "5 mg/m3" }
    ];

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 transition-all duration-1000 ease-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
            }}
        >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
                <div className="container mx-auto px-6 py-20 relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-green-100">
                                    <Leaf className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-green-600 font-bold">KEC Initiative</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                    Biogas to CBG
                                </h1>

                                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                    Biogas is an energy-rich gas produced by anaerobic decomposition of biomass. It is produced from waste/bio-mass sources like agriculture residue, cattle dung, sugarcane press mud, municipal solid waste, sewage treatment plant waste, etc.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        Explore Process
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-green-100">
                                    <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-2xl">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Biogas Composition</h3>
                                        <div className="space-y-4 font-sans">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Methane (CH4)</span>
                                                <span className="font-bold text-green-600">~60%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Carbon Dioxide (CO2)</span>
                                                <span className="font-bold text-blue-600">~40%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Hydrogen Sulfide</span>
                                                <span className="font-bold text-orange-600">Traces</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Flow Section */}
            <div className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
                            CBG <span className="text-green-600">Production Process</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            From organic waste to compressed biogas - A complete sustainable energy cycle
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-5 gap-8 items-center">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative">
                                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105 mb-4">
                                            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-3 rounded-xl w-fit mx-auto mb-4">
                                                {step.icon}
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                                            {step.description && (
                                                <p className="text-sm text-gray-600 font-sans">{step.description}</p>
                                            )}
                                            {step.items && (
                                                <div className="text-sm text-gray-600 mt-2 font-sans">
                                                    {step.items.map((item, idx) => (
                                                        <div key={idx}>{item}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {index < processSteps.length - 1 && (
                                            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                                <ArrowRight className="w-6 h-6 text-green-500" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Purification Technologies Section */}
            <div className="py-20 bg-white">
                <div className='text-center mb-12'>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Biogas <span className="text-blue-600">Purification</span>
                    </h2>
                </div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div className="text-center mb-12">
                                <p className="text-base font-sans text-gray-600 max-w-3xl mx-auto">
                                    Production of biogas could be a continuous process. The utilization of biogas as an efficient energy source depends strongly on its methane concentration. Therefore, biogas purification is essential in order to have more energy per unit volume of compressed biogas and to get rid of the corrosive effect of H2S.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-lg border border-green-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                    Purification Benefits
                                </h3>
                                <div className="space-y-4 font-sans">
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Increases methane concentration to 90%</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Removes corrosive H2S and CO2</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Improves energy density for compression</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg border border-blue-200">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                    <FlaskConical className="w-8 h-8 text-blue-600" />
                                    Purification Technologies
                                </h3>
                                <div className="space-y-3">
                                    {purificationTechnologies.map((tech, index) => (
                                        <div key={index} className="p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                                                </div>
                                                <span className="text-gray-700 font-medium font-sans">{tech}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-8">
                            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-3xl shadow-2xl border border-purple-200 h-full">
                                <div className="relative mb-6">
                                    <Image
                                      src="/images/biogaspurification.jpg"
                                      alt="Industrial Purification Plant"
                                      width={800}
                                      height={600}
                                      className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold mb-1">Industrial Purification Plant</h3>
                                        <p className="text-sm opacity-90 font-sans">Advanced biogas processing facility</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-lg">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                                        <Gauge className="w-6 h-6 text-purple-600" />
                                        Purification Results
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6 font-sans">
                                        Advanced purification systems remove CO2 and impurities to achieve methane content 90% as per IS 16087:2016 specifications.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 mb-1 font-sans">Raw Biogas</p>
                                                <p className="text-2xl font-bold text-red-600">~60%</p>
                                                <p className="text-xs text-gray-500 font-sans">Methane Content</p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                            <div className="text-center">
                                                <p className="text-sm text-gray-600 mb-1 font-sans">Purified CBG</p>
                                                <p className="text-2xl font-bold text-green-600">90%</p>
                                                <p className="text-xs text-gray-500 font-sans">Methane Content</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compression Section */}
            <div className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-orange-100 to-red-100 p-8 rounded-3xl shadow-2xl">
                                <Image
                                  src="/images/compression.jpg"
                                  alt="Compression System"
                                  width={800}
                                  height={600}
                                  className="w-full h-64 object-cover rounded-2xl mb-6"
                                />
                                <div className="bg-white p-6 rounded-2xl shadow-lg">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Cascade Storage & Transportation</h3>
                                    <p className="text-gray-500 leading-relaxed font-sans">
                                        Compressed biogas filled and transported through cascades (high pressure cylindrical vessels). For CBG delivery, 3000 litres metal cascades or higher capacity cascades are used.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                                <span className="text-orange-600">Compression</span> Process
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                The purified biogas with more than 90% of methane can be compressed at 250 bar, and transported in gas cylinders (cascades) for the end use.
                            </p>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">Compression Specifications:</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-gray-600 font-sans">Pressure:</span>
                                            <p className="font-bold text-orange-600">250 bar</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600 font-sans">Cascade Capacity:</span>
                                            <p className="font-bold text-orange-600">3000+ litres</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">Safety Standards:</h3>
                                    <ul className="space-y-2 text-gray-500 font-sans">
                                        <li className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-blue-500" />
                                            <span>IS 7285 for steel cylinder cascades</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-blue-500" />
                                            <span>IS 15593 for composite cascades</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CBG Standards Section */}
            <div className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
                            CBG Quality <span className="text-green-600">Standards</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-10">
                            CBG has calorific value and other properties similar to CNG and can be utilized as green renewable automotive fuel. CBG supplied KEC scheme shall meet IS 16087:2016 specifications.
                        </p>                     
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-br from-green-300 via-green-100 to-green-200 px-8 py-6">
                                <h3 className="text-2xl font-bold text-gray-800 text-center">IS 16087 : 2016 Standard</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full ">
                                    <thead className="bg-gradient-to-r from-green-100 to-green-200">
                                        <tr>
                                            <th className="px-8 py-4 text-left font-bold text-gray-800">S No.</th>
                                            <th className="px-8 py-4 text-left font-bold text-gray-800">Characteristic</th>
                                            <th className="px-6 py-4 text-left font-bold text-gray-800">Requirement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {standardsData.map((row, index) => (
                                            <tr key={index} className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                                <td className="px-10 py-4 font-semibold text-gray-700">{row.sNo}</td>
                                                <td className="px-10 py-4 text-gray-600 font-sans">{row.characteristic}</td>
                                                <td className="px-8 py-4 font-bold text-green-600">{row.requirement}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-gray-700">
                            CBG <span className="text-green-600">Applications</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-4xl mx-auto">
                            Compressed Bio Gas can replace CNG in automotive, industrial and commercial areas. Ministry of Road Transport and Highways permits usage of bio-compressed natural gas for motor vehicles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {applications.map((app, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-gray-100">
                                    <div className={`h-32 bg-gradient-to-br ${app.color} flex items-center justify-center`}>
                                        <div className="text-white">
                                            {app.icon}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-purple-600 transition-colors">
                                            {app.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-br from-green-50 via-green-100 to-green-400 ">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-600">
                        Join the CBG Revolution
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Be part of India's sustainable energy future with compressed biogas technology
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <Phone className="w-5 h-5" />
                            Get Started
                        </button>
                        <button className="bg-white/30 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-full text-gray-600 font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiogasSection;