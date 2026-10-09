import React, { useState } from 'react';
import {
    ChevronRight,
    ChevronDown,
    Zap,
    Leaf,
    Settings,
    Droplets,
    Wind,
    Factory
} from 'lucide-react';
// Import Flask separately to avoid barrel optimization issues
import { Beaker } from 'lucide-react';

const TechnologySection = () => {
    const [expandedSections, setExpandedSections] = useState({
        'anaerobic-digestion': true
    });

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const CollapsibleSection = ({ id, title, children, icon: Icon, gradient }) => {
        const isExpanded = expandedSections[id];

        return (
            <div className="mb-8">
                <div
                    className={`${gradient} p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group`}
                    onClick={() => toggleSection(id)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                {Icon && <Icon className="w-6 h-6 text-white" />}
                            </div>
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                            {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-white transition-transform duration-300" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-white transition-transform duration-300" />
                            )}
                        </div>
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    const ProcessStep = ({ number, title, description, color }) => (
        <div className="relative group">
            <div className={`absolute -left-4 top-0 w-8 h-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {number}
            </div>
            <div className="ml-8 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-green-400 hover:shadow-md transition-shadow duration-300">
                <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );

    const TechCard = ({ title, description, advantages, disadvantages, image, gradient }) => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className={`${gradient} p-6 text-white`}>
                <h4 className="text-lg font-bold mb-2">{title}</h4>
                <p className="text-white/90 text-sm">{description}</p>
            </div>

            {image && (
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500 p-4">
                        {image}
                    </div>
                </div>
            )}

            <div className="p-6 space-y-6">
                {advantages && (
                    <div>
                        <h5 className="font-semibold text-green-700 mb-3 flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            Advantages
                        </h5>
                        <div className="space-y-2">
                            {advantages.map((advantage, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                                    <span className="text-gray-700 text-sm">{advantage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {disadvantages && (
                    <div>
                        <h5 className="font-semibold text-red-600 mb-3 flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Disadvantages
                        </h5>
                        <div className="space-y-2">
                            {disadvantages.map((disadvantage, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                                    <span className="text-gray-700 text-sm">{disadvantage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const PurificationTechCard = ({ title, description, icon: Icon, color }) => (
        <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <Leaf className="w-4 h-4" />
                        <span>Clean Energy Technology</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-white-600 to-green-600 bg-clip-text text-transparent mb-3">
                        CBG Production Technology
                    </h1>
                    <p className="text-lg font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive overview of Compressed Bio Gas production, purification, and bottling technologies for sustainable energy solutions.
                    </p>
                </div>

                {/* Overview Card */}
                <div className="bg-gradient-to-br from-green-300 via-green-100 to-green-200 rounded-3xl p-8 text-gray-800 mb-12 shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                        <Factory className="w-8 h-8 mr-3" />
                        What is CBG?
                    </h2>
                    <p className="text-lg mb-6 text-gray-800 leading-relaxed">
                        CBG or Compressed Bio Gas consists of mainly methane (more than 90%) and other gases like carbon dioxide (less than 4%).
                        CBG is produced by anaerobic digestion of biomass and waste sources like agricultural residue, cattle dung, sugarcane press mud,
                        municipal solid waste, sewage treatment plant waste, etc.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 font-sans">
                        <ProcessStep
                            number="1"
                            title="Hydrolysis"
                            description="Decomposes organic molecules into glucose, amino acids and fatty acids"
                            color="bg-green-500"
                        />
                        <ProcessStep
                            number="2"
                            title="Acidogenesis"
                            description="Converts organic molecules to volatile organic acids with bacteria"
                            color="bg-blue-500"
                        />
                        <ProcessStep
                            number="3"
                            title="Acetogenesis"
                            description="Bacteria digests volatile organic acids and releases acetic acid"
                            color="bg-purple-500"
                        />
                        <ProcessStep
                            number="4"
                            title="Methanogenesis"
                            description="Converts acetic acid to methane gas and other many gases"
                            color="bg-orange-500"
                        />
                    </div>
                </div>

                {/* Anaerobic Digestion Technologies */}
                <CollapsibleSection
                    id="anaerobic-digestion"
                    title="Anaerobic Digestion Technologies"
                    icon={Settings}
                    gradient="bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Technology Overview</h3>
                            <p className="text-gray-500 leading-relaxed font-sans">
                                An Anaerobic Digester optimizes the anaerobic digestion of biomass to produce biogas for energy production.
                                These systems can be made of concrete, steel, brick, or plastic, and come in various configurations including
                                batch type digesters and continuous digesters.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
                            <TechCard
                                title="CSTR Digester"
                                description="Continuously stirred tank reactor with constant material feed"
                                gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                                image={
                                    <div>
                                        <div className="text-lg font-semibold mb-2">CSTR System Components</div>
                                        <div className="text-sm text-gray-600">
                                            Floating roof • Gas-storage space • Central column<br />
                                            Long-shaft stirrer • Heating pipes • Insulation
                                        </div>
                                    </div>
                                }
                                advantages={[
                                    "Efficient digestion process",
                                    "Handles different dry matter content levels",
                                    "Can digest energy crops effectively",
                                    "Excellent mixing capabilities",
                                    "Superior solids degradation"
                                ]}
                                disadvantages={[
                                    "Complex digestion process",
                                    "High initial capital investment",
                                    "Requires skilled technical workers"
                                ]}
                            />

                            <TechCard
                                title="Mixed Plug Flow Reactors"
                                description="Horizontal design with progressive vertical mixing using gas injections"
                                gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                                image={
                                    <div>
                                        <div className="text-lg font-semibold mb-2">Flow Process</div>
                                        <div className="text-sm text-gray-600">
                                            Feed → Axial Mixing → Biogas ↑ → Effluent
                                        </div>
                                    </div>
                                }
                                advantages={[
                                    "Cost-effective solution",
                                    "Easy hydraulic flushing adaptation",
                                    "Simple construction and management"
                                ]}
                                disadvantages={[
                                    "Difficult hard top maintenance",
                                    "Weather-sensitive membrane top"
                                ]}
                            />

                            <TechCard
                                title="Batch-type Digesters"
                                description="Simple load, digest, and remove cycle operation"
                                gradient="bg-gradient-to-r from-orange-500 to-red-500"
                                image={
                                    <div>
                                        <div className="text-lg font-semibold mb-2">Flow Process</div>
                                        <div className="text-sm text-gray-600">
                                            Load Feedstock → Seal Digester → Anaerobic Digestion (Retention) → Open & Remove Digestate
                                        </div>
                                    </div>
                                }
                                advantages={[
                                    "Suitable for uncertain raw material availability"
                                ]}
                                disadvantages={[
                                    "Uneven gas production patterns",
                                    "Multiple digesters needed for continuous supply",
                                    "Higher space requirements"
                                ]}
                            />

                            <TechCard
                                title="Covered Lagoon"
                                description="Lined pit with flexible plastic cover for biogas capture"
                                gradient="bg-gradient-to-r from-teal-500 to-green-500"
                                image={
                                    <div>
                                        <div className="text-lg font-semibold mb-2">Lagoon System</div>
                                        <div className="text-sm text-gray-600">
                                            Digester Influent → Cover → Biogas Storage → Effluent
                                        </div>
                                    </div>
                                }
                                advantages={[
                                    "Simple construction and management",
                                    "Easy hydraulic flushing adaptation",
                                    "Low cost implementation"
                                ]}
                                disadvantages={[
                                    "Poor mixing efficiency",
                                    "Lower energy yield",
                                    "Cover maintenance affects system lifespan"
                                ]}
                            />
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Biogas Purification Technologies */}
                <CollapsibleSection
                    id="biogas-purification"
                    title="Biogas Purification Technologies"
                    icon={Droplets}
                    gradient="bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
                            <p className="text-gray-700 leading-relaxed font-sans">
                                To improve calorific value and energy content, methane concentration must be increased while removing CO₂ & H₂S.
                                Various advanced technologies are employed for efficient purification processes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                            <PurificationTechCard
                                title="Pressure Swing Adsorption (PSA)"
                                description="Carbon dioxide separation through adsorption under elevated pressure using activated carbon or zeolites. Widely used in India for large bio-gas systems."
                                icon={Wind}
                                color="bg-gradient-to-r from-blue-500 to-indigo-500"
                            />

                            <PurificationTechCard
                                title="Vacuum Swing Adsorption (VSA)"
                                description="Non-cryogenic separation using molecular sieves that preferentially adsorb target gases at ambient pressure, then regenerate under vacuum."
                                icon={Factory}
                                color="bg-gradient-to-r from-purple-500 to-violet-500"
                            />

                            <PurificationTechCard
                                title="Water Scrubbing"
                                description="Utilizes CO₂'s higher water solubility compared to methane. CO₂ dissolves in water while methane concentration increases in gas phase."
                                icon={Droplets}
                                color="bg-gradient-to-r from-cyan-500 to-blue-500"
                            />

                            <PurificationTechCard
                                title="Membrane Separation"
                                description="Dry membranes permeable to CO₂, water and ammonia while blocking nitrogen and methane. Usually hollow fiber bundles."
                                icon={Settings}
                                color="bg-gradient-to-r from-teal-500 to-emerald-500"
                            />

                            <PurificationTechCard
                                title="Chemical Scrubbing (MEA)"
                                description="CO₂ absorption and chemical reaction with monoethylamine for highly selective separation with strong chemical affinity."
                                icon={Beaker}
                                color="bg-gradient-to-r from-orange-500 to-red-500"
                            />

                            <PurificationTechCard
                                title="Advanced Technologies"
                                description="Additional methods include Cryogenic upgrading, Biological fixation, Iron chloride dosing, and Activated carbon processes."
                                icon={Zap}
                                color="bg-gradient-to-r from-pink-500 to-rose-500"
                            />
                        </div>
                    </div>
                </CollapsibleSection>

                {/* CBG Bottling */}
                <CollapsibleSection
                    id="cbg-bottling"
                    title="Compressed Biogas (CBG) Bottling"
                    icon={Factory}
                    gradient="bg-gradient-to-r from-emerald-600 to-teal-600"
                >
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                            <p className="text-gray-700 leading-relaxed font-sans">
                                Advanced bottling systems for compressing purified biogas up to 250 bar and filling into cascade storage systems.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <div className="text-center text-gray-600 p-6">
                                        <Factory className="w-16 h-16 mx-auto mb-4 text-indigo-500 font-sans" />
                                        <div className="text-lg font-semibold font-sans">Industrial CBG Bottling Unit</div>
                                        <div className="text-sm font-sans">High-pressure compression and filling system</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <div className="text-center text-gray-600 p-6">
                                        <Settings className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                                        <div className="text-lg font-semibold">Cascade Storage System</div>
                                        <div className="text-sm font-sans">High-pressure cylindrical vessel arrangement</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Technology Providers */}
                <div className="bg-gradient-to-br from-green-300 via-green-100 to-green-200 rounded-3xl p-8 text-gray-800 shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Technology Providers & Validation</h2>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Institutes for technology evaluation and validation of DPR on CBG</h3>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
                            <h4 className="font-semibold mb-3 text-yellow-600">Technology Providers</h4>
                            <p className="text-gray-800 mb-4 font-sans">
                                Access comprehensive contact details of CBG equipment manufacturers and suppliers
                            </p>
                            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                View Provider Directory
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnologySection;