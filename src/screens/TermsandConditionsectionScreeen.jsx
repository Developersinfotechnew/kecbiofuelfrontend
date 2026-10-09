"use client";

import dynamic from 'next/dynamic';
import React from 'react'

import HeroBanner from '../app/Components/HeroBanner'
import BannerContent from '../app/Components/BannerContent'
import Navbar from '../app/Components/Navbar'

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Footer = dynamic(() => import('../app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const PMCServicesSection = dynamic(() => import('../app/Components/PMCServicesSection'), { ssr: false, loading: () => <LazyLoader /> });
const CoreServicesGrid = dynamic(() => import('../app/Components/CoreServicesGrid'), { ssr: false, loading: () => <LazyLoader /> });
const StatisticsSection = dynamic(() => import('../app/Components/StatisticsSection'), { ssr: false, loading: () => <LazyLoader /> });
const ContactSection = dynamic(() => import('../app/Components/ContactSection'), { ssr: false, loading: () => <LazyLoader /> });
const TermsandConditionsection = dynamic(() => import('@/app/Components/TermsandConditionsection.jsx'), { ssr: false, loading: () => <LazyLoader /> });








const TermsandConditionsectionScreeen = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner backgroundImage="/images/bannernew2.png">
        <div className="bg-black/5 backdrop-blur-md rounded-xl px-8 py-4 max-w-sm mx-auto text-center shadow-sm space-y-2">

          {/* Title */}
          <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight leading-tight text-white/80">
            Terms&nbsp;Of<span className="text-green-600"><br />Service</span> <span className="text-cyan-400"></span>
          </h1>

          {/* Decorative Line */}
          <div className="mx-auto w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
            Shaping the future with sustainable energy innovations.
          </p>

          {/* CTA Button */}
          <button className="mt-2 mb-3 px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full text-white font-semibold shadow hover:scale-105 transition-transform">
            Explore Our Vision →
          </button>

        </div>
      </HeroBanner>
      <TermsandConditionsection />
      <Footer />
    </div>
  )
}

export default TermsandConditionsectionScreeen
