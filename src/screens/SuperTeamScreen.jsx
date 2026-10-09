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
const SuperTeam = dynamic(() => import('@/app/Components/SuperTeam'), { ssr: false, loading: () => <LazyLoader /> });



const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50">
            <Navbar />
            <HeroBanner backgroundImage="/images/superteamnew1.jpeg">

            </HeroBanner>

            <SuperTeam />
            <Footer />
        </div>
    )
}

export default Home
