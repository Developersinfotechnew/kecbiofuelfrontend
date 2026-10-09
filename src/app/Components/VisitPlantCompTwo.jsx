"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function VisitCompTwo() {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    accountName: "Kee Agritech Pvt Ltd",
    accountNumber: "418005000581",
    ifscCode: "ICIC0004180",
    branch: "Branch Nehru place, Delhi"
  };

  const copyBankDetails = async () => {
    const detailsText = `
Bank Details:
Account Name: ${bankDetails.accountName}
Account Number: ${bankDetails.accountNumber}
IFSC Code: ${bankDetails.ifscCode}
Branch: ${bankDetails.branch}
    `.trim();

    try {
      await navigator.clipboard.writeText(detailsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with Animation */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
            Payment{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Method
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        {/* Payment Card */}
        <div 
          className="bg-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-teal-200/50 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="p-8 md:p-12 relative z-10">
            {/* QR Code Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-shrink-0">
                <div className="rounded-2xl p-6 transform transition-all duration-500 hover:rotate-3 hover:scale-105 shadow-xl">
                  <div className="bg-teal-300 p-4 rounded-xl shadow-inner">
                    <div className="w-48 h-48 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">
                          <Image
                            src="/images/qrbank.png"
                            alt=""
                            width={800}
                            height={600}
                            className='w-48 h-48'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Quick Payment
                </h2>
                <p className="text-teal-300 text-lg">
                  Scan the QR code to make instant payments
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-800 px-4 text-teal-400 font-semibold">OR</span>
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Bank Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <DetailRow label="Account Name" value={bankDetails.accountName} isHovered={isHovered} delay={0} />
                <DetailRow label="Account Number" value={bankDetails.accountNumber} isHovered={isHovered} delay={100} />
                <DetailRow label="IFSC Code" value={bankDetails.ifscCode} isHovered={isHovered} delay={200} />
                <DetailRow label="Branch" value={bankDetails.branch} isHovered={isHovered} delay={300} />
              </div>

              {/* Copy Button */}
              <div className="pt-6">
                <button 
                  onClick={copyBankDetails}
                  className={`w-full font-bold py-4 px-6 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 ${
                    copied 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/50' 
                      : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-teal-500/50'
                  } text-white`}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Bank Details
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <TrustBadge icon="🔒" text="Secure Payment" />
          <TrustBadge icon="⚡" text="Instant Transfer" />
          <TrustBadge icon="✓" text="Verified Account" />
          <TrustBadge icon="💳" text="Multiple Options" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

function DetailRow({ label, value, isHovered, delay }) {
  return (
    <div 
      className="bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm transform transition-all duration-300 hover:bg-slate-700 hover:scale-[1.02] group"
      style={{
        transitionDelay: isHovered ? `${delay}ms` : '0ms'
      }}
    >
      <p className="text-teal-300 text-xs font-medium mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-white text-lg font-semibold group-hover:text-teal-200 transition-colors">{value}</p>
    </div>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm text-slate-700 font-semibold">{text}</p>
    </div>
  );
}