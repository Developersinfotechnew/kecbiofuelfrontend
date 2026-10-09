import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Home4thsection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  /* ─────────────────────────────────────────
     BIO‑FUEL–FOCUSED PROJECT CATEGORIES
  ───────────────────────────────────────────*/
  const categories = [
    {
      number: "01",
      title: "Feedstock Sourcing",
      description:
        "Robust agri‑waste & municipal‑waste supply chains secured through long‑term farmer partnerships and city‑level tie‑ups.",
    },
    {
      number: "02",
      title: "Clean Conversion Tech",
      description:
        "State‑of‑the‑art anaerobic digestion & trans‑esterification delivering high‑purity Bio‑CNG, Bio‑Diesel & Ethanol.",
    },
    {
      number: "03",
      title: "Distribution & Logistics",
      description:
        "Nation‑wide pipeline, cylinder & tanker network that moves green molecules efficiently to industrial and mobility customers.",
    },
    {
      number: "04",
      title: "Carbon‑Credit Monetisation",
      description:
        "Certified lifecycle CO₂ savings converted into tradable credits, boosting ROI and supporting net‑zero targets.",
    },
  ];

  return (
    <section ref={sectionRef} className={`py-16 bg-gray-50 ${isVisible ? 'in-view' : ''}`}>
      <style>{`
        .animate-fadeInUp,
        .animate-fadeInLeft,
        .animate-fadeInRight,
        .animate-scaleIn,
        .animate-slideInRotate {
          opacity: 0;
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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
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
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRotate {
          from {
            opacity: 0;
            transform: translateY(20px) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        .in-view .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .in-view .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .in-view .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .in-view .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .in-view .animate-slideInRotate {
          animation: slideInRotate 0.7s ease-out forwards;
        }

        .card-item {
          opacity: 0;
        }

        .in-view .card-item:nth-child(1) {
          animation: fadeInRight 0.8s ease-out 0.2s forwards;
        }

        .in-view .card-item:nth-child(2) {
          animation: fadeInRight 0.8s ease-out 0.4s forwards;
        }

        .in-view .card-item:nth-child(3) {
          animation: fadeInRight 0.8s ease-out 0.6s forwards;
        }

        .in-view .card-item:nth-child(4) {
          animation: fadeInRight 0.8s ease-out 0.8s forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .number-badge {
          transition: transform 0.4s ease, background-color 0.3s ease;
        }

        .hover-lift:hover .number-badge {
          transform: rotate(360deg) scale(1.1);
          background-color: #059669;
        }

        .text-content {
          transition: color 0.3s ease;
        }

        .hover-lift:hover .text-content {
          color: #047857;
        }

        .cta-button {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(22, 163, 74, 0.3);
        }

        .gradient-text {
          animation: gradientShift 3s ease infinite;
          background-size: 200% auto;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        .quote-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .quote-box:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
        }
      `}</style>

      <div className="container mx-auto px-4 w-[90%] lg:w-[80%]">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* ─────────── Left Side ─────────── */}
          <div className="space-y-4 flex flex-col h-full">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-green-100 mb-4 sm:mb-6 animate-fadeInLeft">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">Project Pillers</span>
                <div className="w-6 sm:w-8 h-px bg-green-300"></div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-green-800 leading-tight text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text gradient-text animate-fadeInUp">
                Bio‑Fuel Solutions <br /> <span className="text-green-600">that Power a Greener India
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600 text-[14.5px] font-inter text-justify animate-fadeInLeft" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <p>
                From feedstock aggregation to last‑mile delivery, KEC Bio‑Fuel provides turnkey PMC , EPC , Technology Transfer , O & M  expertise for Bio‑CNG, Bio‑Diesel ,Ethanol ,Hydrogen, and Green Ammonia  assets through advanced fermentation, gasification, and purification systems, ensuring high yields and lower costs. Our mission is to convert waste streams into clean energy creating rural prosperity.
              </p>
              <p>
                Backed by 74 + EPC contracts and a ₹5000 Cr+ PPP MoU with the various State Government , we are scaling toward 225 + CBG plants nationwide by FY 2026 - 2027.                                                                                                               KEC Robust structure integrating backward (from suppliers) and forward (to customers) is achieved by combining control over raw material feedstock and production processes with control over the distribution, sales, and end-user
              </p>
            </div>

            {/* Quote */}
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 quote-box animate-scaleIn" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
                "Every tonne of agri‑waste we upcycle replaces fossil fuel,
                cuts methane emissions, and puts money back in farmers' hands."
              </p>
              <p className="text-green-800 font-semibold">– KEC Bio‑Fuel CEO</p>
            </div>

            {/* CTA */}
            <Link href="/about">

              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold cta-button animate-fadeInUp" style={{ animationDelay: '0.6s', opacity: 0 }}>
                READ MORE
              </button>
            </Link>
          </div>

          {/* ─────────── Right Side ─────────── */}
          <div className="flex flex-col justify-between gap-4 h-full">
            {/* Image */}
            <div
              className="animate-scaleIn overflow-hidden rounded-2xl shadow-xl mb-4 flex-1 min-h-[250px]"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <img
                src="/images/cbgservicesbanner.png"
                alt="KEC Bio-Fuel process"
                className="w-full h-full object-cover"
              />
            </div>

            {categories.map((cat) => (
              <div
                key={cat.number}
                className="bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 hover-lift card-item"
              >
                <div className="flex items-start space-x-4">
                  {/* Number badge */}
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center number-badge">
                    <span className="text-white font-bold text-lg">
                      {cat.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-content">
                      {cat.title}
                    </h3>
                    <p className="text-gray-600 text-[14px] leading-relaxed font-sans text-justify">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home4thsection;