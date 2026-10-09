"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Scrolling Top Banner Component with Gap Between Scrolls
const ScrollingTopBanner = ({ isVisible }) => {
  const scrollText = "🏆Jitendra Narayan, CEO & Founder of KEC Agritech, Honoured with R.E.A.L Excellence Award 2025. Recognition celebrates KEC's leadership in agri-innovation, Bio-CNG and the Kisan Experience Centre model that empowers farmers and agri-entrepreneurs.🥇";

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-green-600 text-white py-2 overflow-hidden transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="animate-scroll-with-gap whitespace-nowrap">
        <span className="text-sm font-bold inline-block px-4">
          "{scrollText}"
        </span>
      </div>
      <style jsx>{`
        @keyframes scrollWithGap {
          0% {
            transform: translateX(100%);
          }
          70% {
            transform: translateX(-100%);
          }
          70.1% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-scroll-with-gap {
          animation: scrollWithGap 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Your Original Navbar Component (with scroll detection)
const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Mobile submenu states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTopBanner(scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scrolling Top Banner */}
      <ScrollingTopBanner isVisible={showTopBanner} />

      {/* Your Original Navbar with dynamic positioning */}
      <nav className={`fixed left-0 z-20 right-0 bg-gray-100 shadow-md transition-all duration-300 ${showTopBanner ? 'top-10' : 'top-0'}`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/images/kec-logo.png"
                alt="Energox Logo"
                width={750}
                height={550}
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-[17px] md:ml-12 ">
              <div className="relative group">
                <Link href="/" className="font-sans text-green-700 text-[16px] hover:text-green-400 transition-colors font-bold">
                  Home
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </div>

              <div className="relative">
                <button
                  className="font-sans relative inline-flex items-center text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors duration-200 group"
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                >
                  <span className="flex items-center gap-1">
                    <span>About Us</span>
                    <svg className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-[-5px] mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px]">
                    <Link href="/ceo" className="font-sans block px-3 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 hover:bg-gray-50 transition-colors duration-200">
                      Our CEO
                    </Link>
                    <Link href="/about" className="font-sans block leading-tight px-3 py-2 text-green-700 hover:bg-gray-50 text-[16px] font-bold hover:text-green-400 transition-colors duration-200">
                      KEC-BioFuel
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative group">
                <Link href="/superteam" className="font-sans text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors">
                  Our Super Team
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </div>

              <div className="relative group">
                <Link href="/cbg" className="font-sans text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors">
                  CBG Park
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </div>

              <div className="relative group">
                <Link href="/r&d" className="font-sans text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors">
                  R&D
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </div>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  className="font-sans relative inline-flex items-center text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors group"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span className="flex items-center gap-1">
                    <span>Services</span>
                    <svg className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link href="/pmc" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">PMC</Link>
                    <Link href="/epc" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">EPC</Link>
                    <Link href="/latestdevlopment" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Advisory</Link>
                  </div>
                )}
              </div>

              <div className="relative group">
                <Link href="/project" className="font-sans text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors">
                  Projects
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
                <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
                  <div className="bg-white rounded-lg shadow-lg py-2 min-w-[210px]">
                    <Link href="/project" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Our Projects</Link>
                    <Link href="/projectmanagement" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Project Management</Link>
                  </div>
                </div>
              </div>

              {/* Library Dropdown */}
              <div className="relative">
                <button
                  className="font-sans relative inline-flex items-center text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors group"
                  onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                >
                  <span className="flex items-center gap-1">
                    <span>Library</span>
                    <svg className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isGalleryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
                </button>
                {isGalleryOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[180px]">
                    <Link href="/gallery" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Gallery</Link>
                    <Link href="/videos" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Videos</Link>
                    <Link href="/webinars" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Webinars</Link>
                    <Link href="/cbgdownload" className="font-sans block px-4 py-2 text-[16px] font-bold text-green-700 hover:text-green-400 transition-colors hover:bg-gray-50">Download</Link>
                  </div>
                )}
              </div>

              <div className="relative group">
                <Link href="/blog" className="font-sans text-green-700 text-[16px] font-bold hover:text-green-400 transition-colors">
                  Blog
                </Link>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-3/4"></span>
              </div>
            </div>

            {/* Right Side - Social Icons and CTA (merged: gap fixed, was two separate justify-between divs) */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/contact"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-2 py-[2px] rounded-lg transition-colors font-sans text-[13px] font-bold whitespace-nowrap"
              >
                Contact Us<br />+91-8527626868
              </Link>
              <Link
                href="/cbgplantvisit"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-2 py-[2px] rounded-lg transition-colors font-sans text-sm font-bold whitespace-nowrap"
              >
                ♻️CBG <br />Plant Visit
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-gray-200">
              <div className="font-sans mt-4 flex flex-col space-y-3 bg-gray-100 rounded-xl px-6 py-4 shadow font-bold text-green-700 text-[16px]">
                <Link href="/" className="hover:text-green-400 transition-colors">Home</Link>

                {/* Mobile About Us Submenu */}
                <div>
                  <button
                    className="flex items-center space-x-1 hover:text-green-400 transition-colors w-full text-left"
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  >
                    <span>About Us</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileAboutOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link href="/ceo" className="block hover:text-green-400 transition-colors">Our CEO</Link>
                      <Link href="/about" className="block hover:text-green-400 transition-colors">About the Organization</Link>
                    </div>
                  )}
                </div>

                <Link href="/superteam" className="hover:text-green-400 transition-colors">Our Super Team</Link>
                <Link href="/cbg" className="hover:text-green-400 transition-colors">CBG Park</Link>
                <Link href="/r&d" className="hover:text-green-400 transition-colors">R&D</Link>

                {/* Mobile Services Submenu */}
                <div>
                  <button
                    className="flex items-center space-x-1 hover:text-green-400 transition-colors w-full text-left"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    <span>Services</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link href="/pmc" className="block hover:text-green-400 transition-colors">PMC</Link>
                      <Link href="/epc" className="block hover:text-green-400 transition-colors">EPC</Link>
                    </div>
                  )}
                </div>

                <Link href="/project" className="hover:text-green-400 transition-colors">Projects</Link>
                <Link href="/projectmanagement" className="block ml-4 hover:text-green-400 transition-colors">Project Management</Link>

                {/* Mobile Library Submenu */}
                <div>
                  <button
                    className="flex items-center space-x-1 hover:text-green-400 transition-colors w-full text-left"
                    onClick={() => setMobileGalleryOpen(!mobileGalleryOpen)}
                  >
                    <span>Library</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${mobileGalleryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileGalleryOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link href="/gallery" className="block hover:text-green-400 transition-colors">Gallery</Link>
                      <Link href="/videos" className="block hover:text-green-400 transition-colors">Videos</Link>
                      <Link href="/webinars" className="block hover:text-green-400 transition-colors">Webinars</Link>
                      <Link href="/cbgdownload" className="block hover:text-green-400 transition-colors">Download</Link>
                    </div>
                  )}
                </div>

                <Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link>
                <Link href="/contact" className="block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors w-fit mt-3">
                  Contact Us<br />+91-8287933634
                </Link>
                <Link href="/cbgplantvisit" className="block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors w-fit">
                  ♻️CBG Plant Visit
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;