"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, Leaf, Users, TrendingUp, Factory } from 'lucide-react';

export default function VisitPlantCompOne() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    visitDate: '',
    attendees: '',
    message: '',
    agree: false
  });

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('registration-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully! We will contact you within 24 hours.');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl w-full">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-8 sm:p-12 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full opacity-10 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 rounded-full opacity-10 -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                  CBG PLANT VISIT
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6"></div>
                <h2 className="text-xl sm:text-2xl text-green-300 font-semibold">
                  DELEGATION REGISTRATION FORM
                </h2>
                <p className="text-slate-300 mt-3 text-sm sm:text-base">
                  For Prospective Investors, Entrepreneurs & Technical Delegates
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-white to-emerald-50/30">
              {/* Vision Badge */}
              <div className="inline-block mb-8">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  About KEC Vision....
                </div>
              </div>

              {/* Quote Section */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-emerald-100 relative mb-10">
                {/* Quote mark decoration */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>

                <div className="mt-6">
                  <p className="text-slate-700 text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium mb-8 text-justify">
                    "India's next decade belongs to green energy — and CBG is its most scalable opportunity. 
                    At KEC, we are building projects that don't just create fuel, but create futures — for investors, 
                    farmers, and the nation."
                  </p>

                  {/* Author Section */}
                  <div className="flex items-center gap-4 pt-6 border-t-2 border-emerald-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                      <Image
                        src="/images/ceo - Copy.jpg"
                        alt="CEO"
                        width={800}
                        height={600}
                        className='rounded-full h-16 w-16 object-cover'
                      />
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-lg">Jitendra Narayan</p>
                      <p className="text-slate-500 text-sm font-sans font-semibold">Founder & CEO, KEC Agritech Pvt. Ltd.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Factory className="w-10 h-10 mb-3 text-green-400" />
                  <h3 className="font-bold text-lg text-green-400 mb-2">Live Plant Tour</h3>
                  <p className="text-sm opacity-90 ">Experience CBG production firsthand</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <TrendingUp className="w-10 h-10 mb-3 text-green-400" />
                  <h3 className="font-bold text-lg mb-2 text-green-400">Investment Insights</h3>
                  <p className="text-sm opacity-90">Learn about ROI & opportunities</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Users className="w-10 h-10 mb-3 text-green-400" />
                  <h3 className="font-bold text-lg mb-2 text-green-400">Network</h3>
                  <p className="text-sm opacity-90">Connect with industry leaders</p>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Leaf className="w-10 h-10 mb-3 text-green-400" />
                  <h3 className="font-bold text-lg mb-2 text-green-400">Green Future</h3>
                  <p className="text-sm opacity-90">Be part of sustainable energy</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="inline-block">
                  <button 
                    onClick={scrollToForm}
                    className="group relative px-10 py-5 bg-teal-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Step Into India's CBG Future</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <div className="mt-6 animate-bounce">
                    <ArrowDown className="w-8 h-8 text-emerald-600 mx-auto" />
                  </div>
                  
                  <button 
                    onClick={scrollToForm}
                    className="mt-3 text-emerald-600 font-bold text-2xl hover:text-emerald-700 underline underline-offset-8 decoration-4 hover:decoration-emerald-700 transition-all duration-300 cursor-pointer animate-pulse"
                  >
                    Register Below
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
          </div>
        </div>
      </div>

     

      {/* Floating decoration elements */}
      <div className="fixed top-20 right-10 w-20 h-20 bg-emerald-300 rounded-full opacity-20 blur-2xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-32 h-32 bg-teal-300 rounded-full opacity-20 blur-2xl animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
    </div>
  );
}