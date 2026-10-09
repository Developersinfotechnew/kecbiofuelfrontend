import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Award,
  Users,
  TrendingUp,
  Globe,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Target,
  Lightbulb,
  Heart,
  ChevronRight,
  Star,
  Building,
  Leaf,
  Zap
} from 'lucide-react';

const AboutUsCEO = () => {
  const [activeTab, setActiveTab] = useState('journey');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
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

  useEffect(() => {
    // Animate cards when tab changes
    setVisibleCards([]);
    const timer = setTimeout(() => {
      if (activeTab === 'exposure') {
        // For exposure tab, animate all 6 cards with stagger
        const timers = ceoData.exposures.map((_, index) =>
          setTimeout(() => {
            setVisibleCards(prev => [...prev, index]);
          }, index * 100)
        );
        return () => timers.forEach(t => clearTimeout(t));
      } else {
        // For other tabs, show all immediately
        setVisibleCards(Array.from({ length: 20 }, (_, i) => i));
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Updated data based on Jitendra Narayan's actual LinkedIn profile
  const ceoData = {
    name: "Jitendra Narayan",
    title: "Business Coach & Specialist at Bio-CNG, LLC | Decarbonisation, Energy, Agriculture, BFSI Expert",
    company: "Kec Agritech",
    location: "West Delhi, Delhi, India",
    experience: "25+ Years",
    bio: "Business Coach & Specialist with over a decade of leadership in business coaching, specifically within the energy and agriculture sectors. At Kec Agritech, my focus is on revolutionizing biofuel production through innovative technologies while managing a dedicated team. My mission is to empower businesses to grow sustainably, contributing to the global energy transition. As global mobility demand rises, so does the consumption of fossil fuels, leading to geopolitical tensions, shrinking oil reserves, and severe environmental impacts from vehicular emissions.This highlights the urgent need for alternative, sustainable fuels in the transport sector.",
    profileImage: "/images/ceo.jpg",

    achievements: [
      { icon: Leaf, label: "Biofuel Innovation", value: "CTS Tech" },
      { icon: Users, label: "LinkedIn Network", value: "21000+" },
      { icon: Globe, label: "Industry Focus", value: "Energy" },
      { icon: Award, label: "Biofuel & Renewable Energy", value: "17+ Yrs" }
    ],

    journey: [
      {
        year: "Apr 2022 - Present",
        title: "Chief Executive Officer",
        company: "Kec Agritech",
        description: "Leading biofuel production revolution through innovative CTS technology. Managing decarbonisation initiatives using Bio-CNG, Ethanol, Hydrogen Ammonia, E-fuels, and Biofuels. Creating cost-effective ethanol production from cellulose plants and carbon-friendly processes.",
        icon: Building
      },
      {
        year: "Jan 2014 - Present",
        title: "Business Coach & Specialist",
        company: "Bio-CNG LLC (Energy, Agriculture & BFSI)",
        description: "Helping businesses grow in energy, agriculture and BFSI sectors. Full-time business coaching practice focused on sustainable growth and transformational visions.",
        icon: Users
      },
      {
        year: "Dec 2013 - Sep 2019",
        title: "Co-Chief Executive Officer",
        company: "Renewable Energy Group Inc.",
        description: "Led business coaching practice for Small Business Owners. Specialized in Energy Service Companies, helping regional business owners grow through wealth and freedom strategies.",
        icon: Zap
      },
      {
        year: "May 2008 - Apr 2013",
        title: "Regional Manager- Delhi NCR",
        company: "A Reliance Capital Co. -ILL",
        description: "Managed franchisee business in Delhi NCR region. Responsible for channel efficiency, team management, and successful implementation of insurance products.",
        icon: Briefcase
      },
    ],

    values: [
      {
        icon: Leaf,
        title: "Sustainable Innovation",
        description: "Championing decarbonisation through advanced biofuel technologies and renewable energy solutions that create environmental impact."
      },
      {
        icon: Users,
        title: "Business Empowerment",
        description: "Coaching and empowering businesses to achieve sustainable growth, particularly in energy and agriculture sectors."
      },
      {
        icon: Zap,
        title: "Energy Transition",
        description: "Leading the transformation towards renewable energy solutions and innovative bio-fuel production technologies."
      },
      {
        icon: Target,
        title: "Strategic Excellence",
        description: "Delivering strategic development and transformational visions that contribute to global energy transition goals."
      },
      {
        icon: Award,
        title: "CEO Experience on Bio-CBG",
        description: "Harnessing years of experience in the bio-CBG sector, driving innovation and large-scale deployment of compressed bio-gas projects to support clean energy and sustainable mobility. Leading initiatives that convert agricultural residue and waste into clean fuel, reducing carbon emissions and fostering circular economy practices. Contributing to India's bio-CBG roadmap by enabling scalable solutions that empower rural economies and strengthen national energy security."
      }
    ],

    exposures: [
      {
        id: 1,
        title: "Strategic Biogas Talks:- KEC AGRITECH Meets MP CM",
        year: "2024",
        image: "/images/jitu1.jpg",
        category: "Innovation"
      },
      {
        id: 2,
        title: "MOU Signed With KEC",
        year: "2024",
        image: "/images/jitu2.jpg",
        category: "Leadership"
      },
      {
        id: 3,
        title: "MOU Signed With KEC",
        year: "2024",
        image: "/images/jitu3.jpg",
        category: "Sustainability"
      },
      {
        id: 4,
        title: "MOU Signed With Tripura By KEC",
        year: "2025",
        image: "/images/jitu4.jpg",
        category: "Pioneer"
      },
      {
        id: 5,
        title: "Strategic Biogas Talks:- KEC AGRITECH Meets MP CM",
        year: "2025",
        image: "/images/jitu5.jpg",
        category: "Excellence"
      },
      {
        id: 6,
        title: "Catalogue Launched by CM Sh. Vishnu Deo Sai",
        year: "2025",
        image: "/images/jitu6.jpg",
        category: "Coaching"
      }
    ]
  };

  return (
    <div ref={sectionRef} className="bg-gradient-to-br from-slate-50 to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
            Meet Our <span className='text-green-600'>Visionary Leader</span>
          </h2>
          <p className="text-lg font-sans text-gray-500 max-w-2xl mx-auto font-semibold">
            Driving sustainable innovation and business excellence with expertise in biofuel production and renewable energy solutions
          </p>
        </div>

        {/* CEO Profile Card */}
        <div className={`bg-white rounded-3xl shadow-4xl overflow-hidden mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-r from-green-200 via-yellow-50 to-green-200 p-8 md:p-12 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 animate-pulse" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
              }}></div>
            </div>

            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative group">
                  <Image
                    src={ceoData.profileImage}
                    alt={ceoData.name}
                    width={800}
                    height={600}
                    className="w-72 h-96 rounded-2xl object-cover shadow-2xl border-4 border-white/20 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                    <Leaf className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="md:col-span-2 text-center md:text-left text-black">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">{ceoData.name}</h3>
                <p className="text-xl mb-4 animate-fade-in animation-delay-100 font-semibold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">CEO, {ceoData.company}</p>
                <p className="text-sm mb-4 font-sans text-gray-500 font-semibold animate-fade-in animation-delay-200">{ceoData.title}</p>
                <p className="mb-6 leading-relaxed max-w-2xl font-sans text-justify text-gray-600 animate-fade-in animation-delay-300 font-semibold">{ceoData.bio}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-400">
                    <MapPin size={16} className="animate-pulse" />
                    <span>{ceoData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-500">
                    <Calendar size={16} className="animate-pulse" />
                    <span>{ceoData.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="p-8 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ceoData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`text-center group hover:scale-110 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-teal-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-2xl group-hover:rotate-12 transition-all duration-300">
                    <achievement.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                  <div className="text-sm text-gray-500 font-sans">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className={`bg-white rounded-3xl shadow-3xl overflow-hidden mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Professional <span className='text-green-600'>Experience</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-sans">
                Comprehensive expertise spanning decarbonisation, renewable energy, and sustainable business development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 transform">
                  <div className="bg-gradient-to-br from-teal-500 to-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Leaf className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Decarbonisation & Renewable Energy</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Mr. Narayan's primary focus is on advancing decarbonisation through solutions like Bio-Compressed Natural Gas (Bio-CNG), ethanol, hydrogen, ammonia, and e-fuels, driving the transition towards sustainable energy solutions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Business Coaching & Consulting</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Over a decade of providing business coaching and specialization in energy, agriculture, and BFSI sectors, helping businesses with growth, strategy, and sustainable development initiatives.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 transform">
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Second-Generation Biofuels</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Leading development of advanced biofuels, including KEC Agritech's patented CTS technology, reducing ethanol production time and cost by utilizing inexpensive, non-traditional feedstocks like cellulose instead of corn.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Building className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Previous Leadership Roles</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Prior leadership experience includes Co-Chief Executive Officer at Renewable Energy Group, Inc., Business Management Consultant in solar industry, and roles in financial services at Nirmal Bang and Reliance Capital Company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Initiatives & Achievements Section */}
        <div className={`bg-white rounded-3xl shadow-xl overflow-hidden mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Key Initiatives & <span className='text-green-600'>Achievements</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-sans">
                Transformative initiatives in KEC Agritech driving innovation and sustainable solutions in energy and agriculture sectors
              </p>
            </div>

            <div className="space-y-8">
              {/* First Row - 2 Columns */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 border-l-4 border-green-500 transform">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Kisan Experience Centre (KEC) Ecosystem</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Spearheaded the creation of the KEC model, empowering rural entrepreneurs and promoting sustainable agricultural practices through a decentralized, franchise-driven approach that transforms rural economies.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 border-l-4 border-indigo-500 transform">
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Expansion & Partnerships</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    Under his leadership, KEC Agritech launched a franchise model for sustainable farming and signed MoUs to propel development in North East India, targeting expansion into over 200 districts in the coming years.
                  </p>
                </div>
              </div>

              {/* Second Row - 2 Columns */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 border-l-4 border-amber-500 transform">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Lightbulb className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Product Innovation</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    KEC Agritech produces FCO (2016) approved, organic potash fertilizers from sugarcane waste, contributing to reducing import dependency and promoting eco-friendly farming practices across India.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 border-l-4 border-rose-500 transform">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Industry Recognition</h4>
                  <p className="text-gray-600 leading-relaxed font-sans text-justify">
                    KEC Agritech's contributions have been recognized, including honors for the DevaTri initiative, aligning with company values of excellence and nation-building in sustainable energy and agriculture sectors.
                  </p>
                </div>
              </div>

              {/* Third Row - Full Width Summary */}
              <div className="bg-gradient-to-r from-teal-50 via-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-gradient-to-r from-teal-200 to-green-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-gradient-to-br from-teal-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Leadership Recognition</h4>
                    <p className="text-gray-600 leading-relaxed font-sans text-base text-justify">
                      Mr. Jitendra Narayan is recognized as a leader and founder focused on driving innovation and sustainable solutions within the energy and agriculture sectors, particularly through the development and adoption of biofuels in India. His visionary approach continues to shape the future of sustainable energy and agricultural practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex justify-center mb-12 font-sans transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2 flex-wrap justify-center">
              {[
                { id: 'journey', label: 'Professional Journey', icon: TrendingUp },
                { id: 'values', label: 'Leadership Values', icon: Heart },
                { id: 'exposure', label: 'Exposure & Achievements', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                    }`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Professional Journey */}
          {activeTab === 'journey' && (
            <div className="p-8 md:p-12 animate-fade-in ">
                 <h2 className="text-3xl sm:text-4xl text-center lg:text-[40px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Professional <span className='text-green-600'>Journey</span>
              </h2>
              <div className="">
                {ceoData.journey.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-6 group hover:bg-gray-50 p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg ${visibleCards.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-teal-500 to-green-600 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      {index < ceoData.journey.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-teal-200 to-transparent mt-4 group-hover:from-teal-400 transition-colors duration-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">{item.title}</h4>
                        <span className="text-teal-600 font-semibold text-sm group-hover:scale-110 transition-transform duration-300 inline-block">{item.year}</span>
                      </div>
                      <p className="text-green-600 font-medium mb-3 font-sans">{item.company}</p>
                      <p className="text-gray-500 leading-relaxed font-sans group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Values */}
          {activeTab === 'values' && (
            <div className="p-8 md:p-12 animate-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Philosophy</h3>
              <div className="space-y-8">
                {/* First row - 2 columns */}
                <div className="grid md:grid-cols-2 gap-8">
                  {ceoData.values.slice(0, 2).map((value, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 transform ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-gradient-to-br from-teal-500 to-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed font-sans text-[15.2px] text-justify w-[90%]">{value.description}</p>
                    </div>
                  ))}
                </div>

                {/* Second row - 2 columns */}
                <div className="grid md:grid-cols-2 gap-8">
                  {ceoData.values.slice(2, 4).map((value, index) => (
                    <div
                      key={index + 2}
                      className={`bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 transform ${visibleCards.includes(index + 2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                    >
                      <div className="bg-gradient-to-br from-teal-500 to-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition-transform duration-300">
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed font-sans text-[15.2px] text-justify w-[90%]">{value.description}</p>
                    </div>
                  ))}
                </div>

                {/* Third row - 1 column (full width for 5th section) */}
                <div className="grid grid-cols-1 max-w-6xl mx-auto">
                  {ceoData.values.slice(4, 5).map((value, index) => (
                    <div
                      key={index + 4}
                      className={`bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-gradient-to-r from-orange-200 to-green-200 ${visibleCards.includes(index + 4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-gradient-to-br from-orange-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                          <value.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                          <p className="text-gray-600 leading-relaxed font-sans text-base text-justify">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exposure & Achievements */}
          {activeTab === 'exposure' && (
            <div className="p-8 md:p-12 animate-fade-in">
              <h3 className="text-4xl font-bold text-green-900 mb-4 text-center">Exposure & Achievements</h3>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto font-sans">
                Visual showcase of recognitions and achievements in leadership, innovation, and sustainable business practices
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ceoData.exposures.map((exposure, index) => (
                  <div
                    key={exposure.id}
                    className={`group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 transform ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Achievement Image */}
                    <div className="relative h-96 overflow-hidden">
                      <Image
                        src={exposure.image}
                        alt={exposure.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                }}
              />
                      {/* Fallback gradient background */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-green-500 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-white text-center">
                          <Award className="w-20 h-20 mx-auto mb-4 opacity-80 animate-bounce" />
                          <h4 className="text-lg font-bold mb-2">{exposure.title}</h4>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 animate-fade-in">
                        <span className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:scale-110 transition-transform duration-300">
                          {exposure.year}
                        </span>
                      </div>

                      {/* Title Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="text-xl font-bold mb-2">{exposure.title}</h4>
                          <p className="text-sm opacity-90">{exposure.organization}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsCEO;