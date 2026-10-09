import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Calendar, Tag } from 'lucide-react';

const GalleryGlimpse = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Updated sample data - now includes all required fields
  const galleryItems = [

    {
      id: 1,
      image: "/images/gallerycert4.jpeg",
      title: "Annual Cultural Fest",
      type: "MOU",
      date: "2024-06-10",
      category: "Events"
    },
    {
      id: 2,
      image: "/images/gallerycert5.jpeg",
      title: "Local Newspaper Feature",
      type: "MOU",
      date: "2024-07-01",
      category: "Media"
    },
        {
      id: 3,
      image: "/images/gallerycert6.jpeg",
      title: "Local Newspaper Feature",
      type: "MOU",
      date: "2024-07-01",
      category: "Media"
    },
        {
      id: 4,
      image: "/images/gallerycert1.jpeg",
      title: "Local Newspaper Feature",
      type: "Certificate",
      date: "2024-07-01",
      category: "Media"
    },
        {
      id: 5,
      image: "/images/gallerycert2.jpeg",
      title: "Local Newspaper Feature",
      type: "Certificate",
      date: "2024-07-01",
      category: "Media"
    },
        {
      id: 6,
      image: "/images/gallerycert3.jpeg",
      title: "Local Newspaper Feature",
      type: "Certificate",
      date: "2024-07-01",
      category: "Media"
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === filter);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className={`text-center mb-10 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-green-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Gallery Glimpse
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of memorable posters and newspaper features that showcase our journey and achievements
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex space-x-1">
              {['all', 'MOU', 'Certificate'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize transform hover:scale-105 ${filter === filterType
                    ? 'bg-gradient-to-r from-green-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                >
                  {filterType === 'all' ? 'All Items' : `${filterType}s`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${isVisible ? 'animate-zoomIn' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(item)}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-105 border border-white/20">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6 text-white animate-pulse-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={800}
                  height={600}
                  className="w-full max-h-[60vh] object-contain bg-gray-100"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mr-4 animate-slideInLeft ${selectedItem.type === 'poster'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 text-white'
                    }`}>
                    {selectedItem.type}
                  </span>
                  <span className="text-gray-500 text-sm animate-slideInRight">
                    {selectedItem.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeInUp">
                  {selectedItem.title}
                </h3>
                <div className="flex items-center text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(selectedItem.date)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animate-zoomIn {
          animation: zoomIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
          animation-delay: 0.1s;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GalleryGlimpse;