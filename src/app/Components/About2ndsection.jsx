import React, { useEffect, useRef, useState } from 'react';

const About2ndsection = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('[data-id]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "Every solution we create prioritizes environmental harmony and long-term ecological balance. \
We focus on reducing carbon footprints through cleaner fuel alternatives. \
Our processes are designed to maximize resource efficiency and minimize waste. \
Sustainability is at the core of every decision we make."
    },
    {
      icon: "🔬",
      title: "Innovation",
      description:
        "We continuously push boundaries to develop cutting-edge renewable energy technologies. \
Our team experiments with modern techniques to enhance production efficiency and fuel quality. \
Innovation drives us to explore new possibilities within the green-energy ecosystem. \
We believe in transforming ideas into scalable, real-world solutions."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description:
        "We build strong partnerships that create meaningful impact in communities worldwide. \
Collaboration enables us to combine expertise and deliver sustainable energy at scale. \
We work closely with farmers, industries, and stakeholders to empower local economies. \
Together, we aim to accelerate the global shift toward clean energy."
    }
  ];


  return (
    <div>
      <section className="py-16 bg-gray-50 overflow-hidden" ref={sectionRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-6">
            <h2
              className="text-5xl font-bold text-gray-800 mb-3 transition-all duration-800 ease-out"
              data-id="header"
              style={{
                opacity: isVisible.header ? 1 : 0,
                transform: isVisible.header ? 'translateY(0)' : 'translateY(-30px)'
              }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[45px] font-bold text-gray-900 leading-tight mb-2 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
                Our <span className='text-green-600'>Values</span>
              </h2>
            </h2>
            <div
              className="h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto transition-all duration-1000 ease-out"
              data-id="underline"
              style={{
                width: isVisible.underline ? '96px' : '0px',
                transitionDelay: '200ms'
              }}
            ></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-id={`card-${index}`}
                style={{
                  opacity: isVisible[`card-${index}`] ? 1 : 0,
                  transform: isVisible[`card-${index}`]
                    ? 'translateY(0) scale(1)'
                    : 'translateY(40px) scale(0.9)',
                  transition: 'all 0.7s ease-out',
                  transitionDelay: `${400 + index * 150}ms`
                }}
              >
                <div
                  className="text-4xl mb-4 text-center transition-all duration-600"
                  style={{
                    opacity: isVisible[`card-${index}`] ? 1 : 0,
                    transform: isVisible[`card-${index}`] ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                    transitionDelay: `${600 + index * 150}ms`
                  }}
                >
                  {value.icon}
                </div>
                <h3
                  className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text mb-3 text-center transition-all duration-600"
                  style={{
                    opacity: isVisible[`card-${index}`] ? 1 : 0,
                    transform: isVisible[`card-${index}`] ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: `${700 + index * 150}ms`
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed font-sans text-[14.5px] text-justify transition-all duration-600"
                  style={{
                    opacity: isVisible[`card-${index}`] ? 1 : 0,
                    transform: isVisible[`card-${index}`] ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: `${800 + index * 150}ms`
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About2ndsection;