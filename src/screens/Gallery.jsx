"use client";

import dynamic from 'next/dynamic';
import React from 'react'
import HeroBanner from '../app/Components/HeroBanner'
import BannerContent from '../app/Components/BannerContent'
import Navbar from '../app/Components/Navbar'



import { galleryData, achievementsData, projectsData, reaData, bioCngData, bigImpactData, panipatCbgData, ceoAwardData } from '../app/data/galleryData';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const GalleryScroll = dynamic(() => import('../app/Components/GalleryScroll'), { ssr: false, loading: () => <LazyLoader /> });
const Footer = dynamic(() => import('../app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const GalleryScrollContent = dynamic(() => import('../app/Components/GalleryScrollContent'), { ssr: false, loading: () => <LazyLoader /> });
const GalleryGlimpse = dynamic(() => import('@/app/Components/GalleryGlimpse'), { ssr: false, loading: () => <LazyLoader /> });


const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner backgroundImage="/images/bannernew7.jpeg">
        <div className="bg-black/5 backdrop-blur-md rounded-xl px-8 py-4 max-w-sm mx-auto text-center shadow-sm space-y-2">

          {/* Title */}
          <h1 className="text-5xl md:text-5xl font-extrabold tracking-tight leading-tight text-white/80">
            Our <span className="text-green-600">Gallery</span> <span className="text-cyan-400"></span>
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

      <GalleryScrollContent
        data={panipatCbgData}
        sectionTitle="Panipat CBG Project"
        sectionSubtitle="Ground Breaking Ceremony"
        sectionIcon="🚧"
      />

      {/* ✅ UPDATED: Now uses `awards` prop to show toggle buttons */}
      <GalleryScrollContent
        sectionTitle="AWARDS"
        sectionSubtitle="RECOGNITION"
        sectionIcon="🏆"
        awards={[
          { label: "CEO of the Year – Renewable Energy 2026", data: ceoAwardData },
          { label: "Big Impact Award 2026, Malaysia", data: bigImpactData },
          { label: "R.E.A.L Excellence Award 2025", data: reaData },
        ]}
      />

      <GalleryScrollContent
        data={galleryData}
        sectionTitle="OUTREACH"
        sectionSubtitle="PROGRAMS"
        sectionIcon="🌱"
      />

      {/* Projects Section */}
      <GalleryScrollContent
        data={achievementsData}
        sectionTitle="PROJECTS"
        sectionSubtitle="INNOVATIONS"
        sectionIcon="🚀"
      />
      <GalleryScrollContent
        data={projectsData}
        sectionTitle="OUR PROGRAM"
        sectionSubtitle="TRAININGS"
        sectionIcon="🚀"
      />

      <GalleryScrollContent
        data={bioCngData}
        sectionTitle="Bio-CNG Launch"
        sectionSubtitle="Pioneering Sustainable Future"
        sectionIcon="🌍"
      />

      <GalleryGlimpse />

      <Footer />
    </div>
  )
}

export default Home