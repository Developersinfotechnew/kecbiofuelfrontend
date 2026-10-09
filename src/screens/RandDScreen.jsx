"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import HeroBanner from '../app/Components/HeroBanner'
import BannerContent from '../app/Components/BannerContent'
import Navbar from '../app/Components/Navbar'

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import('../app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const RandDSectionOne = dynamic(() => import('@/app/Components/RandDSectionOne '), { ssr: false, loading: () => <LazyLoader /> });
const RandDSectionTwo = dynamic(() => import('@/app/Components/RandDSectionTwo'), { ssr: false, loading: () => <LazyLoader /> });
const RandDSectionThree = dynamic(() => import('@/app/Components/RandDSectionThree'), { ssr: false, loading: () => <LazyLoader /> });
const RandDSectionFour = dynamic(() => import('@/app/Components/RandDSectionFour'), { ssr: false, loading: () => <LazyLoader /> });
const RandDGlimpse = dynamic(() => import('@/app/Components/RandDGlipse'), { ssr: false, loading: () => <LazyLoader /> });







const RandDScreen = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroBanner backgroundImage="/images/bannernew11.jpg" >
                <div className="bg-black/5 z-0 backdrop-blur-md rounded-xl px-8 py-4 max-w-sm mx-auto text-center shadow-sm space-y-2 ">

                    {/* Title */}
                    <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight leading-tight text-white/80">
                        Research & <span className="text-green-600">Development</span> <span className="text-cyan-400"></span>
                    </h1>

                    {/* Decorative Line */}
                    <div className="mx-auto w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>

                    {/* Subtitle */}
                    <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                        Shaping the future with sustainable energy innovations.
                    </p>

              
                    <button className="mt-2 mb-3 px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full text-white font-semibold shadow hover:scale-105 transition-transform">
                        Explore Our Vision →
                    </button>

                </div>
            </HeroBanner>
            <RandDSectionOne />
            <RandDSectionTwo />
            <RandDSectionThree />
            <RandDSectionFour />
            <RandDGlimpse />
            <Footer />
        </div>
    )
}

export default RandDScreen
