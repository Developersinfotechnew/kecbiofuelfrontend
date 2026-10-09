import React, { useState, useEffect, useRef } from 'react';
import { FileText, Users, Shield, Handshake, ShoppingCart, ArrowRight, CheckCircle, Clock, MapPin, DollarSign, Building, Zap } from 'lucide-react';

const MajorProcess = () => {
    const [activeStep, setActiveStep] = useState(0);
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
            id: 0,
            title: "Expression Of Interest",
            icon: FileText,
            color: "bg-gradient-to-br from-green-300 via-green-100 to-green-200",
            bgColor: "bg-white-100",
            borderColor: "border-blue-200",
            description: "An Expression of Interest is floated by Oil & Gas Companies every month. .",
            details: [
                "EOI open for 30 days stipulated time period",
                "Applicant must include location of proposed/existing plant",
                "Expected CBG Production Capacity to be mentioned",
                "Multiple CBG Plants can be proposed under one application",
                "Minimum designed capacity: 2.0 Tonnes Per Day (TPD) of CBG",
                "Application submitted through e-tendering portal with valid Digital Certificate"
            ]
        },
        {
            id: 1,
            title: "Letter of Intent",
            icon: Users,
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
            description: "EOI Submission is followed by evaluation on predefined parameters, leading to Letter of Intent issuance.",
            details: [
                "Evaluation of EOI on predefined set of parameters",
                "Qualified applicants receive Letter of Intent",
                "Issued by respective Oil & Gas Company",
                "Foundation step for further process initiation"
            ]
        },
        {
            id: 2,
            title: "Retail Outlet Selection",
            icon: MapPin,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            description: "After LOI acceptance, bank guarantee submission is required to safeguard OMCs investment.",
            details: [
                "For existing Bio-gas/CBG Plants: Rs. 1 lakh per CBG Plant bank guarantee",
                "For new Plants: Rs. 5 lakh per CBG Plant bank guarantee",
                "Bank guarantee to be obtained within one month after LOI issuance",
                "Upon successful submission, state office intimation follows",
                "Retail Outlets finalized based on CBG Plant location and production capacity"
            ]
        },
        {
            id: 3,
            title: "Commercial Agreement",
            icon: Handshake,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            description: "Execution of commercial agreement between Oil & Gas Company and LOI Holder.",
            details: [
                "Agreement executed upon successful RO allocation",
                "Includes plant location details",
                "Initial production capacity specification",
                "RO allocation details",
                "Pricing model details to be followed"
            ]
        },
        {
            id: 4,
            title: "Sale of CBG through RO",
            icon: ShoppingCart,
            color: "from-indigo-500 to-purple-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            description: "RO infrastructure development and CBG sales commencement.",
            details: [
                "RO infrastructure development planned according to estimated commissioning date",
                "CBG supply by LOI Holder to Allocated ROs via cascades",
                "Sale of CBG commenced through retail outlets",
                "Continuous supply chain management"
            ]
        }
    ];

    const ProcessCard = ({ step, index, isActive, onClick }) => {
        const Icon = step.icon;

        return (
            <div
                className={`relative cursor-pointer transition-all duration-500 transform hover:scale-105 ${isActive ? 'scale-105' : ''
                    }`}
                onClick={onClick}
            >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-0">
                        <div className={`h-full bg-gradient-to-r ${step.color} transform origin-left transition-all duration-1000 ${isActive || activeStep > index ? 'scale-x-100' : 'scale-x-0'
                            }`}></div>
                    </div>
                )}

                {/* Card */}
                <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-500 hover:shadow-2xl ${isActive ? `${step.borderColor} shadow-2xl` : 'border-gray-200'
                    }`}>
                    <div className={`p-6 rounded-t-2xl bg-gradient-to-r ${step.color} text-white`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className={`w-4 h-4 bg-gradient-to-r ${step.color} rounded-full animate-pulse`}></div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const DetailPanel = ({ step }) => {
        const Icon = step.icon;

        return (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className={`p-8 bg-gradient-to-r ${step.color} text-white`}>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                            <Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
                            <p className="text-gray-800 font-sans">Step {step.id + 1} of {processSteps.length}</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed ">{step.description}</p>
                </div>

                <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                        Key Requirements & Details
                    </h3>

                    <div className="space-y-4">
                        {step.details.map((detail, index) => (
                            <div key={index} className="flex items-start group">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                                <p className="text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors duration-300 font-sans">
                                    {detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const ProcessFlow = () => (
        <div className="relative bg-gradient-to-br from-green-300 via-green-100 to-green-200 rounded-3xl p-8 text-gray-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-center">Complete Process Flow</h3>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveStep(index)}>
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${activeStep === index ? 'scale-110 ring-4 ring-white/30' : ''
                                        }`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold mb-1">Step {index + 1}</p>
                                        <p className="text-xs text-gray-800 max-w-20 font-sans">{step.title}</p>
                                    </div>
                                </div>

                                {index < processSteps.length - 1 && (
                                    <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-10 transition-all duration-1000 ease-out"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
            }}
        >
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 font-sans bg-gradient-to-br from-green-300 via-green-100 to-green-200 text-gray-800 px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <Zap className="w-4 h-4" />
                        <span>CBG Implementation Process</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-900 via-green-500 to-green-400 bg-clip-text text-transparent mb-4">
                        Major Steps Involved
                    </h1>
                    <p className="text-lg text-gray-500 font-sans max-w-2xl mx-auto leading-relaxed">
                        Comprehensive step-by-step guide for CBG plant implementation, from initial expression of interest to commercial operations.
                    </p>
                </div>

                {/* Process Flow Overview */}
                <div className="mb-12">
                    <ProcessFlow />
                </div>

                {/* Interactive Process Cards */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Interactive Process Steps</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 font-sans">
                        {processSteps.map((step, index) => (
                            <ProcessCard
                                key={step.id}
                                step={step}
                                index={index}
                                isActive={activeStep === index}
                                onClick={() => setActiveStep(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Detailed Information Panel */}
                <div className="mb-12">
                    <DetailPanel step={processSteps[activeStep]} />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <Clock className="w-8 h-8 text-blue-500" />
                            <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-semibold text-blue-700">Timeline</div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">30 Days</h3>
                        <p className="text-gray-500 font-sans">EOI Application Period</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <Building className="w-8 h-8 text-green-500" />
                            <div className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-700">Capacity</div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">2.0 TPD</h3>
                        <p className="text-gray-500 font-sans">Minimum CBG Production</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <Shield className="w-8 h-8 text-purple-500" />
                            <div className="bg-purple-100 px-3 py-1 rounded-full text-sm font-semibold text-purple-700">Guarantee</div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">₹1-5 Lakh</h3>
                        <p className="text-gray-500 font-sans">Bank Guarantee Range</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <DollarSign className="w-8 h-8 text-orange-500" />
                            <div className="bg-orange-100 px-3 py-1 rounded-full text-sm font-semibold text-orange-700">Investment</div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Protected</h3>
                        <p className="text-gray-500 font-sans">OMC Investment Security</p>
                    </div>
                </div>

                {/* Process Gear Animation */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center space-x-4 p-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl">
                        {/* Animated Gears */}
                        <div className="relative">
                            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative -ml-4">
                            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative -ml-4">
                            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '5s' }}>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-10 h-10 bg-teal-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Seamless Process Integration</h3>
                        <p className="text-gray-500 font-sans">Each step works in perfect harmony to ensure successful CBG implementation</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MajorProcess;