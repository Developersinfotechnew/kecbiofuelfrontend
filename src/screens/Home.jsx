"use client";

import dynamic from 'next/dynamic';
import React from 'react'

import HeroBanner from '../app/Components/HeroBanner'
import BannerContent from '../app/Components/BannerContent'
import Navbar from '../app/Components/Navbar'
import HomeBannerSlider from '@/app/Components/HomeBannerSlider';
import InstagramSlider from '@/app/Components/InstagramSlider';

const LazyLoader = () => (
  <div className="w-full flex justify-center items-center py-16">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home2ndsection = dynamic(() => import('../app/Components/Home2ndsection'), { ssr: false, loading: () => <LazyLoader /> });
const Home3rdsection = dynamic(() => import('../app/Components/Home3rdsection'), { ssr: false, loading: () => <LazyLoader /> });
const Home4thsection = dynamic(() => import('../app/Components/Home4thsection'), { ssr: false, loading: () => <LazyLoader /> });
const Home5thsection = dynamic(() => import('../app/Components/Home5thsection'), { ssr: false, loading: () => <LazyLoader /> });
const Homeservices = dynamic(() => import('../app/Components/Homeservices'), { ssr: false, loading: () => <LazyLoader /> });
const TechnologyStack = dynamic(() => import('../app/Components/TechnologyStack'), { ssr: false, loading: () => <LazyLoader /> });
const Home6thsection = dynamic(() => import('../app/Components/Home6thsection'), { ssr: false, loading: () => <LazyLoader /> });
const Footer = dynamic(() => import('../app/Components/Footer'), { ssr: false, loading: () => <LazyLoader /> });
const BlogSection = dynamic(() => import('../app/Components/BlogSectionhome'), { ssr: false, loading: () => <LazyLoader /> });
const CbgGlimpse = dynamic(() => import('@/app/Components/CbgGlimpse'), { ssr: false, loading: () => <LazyLoader /> });
const CtaSection = dynamic(() => import('@/app/Components/CtaSection'), { ssr: false, loading: () => <LazyLoader /> });
const YoutubeVideosRow = dynamic(() => import('@/app/Components/YoutubeVideosRow'), { ssr: false, loading: () => <LazyLoader /> });


const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HomeBannerSlider />
      <Home2ndsection />
      <Home3rdsection />
      <Home4thsection />
      <Homeservices />
      <TechnologyStack />
      <Home6thsection />
      <Home5thsection />
      <CbgGlimpse />
      <InstagramSlider />
      <YoutubeVideosRow />
      <BlogSection />
      <CtaSection />
      <Footer />
    </div>
  )
}

export default Home