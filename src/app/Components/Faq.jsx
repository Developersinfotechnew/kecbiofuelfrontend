'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

/* ─────────────────────────────────────────
   Bio-Fuel Frequently Asked Questions
────────────────────────────────────────── */

const faqs = [
  {
    question: 'What is Bio-CNG and how is it produced?',
    answer:
      'Bio-CNG (Compressed Bio-Gas) is purified biogas upgraded to >95 % methane. We obtain it via anaerobic digestion of agri-residues and organic waste, followed by CO₂ removal and compression.',
  },
  {
    question: 'Which feedstocks can be used in your plants?',
    answer:
      'Typical feedstocks include rice straw, sugar-cane press-mud, municipal solid waste (organic fraction), poultry litter, and cattle dung. Our pre-treatment lines are configurable for regional biomass.',
  },
  {
    question: 'Are there government incentives for bio-fuel projects?',
    answer:
      'Yes. The SATAT scheme, Viability Gap Funding, and state-level CAPEX subsidies support Bio-CNG. Ethanol blending policies (E20) and GST benefits also apply.',
  },
  {
    question: 'What environmental benefits do your projects deliver?',
    answer:
      'Each tonne of Bio-CNG replaces ~1.3 t of CO₂-eq emissions, mitigates stubble burning, and diverts organic waste from landfills—directly aligning with SDG 7 & SDG 13.',
  },
  {
    question: 'Can existing biogas plants be upgraded to Bio-CNG?',
    answer:
      'Absolutely. We retrofit legacy digesters with gas-upgrading skids, compression, and bottling units, turning low-value biogas into transport-grade fuel.',
  },
  {
    question: 'How long does an EPC cycle typically take?',
    answer:
      'For a standard 10 TPD Bio-CNG plant, detailed engineering to commissioning is 12–14 months, subject to timely statutory approvals and feedstock tie-ups.',
  },
];

/* ─────────────────────────────────────────
   FAQ Component
────────────────────────────────────────── */

const Faq = () => {
  const [openRow, setOpenRow] = useState(null);
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

  // toggle function now works per row (2 items per row)
  const toggleRow = (rowIndex) => {
    setOpenRow((prevRow) => (prevRow === rowIndex ? null : rowIndex));
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 bg-gray-100 transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-green-500 font-bold text-lg mb-2">Bio-Fuel FAQs</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-green-800">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-800">
          {faqs.map((item, index) => {
            const rowIndex = Math.floor(index / 2); // group per row
            const isOpen = openRow === rowIndex;

            return (
              <div
                key={index}
                className="bg-white shadow-2xl hover:shadow-lg transition-all duration-200 rounded-md font-sans"
              >
                <button
                  onClick={() => toggleRow(rowIndex)}
                  className="w-full flex justify-between items-center px-6 py-4 font-medium text-left "
                >
                  <span className="font-sans font-semibold text-gray-600">
                    {item.question}
                  </span>
                  <span>
                    {isOpen ? (
                      <FiChevronDown className="transform rotate-180 transition-transform" />
                    ) : (
                      <FiArrowRight />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-4 text-gray-600 text-sm text-justify font-sans">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
