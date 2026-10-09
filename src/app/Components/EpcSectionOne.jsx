import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const EpcSectionOne = () => {
    const images = [
        {
            id: 1,
            src: "/images/pmc1.jpg",
            alt: "Construction Equipment"
        },
        {
            id: 2,
            src: "/images/pmc2.jpg",
            alt: "Industrial Infrastructure"
        },
        {
            id: 3,
            src: "/images/pmc3.jpg",
            alt: "Digital Technology"
        },
        {
            id: 4,
            src: "/images/pmc4.jpg",
            alt: "Modern Construction"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Section - Image Grid */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-20 blur-lg"></div>
                        <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${index % 2 === 0 ? 'mt-0' : 'mt-8'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                                    <Image
                                      src={image.src}
                                      alt={image.alt}
                                      width={800}
                                      height={600}
                                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/20 transition-all duration-300 z-20"></div>
                                </div>
                            ))}
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-15 animate-pulse delay-1000"></div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="space-y-">
                        {/* Header */}
                        <div className="">
                            <div className="inline-block">
                                <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
                                    Professional Services
                                </span>
                            </div>

   <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold leading-tight ">
                <h2 className="text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                  EPC <span className='text-green-600'>SERVICES</span>
                </h2>
                <span className="text-gray-800 text-2xl sm:text-3xl lg:text-2xl">
                (ENGINEERING, PROCUREMENT  & CONSTRUCTION)
                </span>
              </h1>

                            {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    EPC SERVICES
                                </span>
                                <br />
                                <span className="text-gray-800 text-2xl sm:text-3xl lg:text-4xl">
                                    (ENGINEERING, PROCUREMENT <br /> & CONSTRUCTION)
                                </span>
                            </h1> */}
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                            <p className="text-gray-700 text-lg leading-relaxed pl-8 text-justify">
                                In this type of project the customer looks for a specific company to be responsible for the development of the design and the various engineering aspects involved in their project. These include architectural design, structural engineering, electrical and hydraulic engineering such as air conditioning. The PMC ensures that all these disciplines work in coordination, delivering a design that is efficient, compliant, and aligned with the client’s vision.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid sm:grid-cols-3 gap-4 pt-4">
                            {[
                                { icon: "🏗️", text: "Project Planning" },
                                { icon: "⚡", text: "Quality Control" },
                                { icon: "🎯", text: "Timely Delivery" }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 text-center hover:bg-white hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 font-sans">{feature.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                             <Link href="/whyinvestincbgwithkecagritech">
                            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <span className="relative z-10">Learn More About Our Services</span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <svg
                                    className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default EpcSectionOne;