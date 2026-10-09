import React, { useState, useEffect, useRef } from 'react';
import { Building, Leaf, TrendingUp, Users, CheckCircle, ArrowRight, Star, Zap, Target, Shield } from 'lucide-react';

const EnablesSchemSection = () => {
  const [activeTab, setActiveTab] = useState('pricing');
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

  const pricingData = [
    { sl: 1, lowerRetail: "50.01", higherRetail: "55.00", average: "52.51" },
    { sl: 2, lowerRetail: "55.01", higherRetail: "60.00", average: "57.51" },
    { sl: 3, lowerRetail: "60.01", higherRetail: "65.00", average: "62.51" },
    { sl: 4, lowerRetail: "65.01", higherRetail: "70.00", average: "67.51" },
    { sl: 5, lowerRetail: "70.01", higherRetail: "75.00", average: "72.51" },
    { sl: 6, lowerRetail: "75.01", higherRetail: "80.00", average: "77.51" },
    { sl: 7, lowerRetail: "80.01", higherRetail: "85.00", average: "82.51" },
    { sl: 8, lowerRetail: "85.01", higherRetail: "90.00", average: "87.51" },
    { sl: 9, lowerRetail: "90.01", higherRetail: "95.00", average: "92.51" },
    { sl: 10, lowerRetail: "95.01", higherRetail: "100.00", average: "97.51" },
  ];

  const cfaProducts = [
    {
      product: "BioCNG / Enriched Biogas / Compressed Bio Gas",
      cfa: "Rs 3.0 Crore per 4800 kgs of BioCNG/day generated from 12000 m³ Biogas/day (Waste)",
      description:
        "Upcoming Biogas plants which produce BioCNG / Enriched Biogas produced from biogas generated through biomethanation of Urban waste (including segregated MSW, Agricultural Waste / Industrial wastes / Effluents or mix of these wastes) are eligible for this financial assistance.",
    },
    {
      product: "Additional Support",
      cfa: "(Maximum CFA - Rs 10 Crore/project)",
      description:
        "In case developer wants to set up BioCNG/Enriched Biogas generating unit at already existing Biogas plant or at distillery effluent based Biogas plant, applicant can avail benefits of this scheme also.",
    },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Plant Design & Construction",
      description: "Complete facilitation in design, erection, and commissioning"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "CBG Marketing",
      description: "Guaranteed offtake and marketing of produced CBG"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Bio-manure Marketing",
      description: "Partnership with NAFED for bio-slurry marketing"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "State Partnerships",
      description: "MoU signed with 10+ states for facilitation"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-100 via-yellow-50 to-green-100">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-white/40">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Sustainable Energy Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent leading-tight">
              Scheme Enablers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive financial assistance and infrastructure support for sustainable compressed biogas development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                <span className="text-2xl font-bold text-green-600">₹10Cr</span>
                <p className="text-sm text-gray-600">Max CFA Support</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                <span className="text-2xl font-bold text-amber-600">₹1478</span>
                <p className="text-sm text-gray-600">Per MMBTU</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                <span className="text-2xl font-bold text-green-600">10+</span>
                <p className="text-sm text-gray-600">State Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeTab === 'pricing'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl scale-105'
                : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 border border-gray-200'
              }`}
          >
            Pricing Structure
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeTab === 'transport'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl scale-105'
                : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 border border-gray-200'
              }`}
          >
            Transportation
          </button>
        </div>

        {/* Pricing Section */}
        {activeTab === 'pricing' && (
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-green-100 via-yellow-50 to-green-100 px-8 py-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Long-term Pricing Assurance</h2>
                  <p className="text-gray-600 mt-1 font-sans">Guaranteed procurement rates under SATAT scheme</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-green-400 p-6 rounded-r-2xl mb-8">
                <p className="text-gray-700 leading-relaxed font-sans">
                  IndianOil's Expression of Interest (EOI) released on October 1st, 2018, establishes transparent pricing for CBG procurement by Oil & Gas companies across different retail price slabs.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-200 via-yellow-50 to-green-200 text-gray-900">
                        <th className="px-8 py-4 text-left font-semibold">Slab</th>
                        <th className="px-8 py-4 text-left font-semibold">Lower Range (₹/kg)</th>
                        <th className="px-8 py-4 text-left font-semibold">Higher Range (₹/kg)</th>
                        <th className="px-8 py-4 text-left font-semibold">Average (₹/kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData.map((row, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-green-50/50 to-yellow-50/50"
                            } hover:bg-gradient-to-r hover:from-green-100 hover:to-yellow-100 transition-all duration-300`}
                        >
                          <td className="px-8 py-4 font-semibold text-gray-700">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {row.sl}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-4 text-gray-600 font-medium">{row.lowerRetail}</td>
                          <td className="px-8 py-4 text-gray-600 font-medium">{row.higherRetail}</td>
                          <td className="px-8 py-4 text-green-600 font-bold text-lg">{row.average}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  <div>
                    <p className="text-amber-800 font-semibold">Pricing Extension</p>
                    <p className="text-amber-700 text-sm mt-1">For slabs beyond ₹100/kg, the same formula methodology will be applied.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Transportation Section */}
        {activeTab === 'transport' && (
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-green-100 via-yellow-50 to-green-100 px-8 py-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Revised Biogas Pricing & Transportation</h2>
              <p className="text-gray-600">Effective from June 1, 2025 to October 31, 2025</p>
            </div>

            <div className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-8 text-gray-900 text-center">
                <div className="text-4xl font-bold mb-2">₹1,478</div>
                <div className="text-lg opacity-90">Per MMBTU (excluding GST)</div>
                <div className="text-lg opacity-90">@₹77.7 per Kg</div>
                <div className="text-sm opacity-75 mt-2">Synchro Scheme Pricing</div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                  Transportation Policy
                </h3>
                <p className="text-gray-700">
                  For cascade transportation, charges from the Biogas plant to delivery point will be paid to producers by the beneficiary CGD entity.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl shadow-xl">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-100 to-green-200 text-gray-900">
                      <th className="px-8 py-4 text-left font-semibold">Distance Range</th>
                      <th className="px-8 py-4 text-left font-semibold">Transportation Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50/50 hover:bg-green-100 transition-colors">
                      <td className="px-8 py-6 font-medium text-gray-700">0 – 50 km</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-semibold">NIL</span>
                          <span className="text-gray-600 text-sm">(included in procurement price)</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-yellow-50 transition-colors">
                      <td className="px-8 py-6 font-medium text-gray-700">50 – 75 km</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span className="text-amber-600 font-semibold">₹1.5 / kg</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-orange-50/50 hover:bg-orange-100 transition-colors">
                      <td className="px-8 py-6 font-medium text-gray-700"> 75 km</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-orange-600 font-semibold">₹2.5 / kg</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Support Programs Section - Always Visible Below */}
        <div className="space-y-12">
          {/* OMC Facilitation */}
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-green-100 via-yellow-50 to-green-100 px-8 py-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">OMC Facilitation through LOI</h2>
                  <p className="text-gray-600 mt-1 font-sans">Comprehensive support from Oil & Gas Companies</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6 font-sans">
                <div className="bg-gradient-to-r from-white to-green-50/50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Oil & gas companies shall facilitate Plant owners in design, erection, construction, commissioning of the CBG plant.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-green-50/50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Oil & gas companies will offtake and market the CBG produced.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-green-50/50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Oil & gas companies will also facilitate marketing of Bio manure produced from the CBG Plants. For facilitating marketing of Bio-slurry by arrangement with Cooperatives, fertiliser company, Private Existing resales, wholesalers, or institutional cleints.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-green-50/50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Oil & gas companies are entering into MoU with State Governments for facilitating CBG plants. IndianOil has signed similar MoU with States like Haryana, Uttar Pradesh, Punjab, Gujarat, Maharashtra, Rajasthan, Chhattisgarh, Orissa, Pradesh and Andhra Pradesh.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-green-50/50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        Policy guidelines has been issued for synchronization of CBG produced by plants under KEC scheme in the City Gas Distribution (CGD network).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Support */}
          <section className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
            <div className="bg-gradient-to-r from-green-100 via-yellow-50 to-green-100 px-8 py-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Financial Support Programs</h2>
                  <p className="text-gray-600 mt-1 font-sans">Priority sector lending and government assistance</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border-l-4 border-blue-400 p-6 rounded-r-2xl">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">RBI Priority Sector Lending</h3>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    CBG plants included as fresh categories eligible for finance under priority sector lending (RBI guidelines, September 4, 2020).
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-yellow-50 border-l-4 border-green-400 p-6 rounded-r-2xl">
                  <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Fertilizer Control Order
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    FOM and Digested Biogas Slurry included under FCO 1985 to promote CBG plant manure.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">MNRE Central Financial Assistance</h3>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                  Ministry of New and Renewable Energy provides capital subsidy for Compressed Biogas (CBG) projects under "Programme on Energy from Urban, Industrial and Agricultural wastes/residues" of the "National Biogas and Manure Management Programme".

                </p>
                    <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                  Revise Guidelines from MNRE Recieved and subsidy follows as:</p>

                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <table className="w-full bg-white">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-200 via-yellow-50 to-green-200 text-gray-900">
                        <th className="px-6 py-4 text-left font-semibold">Product Category</th>
                        <th className="px-6 py-4 text-left font-semibold">CFA Amount</th>
                        <th className="px-6 py-4 text-left font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cfaProducts.map((item, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-purple-25" : "bg-white"
                            } hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300`}
                        >
                          <td className="px-6 py-6 text-gray-700 font-medium font-sans">{item.product}</td>
                          <td className="px-6 py-6 text-purple-600 font-bold ">{item.cfa}</td>
                          <td className="px-6 py-6 text-gray-600 leading-relaxed font-sans">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EnablesSchemSection;