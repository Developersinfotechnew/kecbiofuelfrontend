"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Leaf, Factory, HelpCircle, Lightbulb, Zap } from 'lucide-react';

const LinkedInIcon = () => (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const SectionHeading = ({ icon: Icon, title, path }) => (
    <div className="flex items-center space-x-2 mb-3">
        <div className="p-1.5 bg-green-600/10 rounded-lg border border-green-600/20">
            <Icon className="w-4 h-4 text-green-700" />
        </div>
        <Link href={path}>
            <h3 className="text-base font-bold text-gray-800 hover:text-green-800 transition-colors duration-300 cursor-pointer uppercase tracking-wide">
                {title}
            </h3>
        </Link>
    </div>
);

const NavLinks = ({ items }) => (
    <ul className="space-y-1.5 mb-1">
        {items.map((item, i) => (
            <li key={i}>
                <Link href={item.path} className="group/link flex items-center text-gray-600 hover:text-green-800 transition-all duration-300 hover:translate-x-1">
                    <ChevronRight className="w-3 h-3 mr-1.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 text-green-600 shrink-0" />
                    <span className="text-[13px] leading-relaxed font-sans font-bold">{item.name}</span>
                </Link>
            </li>
        ))}
    </ul>
);

const Footer = () => {
    const developmentItems = [
        { name: "Synchronization of CBG in CGD network", path: "/latestdevlopment" },
        { name: "Fertilizer Control Order & Environmental Clearances", path: "/latestdevlopment" },
    ];

    return (
        <footer className="bg-gradient-to-br from-green-50 via-green-100 to-green-400 text-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent transform -skew-y-1" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-6 pt-14">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center space-x-3 mb-3">
                        <Leaf className="w-7 h-7 text-green-600" />
                        <h2 className="text-2xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                            CBG - A Path to a <span className="text-green-600">Cleaner Future</span>
                        </h2>
                        <Leaf className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full" />
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Col 1: Why KEC + Organic Fertilizers */}
                    <div className="space-y-7">
                        <div>
                            <SectionHeading icon={Lightbulb} title="Why KEC-BIOFUEL" path="/about" />
                            <NavLinks items={[
                                { name: "About KEC-BIOFUEL", path: "/about" },
                                { name: "Benefits of KEC-BIOFUEL", path: "/about" },
                            ]} />
                        </div>
                        <div>
                            <SectionHeading icon={Leaf} title="Organic Fertilizers" path="https://kisanexperience.com/" />
                            <NavLinks items={[
                                { name: "About Organic Fertilizers", path: "https://kisanexperience.com/" },
                                { name: "Support for Organic Fertilizers", path: "https://kisanexperience.com/support" },
                            ]} />
                        </div>
                        <div>
                            <SectionHeading icon={Lightbulb} title="Ongoing Developments" path="/latestdevlopment" />
                            <NavLinks items={developmentItems} />
                        </div>
                    </div>

                    {/* Col 2: Demystifying CBG + Technological Framework */}
                    <div className="space-y-7">
                        <div>
                            <SectionHeading icon={Factory} title="Demystifying CBG" path="/biogas" />
                            <NavLinks items={[
                                { name: "Biogas", path: "/biogas" },
                                { name: "Purification", path: "/biogas" },
                                { name: "Compression", path: "/biogas" },
                            ]} />
                        </div>
                        <div>
                            <SectionHeading icon={Factory} title="Technological Framework" path="/technology" />
                            <NavLinks items={[
                                { name: "Biogas Production Technology", path: "/technology" },
                                { name: "Purification Technology", path: "/technology" },
                            ]} />
                        </div>
                        <div>
                            <SectionHeading icon={HelpCircle} title="FAQs" path="/contact" />
                            <NavLinks items={[{ name: "Read FAQs", path: "/contact" }]} />
                        </div>
                    </div>

                    {/* Col 3: Key Process + End to End + Foundation + FAQs + Ongoing */}
                    <div className="space-y-6">
                        <div>
                            <SectionHeading icon={HelpCircle} title="Key Process Undertaken" path="/majorprocess" />
                            <NavLinks items={[
                                { name: "Expression of Interest", path: "/majorprocess" },
                                { name: "Letter of Intent", path: "/majorprocess" },
                            ]} />
                        </div>
                        <div>
                            <SectionHeading icon={HelpCircle} title="End to End Process Flow" path="/about" />
                            <NavLinks items={[{ name: "Explore", path: "/about" }]} />
                        </div>
                        <div>
                            <SectionHeading icon={Zap} title="Foundation Of Scheme" path="/enablesschemes" />
                            <NavLinks items={[
                                { name: "Assured Long-Term Pricing", path: "/enablesschemes" },
                                { name: "Facilitation by OMCs through LOI", path: "/enablesschemes" },
                            ]} />
                        </div>


                    </div>

                    {/* Col 4: Get Support + LinkedIn cards */}
                    <div className="space-y-4">
                        {/* Get Support Card */}
                        <div className="bg-white/30 rounded-xl p-5 backdrop-blur-sm border border-green-600/20 hover:bg-white/40 transition-all duration-300 shadow-lg">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="p-1.5 bg-green-600/10 rounded-lg border border-green-600/20">
                                    <HelpCircle className="w-4 h-4 text-green-700" />
                                </div>
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Commitment to Help</h3>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed mb-4 font-semibold">
                                Need help with the KEC Scheme? We're here to guide you.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center text-sm"
                            >
                                Get Support
                            </Link>
                        </div>

                        {/* LinkedIn Card */}
                        <div className="bg-white/30 rounded-xl p-5 backdrop-blur-sm border border-green-600/20 hover:bg-white/40 transition-all duration-300 shadow-lg">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="p-1.5 bg-green-600/10 rounded-lg border border-green-600/20">
                                    <LinkedInIcon />
                                </div>
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Stay Updated</h3>
                            </div>
                            <p className="text-gray-600 text-xs leading-relaxed mb-4 font-semibold">
                                Subscribe "The BioEnergy Brief" Newsletter By KEC
                            </p>
                            <a
                                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7464982100782411778"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-sm"
                            >
                                <LinkedInIcon />
                                Subscribe on LinkedIn
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-4 border-t border-green-600/30">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <Leaf className="w-5 h-5 text-green-600" />
                            <span className="text-gray-600 text-sm font-sans">
                                © 2025 by{" "}
                                <Link href="https://developersinfotech.in" target="_blank" className="text-green-600 hover:underline font-medium">
                                    Developersinfotech.in
                                </Link>
                                . All Rights Reserved with KEC
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/privacypolicy" className="text-gray-600 hover:text-green-800 text-sm transition-colors duration-300 font-semibold">Privacy Policy</Link>
                            <Link href="/termsandcondition" className="text-gray-600 hover:text-green-800 text-sm transition-colors duration-300 font-semibold">Terms of Service</Link>
                            <Link href="/contact" className="text-gray-600 hover:text-green-800 text-sm transition-colors duration-300 font-semibold">Contact Us</Link>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;