import React from 'react';
import Link from 'next/link';

const CtaSection = () => {
    return (
        <div className="mt-1 text-center animate-cta">
            <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-400 backdrop-blur-xl border border-green-400/30 p-12 shadow-2xl relative overflow-hidden">

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="relative z-10 space-y-6">
                    <h2 className="text-3xl lg:text-[42px] font-bold text-green-800 leading-tight text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text gradient-text-animated">
                        Ready to Build Your <span className="text-green-600">CBG Empire?</span>
                    </h2>

                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                        Join the renewable energy revolution with our comprehensive CBG park solutions.
                        From concept to commissioning, we'll guide you every step of the way.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link href="/whyinvestincbgwithkecagritech">
                            <button className="group relative inline-flex items-center justify-center px-10 py-5 text-black font-bold text-lg bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 rounded-2xl hover:from-green-300 hover:via-emerald-300 hover:to-green-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 button-ripple">
                                <span>Start Your CBG Project</span>
                                <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 arrow-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </Link>

                        <Link href="/cbgdownload">
                            <button className="group inline-flex items-center justify-center px-8 py-5 text-green-600 font-bold bg-transparent border-2 border-green-400/50 rounded-2xl hover:bg-green-400/10 hover:border-green-400 transition-all duration-300 hover:scale-105">
                                <svg
                                    className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                <span>Download Guide</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaSection;