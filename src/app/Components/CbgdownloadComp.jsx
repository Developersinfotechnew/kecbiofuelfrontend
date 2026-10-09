import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';

const CbgDownloadComp = ({
  title,
  description,
  brochurePdfUrl,
  fileName,
  whatsInside,
  moreInfoTitle,
  moreInfoDesc,
  moreInfoButtonText,
  moreInfoButtonLink
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle PDF Download
  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = brochurePdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style jsx>{`
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .stagger-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .stagger-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .stagger-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .stagger-4 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>

      {/* Banner */}
      <div className={`bg-gradient-to-r from-green-600 to-gray-600 text-white py-10  ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">{title}</h1>
          <p className="text-lg md:text-lg text-indigo-100 mx-auto">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${isVisible ? 'animate-scaleIn' : 'opacity-0'} stagger-1`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className={`flex items-center gap-3 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'} stagger-2`}>
                <div className="bg-indigo-100 p-3 rounded-full animate-pulse-slow">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">{title}</h2>
                  <p className="text-gray-500 font-sans font-semibold">Interactive PDF Viewer</p>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`bg-[#FF6B35] hover:from-green-700 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl ${isVisible ? 'animate-slideInRight' : 'opacity-0'} stagger-2 ${isDownloading ? 'cursor-wait' : ''}`}
              >
                <Download size={20} className={isDownloading ? 'animate-bounce-slow' : ''} />
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="p-6">
            <div className={`bg-gray-50 rounded-xl p-4 ${isVisible ? 'animate-fadeIn' : 'opacity-0'} stagger-3`}>
              <iframe
                src={brochurePdfUrl}
                className="w-full h-96 lg:h-[600px] rounded-lg shadow-inner transition-all duration-300 hover:shadow-lg"
                title={title}
                style={{ border: 'none' }}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'} stagger-4`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Inside</h3>
                <ul className="space-y-2 text-gray-500 font-sans">
                  {whatsInside.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-slow"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'animate-slideInRight' : 'opacity-0'} stagger-4`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{moreInfoTitle}</h3>
                <p className="text-gray-500 mb-4 font-sans text-justify">{moreInfoDesc}</p>
                <Link href={moreInfoButtonLink}>
                  <button className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white border-2 border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
                    {moreInfoButtonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CbgDownloadComp;