import React from 'react';
import Image from 'next/image';

const Ceosuperteam = () => {
    return (
        <div className="flex justify-center pt-12 mb-8 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden py-4">
                <div className="flex-1 p-6 md:p-8">
                    <div className="bg-orange-500 text-white font-bold text-lg md:text-xl p-3 md:p-4 inline-block rounded mb-4">
                        JITENDER NARAYAN
                        <br />
                        <span className="text-sm md:text-base font-semibold">The CEO Behind Our Mission....</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 font-bold text-justify pr-0 md:pr-6">
                        Jitendra is Management professional and a technocrat with 14+ years of experience in
                        Business Development through multi-channel as Franchisee &amp; Branch network across North
                        India, Operations, Man Management, and Profit Centre Management. Worked with Nirmal Bang,
                        Reliance Capital &amp; Kassa Finvest in various management level positions. Have set up
                        Commodities, Currency &amp; Equity Broking.
                    </p>
                    <a
                        href="https://in.linkedin.com/company/kecbiofuel?trk=public_post_feed-actor-name"
                        className="bg-green-500 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold uppercase text-sm hover:bg-green-600 transition-colors inline-block shadow-md"
                    >
                        Know More
                    </a>
                </div>

                {/* mobile: fixed height box (h-64) so the image always has
                    real space to fill. desktop: flex-none dropped, flex-1
                    takes over and stretches to match the text column */}
                <div className="relative w-full h-96 sm:h-80 flex-none md:h-auto md:flex-1">
                    <Image
                        src="/images/ceo.jpg"
                        alt="CEO"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="px-2 object-cover rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Ceosuperteam;