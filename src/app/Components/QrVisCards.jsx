"use client"

import React from 'react';
import Image from 'next/image';
import { Download, Award, Sparkles } from 'lucide-react';

const QrVisCards = () => {
  const visitingCards = [
    {
      id: 1,
      name: 'Jitendra Narayan',
      position: 'Chief Executive Officer',
      image: '/images/vis2.jpeg',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      id: 2,
      name: 'Ashok Kumar Jaswal',
      position: 'Product & Promotion Manager',
      image: '/images/vis5.jpeg',
      gradient: 'from-teal-400 to-cyan-500'
    },
    {
      id: 3,
      name: 'Hitendar Nahar',
      position: 'Vice President',
      image: '/images/vis4.jpeg',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      id: 4,
      name: 'Dr. Khushbu Chaudhary',
      position: 'Sr. Vice President-Commercial',
      image: '/images/vis1.jpeg',
      gradient: 'from-cyan-400 to-teal-500'
    },
    {
      id: 5,
      name: 'Jaiprakash Mandal',
      position: 'Sr. Marketing Manager',
      image: '/images/vis3.jpeg',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleDownload = (cardName, imagePath) => {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = `${cardName.replace(/\s+/g, '-')}-visiting-card.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderCEOCard = (card) => (
    <div key={card.id} className="relative group/card">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover/card:opacity-50 transition-opacity duration-500"></div>

      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-300/30 overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left Side - Visiting Card Image & Info & Download */}
          <div className="md:w-1/2 flex flex-col">
            <div className="relative overflow-hidden bg-slate-700 aspect-[1.75/1] group-hover/card:scale-105 transition-transform duration-500">
              <Image
                src={card.image}
                alt={`${card.name}`}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  const fallback = document.createElement('div');
                  fallback.className = 'text-center p-8';
                  fallback.innerHTML =
                    '<div class="w-20 h-20 bg-gradient-to-r ' + card.gradient + ' rounded-full flex items-center justify-center mx-auto mb-4">' +
                      '<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                      '</svg>' +
                    '</div>' +
                    '<p class="text-white font-bold text-lg">' + card.name + '</p>' +
                    '<p class="text-slate-300 text-sm">' + card.position + '</p>';
                  e.target.parentElement.appendChild(fallback);
                }}
              />
            </div>

            <div className="p-6 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                <h3 className="text-white font-bold text-3xl mb-1">
                  {card.name}
                </h3>
                <p className="text-emerald-300 font-semibold text-lg">
                  {card.position}
                </p>
              </div>

              <button
                onClick={() => handleDownload(card.name, card.image)}
                className="w-full relative group/btn overflow-hidden rounded-xl p-4 bg-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold">
                  <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                  Download Card
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - CEO Full Photo */}
          <div className="relative overflow-hidden bg-slate-700 md:w-1/2 h-[450px] md:min-h-0">
            <Image
              src="/images/ceo.jpg"
              alt={`${card.name}`}
              width={800}
              height={600}
              className="w-full h-[470px] object-cover object-center"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-600');
                const fallback = document.createElement('div');
                fallback.className = 'text-center p-8';
                fallback.innerHTML =
                  '<div class="w-32 h-32 bg-gradient-to-r ' + card.gradient + ' rounded-full flex items-center justify-center mx-auto mb-4">' +
                    '<svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                    '</svg>' +
                  '</div>' +
                  '<p class="text-white font-bold text-lg">CEO Photo</p>';
                e.target.parentElement.appendChild(fallback);
              }}
            />
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );

  const renderCard = (card) => (
    <div key={card.id} className="relative group/card max-w-lg mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover/card:opacity-50 transition-opacity duration-500"></div>

      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-300/30 overflow-hidden">
        {/* Card Image */}
        <div className="relative overflow-hidden bg-slate-700 aspect-[1.75/1] group-hover/card:scale-105 transition-transform duration-500">
          <Image
            src={card.image}
            alt={`${card.name}`}
            width={800}
            height={600}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
              const fallback = document.createElement('div');
              fallback.className = 'text-center p-8';
              fallback.innerHTML =
                '<div class="w-20 h-20 bg-gradient-to-r ' + card.gradient + ' rounded-full flex items-center justify-center mx-auto mb-4">' +
                  '<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>' +
                  '</svg>' +
                '</div>' +
                '<p class="text-white font-bold text-lg">' + card.name + '</p>' +
                '<p class="text-slate-300 text-sm">' + card.position + '</p>';
              e.target.parentElement.appendChild(fallback);
            }}
          />
        </div>

        {/* Card Info */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-white font-bold text-xl mb-1">
              {card.name}
            </h3>
            <p className="text-emerald-300 font-semibold text-sm">
              {card.position}
            </p>
          </div>

          <button
            onClick={() => handleDownload(card.name, card.image)}
            className="w-full relative group/btn overflow-hidden rounded-xl p-4 bg-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold">
              <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
              Download Card
            </span>
          </button>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-emerald-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative px-8 py-3 bg-white/90 backdrop-blur-md border-2 border-emerald-400/50 rounded-full shadow-lg">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                  KEY PERSONS
                  <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
                </span>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-slate-900/70">Visiting </span>
              <span className="text-emerald-600">Cards</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Download visiting cards of our key personnel
            </p>
          </div>

          {/* CEO Card */}
          <div className="flex justify-center mb-8">
            <div className="max-w-4xl w-full">
              {renderCEOCard(visitingCards[0])}
            </div>
          </div>

          {/* Other Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visitingCards.slice(1).map((card) => renderCard(card))}
          </div>

          {/* Bottom Info */}
          <div className="mt-16 text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-emerald-300/30">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-lg">KEC Agritech Private Limited</p>
                      <p className="text-slate-300 text-sm">Soil Sufficient - Biofuel - Renewable Energy - Zero Emission</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrVisCards;