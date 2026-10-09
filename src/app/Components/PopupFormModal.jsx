'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Leaf, Send, Phone } from 'lucide-react';

export default function PopupFormModal({
    googleFormActionUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfWc8xFd-PXIMWmh1rOEER1bblLfZObPv0BYjZmy7N-MMcunQ/formResponse",
    nameFieldId = "entry.160379097",
    emailFieldId = "entry.241185335",
    phoneFieldId = "entry.863912628",
    investorFieldId = "entry.1408678745"
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(true);
    const [hasClosedOnce, setHasClosedOnce] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        investor: '',
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!hasClosedOnce || isSubmitted) return;

        const timer = setTimeout(() => {
            if (!isSubmitted) {
                setIsOpen(true);
                setShowCloseButton(false);
            }
        }, 106000);

        return () => clearTimeout(timer);
    }, [hasClosedOnce, isSubmitted]);

    const handleClose = () => {
        if (showCloseButton) {
            setIsOpen(false);
            setHasClosedOnce(true);
        }
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.investor) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        const formBody = new URLSearchParams();
        formBody.append(nameFieldId, formData.name);
        formBody.append(emailFieldId, formData.email);
        formBody.append(phoneFieldId, formData.phone);
        formBody.append(investorFieldId, formData.investor);

        fetch(googleFormActionUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody.toString()
        }).then(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        }).catch(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md bg-slate-900/40 p-4 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                <div className="relative w-full max-w-md group my-8 lg:mt-36 ">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                    <div className="py-8 relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>

                        {showCloseButton && !isSubmitted && (
                            <button
                                onClick={handleClose}
                                className="absolute sm:top-12 top:2 right-6 z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300 hover:rotate-90 backdrop-blur-sm border border-slate-700/50"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        )}

                        <div className="relative p-8 sm:p-10">
                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="relative mb-6 inline-block">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                                        <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                                            <svg
                                                className="w-10 h-10 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text mb-3">
                                        Success!
                                    </h3>
                                    <p className="text-slate-300 text-lg">Your information has been submitted successfully.</p>
                                    <div className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="text-ce mb-4 ">
                                        <div className="flex flex-col items-start gap-1.5 mx-auto mb-2">
                                            {/* Row 1: Logo + "Build Scalable." on same line */}
                                            <div className="flex items-center gap-3">
                                                <Image
                                                  src="/images/logo.png"
                                                  alt="KEC Logo"
                                                  width={800}
                                                  height={600}
                                                  className="w-20 h-auto flex-shrink-0"
                                                />
                                                <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text leading-tight whitespace-nowrap">
                                                    Build Scalable.
                                                </h2>
                                            </div>

                                            {/* Rows 2 & 3: Left-aligned */}
                                            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text leading-tight whitespace-nowrap">
                                                Build Sustainable.
                                            </h2>
                                            <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text leading-tight whitespace-nowrap">
                                                Build CBG With KEC
                                            </h2>
                                        </div>



                                        <p className="text-slate-400 text-sm">Fill in your details to continue your journey with KEC</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative group/input">
                                            <label htmlFor="name" className="block text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                                <Leaf className="w-4 h-4" />
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500 hover:border-emerald-500/50"
                                                    placeholder="Enter Your Full Name"
                                                />
                                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-xl opacity-0 group-hover/input:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="relative group/input">
                                            <label htmlFor="email" className="block text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4" />
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500 hover:border-teal-500/50"
                                                    placeholder="Enter Your Email Address"
                                                />
                                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 rounded-xl opacity-0 group-hover/input:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="relative group/input">
                                            <label htmlFor="phone" className="block text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500 hover:border-cyan-500/50"
                                                    placeholder="Enter Your Phone Number"
                                                />
                                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 rounded-xl opacity-0 group-hover/input:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="relative group/input">
                                            <label htmlFor="investor" className="block text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Would you consider investing in a CBG plant or a CBG park With KEC?
                                            </label>
                                            <div className="relative">
                                                <div
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className="w-full px-4 py-3.5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 outline-none transition-all text-white hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer flex items-center justify-between"
                                                >
                                                    <span className={formData.investor ? 'text-white' : 'text-slate-400'}>
                                                        {formData.investor ? (formData.investor === 'Yes' ? '👍 Yes' : '👎 No') : '✨ Select an option'}
                                                    </span>
                                                    <div className="relative">
                                                        <svg className={`w-5 h-5 text-purple-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                        <div className="absolute inset-0 blur-sm bg-purple-500/30 rounded-full" />
                                                    </div>
                                                </div>
                                                {isDropdownOpen && (
                                                    <div className="absolute z-10 w-full mt-2 bg-slate-800/95 backdrop-blur-sm border-2 border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
                                                        <div
                                                            onClick={() => {
                                                                setFormData({ ...formData, investor: 'Yes' });
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-3 text-white hover:bg-emerald-500 cursor-pointer transition-colors border-b border-slate-700/50"
                                                        >
                                                            👍 Yes
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                setFormData({ ...formData, investor: 'No' });
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-3 text-white hover:bg-emerald-500 cursor-pointer transition-colors"
                                                        >
                                                            👎 No
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-xl opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="relative group/button pt-2">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur opacity-50 group-hover/button:opacity-75 transition-opacity" />
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.investor}
                                                className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-emerald-400 py-3 rounded-xl font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed shadow-xl flex items-center justify-center gap-2 group-hover/button:shadow-2xl"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit
                                                        <Send className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}