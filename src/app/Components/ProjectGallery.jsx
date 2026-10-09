"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "MATHURA CBG PLANT 4TPD",
      description: "End-to-end solution for setting up sustainable biofuel plants using advanced processing technologies.",
      image: "/images/Project1.jpg",
      technologies: ["Biodiesel", "Ethanol", "Process Automation"],
      liveUrl: "https://example.com/biofuel-plant",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "MATHURA CBG PLANT 4TPD",
      description: "Innovative technology converting agricultural waste into eco-friendly biofuel.",
      image: "/images/Project2.avif",
      technologies: ["Pyrolysis", "Biogas", "Automation"],
      liveUrl: "https://example.com/waste-biofuel",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "MATHURA CBG PLANT 4TPD",
      description: "Digital system for tracking and managing biofuel supply chain and distribution efficiently.",
      image: "/images/Project3.jpg",
      technologies: ["IoT Sensors", "Cloud Monitoring", "Logistics"],
      liveUrl: "https://example.com/distribution",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "MATHURA CBG PLANT 4TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project5.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project6.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project4.jpg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 7,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project7.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 8,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project8.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 9,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project9.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 10,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project10.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 11,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project11.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    },
    {
      id: 12,
      title: "PALWAL CBG PLANT 2 TPD",
      description: "High-capacity biodiesel production line integrated with quality control and monitoring systems.",
      image: "/images/Project12.jpeg",
      technologies: ["Biodiesel", "Process Control", "SCADA"],
      liveUrl: "https://example.com/biodiesel-production",
      githubUrl: "#"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
           <div className="inline-flex mb-4 items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-green-400 animate-float">
                <Award className="w-4 h-4 animate-pulse-custom" />
                <span className="text-sm text-gray-900 font-sans font-bold">Project Showcase</span>
              </div>
         <h2 className="text-5xl font-bold mb-3 text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text">
              Featured <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Innovative solutions in sustainable energy and industrial automation, transforming ideas into impactful realities
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                  {project.title.includes('MATHURA') ? 'MATHURA' : 'PALWAL'}
                </span>
               
              </div>

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500';
                }}
              />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed font-sans font-semibold ">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium text-[#FF6B35] bg-white border border-[#FF6B35] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 text-sm font-semibold shadow-2xl text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Contact for Quote
                  </button>
                  <Link href="/whyinvestincbgwithkecagritech">
                  <button className="px-6 py-2.5 text-md font-semibold shadow-2xl text-white bg-[#FF6B35] rounded-lg hover:bg-[#e55a28] transition-colors flex items-center gap-2">
                    Details
                    <span>→</span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default ProjectGallery;